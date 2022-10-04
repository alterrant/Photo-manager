export const SWIPER_ARROWS = {
  DEFAULT: 'swiper-arrow',
  PREV: 'swiper-arrow__prev',
  NEXT: 'swiper-arrow__next',
} as const;

export const SWIPER_NAVIGATION_BUTTONS = [
  {
    id: 0,
    name: SWIPER_ARROWS.PREV,
    classButton: `${SWIPER_ARROWS.DEFAULT} ${SWIPER_ARROWS.PREV}`,
    classArrow: 'swiper-arrow__img',
  },
  {
    id: 1,
    name: SWIPER_ARROWS.NEXT,
    classButton: `${SWIPER_ARROWS.DEFAULT} ${SWIPER_ARROWS.NEXT}`,
    classArrow: 'swiper-arrow__img swiper-arrow__img_reverse',
  },
] as const;
