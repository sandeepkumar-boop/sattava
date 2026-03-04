class Countdown extends HTMLElement {
	constructor() {
		super();
		this.userDate = this.getAttribute("data-date");
		this.userTime = this.getAttribute("data-time");
		this.mockTimer = this.getAttribute("data-mock-timer") === "true";
		this.interval;
		this.setInterval(this.userDate, this.userTime);
		this.initSection();
	}

	onInit(userDate, userTime) {
		this.completedCountdown = this.getAttribute("data-completed");
		this.countdown = this.querySelector(".countdown__main");
		this.countdownHeading = this.querySelector(".countdown__end-info");
		this.daysEl = this.querySelector(".countdown_block_days");
		this.hoursEl = this.querySelector(".countdown_block_hours");
		this.minutesEl = this.querySelector(".countdown_block_minutes");
		this.secondsEl = this.querySelector(".countdown_block_seconds");
		this.section = this.closest(".countdown-section");
		
		// ----------------------------------------------------------------
		const countdownDate = new Date(`${userDate}T${userTime}`);
		const now = new Date();
		const distance = countdownDate.getTime() - now.getTime();
		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		);
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);
		// ----------------------------------------------------------------
		if (distance < 0 && this.completedCountdown === "hide_section") {
			clearInterval(this.interval);
			this.section.style.display = "none";
		} else if (distance < 0 && this.completedCountdown === "show_text") {
			this.countdown.style.display = "none";
			this.countdownHeading.style.display = "flex";
		} else {
			this.daysEl.textContent = days < 10 ? "0" + days : days;
			this.hoursEl.textContent = hours < 10 ? "0" + hours : hours;
			this.minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
			this.secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
		}
	}

	setInterval(userDate, userTime) {
		clearInterval(this.interval);
		
		// Calculate target date/time for mock timer
		let targetDate = userDate;
		let targetTime = userTime;
		
		if (this.mockTimer) {
			// Calculate 2 days and 3 hours from now
			const d = new Date();
			d.setDate(d.getDate() + 2);
			d.setHours(d.getHours() + 3);

			const year = d.getFullYear();
			const m = d.getMonth() + 1;
			const month = m < 10 ? "0" + m : m;
			const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
			const hourss = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
			const minutess = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

			targetDate = year + "-" + month + "-" + day;
			targetTime = hourss + ":" + minutess;
		}
		
		this.interval = setInterval(
			this.onInit.bind(this, targetDate, targetTime),
			1000,
		);
	}

	playVideo(section) {
		const video = section.querySelector("video");

		if (video) {
			video.play();
		}
	}

	stopVideo(section) {
		const video = section.querySelector("video");

		if (video) {
			video.pause();
		}
	}

	initSection() {
		const sections = document.querySelectorAll(".countdown-section");

		const sectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) this.playVideo(entry.target);
				else this.stopVideo(entry.target);
			});
		});

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			this.playVideo(entry.target);
		});

		sections.forEach((section) => {
			sectionObserver.observe(section);
			sectionResizeObserver.observe(section);
		});
	}
}

customElements.define("countdown-timer", Countdown);