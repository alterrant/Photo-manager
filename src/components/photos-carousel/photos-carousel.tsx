import { Dispatch, SetStateAction, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Swiper as SwiperInterface, Thumbs } from 'swiper';
import {
  SWIPER_ARROWS,
  SWIPER_NAVIGATION_BUTTONS,
} from '../../pages/main-page/main-page-constants';
import { Button } from '../common/button';
import arrowLeft from '../../pages/main-page/assets/arrow-left.svg';
import { Modal } from '../modal';
import { useSwiperRef } from '../../hooks/swiper';
import { useAppSelector } from '../../hooks/react-redux';
import { photoStorage } from '../../selectors';
import { SelectedPhotoId } from '../../types/select-photo';
import { SWIPER_NAMES } from './photos-carousel-constants';
import { Checkbox } from '../common/checkbox';
import { SnapshotPhotos } from '../../store/photo-storage/types';
import { SelectedPhotos } from '../selected-photos';

import './photos-carousel.css';

type PhotosCarouselType = {
  initialSlide: string | null;
  setSelectedPhotoId: Dispatch<SetStateAction<SelectedPhotoId>>;
};

export const PhotosCarousel = ({ initialSlide, setSelectedPhotoId }: PhotosCarouselType) => {
  const isModalOpened = !!initialSlide;

  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
  const { photos } = useAppSelector(photoStorage);
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>(isModalOpened);
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>(isModalOpened);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const initialSlideIndex = photos.findIndex(photo => photo.id === initialSlide);

  const handleCloseModal = () => {
    setSelectedPhotoId(null);
  };

  const handleSelectPhotos = (photo: SnapshotPhotos) => {
    const photoId = selectedPhotos.indexOf(photo.id);

    if (photoId !== -1) {
      const selectedPhotosCopy = ([] as string[]).concat(selectedPhotos);
      selectedPhotosCopy.splice(photoId, 1);
      setSelectedPhotos(selectedPhotosCopy);
    } else setSelectedPhotos(selectedPhotos.concat(photo.id));
  };

  const handleCheckCheckbox = (photo: SnapshotPhotos) => selectedPhotos.includes(photo.id);

  const getSwiperSlides = (swiperName: string) =>
    photos.map(photo => (
      <SwiperSlide key={photo.id}>
        <div className="swiper-img-wrapper">
          <img className="swiper-img" src={photo.imageUrl} alt={photo.name} />
          {swiperName === SWIPER_NAMES.BOTTOM_SWIPER && (
            <Checkbox
              changeHandler={() => handleSelectPhotos(photo)}
              isChecked={handleCheckCheckbox(photo)}
              className="swiper-checkbox"
            />
          )}
        </div>
      </SwiperSlide>
    ));

  if (isModalOpened) {
    return (
      <Modal
        onClose={handleCloseModal}
        isOpened={isModalOpened}
        className="photo-carousel-background"
      >
        <div className={selectedPhotos.length > 0 ? 'swiper-container-hidden' : 'swiper-container'}>
          <Swiper
            slidesPerView={1}
            initialSlide={initialSlideIndex}
            spaceBetween={20}
            modules={[Navigation, Thumbs]}
            thumbs={{
              swiper: swiperInstance,
            }}
            navigation={{
              nextEl,
              prevEl,
            }}
          >
            {getSwiperSlides(SWIPER_NAMES.TOP_SWIPER)}
          </Swiper>
          {SWIPER_NAVIGATION_BUTTONS.map(button => (
            <Button
              key={button.id}
              ref={button.name === SWIPER_ARROWS.NEXT ? nextElRef : prevElRef}
              classButton={button.classButton}
              src={arrowLeft as string}
              classImg={button.classArrow}
            />
          ))}
        </div>
        <div
          className={
            photos.length === 1
              ? 'test-width test-width-one'
              : photos.length === 2
              ? 'test-width test-width-two'
              : photos.length === 3
              ? 'test-width test-width-three'
              : photos.length === 4
              ? 'test-width test-width-four'
              : photos.length === 5
              ? 'test-width test-width-five'
              : 'test-width other'
          }
        >
          <Swiper
            onSwiper={setSwiperInstance}
            watchSlidesProgress
            grabCursor
            initialSlide={initialSlideIndex}
            slidesPerView="auto"
            observer
            observeParents
            observeSlideChildren
            scrollbar={{
              hide: true,
              draggable: true,
              snapOnRelease: true,
            }}
            modules={[Navigation, Thumbs, Scrollbar]}
          >
            {getSwiperSlides(SWIPER_NAMES.BOTTOM_SWIPER)}
          </Swiper>
        </div>
        <SelectedPhotos selectedPhotos={selectedPhotos} />
      </Modal>
    );
  }

  return null;
};
