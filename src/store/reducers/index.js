import {combineReducers} from 'redux'
import homePageReducer from "./HomePageReducer";
import albumReducer from "./AlbumReducer"
import albumPhotoReducer from "./AlbumPhotoReducer";
import modalReducer from "./ModalReducer";
import loginReducer from "./LoginReducer";


const rootReducer = combineReducers({
  home: homePageReducer,
  album: albumReducer,
  albumPhotoReducer: albumPhotoReducer,
  modal: modalReducer,
  login: loginReducer

})


export default rootReducer
