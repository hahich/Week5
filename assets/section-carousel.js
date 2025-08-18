(function () {
  if (window.SectionCarousel) {
    if (typeof window.SectionCarousel.initAll === 'function') {
      window.SectionCarousel.initAll();
    }
    return;
  }

  class SectionCarousel {
    constructor(containerOrElement) {
      this.searchRoot = this.resolveSearchRoot(containerOrElement);
      this.carouselElement = this.findCarouselElement(this.searchRoot);
      this.swiperInstance = null;
    }

    resolveSearchRoot(containerOrElement) {
      if (!containerOrElement) return document;
      if (typeof containerOrElement === 'string') {
        return document.querySelector(containerOrElement);
      }
      return containerOrElement;
    }

    findCarouselElement(searchRoot) {
      if (!searchRoot) return null;
      if (searchRoot.matches && (searchRoot.matches('.testimonial-carousel.swiper') || searchRoot.matches('[data-carousel="swiper"]'))) {
        return searchRoot;
      }
      return searchRoot.querySelector && (searchRoot.querySelector('.testimonial-carousel.swiper') || searchRoot.querySelector('[data-carousel="swiper"]'));
    }

    destroy() {
      if (this.swiperInstance && typeof this.swiperInstance.destroy === 'function') {
        this.swiperInstance.destroy(true, true);
        this.swiperInstance = null;
      }
    }

    init() {
      if (!this.carouselElement) return;

      // Destroy previous instance
      this.destroy();

      // Read dataset attributes
      const carouselEl = this.carouselElement;
      const itemsPerRow = parseInt(carouselEl.getAttribute('data-items-per-row')) || 2;
      const mobileItemsPerRow = parseInt(carouselEl.getAttribute('data-mobile-items-per-row')) || 1;
      const columnGap = parseInt(carouselEl.getAttribute('data-column-gap')) || 24;
      const isAutoplayEnabled = carouselEl.getAttribute('data-autoplay') === 'true';
      const autoplayDelay = (parseInt(carouselEl.getAttribute('data-autoplay-speed')) || 4) * 1000;
      const showNavigationButtons = carouselEl.getAttribute('data-show-next-back') === 'true';
      const paginationType = carouselEl.getAttribute('data-pagination');
      const isInfiniteLoop = carouselEl.getAttribute('data-infinite') === 'true';
      const revealNextSlide = carouselEl.getAttribute('data-reveal-next-slide') === 'true';

      // Remove previously cloned slides if any
      const slidesWrapper = carouselEl.querySelector('.swiper-wrapper');
      if (!slidesWrapper) return;
      slidesWrapper.querySelectorAll('.swiper-slide-cloned').forEach((clonedSlide) => { clonedSlide.remove(); });

      const originalSlides = slidesWrapper.querySelectorAll(':scope > .swiper-slide');
      const originalSlidesCount = originalSlides.length;

      if (isInfiniteLoop) {
        originalSlides.forEach((slide, slideIndex) => {
          const clonedSlide = slide.cloneNode(true);
          clonedSlide.classList.add('swiper-slide-cloned');
          clonedSlide.setAttribute('data-swiper-slide-index', slideIndex);
          slidesWrapper.appendChild(clonedSlide);
        });
      }

      // Set CSS custom properties
      carouselEl.style.setProperty('--items-per-row', itemsPerRow);
      carouselEl.style.setProperty('--mobile-items-per-row', mobileItemsPerRow);
      carouselEl.style.setProperty('--column-gap', columnGap + 'px');

      if (typeof Swiper === 'undefined') return;

      const swiperConfig = {
        init: false,
        slidesPerView: window.innerWidth >= 769 ? itemsPerRow : mobileItemsPerRow,
        spaceBetween: columnGap,
        loop: !!isInfiniteLoop,
        loopedSlides: originalSlidesCount,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        navigation: showNavigationButtons ? {
          nextEl: carouselEl.querySelector('.swiper-button-next'),
          prevEl: carouselEl.querySelector('.swiper-button-prev')
        } : false,
        pagination: (paginationType && paginationType !== 'disable') ? {
          el: carouselEl.querySelector('.swiper-pagination'),
          clickable: true,
          type: paginationType === 'progress' ? 'progressbar' : 'bullets',
          dynamicBullets: false,
          renderBullet: function (bulletIndex, bulletClassName) {
            return bulletIndex < originalSlidesCount ? '<span class="' + bulletClassName + '"></span>' : '';
          }
        } : false,
        autoplay: isAutoplayEnabled ? {
          delay: autoplayDelay,
          disableOnInteraction: false
        } : false,
        breakpoints: {
          0: {
            slidesPerView: mobileItemsPerRow,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: mobileItemsPerRow,
            slidesPerGroup: 1
          },
          991: {
            slidesPerView: itemsPerRow,
            slidesPerGroup: 1
          }
        },
        centeredSlides: !!revealNextSlide,
        slidesPerGroup: 1,
        watchOverflow: true,
        loopFillGroupWithBlank: false,
        loopPreventsSliding: false,
        resizeObserver: true,
        updateOnWindowResize: true
      };

      const swiperInstance = new Swiper(carouselEl, swiperConfig);
      swiperInstance.init();
      this.swiperInstance = swiperInstance;

      // Pagination bullet synchronization when infinite loop is enabled
      if (isInfiniteLoop && paginationType && paginationType !== 'disable') {
        const paginationElement = carouselEl.querySelector('.swiper-pagination');

        function updatePaginationBullets() {
          const realSlideIndex = swiperInstance.realIndex;
          const currentBulletIndex = realSlideIndex % originalSlidesCount;
          if (paginationElement) {
            const paginationBullets = paginationElement.querySelectorAll('.swiper-pagination-bullet');
            paginationBullets.forEach((bullet, bulletIndex) => {
              const isActiveBullet = bulletIndex === currentBulletIndex;
              bullet.classList.toggle('swiper-pagination-bullet-active', isActiveBullet);
            });
          }
        }

        swiperInstance.on('beforeTransitionStart', updatePaginationBullets);
        swiperInstance.on('slideChangeTransitionEnd', updatePaginationBullets);
        swiperInstance.on('transitionEnd', updatePaginationBullets);
        swiperInstance.on('slideChange', function () {
          if (swiperInstance.activeIndex >= originalSlidesCount) {
            requestAnimationFrame(updatePaginationBullets);
          }
        });

        if (paginationElement) {
          paginationElement.addEventListener('click', function (clickEvent) {
            if (clickEvent.target.classList.contains('swiper-pagination-bullet')) {
              const allBullets = Array.from(paginationElement.querySelectorAll('.swiper-pagination-bullet'));
              const clickedBulletIndex = allBullets.indexOf(clickEvent.target);
              if (clickedBulletIndex !== -1) {
                swiperInstance.slideToLoop(clickedBulletIndex, undefined, true);
                requestAnimationFrame(updatePaginationBullets);
              }
            }
          });
        }

        setTimeout(updatePaginationBullets, 100);
      }
    }

    static initAll(searchScope) {
      const searchContainer = searchScope || document;
      const carouselNodes = searchContainer.querySelectorAll('.testimonial-carousel.swiper, [data-carousel="swiper"]');
      carouselNodes.forEach((carouselNode) => {
        const carouselInstance = new SectionCarousel(carouselNode);
        carouselInstance.init();
        carouselNode._sectionCarousel = carouselInstance;
      });
    }
  }

  window.SectionCarousel = SectionCarousel;

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  onReady(function () { SectionCarousel.initAll(); });

  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      SectionCarousel.initAll(event.target);
    });
    document.addEventListener('shopify:block:select', function (event) {
      var section = event.target.closest('[id^="shopify-section-"]') || document;
      SectionCarousel.initAll(section);
    });
    document.addEventListener('shopify:section:reorder', function (event) {
      SectionCarousel.initAll(event.target);
    });
  }
})(); 