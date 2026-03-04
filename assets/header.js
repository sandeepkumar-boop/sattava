;(function () {
	const initMegaSubmenu = (header) => {
		const megaSubmenuLinks = header.querySelectorAll(
			'.list-menu--megasubmenu'
		)
		if (!megaSubmenuLinks || !megaSubmenuLinks.length) return
		megaSubmenuLinks.forEach((link) => {
			const tabs = link.querySelectorAll('.mega-submenu__tab')
			const submenus = link.querySelectorAll('.mega-submenu__submenu')
			const onToggle = (event) => {
				const tab = event.target
				if (!tab || !tab.classList.contains('mega-submenu__tab')) return
				const tabId = tab.dataset.tabId
				tabs.forEach((tab) => {
					tab.classList.remove('active')
				})
				tab.classList.add('active')
				submenus.forEach((submenu) => {
					submenu.classList.remove('active')
					if (submenu.dataset.tabId === tabId) {
						submenu.classList.add('active')
					}
				})
			}
			tabs.forEach((tab) => {
				tab.addEventListener('click', onToggle)
				tab.addEventListener('mouseenter', onToggle)
			})
		})
	}

	const header = () => {
		const header = document.querySelector('.shopify-section-header')
		const menu = document.querySelector('.list-menu--inline')
		const menuLinks = document.querySelectorAll('.list-menu-item')
		const search = document.querySelector('.header__search')

		header.addEventListener('keydown', (e) => {
			if (e.code === 'Escape' && search.isOpen) {
				search.close()
			}
		})

		let vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)

		const annBar = document.querySelector('.section-announcement')
		const annBarObserver = new IntersectionObserver((entries) => {
			const [entry] = entries

			if (entry.isIntersecting) {
				document.documentElement.style.setProperty(
					'--ann-height',
					`${entry.intersectionRect.height}px`,
				)
			} else {
				document.documentElement.style.setProperty('--ann-height', `0px`)
			}
		})
		if (annBar) annBarObserver.observe(annBar)

		menuLinks.forEach((link) => {
			link.addEventListener('mouseenter', (e) => {
				if (link.classList.contains('list-menu--megamenu')) {
					if (link.classList.contains('list-menu--tabs')) {
						const megaMenu = link.querySelector('.mega-menu') || link.querySelector('.mega-submenu');
						const headerMain = header.querySelector('.header')
						if (!megaMenu || !headerMain) return
						const linkPosition = link.getBoundingClientRect().x
						megaMenu.style.left = `${linkPosition}px`
					}
					link.classList.add('list-menu--megamenu-visible')
					if (
						header.classList.contains('color-background-3') &&
						!header.classList.contains('shopify-section-header-sticky')
					) {
						header.classList.remove('color-background-3')
					}

					menuLinks.forEach((el) => {
						if (el !== link) {
							el.classList.remove('list-menu--megamenu-visible')
						}
					})
				} else {
					menuLinks.forEach((el) => {
						el.classList.remove('list-menu--megamenu-visible')
					})
				}
			})
		})
		menu.addEventListener('mouseleave', (e) => {
			menuLinks.forEach((link) => {
				link.classList.remove('list-menu--megamenu-visible')
			})
		})

		document.body.addEventListener('mousedown', function () {
			document.body.classList.add('mouse-focus')
		})

		document.body.addEventListener('keydown', function (e) {
			if (e.key === 'Tab') {
				document.body.classList.remove('mouse-focus')
			}
		})

		const addBackground = () => {
			const headerObserver = new ResizeObserver((entries) => {
				const [entry] = entries
				if (entry.contentRect.width >= 1200) {
					if (
						header.classList.contains('color-background-3') &&
						!header.classList.contains('shopify-section-header-sticky')
					) {
						header.classList.remove('color-background-3')
					}
				}
			})

			headerObserver.observe(header)
		}

		const removeBackground = () => {
			const headerObserver = new ResizeObserver((entries) => {
				const [entry] = entries
				if (entry.contentRect.width >= 1200) {
					if (
						header.classList.contains('color-background-1') &&
						!header.classList.contains('shopify-section-header-sticky')
					) {
						header.classList.add('color-background-3')
					}
				}
			})

			headerObserver.observe(header)
		}

		header.addEventListener('mouseenter', addBackground)

		header.addEventListener('focus', addBackground)

		header.addEventListener('focusin', addBackground)

		header.addEventListener('mouseleave', removeBackground)

		header.addEventListener('focusout', removeBackground)

		const megaMenuListLinks = () => {
			const megaMenuLinkWithSubmenu = document.querySelector('.mega-menu__list-item--children')
			const megaMenuLinks = document.querySelectorAll('.mega-menu__list-item')
			if (megaMenuLinkWithSubmenu) {
				megaMenuLinks.forEach((link) => {
					link.classList.add('mega-menu__list-item--opacity')
				})
				megaMenuLinkWithSubmenu.classList.remove('mega-menu__list-item--opacity')
				megaMenuLinkWithSubmenu.classList.add('mega-menu__list-item--visible')
			}
			$('.mega-menu__list-item').mouseenter(function (event) {
				if (megaMenuLinkWithSubmenu) {
					megaMenuLinkWithSubmenu.classList.remove('mega-menu__list-item--visible')
				}
				$(this).removeClass('mega-menu__list-item--opacity')
				$(this).siblings().addClass('mega-menu__list-item--opacity')
				$(this).mouseleave(() => {
					$(this).siblings().removeClass('mega-menu__list-item--opacity')
				})
			})
			$('.mega-menu__list-item').focus(function (event) {
				if (megaMenuLinkWithSubmenu) {
					megaMenuLinkWithSubmenu.classList.remove('mega-menu__list-item--visible')
				}
				$(this).removeClass('mega-menu__list-item--opacity')
				$(this).siblings().addClass('mega-menu__list-item--opacity')
				$(this).mouseleave(() => {
					$(this).siblings().removeClass('mega-menu__list-item--opacity')
				})
			})
		}

		const megaMenuSublinks = () => {
			$('.mega-menu--list .mega-menu__submenu-item').mouseenter(function (event) {
				$(this).removeClass('mega-menu__submenu-item--opacity')
				$(this)
					.parent()
					.siblings()
					.find('.mega-menu__submenu-item')
					.addClass('mega-menu__submenu-item--opacity')
				$(this).mouseleave(() => {
					$(this)
						.parent()
						.siblings()
						.find('.mega-menu__submenu-item')
						.removeClass('mega-menu__submenu-item--opacity')
				})
			})
			$('.mega-menu--list .mega-menu__submenu-item').focusin(function (event) {
				$(this).removeClass('mega-menu__submenu-item--opacity')
				$(this)
					.parent()
					.siblings()
					.find('.mega-menu__submenu-item')
					.addClass('mega-menu__submenu-item--opacity')
				$(this).focusout(() => {
					$(this)
						.parent()
						.siblings()
						.find('.mega-menu__submenu-item')
						.removeClass('mega-menu__submenu-item--opacity')
				})
			})
		}

		const megaMenuTabs = () => {
			$('.mega-menu__tab-wrapper')
				.children()
				.find('.mega-menu__tab-wrapper')
				.first()
				.addClass('mega-menu__tab-wrapper--active')
			$('.mega-menu__tab-wrapper').mouseenter(function (event) {
				$('.mega-menu__tab-wrapper').removeClass('mega-menu__tab-wrapper--active')
				$(this).addClass('mega-menu__tab-wrapper--active')
			})
			$('.mega-menu__tab-wrapper').focus(function (event) {
				$('.mega-menu__tab-wrapper').removeClass('mega-menu__tab-wrapper--active')
				$(this).addClass('mega-menu__tab-wrapper--active')
			})
			$('.mega-menu__tab-wrapper').focusin(function (event) {
				$('.mega-menu__tab-wrapper').removeClass('mega-menu__tab-wrapper--active')
				$(this).addClass('mega-menu__tab-wrapper--active')
			})
		}

		megaMenuListLinks()
		megaMenuSublinks()
		megaMenuTabs()

		const main = document.querySelector('main')
		const breadcrumbs = document.querySelector('.breadcrumbs-wrapper')
		if (
			main.querySelectorAll('.shopify-section')[0]?.classList.contains('section--has-overlay') &&
			!main.querySelectorAll('.shopify-section')[0]?.classList.contains('not-margin')
		) {
			header.classList.add('color-background-1', 'color-background-3')
			if (breadcrumbs) {
				breadcrumbs.classList.add('color-background-3')
			}
		}

		initMegaSubmenu(header);
	}

	header()

	document.addEventListener('shopify:section:load', header)
	document.addEventListener('shopify:section:unload', header)
	document.addEventListener('shopify:section:reorder', header)
})()
