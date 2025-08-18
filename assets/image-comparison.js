(function () {
  if (window.ImageComparison) {
    if (typeof window.ImageComparison.initAll === 'function') {
      window.ImageComparison.initAll();
    }
    return;
  }

  class ImageComparison {
    constructor(sliderContainer) {
      this.sliderContainer = typeof sliderContainer === 'string' ? document.querySelector(sliderContainer) : sliderContainer;
      this.sliderBar = null;
      this.sliderButton = null;
      this.beforeImage = null;
      this.afterImage = null;
      this.isDragging = false;
      this.boundMouseMoveHandler = null;
      this.boundMouseUpHandler = null;
      this.boundTouchMoveHandler = null;
      this.boundTouchEndHandler = null;
    }

    init() {
      if (!this.sliderContainer) return;
      this.sliderBar = this.sliderContainer.querySelector('.slider-bar');
      this.sliderButton = this.sliderContainer.querySelector('.slider-bar-button__pull');
      this.beforeImage = this.sliderContainer.querySelector('.before-image');
      this.afterImage = this.sliderContainer.querySelector('.after-image');
      if (!this.sliderBar || !this.sliderButton || !this.afterImage) return;

      this.teardown();

      const updateSliderPosition = (percentage) => {
        percentage = Math.max(0, Math.min(100, percentage));
        this.sliderBar.style.left = percentage + '%';
        this.sliderButton.style.left = '50%';
        this.sliderButton.style.top = '50%';
        this.sliderButton.style.transform = 'translate(-50%, -50%)';
        this.afterImage.style.clipPath = 'inset(0 0 0 ' + percentage + '%)';
      };

      const calculatePercentageFromX = (clientX) => {
        const containerRect = this.sliderContainer.getBoundingClientRect();
        return ((clientX - containerRect.left) / containerRect.width) * 100;
      };

      const handleMouseDown = (event) => {
        this.isDragging = true;
        document.body.style.userSelect = 'none';
      };

      const handleMouseMove = (event) => {
        if (!this.isDragging) return;
        updateSliderPosition(calculatePercentageFromX(event.clientX));
      };

      const handleMouseUp = () => {
        this.isDragging = false;
        document.body.style.userSelect = '';
      };

      const handleTouchStart = (event) => {
        this.isDragging = true;
        document.body.style.userSelect = 'none';
      };

      const handleTouchMove = (event) => {
        if (!this.isDragging) return;
        updateSliderPosition(calculatePercentageFromX(event.touches[0].clientX));
      };

      const handleTouchEnd = () => {
        this.isDragging = false;
        document.body.style.userSelect = '';
      };

      this.boundMouseMoveHandler = handleMouseMove;
      this.boundMouseUpHandler = handleMouseUp;
      this.boundTouchMoveHandler = handleTouchMove;
      this.boundTouchEndHandler = handleTouchEnd;

      this.sliderButton.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      this.sliderButton.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);

      updateSliderPosition(50);

      // Store teardown on element to avoid duplicate listeners on re-init
      this.sliderContainer._imageComparisonInstance = this;
    }

    teardown() {
      if (!this.sliderContainer) return;
      // Remove previous listeners if any
      if (this.sliderButton) {
        this.sliderButton.replaceWith(this.sliderButton.cloneNode(true));
        this.sliderButton = this.sliderContainer.querySelector('.slider-bar-button__pull');
      }
      if (this.boundMouseMoveHandler) {
        window.removeEventListener('mousemove', this.boundMouseMoveHandler);
      }
      if (this.boundMouseUpHandler) {
        window.removeEventListener('mouseup', this.boundMouseUpHandler);
      }
      if (this.boundTouchMoveHandler) {
        window.removeEventListener('touchmove', this.boundTouchMoveHandler);
      }
      if (this.boundTouchEndHandler) {
        window.removeEventListener('touchend', this.boundTouchEndHandler);
      }
      this.boundMouseMoveHandler = null;
      this.boundMouseUpHandler = null;
      this.boundTouchMoveHandler = null;
      this.boundTouchEndHandler = null;
    }

    static initAll(containerScope) {
      const searchContainer = containerScope || document;
      const sliderElements = searchContainer.querySelectorAll('.image-comparison-slider');
      sliderElements.forEach((sliderElement) => {
        const existingInstance = sliderElement._imageComparisonInstance;
        if (existingInstance) {
          existingInstance.teardown();
        }
        const newInstance = new ImageComparison(sliderElement);
        newInstance.init();
      });
    }
  }

  window.ImageComparison = ImageComparison;

  function onReady(cb) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cb, { once: true });
    } else {
      cb();
    }
  }

  onReady(function () { ImageComparison.initAll(); });

  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      ImageComparison.initAll(event.target);
    });
    document.addEventListener('shopify:block:select', function (event) {
      const section = event.target.closest('[id^="shopify-section-"]') || document;
      ImageComparison.initAll(section);
    });
    document.addEventListener('shopify:section:reorder', function (event) {
      ImageComparison.initAll(event.target);
    });
  }
})(); 