(function () {
	const initLookbook = () => {
		gsap.registerPlugin(ScrollTrigger);
		const slidesAll =
			document.currentScript.parentElement.querySelectorAll(".lookbook__slide");
		const thisWrapper =
			document.currentScript.parentElement.querySelector(".lookbook__wrapper");
		const thisPin =
			document.currentScript.parentElement.querySelector(".lookbook__slides");

		ScrollTrigger.matchMedia({
			"(min-width: 991px)": function () {
				const slides = gsap.utils.toArray(slidesAll);
				let maxWidth = 0;

				slides.forEach((slide) => {
					maxWidth += slide.offsetWidth;
				});

				gsap.to(slides, {
					x: () => `-${maxWidth - window.innerWidth / 1.03}`,
					ease: "linear",
					scrollTrigger: {
						trigger: thisWrapper,
						pin: thisPin,
						scrub: 1,
						start: () => "top top",
						end: () => `+=${maxWidth / 2}`,
					},
				});
			},
		});
	};

	const resizeLookbook = () => {
		const lookbookSections = document.querySelectorAll(".section-lookbook");
		const lookbookSwipers = document.querySelectorAll(".lookbook__swiper");

		const sectionResizeObserver = new ResizeObserver((entries) => {
			requestAnimationFrame(() => {
				const [entry] = entries;

				if (entry.contentRect.width < 990) {
					// for mobile 100vh viewport
					let vh = window.innerHeight * 0.01;
					document.documentElement.style.setProperty("--vh", `${vh}px`);
					//

					lookbookSwipers.forEach((slider) => {
						if (!slider?.swiper) {
							const enableAutoHeight = slider.dataset.autoheight === "true";

							slider
								.querySelector(".lookbook__slides")
								.classList.add("swiper-wrapper");
							slider
								.querySelectorAll(".lookbook__slide")
								.forEach((slide) => slide.classList.add("swiper-slide"));

							const lookbookSwiper = new Swiper(slider, {
								autoHeight: enableAutoHeight,
								slidesPerView: enableAutoHeight ? 1 : "auto",
								loop: false,
								freeMode: {
									enabled: !enableAutoHeight,
									momentum: true,
								},
								initialSlide: 0
							});
						}
					});
				} else {
					// for mobile 100vh viewport
					let vh = window.innerHeight * 0.01;
					document.documentElement.style.setProperty("--vh", `${vh}px`);
					//

					lookbookSwipers.forEach((slider) => {
						slider.swiper?.destroy(true, true);
						slider
							.querySelector(".lookbook__slides")
							.classList.remove("swiper-wrapper");
						slider
							.querySelectorAll(".lookbook__slide")
							.forEach((slide) => slide.classList.remove("swiper-slide"));
					});
				}
			})
		});

		lookbookSections.forEach(section => {
			sectionResizeObserver.observe(section);
		});
	};

	const controlsVideo = () => {
		const buttonsPlay = document.querySelectorAll('.js-slide-play-video')
		const buttonsSound = document.querySelectorAll('.js-slide-sound-video')

		buttonsPlay.forEach((button) => {
			button.onclick = () => {
				if (
					button.previousElementSibling.classList.contains(
						'lookbook__slide_show__video'
					)
				) {
					const video = button.previousElementSibling.querySelector('video')
					if (video) {
						if (video.paused) {
							setTimeout(() => {
								video.play()
							}, 10)
						} else {
							setTimeout(() => {
								video.pause()
							}, 10)
						}
						button.classList.toggle('active')
					}

					const videoUrl = button.previousElementSibling.querySelector('iframe')
					if (videoUrl) {
						if (videoUrl.classList.contains('video-pause')) {
							if (videoUrl.classList.contains('js-vimeo')) {
								videoUrl.contentWindow.postMessage('{"method":"play"}', '*')
								if (videoUrl.classList.contains('video-muted')) {
									videoUrl.contentWindow.postMessage(
										'{"method":"setVolume", "value":0}',
										'*'
									)
								} else {
									videoUrl.contentWindow.postMessage(
										'{"method":"setVolume", "value":1}',
										'*'
									)
								}
								videoUrl.classList.add('video-play')
								videoUrl.classList.remove('video-pause')
							}
						} else {
							if (videoUrl.classList.contains('js-slide-vimeo')) {
								videoUrl.contentWindow.postMessage('{"method":"pause"}', '*')
								videoUrl.classList.add('video-pause')
								videoUrl.classList.remove('video-play')
							}
						}
						button.classList.toggle('active')
					}
				}
			}
		})

		buttonsSound.forEach((button) => {
			button.onclick = () => {
				if (
					button.previousElementSibling.classList.contains(
						'lookbook__slide_show__video'
					) ||
					button.previousElementSibling.previousElementSibling.classList.contains(
						'lookbook__slide_show__video'
					)
				) {
					const video =
						button.previousElementSibling.querySelector('video') ||
						button.previousElementSibling.previousElementSibling.querySelector(
							'video'
						)
					if (video) {
						if (video.muted) {
							setTimeout(() => {
								video.muted = false
							}, 10)
						} else {
							setTimeout(() => {
								video.muted = true
							}, 10)
						}
						button.classList.toggle('active')
					}

					const videoUrl =
						button.previousElementSibling.querySelector('iframe') ||
						button.previousElementSibling.previousElementSibling.querySelector(
							'iframe'
						)
					if (videoUrl) {
						if (videoUrl.classList.contains('video-muted')) {
							if (videoUrl.classList.contains('js-vimeo')) {
								videoUrl.contentWindow.postMessage(
									'{"method":"setVolume", "value":1}',
									'*'
								)
								videoUrl.classList.remove('video-muted')
							}
						} else {
							if (videoUrl.classList.contains('js-vimeo')) {
								videoUrl.contentWindow.postMessage(
									'{"method":"setVolume", "value":0}',
									'*'
								)
								videoUrl.classList.add('video-muted')
							}
						}
						button.classList.toggle('active')
					}
				}
			}
		})
	}

	initLookbook();
	resizeLookbook();

	setTimeout(() => {
		controlsVideo()
	}, 100)

	document.addEventListener("shopify:section:load", function (event) {
		const section = event.detail?.section || event.target;
		initLookbook();
		resizeLookbook();
		controlsVideo()
	});
	
	document.addEventListener("shopify:section:reorder", function () {
		initLookbook();
		resizeLookbook();
		controlsVideo()
	});
	
})();
