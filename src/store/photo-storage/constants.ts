export const DOC_CHANGES_PHOTO_TYPES = {
  ADDED: 'added',
  REMOVED: 'removed',
} as const;

export const STATE_CHANGED = 'state_changed';

export const DOC_PATH = {
  _COMMON_PATH: 'common_photos',
  _USER_PATH: 'user_',

  getCommonPath: () => DOC_PATH._COMMON_PATH,
  getUserPath: (userId: string) => DOC_PATH._USER_PATH + userId,
  getUserPhotosStoragePath: (userId: string) => (imageName: string) =>
    `${DOC_PATH.getUserPath(userId)}/photos/${imageName}`,
  getUserPhotosFirebasePath: (userId: string) =>
    `${DOC_PATH.getUserPath(userId)}/photos/photosCollection/`,
};
