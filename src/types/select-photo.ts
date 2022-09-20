import { Dispatch, SetStateAction } from 'react';

export type SelectedPhotoUrl = string | null;
export type SelectPhotoType = {
  selectedPhotoUrl: SelectedPhotoUrl;
  setSelectedPhoto: Dispatch<SetStateAction<SelectedPhotoUrl>>;
};
