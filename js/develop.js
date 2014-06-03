$(function() {

	// Scroller

	$('nav a[href^=#]').on('click', function(event) {
		event.preventDefault();
		var elementTarget = $(this).attr('href');
		var destination = $(elementTarget).offset().top - headerHeight;

		$('body, html').animate({scrollTop: destination}, 300, 'easeInExpo');
	});


	// Glide

	var $slider = $('.slider'),
		headerHeight = $('.header').height(),
		sliderHeight = $(window).height() - headerHeight,
		sliderMarginBottom = Math.ceil(sliderHeight/24)*24 - sliderHeight;

	$slider.css({
		// 'margin-bottom': sliderMarginBottom,
		'height': sliderHeight + sliderMarginBottom
	});

	$(window).on('resize', function(event) {
		var headerHeight = $('.header').height(),
			sliderHeight = $(window).height() - headerHeight,
			sliderMarginBottom = Math.ceil(sliderHeight/24)*24 - sliderHeight;
		$slider.css({
			// 'margin-bottom': sliderMarginBottom,
			'height': sliderHeight + sliderMarginBottom
		});
	});

	var $slideTitle = $('.slide-title'),
		$slideDesc = $('.slide-desc');

	$slideTitle.first().addClass('fade-up-big-in');
	$slideDesc.first().addClass('fade-up-big-in');

	// Animation slide title

	var titleEffectIn = 'fade-up-big-in',
		titleEffectOut = 'fade-up-big-out';


	var glide = $slider.glide({
		arrows: true,
		arrowRightText: '<i class="fa fa-angle-right">', // fontawesome
		arrowLeftText: '<i class="fa fa-angle-left">',
		navigation: false,
		autoplay: 5000,
		circular: false,
		beforeTransition: function() {
			$slideTitle.eq(-this.currentSlide).removeClass( titleEffectIn ).addClass( titleEffectOut );
			$slideDesc.eq(-this.currentSlide).removeClass( titleEffectIn ).addClass( titleEffectOut );

		},
		afterTransition: function() {
			$slideTitle.eq(-this.currentSlide).removeClass( titleEffectOut ).addClass( titleEffectIn );
			$slideDesc.eq(-this.currentSlide).removeClass( titleEffectOut ).addClass( titleEffectIn );
		}
	}).data('api_glide');


	// Performance animation

	var body = document.body,
		timer;

	$(window).on('scroll', function() {

		glide.pause(); // Пауза во время скролла

		var stopSlider = $('#services').offset().top;

		// if (window.scrollY + headerHeight >= stopSlider) {
		// 	glide.pause();
		// 	console.log('слайдер остановлен!');
		// }

		clearTimeout(timer);

		if(!body.classList.contains('disable-hover')) {
			body.classList.add('disable-hover')
		}

		timer = setTimeout(function(){
			body.classList.remove('disable-hover');
			glide.play();
		}, 500);

	});


	// Animation

	$('.animation-wrapper').waypoint(function() {
		$(this).find('.animated').addClass('running');
	}, {
		offset: '85%'
	});



	// Isotope

	$('.portfolio').isotope({
		animationEngine : 'best-available',
		itemSelector : '.portfolio__thumbnail',
		layoutMode : 'fitRows'
	})


	// Project Filtering

	function projectFilterInit() {

		$('#filter a').on('click', function(){
			var selector = $(this).attr('data-filter');
			var container = $('.portfolio');

			container.isotope({
				filter: selector
			});

			if (!$(this).hasClass('selected') ) {
				$(this).parents('#filter').find('.selected').removeClass('selected');
				$(this).addClass('selected');
			}

			return false;
		});
	}

	projectFilterInit();

	// Portfolio

	$('.portfolio__thumbnail').hover(function() {
		$(this).find('figcaption').addClass('bounce-in');
	}, function() {
		$(this).find('figcaption').removeClass('bounce-in');
	});


});