$(function() {

  // Scroller

  $('nav a[href^=#]').on('click', function(event) {
    event.preventDefault();
    var $elementTarget = $(this).attr('href'),
      $destination = $($elementTarget).offset().top - headerHeight;

    $('body, html').animate({scrollTop: $destination}, 300, 'easeInExpo');
  });

  // Keep the rhythm

  $(window).load(function() {
    if ( $(window).width() >= 769) {
      $('.team__photo img, iframe').keepTheRhythm({ baseline: 24 });
    }
    if ( $(window).width() >= 481 ) {
      $('.team__photo img, iframe').keepTheRhythm({ baseline: 21 });
    }
    if ( $(window).width() <=479 ) {
      $('.team__photo img, iframe').keepTheRhythm({ baseline: 18 });
    }
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

  $slideTitle.first().addClass('fadeInUpBig');
  $slideDesc.first().addClass('fadeInUpBig');

  // Animation slide title

  var titleEffectIn = 'fadeInUpBig',
    titleEffectOut = 'fadeOutUpBig';


  var glide = $slider.glide({
    arrows: true,
    arrowRightText: '<i class="icon-angle-right">',
    arrowLeftText: '<i class="icon-angle-left">',
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
    //  glide.pause();
    //  console.log('слайдер остановлен!');
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
    var $elements = $(this).find('.animated');

    $elements.each(function() {
      $(this).toggleClass( $(this).attr('data-animate') );
    });

  }, {
   offset: '75%' // bottom-in-view
  });



  // $( '.animation-wrapper' ).each( function(i) {
  //   var $el = $( this ).find('.animated'),
  //     animationClass = $el.attr( 'data-animate' );

  //   $( this ).waypoint( function( direction ) {
  //     if( direction === 'down' ) {
  //       $el.addClass(animationClass);
  //     }
  //     else if( direction === 'up' ){
  //       $el.removeClass(animationClass);
  //     }
  //   }, { offset: '70%' } );

  // });

  // Isotope

  $('.portfolio').isotope({
    animationEngine : 'best-available',
    itemSelector : '.portfolio__thumbnail',
    layoutMode : 'fitRows'
  });


  // Project Filtering

  projectFilterInit();

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


  // Flickr photo stream

  loadPhotos();

  function loadPhotos(){

    var apiKey = '4b62f98647a658548e63b8727b6f57a1',
      flickrMethod = 'flickr.interestingness.getList',
      photoCount = '16',
      extras = 'url_q';

    $.ajax({
      url:'https://www.flickr.com/services/rest/?method='+flickrMethod+
      '&format=json&api_key='+apiKey+
      '&extras='+extras+
      '&per_page='+photoCount,
      dataType: "jsonp"
    });
  }

});

function jsonFlickrApi(data) {
  $.each(data.photos.photo, function(i,photo){
    var imageTag = $('<img>');
    imageTag.attr('src', photo.url_q).addClass('widget__img');
    $('.js-flickr').append(imageTag);
  });
}