/*
	Strata by HTML5 UP - Modifié avec pop-up améliorée et carrousel
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {
			parallax: true,
			parallaxFactor: 50
		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {
			$body.addClass('is-touch');
			window.setTimeout(function() {
				$window.scrollTop($window.scrollTop() + 1);
			}, 0);
		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header - Parallax background.
		if (browser.name == 'ie' || browser.mobile)
			settings.parallax = false;

		if (settings.parallax) {
			breakpoints.on('<=medium', function() {
				$window.off('scroll.strata_parallax');
				$header.css('background-position', '');
			});

			breakpoints.on('>medium', function() {
				$header.css('background-position', 'left 0px');
				$window.on('scroll.strata_parallax', function() {
					$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
				});
			});

			$window.on('load', function() {
				$window.triggerHandler('scroll');
			});
		}
		// Header - Parallax scroll.
		$(window).on('scroll', function() {
			var scrollTop = $(this).scrollTop();
			$('#header .inner').css({
				transform: 'translateY(-' + scrollTop * 0.4 + 'px)'
			});
		});


	// Fonction pour initialiser un carrousel
		function initCarousel($carousel) {
			var $slides = $carousel.find('.carousel-slide');
			var $indicators = $carousel.find('.carousel-indicator');
			var currentSlide = 0;
			var totalSlides = $slides.length;

			if (totalSlides <= 1) return; // Pas besoin de carrousel pour 1 image

			function showSlide(index) {
				$slides.removeClass('active');
				$indicators.removeClass('active');
				$slides.eq(index).addClass('active');
				$indicators.eq(index).addClass('active');
			}

			function nextSlide() {
				currentSlide = (currentSlide + 1) % totalSlides;
				showSlide(currentSlide);
			}

			function prevSlide() {
				currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
				showSlide(currentSlide);
			}

			// Navigation par boutons
			$carousel.find('.carousel-prev').on('click', function(e) {
				e.preventDefault();
				prevSlide();
			});

			$carousel.find('.carousel-next').on('click', function(e) {
				e.preventDefault();
				nextSlide();
			});

			// Navigation par indicateurs
			$indicators.on('click', function() {
				currentSlide = $(this).index();
				showSlide(currentSlide);
			});

			// Navigation clavier
			$(document).on('keydown', function(e) {
				if ($carousel.closest('.popup-overlay').is(':visible')) {
					if (e.key === 'ArrowLeft') prevSlide();
					if (e.key === 'ArrowRight') nextSlide();
				}
			});

			// Swipe pour mobile
			var touchStartX = 0;
			var touchEndX = 0;

			$carousel.on('touchstart', function(e) {
				touchStartX = e.changedTouches[0].screenX;
			});

			$carousel.on('touchend', function(e) {
				touchEndX = e.changedTouches[0].screenX;
				if (touchStartX - touchEndX > 50) nextSlide();
				if (touchEndX - touchStartX > 50) prevSlide();
			});
		}

	// Pop-up améliorée type page
		function createEnhancedPopup() {
			// Créer l'overlay
			var $overlay = $('<div>', {
				class: 'popup-overlay',
				css: {
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.9)',
					zIndex: 10000,
					display: 'none',
					overflowY: 'auto'
				}
			});

			// Créer le conteneur de la pop-up
			var $popup = $('<div>', {
				class: 'popup-container',
				css: {
					position: 'relative',
					maxWidth: '900px',
					margin: '50px auto',
					backgroundColor: '#fff',
					borderRadius: '8px',
					boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
					animation: 'popupSlideIn 0.4s ease-out'
				}
			});

			// Bouton de fermeture
			var $closeBtn = $('<button>', {
				class: 'popup-close',
				html: '&times;',
				css: {
					position: 'absolute',
					top: '20px',
					right: '20px',
					background: 'none',
					border: 'none',
					fontSize: '40px',
					cursor: 'pointer',
					color: '#333',
					zIndex: 1,
					lineHeight: '30px',
					width: '40px',
					height: '40px',
					padding: 0
				}
			});

			// Conteneur du contenu
			var $content = $('<div>', {
				class: 'popup-content',
				css: {
					padding: '60px 50px 50px'
				}
			});

			// Assemblage
			$popup.append($closeBtn, $content);
			$overlay.append($popup);
			$body.append($overlay);

			// Styles CSS pour pop-up et carrousel
			if (!$('#popup-animation-style').length) {
				$('<style id="popup-animation-style">').appendTo('head');
			}

			// Événements de fermeture
			$closeBtn.on('click', function() {
				$overlay.fadeOut(300);
			});

			$overlay.on('click', function(e) {
				if ($(e.target).hasClass('popup-overlay')) {
					$overlay.fadeOut(300);
				}
			});

			$(document).on('keydown', function(e) {
				if (e.key === 'Escape' && $overlay.is(':visible')) {
					$overlay.fadeOut(300);
				}
			});

			return { overlay: $overlay, content: $content };
		}

	// Initialisation de la pop-up
		$window.on('load', function() {
			var popup = createEnhancedPopup();

			// Gestion des clics sur les éléments avec classe popup-trigger
			$(document).on('click', '.popup-trigger', function(e) {
				e.preventDefault();
				
				var $this = $(this);
				var popupId = $this.attr('data-popup-id');
				var content = '';

				// Méthode 1 : Contenu depuis un div caché (recommandé)
				if (popupId) {
					var $popupData = $('#' + popupId);
					if ($popupData.length) {
						content = $popupData.html();
					}
				}
				// Méthode 2 : Contenu depuis les attributs data
				else if ($this.attr('data-popup-content')) {
					var title = $this.attr('data-popup-title') || '';
					var images = $this.attr('data-popup-images') || '';
					var textContent = $this.attr('data-popup-content') || '';
					
					content = '';
					if (title) {
						content += '<h1>' + title + '</h1>';
					}
					if (images) {
						var imageArray = images.split(',');
						imageArray.forEach(function(img) {
							content += '<img src="' + img.trim() + '" alt="">';
						});
					}
					content += textContent;
				}
				// Méthode 3 : Compatibilité avec l'ancien système (work-item)
				else {
					var $workItem = $this.closest('.work-item');
					var imgSrc = $this.attr('href');
					var title = $workItem.find('h3').text();
					var description = $workItem.find('p').text() || '';

					content = '<h1>' + title + '</h1>';
					if (imgSrc && imgSrc !== '#') {
						content += '<img src="' + imgSrc + '" alt="' + title + '">';
					}
					if (description) {
						content += '<p>' + description + '</p>';
					}
				}

				if (content) {
					popup.content.html(content);
					popup.overlay.fadeIn(300);
					
					// Initialiser tous les carrousels dans la pop-up
					popup.content.find('.carousel').each(function() {
						initCarousel($(this));
					});
				}
			});
		});

})(jQuery);