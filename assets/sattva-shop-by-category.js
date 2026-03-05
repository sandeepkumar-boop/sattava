/**
 * Sattva Shop By Category – prev/next buttons scroll the slider
 */
(function () {
  const section = document.querySelector('.sattva-shop-by-category');
  if (!section) return;

  const slider = section.querySelector('[data-shop-category-slider]');
  const prevBtn = section.querySelector('[data-shop-category-prev]');
  const nextBtn = section.querySelector('[data-shop-category-next]');

  if (!slider || !prevBtn || !nextBtn) return;

  function scrollBy(direction) {
    const step = slider.offsetWidth * 0.8;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const newScroll = direction === 'next'
      ? Math.min(slider.scrollLeft + step, maxScroll)
      : Math.max(slider.scrollLeft - step, 0);
    slider.scrollTo({ left: newScroll, behavior: 'smooth' });
  }

  function updateButtons() {
    const atStart = slider.scrollLeft <= 1;
    const atEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1;
    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
  }

  prevBtn.addEventListener('click', function () { scrollBy('prev'); });
  nextBtn.addEventListener('click', function () { scrollBy('next'); });
  slider.addEventListener('scroll', updateButtons);

  updateButtons();
})();
