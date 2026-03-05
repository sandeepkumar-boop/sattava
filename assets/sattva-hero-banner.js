/**
 * Sattva Hero Banner - mobile slider: sync dots with scroll, dot click to go to slide
 */
(function () {
  const slider = document.querySelector('[data-hero-slider]');
  if (!slider || !slider.closest('.sattva-hero-banner')) return;

  const section = slider.closest('.sattva-hero-banner');
  const dots = section.querySelectorAll('.sattva-hero-banner__dot');
  const slides = section.querySelectorAll('.sattva-hero-banner__slide');

  if (slides.length <= 1 || dots.length === 0) return;

  function setActiveDot(index) {
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === index);
    });
  }

  function getCurrentIndex() {
    const width = slider.offsetWidth;
    const scrollLeft = slider.scrollLeft;
    return Math.round(scrollLeft / width);
  }

  slider.addEventListener('scroll', function () {
    setActiveDot(getCurrentIndex());
  });

  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      const width = slider.offsetWidth;
      slider.scrollTo({ left: index * width, behavior: 'smooth' });
      setActiveDot(index);
    });
  });
})();
