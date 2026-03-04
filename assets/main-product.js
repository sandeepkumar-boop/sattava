(function () {
  const initProductAccordion = () => {
		$(".about__accordion-toggle").click(function () {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active");
				$(this)
					.siblings(".about__accordion-description")
					.eq($(this).index())
					.stop()
					.slideDown(300);
			} else {
				$(this).removeClass("active");
				$(this).siblings(".about__accordion-description").stop().slideUp(300);
			}
		});
  };

  const initCustomCursor = () => {
    // Create custom cursor element
    let cursor = document.querySelector('.product-zoom-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'product-zoom-cursor';
      document.body.appendChild(cursor);
    }

    // Get all zoom trigger elements
    const zoomTriggers = document.querySelectorAll('.product__media-toggle, .product-media-modal__content');

    // Mouse move handler
    const moveCursor = (e) => {
      cursor.style.left = e.clientX - 24 + 'px'; // Center the 48px cursor
      cursor.style.top = e.clientY - 24 + 'px';
    };

    // Add event listeners to zoom triggers
    zoomTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        document.addEventListener('mousemove', moveCursor);
      });

      trigger.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        document.removeEventListener('mousemove', moveCursor);
      });
    });
  };

  const initZoomImage = () => {
    const imagesWrapper = document.querySelector('.product-media-modal__content');
    if (!imagesWrapper) return;
    
    const images = imagesWrapper.querySelectorAll('.js-image-zoom');

    images.forEach(el => {
      el.addEventListener('click', (e) => {
        imagesWrapper.classList.toggle('zoom');
      });
    })
  };

  document.addEventListener('shopify:section:load', function () {
    initProductAccordion();
    initZoomImage();
    initCustomCursor();
  });

  initProductAccordion();
  initZoomImage();
  initCustomCursor();
})();
