import UserTitile from "../main/user-titile/user-titile";
import {PhotoLoader} from "../photo-loader/photo-loader";
import Photos from "../photos/photos";
import {SelectedPhoto} from "../selected-photo/selected-photo";
import {useState} from "react";

const UserPhotos = ({selectedPhoto}) => {

  return (
      <>
          <UserTitile/>
          <PhotoLoader fill={"#8A2BE2"} stroke={"#8A2BE2"}/>
          <Photos setSelectedPhoto={selectedPhoto.setSelectedPhoto}/>
          {selectedPhoto.selectedPhoto && <SelectedPhoto selectedPhoto={selectedPhoto.selectedPhoto} setSelectedPhoto={selectedPhoto.setSelectedPhoto}/>}

      </>
  )
}

export default UserPhotos;