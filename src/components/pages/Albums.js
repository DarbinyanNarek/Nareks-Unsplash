import React, {useEffect,} from 'react';

import Logo from "../../assets/icons/Vector.jpg";
import {useNavigate, useParams} from "react-router-dom";
import {myAlbumsKey} from "../../utills/Api";
import {albumRequest, albumUserRequest} from "../../store/actions/AlbumAction";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import logoutImg from "../../assets/images/logout.png"
import {setModalOpen} from "../../store/actions/HomePageAction";


const Albums = () => {
  const dispatch = useDispatch();
  const {albumData, albumUser} = useSelector(state => state.album);
  const navigate = useNavigate();
  const albumPhotoRequest = (id) => {
    navigate(`/album-photo-page/${id}`);
  }

  const logout = () => {
    if (window.confirm("Are you sure you want to exit the site?") === true) {
      window.localStorage.removeItem("token");
      window.location.reload(true);
    }

  }

  const closing = () => {
    navigate('/home-page')
    dispatch(setModalOpen(false))
  }



  const {username} = useParams()

  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(albumRequest({client_id: myAlbumsKey, username})),
        dispatch(albumUserRequest({client_id: myAlbumsKey, username}))])
    })()

  }, []);


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
                    <img className="logout_button" src={logoutImg}/>
                  </button>
                </div>


              </div>
            </div>
          </div>
          <div className="modal_user_photo">
            <img className="modal_user_photo_img" src={albumUser?.profile_image?.medium} alt="album user"/>
          </div>
        </div>
        <div className="album_collection_wrapper_desc">
          <div className="album_collection_bold_desc">
            Collections
          </div>
          <div className="album_collection_mini_desc">
            Explore the world through collections of <br/> beautiful HD pictures
          </div>

        </div>
        <div className="albums_container">
          {albumData.map((item) => (
            <div key={item.id} className="album_item" onClick={() => albumPhotoRequest(item.id)}>
              <img className="default_album_image" src={item.cover_photo.urls.regular}
                   alt="default_album_image"/>
              <p className="album_title">
                {item.title}
              </p>
              <p className="modal_user_username">
                {item.total_photos} photos - created by {item.user.name}
              </p>
              {/*<img className="album_photo" src= {item.map(photo => photo[0]?.urls.raw)} alt="album photo"/>*/}
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Albums;
