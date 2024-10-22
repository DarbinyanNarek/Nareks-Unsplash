
import React from 'react';
import axios from 'axios';
export const myHomePageKey = "pyXA1C0vv05Sw36jOHyhUR1fADb01lZKvxnjhYgg0sw"
export const myAlbumsKey = "pyXA1C0vv05Sw36jOHyhUR1fADb01lZKvxnjhYgg0sw"
export const myAlbumsPhotosKey = "VER4AZ1Bki51oWJ313iWwimlFtYh9z8W0HApSE_pJRY"

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
});





export default class Api {
  static getPhoto(params) {
    return api.get(`/photos`,{params} )
  }
  static searchPhoto({query, color, page, per_page}) {

    return api.get(`/search/photos`, {
      params:{
        client_id: myAlbumsPhotosKey,
        query: query || "photo",
        color,
        page,
        per_page
      } })
  }
  static getCollection(params){
    return api.get(`/collections`, {params})
  }
  static getColor(params){
    return api.get(`/search/photos`, {params})
  }
  static getModalPhotos(params){
    return api.get(`/users/${params.username}/photos`, {params})
  }
  static getAlbums(params){
    return api.get(`/users/${params.username}/collections`, {params})
  }
  static getAlbumUser(params){
    return api.get(`/users/${params.username}`, {params})
  }
  static getAlbumPhotos(params){
    return api.get(`/collections/${params.id}/photos`, {params})
  }
}




