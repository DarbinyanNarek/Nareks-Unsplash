import React, {useEffect, useState} from 'react';
import Logo from "../../assets/icons/Vector.jpg";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {albumPhotoRequest} from "../../store/actions/AlbumPhotoAction";
import {useNavigate, useParams,} from "react-router-dom";
import {myAlbumsPhotosKey} from "../../utills/Api";
import logoutImg from "../../assets/images/logout.png";
import {setModalOpen} from "../../store/actions/HomePageAction";


const PhotosOfAlbums = () => {
  const {id} = useParams()

  const dispatch = useDispatch();
  const {albumUser} = useSelector(state => state.album);
  const {albumsPhotos} = useSelector(state => state.albumPhotoReducer);
  const [page, setPage] = useState(1)
  const [per_page] = useState(20);
  const navigate = useNavigate()
  const totalPages = useSelector(state => state.home.totalPages);
  const [loading] = useState(true)

  const logout = () => {
    if (window.confirm("Are you sure you want to exit the site?") === true) {
      window.localStorage.removeItem("token");
      window.location.reload(true);
    }
  }


  useEffect(() => {
    dispatch(albumPhotoRequest({client_id: myAlbumsPhotosKey, id, page, per_page}))
  }, [page, id]);

  console.log(albumsPhotos, 5555555)



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


  const closing = () => {
    navigate('/home-page')
    dispatch(setModalOpen(false))
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
                <div className="logo_desc" onClick={closing}>
                  <span className="logo_big_word">
          Unsplash
          </span>
                  <span className="logo_small_word">
Beautiful, free photos.
          </span>
                </div>
                <div>
                  <button className="button-login" onClick={logout}>
                    <img className="logout_button" src={logoutImg} alt={"logout button"}/>
                  </button>
                </div>


              </div>
            </div>
          </div>
          <div className="modal_user_photo">
            <img className="modal_user_photo_img" src={albumUser.profile_image?.medium} alt="album user"/>
          </div>
        </div>
        <div className="images_wrapper">

          <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 1320: 3}}
          >
            <Masonry gutter="30px">
              {albumsPhotos.map((photo) => (
                <div key={photo.id} className="masonry-item">
                  <img src={photo.urls.regular} alt={photo.alt_description || 'Photo'}/>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </div>
  );
};

export default PhotosOfAlbums;
