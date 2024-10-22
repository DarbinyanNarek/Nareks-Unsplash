import React, {useEffect} from 'react';
import {useState} from "react";
import Logo from "../../assets/icons/Vector.jpg";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Modal from "../../components/main/Modal";
import ColorsBlock from "../main/ColorsBlock";
import {
  searchPhotos,
  collectionRequest,
  setModalOpen, setModalItemData,
} from "../../store/actions/HomePageAction";
import {useSelector,} from "react-redux";
import {useDispatch} from "react-redux";
import {useRef} from "react";

import {myHomePageKey} from "../../utills/Api";
import useQuery from "../../utills/hooks/useQuery";
import utils from "../helpers/Utils";
import logoutImg from "../../assets/images/logout.png"
import {useNavigate} from "react-router-dom";



const HomePage = () => {
  const {query, setQuery} = useQuery();
  const timeoutRef = useRef(null)
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [currentColorArray, setCurrentColorArray] = useState([]);
  const [per_page] = useState(20);
  const dispatch = useDispatch();
  const images = useSelector(state => state.home.images)
  const searchArray = useSelector(state => state.home.searchArray);
  const collectionsData = useSelector(state => state.home.collectionsData);
  const totalPages = useSelector(state => state.home.totalPages);
  const modalItemData = useSelector(state => state.home.modalItemData);
  const [loading, setLoading] = useState(true)
  const isLoading = useRef(true);
  const navigate = useNavigate()
  const modalOpen = useSelector(state => state.home.modalOpen)


  const changeInputValue = (value) => {
    setQuery({...query, query: value || ""});
    setPage(1)
  }

  const changeCollectionsForm = () => {
    setIsCollectionOpen(!isCollectionOpen);
  }

  const handleModalOpen = () => {
    dispatch(setModalOpen(true))
  }


  useEffect(() => {
    (async () => {
      setLoading(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(async () => {
        await dispatch(searchPhotos(utils.deleteEmptyKeys({...query, page, per_page})))
        setLoading(false)
      }, [500])
      isLoading.current = false
    })()
  }, [query, currentColorArray, page]);

  const logout = () => {
    if (window.confirm("Are you sure you want to exit the site?") === true){
      window.localStorage.removeItem("token");
      window.location.reload(true);
    }

  }


  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

      if ((scrollTop + clientHeight >= scrollHeight - 5) && !loading) {
        if (page < totalPages) {
          setPage(prev => prev + 1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, totalPages]);

  useEffect(() => {
    dispatch(collectionRequest({client_id: myHomePageKey}))
  }, []);


  function handleClick(photo) {
   dispatch(setModalItemData(photo))
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="home_container">
          <div className="first_container">
            <div className="logo_wrapper">
              <div className="logo_img_div">
                <img className="logo_img" src={Logo} alt="Logo"/>
              </div>
              <div className="logo_big_desc">
                <div className="logo_desc" onClick={() => navigate("/home-page") }>
                  <span className="logo_big_word" >
          Unsplash
          </span>
                  <span className="logo_small_word">
Beautiful, free photos.
          </span>
                </div>
                <div>
                  <button className="button-login" onClick={logout}>
                    <img className="logout_button" src={logoutImg} alt={"logout_button"}/>
                  </button>
                </div>


              </div>
            </div>
            <input type="text"
                   value={query.query}
                   onChange={({target}) => changeInputValue(target.value)}
                   className="search_input"
                   placeholder="Search photos"
            />
          </div>

          <div className="collection_div"
               style={{minHeight: isCollectionOpen && "auto", maxHeight: !isCollectionOpen && 315}}>
            <div className="collection_header">
              <p className="collection_big_title">
                Collections
              </p>
              <p className="collection_see_all_button" onClick={changeCollectionsForm}>
                {isCollectionOpen ? "See Less" : "See All"}
              </p>
            </div>
            <div className="current_collection">
              {collectionsData.map((col) => (
                <div className="collection_mini_div" key={col.id}>
                  <div>
                    <img className="collection_mini_photo" src={col.cover_photo.urls.small} alt=""/>
                  </div>
                  <div className="collection_mini_second_div">
                    <p className="collection_mini_title">{col.title}</p>
                    <span className="collection_mini_description">by {col.user.name}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="second_container">
          <ColorsBlock
            setPage={setPage}
            currentColorArray={currentColorArray}
            setCurrentColorArray={setCurrentColorArray}
            searchRequest={searchPhotos}
          />

          <div className="images_wrapper">

            <ResponsiveMasonry
              columnsCountBreakPoints={{350: 1, 750: 2, 1320: 3}}
            >

              <div>
                <Masonry gutter="10px">
                  {searchArray.map((photo) => (
                    <div key={photo.id} className="masonry-item">
                      <button onClick={() => handleClick(photo)} className="buttonPhoto">
                        <img onClick={handleModalOpen} src={photo.urls.small} alt={photo.alt_description || 'Photo'}/>
                      </button>
                    </div>

                  ))}
                </Masonry>
                {loading ? null : <div className="loader"></div>}
              </div>

              <div>
                <Masonry gutter="10px">
                  {
                    images.map((photo) => (
                      <div key={photo.id} className="masonry-item">
                        <button onClick={() => handleClick(photo)} className="buttonPhoto">
                          <img onClick={handleModalOpen} src={photo.urls.small}
                               alt={photo.alt_description || 'Photo'}/>
                        </button>
                      </div>
                    ))
                  }

                </Masonry>

              </div>

            </ResponsiveMasonry>
          </div>
        </div>


        {modalOpen && (
          <Modal
            onClose={handleModalOpen}
            buttonClick={handleClick}
            images={images}
            modalItem={modalItemData}
            searchArray={searchArray}
            username={modalItemData.user.username}
          />
        )}


      </div>
    </div>


  )
};

export default HomePage;
