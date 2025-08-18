(function () {
  if (window.FaqAccordion) {
    // If already defined, just re-init all sections
    if (typeof window.FaqAccordion.initAll === 'function') {
      window.FaqAccordion.initAll();
    }
    return;
  }

  class FaqAccordion {
    constructor(faqsContainer) {
      this.faqsContainer = typeof faqsContainer === 'string' ? document.querySelector(faqsContainer) : faqsContainer;
    }

    init() {
      if (!this.faqsContainer) return;

      const faqItems = this.faqsContainer.querySelectorAll('.faq-item');
      faqItems.forEach((faqItem) => {
        const questionButton = faqItem.querySelector('.faq-question');
        const answerElement = faqItem.querySelector('.faq-answer');
        if (!questionButton || !answerElement) return;

        // Remove existing event listeners to prevent duplicates
        if (questionButton.faqClickHandler) {
          questionButton.removeEventListener('click', questionButton.faqClickHandler);
        }

        // Create new event handler
        questionButton.faqClickHandler = function () {
          const isCurrentlyExpanded = questionButton.getAttribute('aria-expanded') === 'true';
          
          // Close all FAQ items
          document.querySelectorAll('.faq-question').forEach((questionBtn) => {
            questionBtn.setAttribute('aria-expanded', 'false');
            const toggleIcon = questionBtn.querySelector('.faq-toggle');
            if (toggleIcon) toggleIcon.textContent = '+';
          });
          document.querySelectorAll('.faq-answer').forEach((answerEl) => {
            answerEl.classList.remove('active');
            answerEl.style.maxHeight = null;
          });
          
          // Open this FAQ item if not already open
          if (!isCurrentlyExpanded) {
            questionButton.setAttribute('aria-expanded', 'true');
            const currentToggleIcon = questionButton.querySelector('.faq-toggle');
            if (currentToggleIcon) currentToggleIcon.textContent = '–';
            answerElement.classList.add('active');
            answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
          }
        };

        // Add event listener
        questionButton.addEventListener('click', questionButton.faqClickHandler);
      });
    }

    static initAll() {
      const faqsSections = document.querySelectorAll('.faqs-section');
      faqsSections.forEach((faqsSection) => {
        const faqInstance = new FaqAccordion(faqsSection);
        faqInstance.init();
      });
    }
  }

  window.FaqAccordion = FaqAccordion;

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  onReady(FaqAccordion.initAll);

  // Re-initialize when Shopify theme editor updates
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', FaqAccordion.initAll);
    document.addEventListener('shopify:block:select', FaqAccordion.initAll);
  }
})(); 