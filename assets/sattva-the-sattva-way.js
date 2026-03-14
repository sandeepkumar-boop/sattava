/**
 * Sattva The Sattva Way – image slider prev/next
 */
(function () {
  const section = document.querySelector('.sattva-the-sattva-way');
  if (!section) return;

  const slider = section.querySelector('[data-sattva-way-slider]');
  const prevBtn = section.querySelector('[data-sattva-way-prev]');
  const nextBtn = section.querySelector('[data-sattva-way-next]');
  const slides = section.querySelectorAll('[data-sattva-way-slide]');
  const dots = section.querySelectorAll('[data-sattva-way-dot]');

  if (!slider || slides.length <= 1) return;

  let currentIndex = 0;

  function goTo(index) {
    const len = slides.length;
    currentIndex = ((index % len) + len) % len;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === currentIndex);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goTo(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo(currentIndex + 1);
    });
  }
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var index = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(index)) goTo(index);
    });
  });
})();
