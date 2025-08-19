// ===== SECTION DYNAMIC STYLES HANDLER =====

class SectionDynamicStyles {
  constructor() {
    this.init();
  }

  init() {
    this.handleImageComparisonStyles();
    this.handleFAQStyles();
  }

  handleImageComparisonStyles() {
    const imageComparisonSections = document.querySelectorAll('.image-comparison-section');
    
    imageComparisonSections.forEach(section => {
      // Handle dynamic width styles
      const contentWrapper = section.querySelector('.image-content-wrapper');
      const imageLeft = section.querySelector('.image-comparison-left');
      
      if (contentWrapper && imageLeft) {
        const width = imageLeft.getAttribute('data-width');
        if (width && width !== '100') {
          const calculatedWidth = `calc(100% - ${width}%)`;
          contentWrapper.style.width = calculatedWidth;
          imageLeft.style.width = `${width}%`;
        }
      }

      // Handle dynamic aspect ratio
      const slider = section.querySelector('.image-comparison-slider');
      if (slider) {
        const aspectRatio = slider.getAttribute('data-aspect-ratio');
        if (aspectRatio) {
          slider.style.aspectRatio = aspectRatio;
        }
      }

      // Handle block-specific styles
      const blocks = section.querySelectorAll('.ip-content-block');
      blocks.forEach(block => {
        this.applyBlockStyles(block);
      });
    });
  }

  applyBlockStyles(block) {
    // Handle heading styles
    const heading = block.querySelector('.image-comparison-heading');
    if (heading) {
      const fontSize = heading.getAttribute('data-font-size');
      const fontWeight = heading.getAttribute('data-font-weight');
      const spacing = heading.getAttribute('data-spacing');
      const transform = heading.getAttribute('data-transform');
      
      if (fontSize) heading.style.fontSize = `${fontSize}px`;
      if (fontWeight) heading.style.fontWeight = fontWeight;
      if (spacing) heading.style.marginBottom = `${spacing}px`;
      if (transform === 'uppercase') heading.style.textTransform = 'uppercase';
    }

    // Handle description styles
    const description = block.querySelector('.image-comparison-description');
    if (description) {
      const fontSize = description.getAttribute('data-font-size');
      const fontWeight = description.getAttribute('data-font-weight');
      const spacing = description.getAttribute('data-spacing');
      
      if (fontSize) description.style.fontSize = `${fontSize}px`;
      if (fontWeight) description.style.fontWeight = fontWeight;
      if (spacing) description.style.marginBottom = `${spacing}px`;
    }

    // Handle subheading styles
    const subheading = block.querySelector('.image-comparison-subheading');
    if (subheading) {
      const fontSize = subheading.getAttribute('data-font-size');
      const fontWeight = subheading.getAttribute('data-font-weight');
      const spacing = subheading.getAttribute('data-spacing');
      const transform = subheading.getAttribute('data-transform');
      
      if (fontSize) subheading.style.fontSize = `${fontSize}px`;
      if (fontWeight) subheading.style.fontWeight = fontWeight;
      if (spacing) subheading.style.marginBottom = `${spacing}px`;
      if (transform === 'uppercase') subheading.style.textTransform = 'uppercase';
    }

    // Handle button styles
    const button = block.querySelector('.image-comparison-btn__primary, .image-comparison-btn__outline, .image-comparison-btn__link');
    if (button) {
      const spacing = button.getAttribute('data-spacing');
      const bgColor = button.getAttribute('data-bg-color');
      const textColor = button.getAttribute('data-text-color');
      
      if (spacing) button.style.marginBottom = `${spacing}px`;
      if (bgColor) button.style.background = bgColor;
      if (textColor) button.style.color = textColor;
    }

    // Handle product block styles
    const productWrapper = block.querySelector('.image-comparision-wrapper');
    if (productWrapper) {
      const spacing = productWrapper.getAttribute('data-spacing');
      if (spacing) productWrapper.style.marginBottom = `${spacing}px`;
    }
  }

  handleFAQStyles() {
    const faqSections = document.querySelectorAll('.faqs-section');
    
    faqSections.forEach(section => {
      // Handle header weight
      const header = section.querySelector('h2');
      if (header) {
        const fontWeight = header.getAttribute('data-font-weight');
        if (fontWeight) header.style.fontWeight = fontWeight;
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SectionDynamicStyles();
});

// Initialize for Shopify sections
document.addEventListener('shopify:section:load', () => {
  new SectionDynamicStyles();
}); 