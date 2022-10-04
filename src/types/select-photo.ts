import { Dispatch, SetStateAction } from 'react';

export type SelectedPhotoId = string | null;
export type SelectPhotoType = {
  selectedPhotoId: SelectedPhotoId;
  setSelectedPhoto: Dispatch<SetStateAction<SelectedPhotoId>>;
};
