import {createPortal} from 'react-dom' ;
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import React, {useEffect} from "react";
import closeButton from "../../assets/icons/free-icon-font-cross.png"
import downloadButton from "../../assets/icons/download (1).png"

import _ from "lodash"
import {saveAs} from "file-saver"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {modalPhotoRequest} from "../../store/actions/ModalAction";
import {myHomePageKey} from "../../utills/Api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {setModalOpen} from "../../store/actions/HomePageAction";

const Modal = ({onClose, modalItem, username,}) => {
  const [newImage, setNewImage] = React.useState("");
  const [newAccount, setNewAccount] = React.useState({
    photo: newImage,
    name: "",
    userName: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalArray = useSelector(state => state.modal.modalArray);


  function handleClick(photo) {
    setNewImage(photo.urls.regular);

    setNewAccount({
      photo: photo.user.profile_image.medium,
      name: photo.user.name,
      userName: photo.user.username
    })
  }

  function closeModal() {
    dispatch(setModalOpen(false))
  }

  function downloadClick() {
    const fileName = modalItem.urls.regular.split("/").pop();
    saveAs(modalItem.urls.regular, `${fileName}.jpg`);
    toast.success("you dowload a photo")
  }

  function handleNavigate() {
    navigate(`/albums-page/${username}`);

  }


  useEffect(() => {
    dispatch(modalPhotoRequest({client_id: myHomePageKey, username}))
  }, []);


  return (
    createPortal(
      <div className="modal_container" onClick={closeModal}>
        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
          <div className="modal_header">
            <div className="modal_header_user_container" onClick={handleNavigate}>
              <div className="modal_user_photo">
                <img src={_.isEmpty(newAccount.photo) ? modalItem.user.profile_image.medium : newAccount.photo}
                     className="modal_user_photo_img" alt="user_photo"/>
              </div>
              <div className="modal_user_description">
                <p className="modal_user_name">
                  {_.isEmpty(newAccount.name) ? modalItem.user.name : newAccount.name}
                </p>
                <p className="modal_user_username">
                  @{_.isEmpty(newAccount.userName) ? modalItem.user.username : newAccount.userName}
                </p>
              </div>
            </div>
            <div className="modal_header_close">

              <span>
                <img src={downloadButton} onClick={downloadClick} alt="dowloadButton" className="modal_close"/>
              </span>

            </div>
          </div>


          <div className="modal_image">
            <img className="modal_image_img" src={newImage ? newImage : modalItem.urls.regular} alt=""/>
          </div>
          <div className="images_modal_wrapper">
            <p className="related_photos">
              Related photos
            </p>
            <ResponsiveMasonry
              columnsCountBreakPoints={{350: 1, 750: 2, 1320: 3}}>
              <Masonry gutter="10px">
                {
                  (modalArray.map((photo) => (
                    <div key={photo.id} className="masonry-item">
                      <button onClick={() => handleClick(photo)} className="buttonPhoto">
                        <img className="modal_image_img" src={photo.urls.small}
                             alt={photo.alt_description || 'Photo'}/>
                      </button>
                    </div>
                  )))
                }
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>,

      document.getElementById('root'),
    )
  )
}

export default Modal
