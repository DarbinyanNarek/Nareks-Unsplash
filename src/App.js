import {Route, Routes, Navigate} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import AlbumsPage from "./components/pages/Albums";
import PhotosOfAlbums from "./components/pages/PhotosOfAlbums";
import Error from "./components/pages/Error";
import Login from "./components/pages/Login";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";


function App() {
  const token = useSelector(state => state.login.token || localStorage.getItem("token"));


  useEffect(() => {
    if (window.location.pathname === "/login") {
      localStorage.removeItem("token");
    }
  }, [])


  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/home-page" replace/> : <Login/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/home-page" element={token ? <HomePage/> : <Navigate to="/" replace/>}/>
      <Route path="/albums-page/:username" element={token ? <AlbumsPage/> : <Navigate to="/" replace/>}/>
      <Route path="/album-photo-page/:id" element={token ? <PhotosOfAlbums/> : <Navigate to="/" replace/>}/>
      <Route path="/error" element={<Error/>}/>
      <Route path="*" element={<Navigate to="/error" replace/>}/>
    </Routes>
  );
}

export default App;



