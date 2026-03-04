(function () {
	const productMarkers = (section) => {
		if (document.currentScript) {
			parent = document.currentScript.parentElement;
		}
		else {
			parent = section;
		}

		if (!parent) return;

		parent.querySelectorAll('.js-product-markers__item').forEach(item => {
			if (item.dataset.handlerAdded === 'true') return;
			item.dataset.handlerAdded = 'true'; 

			item.addEventListener('click', (e) => {
				if (!e.target.closest('.quick-add') && !e.target.closest('.product-parameters')) {
					const index = item.dataset.index;
					item.classList.toggle('active');

					const mobileMarkers = parent.querySelectorAll('.product-markers-for-mobile .product-markers__item-inner');
					mobileMarkers.forEach(elem => {
						elem.classList.remove('active');
						if (elem.dataset.index == index) {
							elem.classList.add('active');
						}
					});

					const mobileContainer = parent.querySelector('.product-markers-for-mobile');
					if (mobileContainer) {
						mobileContainer.classList.add('active');
					}
				}
			});
		});
	};

	document.addEventListener('click', (e) => {
		const markers = document.querySelectorAll('.js-product-markers__item');
		const parentClicked = e.target.closest('.js-product-markers__item');

		markers.forEach(marker => {
			if (parentClicked !== marker && !e.target.closest('.product-parameters')) {
				marker.classList.remove('active');
			}
		});
	});

	productMarkers();

	document.addEventListener("shopify:section:load", (event) => {
		const section = event.detail?.section || event.target;
		productMarkers(section);
	});
})();
