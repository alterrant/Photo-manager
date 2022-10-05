import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Keyboard, Swiper as SwiperInterface, Thumbs } from 'swiper';
import classNames from 'classnames';
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
  const [isThumbsVisible, setThumbsVisible] = useState<boolean>(true);

  const checkboxStyle = classNames('swiper-checkbox', {
    'checkbox-triggered': selectedPhotos.length > 0,
  });

  const initialSlideIndex = photos.findIndex(photo => photo.id === initialSlide);

  const handleCloseModal = () => {
    if (selectedPhotos.length > 0) setSelectedPhotos([]);
    else setSelectedPhotoId(null);
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

  const getSwiperSlides = (swiperName: string) => {
    const isBottomSwiper = swiperName === SWIPER_NAMES.BOTTOM_SWIPER;

    return photos.map(photo => (
      <SwiperSlide key={photo.id} className={classNames({ 'swiper-slide-thumb': isBottomSwiper })}>
        <div className="swiper-img-wrapper">
          {isBottomSwiper && (
            <Checkbox
              changeHandler={() => handleSelectPhotos(photo)}
              isChecked={handleCheckCheckbox(photo)}
              className={checkboxStyle}
              vectorColor="rgba(255, 255, 255, 1)"
            />
          )}
          <img
            className="swiper-img"
            src={photo.imageUrl}
            alt={photo.name}
            onClick={() => {
              if (!isBottomSwiper) setThumbsVisible(!isThumbsVisible);
              if (isBottomSwiper && selectedPhotos.length > 0) handleSelectPhotos(photo);
            }}
          />
        </div>
      </SwiperSlide>
    ));
  };

  useEffect(() => {
    const element = document.querySelectorAll('.swiper-slide-thumb').item(initialSlideIndex);
    element.classList.add('swiper-slide-thumb-active');
  }, [initialSlideIndex]);

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
            keyboard
            modules={[Navigation, Thumbs, Keyboard]}
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
          className={classNames(
            'swiper-thumbs-container',
            !isThumbsVisible && 'swiper-thumbs-container-hidden',
            selectedPhotos.length > 0 && 'swiper-thumbs-disable-animation'
          )}
        >
          <Swiper
            onSwiper={setSwiperInstance}
            watchSlidesProgress
            grabCursor
            initialSlide={initialSlideIndex}
            slidesPerView="auto"
            keyboard
            observer
            observeParents
            observeSlideChildren
            scrollbar={{
              hide: true,
              draggable: true,
              snapOnRelease: true,
            }}
            modules={[Navigation, Thumbs, Scrollbar, Keyboard]}
          >
            {getSwiperSlides(SWIPER_NAMES.BOTTOM_SWIPER)}
          </Swiper>
        </div>
        <SelectedPhotos
          onClick={() => {
            setThumbsVisible(!isThumbsVisible);
          }}
          selectedPhotos={selectedPhotos}
        />
      </Modal>
    );
  }

  return null;
};
