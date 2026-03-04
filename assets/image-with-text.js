;(function () {
	const stopVideo = (section) => {
		const videos = section.querySelectorAll('video')
		const buttonsPlay = section.querySelectorAll('.js-play-video-img-text')

		if (videos.length > 0) {
			videos.forEach((video) => {
				video.pause()
			})
		}

		if (buttonsPlay.length > 0) {
			buttonsPlay.forEach((btn) => {
				btn.classList.remove('active')
			})
		}
	}

	const playVideo = (section) => {
		const videos = section.querySelectorAll('video')

		if (videos.length > 0) {
			videos.forEach((video) => {
				const button = video.parentElement.querySelector(
					'.js-play-video-img-text'
				)

				if (video.parentElement.classList.contains('autoplay')) {
					video.autoplay = true

					if (button) {
						button.classList.remove('active')
					}
				}

				if (video.autoplay && video.paused) {
					video.play()

					if (button) {
						button.classList.remove('active')
					}
				}
			})
		}
	}

	const controlsVideo = (section) => {
		const buttonsPlay = section.querySelectorAll('.js-play-video-img-text')
		const buttonsSound = section.querySelectorAll('.js-sound-video-img-text')

		buttonsPlay.forEach((button) => {
			button.onclick = () => {
				const video = button.parentElement.querySelector('video')

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
			}
		})

		buttonsSound.forEach((button) => {
			button.onclick = () => {
				const video = button.parentElement.querySelector('video')

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
			}
		})
	}

	const initSection = () => {
		const sections = document.querySelectorAll('.image-with-text-section')

		const sectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) playVideo(entry.target)
				else stopVideo(entry.target)
			})
		})

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries
			playVideo(entry.target)
		})

		sections.forEach((section) => {
			sectionObserver.observe(section)
			sectionResizeObserver.observe(section)
			controlsVideo(section)
		})
	}

	initSection()

	document.addEventListener('shopify:section:load', function () {
		initSection()
	})
})()
