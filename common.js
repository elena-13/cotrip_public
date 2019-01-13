const MAP_API_KEY = 'AIzaSyDJKV-zIWNktVr4BbXSA4UFf9vO8q81onw';

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function initMap(centerPosition) {
  let coordinates = { lat: 47.5172007, lng: 30.76171875 };
  if (centerPosition) {
    coordinates = centerPosition;
  }
  const popupContent = $('.marker-content').html(),
    markerImage = '/img/map-marker.png',
    markerImageHover = '/img/map-marker_hover.png',
    mapWindowWidth = $('#map').width(),
    mapWindowHeight = $('#map').height(),
    k = mapWindowHeight / mapWindowWidth,
    realWidth = Math.sqrt(100 / (k * k + 1)),
    zoom = getBaseLog(2, 12756.2 / realWidth),

    map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      zoom,
      disableDefaultUI: true,
    }),
    marker = new google.maps.Marker({
      position: coordinates,
      map,
      icon: markerImage,
    }),
    infowindow = new google.maps.InfoWindow({
      content: popupContent,
    }),
    smallMap = new google.maps.Map(document.getElementById('small-map'), {
      center: coordinates,
      zoom,
      disableDefaultUI: true,
    });

  $.getJSON('/js/map-style/map-style.json', (data) => {
    map.setOptions({ styles: data });
  });

  $.getJSON('/js/map-style/map-style.json', (data) => {
    smallMap.setOptions({ styles: data });
  });

  google.maps.event.addListener(infowindow, 'closeclick', () => {
    marker.setAnimation(google.maps.Animation.DROP);
    marker.icon = markerImage;
  });
  marker.addListener('click', () => {
    marker.icon = markerImageHover;
    marker.setAnimation(null);
  });

  marker.addListener('click', () => {
    const iwOuter = $('.gm-style-iw');
    const iwBackground = iwOuter.prev();
    const iwCloseBtn = iwOuter.next();
    infowindow.open(map, marker);
    iwBackground.children(':nth-child(2)').css({ 'display': 'none' });
    iwBackground.children(':nth-child(4)').css({ 'display': 'none' });
    iwBackground.children(':nth-child(1)').attr('style', (i, s) => (s + 'left: 76px !important;'));
    iwBackground.children(':nth-child(3)').attr('style', (i, s) => (s + 'left: 76px !important;'));
    iwBackground.children(':nth-child(3)').find('div').children().css({ 'display': 'none' });
    iwCloseBtn.css({
      opacity: '1',
      right: '40px',
      top: '20px',
    });
  });
}


$(function () {
  /* -----------------------Owl Carousels ------------------------- */
  $('#datepicker').owlCarousel({
    nav: true,
    dots: false,
    navText: ['', "<i class='fa fa-angle-right fa-2x' aria-hidden='true'></i>"],
    items: 19,
    responsiveClass: true,
    responsive: {
      1440: {
        items: 22,
        nav: true,
      },
      1280: {
        items: 19,
        nav: true,
      },
      1024: {
        items: 19,
        nav: true,
      },
      768: {
        items: 19,
        nav: true,
      },
      425: {
        items: 10,
        nav: true,
      },
      375: {
        items: 8,
        nav: true,
      },
      320: {
        items: 7,
        nav: true,
      },
    },
  });

  $('#routs').owlCarousel({
    nav: true,
    lazyLoad: true,
    dots: false,
    navText: ['', "<i class='fa fa-angle-right fa-2x' aria-hidden='true'></i>"],
    items: 4,
    responsiveClass: true,
    responsive: {
      1440: {
        items: 4,
        nav: true,
      },
      1024: {
        items: 4,
        nav: true,
      },
      768: {
        items: 3,
        nav: true,
      },
      425: {
        items: 2,
        nav: true,
      },
      375: {
        items: 1,
        nav: true,
      },
      320: {
        items: 1,
        nav: true,
      },
    },
  });

  $('#routs').on('changed.owl.carousel', (event) => {
    const $currEvent = $($('#routs').find('.owl-item')[parseInt(event.item.index, 10)]);
    const dateId = $($currEvent[0].firstChild).attr('data-idx');
    $('.datepicker-card_active').removeClass('datepicker-card_active');
    $('#' + dateId).children().addClass('datepicker-card_active');
    const indexInCarus = parseInt(dateId.split('-').slice(-1)[0], 10) - 1;
    $('#datepicker').trigger('to.owl.carousel', [indexInCarus]);
  });

  $('#gallery').owlCarousel({
    loop: true,
    items: 1,
    nav: true,
    dots: true,
    navText: ["<i class='fa fa-angle-left fa-2x' aria-hidden='true'></i>", "<i class='fa fa-angle-right fa-2x' aria-hidden='true'></i>"],
  });

  $('.min-gallery-wrapp').owlCarousel({
    items: 5,
    center: true,
    nav: true,
    dots: true,
    navText: ["<i class='fa fa-angle-left fa-2x' aria-hidden='true'></i>", "<i class='fa fa-angle-right fa-2x' aria-hidden='true'></i>"],
    responsiveClass: true,
    responsive: {
      1440: {
        items: 5,
        nav: true,
      },
      1024: {
        items: 5,
        nav: true,
      },
      768: {
        items: 4,
        nav: true,
      },
      425: {
        items: 3,
        nav: true,
      },
      375: {
        items: 3,
        nav: true,
      },
      320: {
        items: 3,
        nav: true,
      },
    },
  });

  $('#video-gallery').owlCarousel({
    items: 1,
    loop: true,
    video: true,
    nav: true,
    dots: true,
    center: true,
    navText: ["<i class='fa fa-angle-left fa-2x' aria-hidden='true'></i>", "<i class='fa fa-angle-right fa-2x' aria-hidden='true'></i>"],
  });

  $('.popup-gallery').magnificPopup({
    delegate: '.owl-item:not(.cloned) a',
    type: 'image',
    removalDelay: 500,
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        this.st.mainClass = this.st.el.attr('data-effect');
      },
    },
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)',
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) { return (`${item.el.attr('title')}<small></small>`); },
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function (element) {
        return element.find('img');
      }
    }
  });

  $('#popular-routs').owlCarousel({
    loop: true,
    items: 5,
    nav: true,
    dots: true,
    navText: ["<i class='fa fa-angle-left fa-2x' aria-hidden='true'></i>", "<i class='fa fa-angle-right fa-2x' aria-hidden='true'></i>"],
    responsiveClass: true,
    responsive: {
      1440: {
        items: 5,
        nav: true,
      },
      1280: {
        items: 5,
        nav: true,
      },
      1024: {
        items: 4,
        nav: true,
      },
      768: {
        items: 3,
        nav: true,
      },
      425: {
        items: 2,
        nav: true,
      },
      375: {
        items: 1,
        nav: true,
      },
      320: {
        items: 1,
        nav: true,
      },
    },
  });

  $('#articles').owlCarousel({
    loop: true,
    items: 4,
    nav: true,
    dots: true,
    navText: ["<i class='fa fa-angle-left fa-2x' aria-hidden='true'></i>", "<i class='fa fa-angle-right fa-2x' aria-hidden='true'></i>"],
    responsiveClass: true,
    responsive: {
      1440: {
        items: 4,
        nav: true,
      },
      1280: {
        items: 4,
        nav: true,
      },
      1024:{
        items: 3,
        nav: true,
      },
      768:{
        items: 2,
        nav:true,
      },
      425: {
        items: 1,
        nav: true,
      },
      375: {
        items: 1,
        nav: true,
      },
      320: {
        items: 1,
        nav: true,
      },
    },
  });
  /* --------------------End Owl Carousels ------------------------- */


  /* -----------------------Modal Window------------------------- */
  // Toggle the visibility of the modal window
  function toggleModal(modal) {
    var state = modal.getAttribute('data-state');
    if (state === 'open') {
      modal.setAttribute('data-state', 'closed');
    } else {
      modal.setAttribute('data-state', 'open');
    }
  }

  // Element Variables
  var modal = document.querySelector('#map-modal');
  var formModal = document.querySelector('#form-modal');
  var bookingModal = document.querySelector('#booking-modal');
  var subscribeModal = document.querySelector('#subscr-modal');


  var toggles = document.querySelectorAll('#map-modal [data-toggle]');
  var formToggles = document.querySelectorAll('#form-modal [data-toggle]');
  var bookingToggles = document.querySelectorAll('#booking-modal [data-toggle]');
  var subscribeToggles = document.querySelectorAll('#subscr-modal [data-toggle]');

  var btnback = document.querySelector('#map-modal .modal__close');
  var formBtnback = document.querySelector('#form-modal .modal__close');
  var bookingBtnback = document.querySelector('#booking-modal .modal__close');
  var subscribeBtnback = document.querySelector('#subscr-modal .modal__close');


  // Assign event handlers to every element with the 'data-toggle' attribute
  for (let i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', () => {
      toggleModal(modal);
    });
  }

  // Prevent a click on the modal window itself from closing it
  if (btnback){
    btnback.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
  // Assign event handlers to every element with the 'data-toggle' attribute
  for (let i = 0; i < formToggles.length; i++) {
    formToggles[i].addEventListener('click', () => {
      toggleModal(formModal);
    });
  }

  // Prevent a click on the modal window itself from closing it
  if (formBtnback){
    formBtnback.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  // Assign event handlers to every element with the 'data-toggle' attribute
  for (let i = 0; i < bookingToggles.length; i++) {
    bookingToggles[i].addEventListener('click', () => {
      toggleModal(bookingModal);
    });
  }

  // Prevent a click on the modal window itself from closing it
  if (bookingBtnback){
    bookingBtnback.addEventListener('click', (event) => {
      event.stopPropagation();
    })
  }

  // Assign event handlers to every element with the 'data-toggle' attribute
  for (let i = 0; i < subscribeToggles.length; i++) {
    subscribeToggles[i].addEventListener('click', () => {
      toggleModal(subscribeModal);
    });
  }

  // Prevent a click on the modal window itself from closing it
  if (subscribeBtnback){
    subscribeBtnback.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
  /* ----------------------End Modal Window------------------------- */


  /* --------------------------Map Search------------------------- */
  $('.map-search').click(function () {

    if ($(this).attr('id') === 'event-map') {
      let lat = parseFloat($(this).attr('data-lat'));
      let lng = parseFloat($(this).attr('data-lng'));
      initMap({lat: lat, lng: lng});
    } else {
      updateMap();
    }
    toggleModal(modal);
  });

  if ( $('.map-search').attr('id') === 'event-map') {
    let lat = parseFloat( $('.map-search').attr('data-lat'));
    let lng = parseFloat( $('.map-search').attr('data-lng'));

    initMap({lat: lat, lng: lng});
  }

  $('.create-route').click(() => {
    toggleModal(formModal);
  });

  function updateMap() {
    let inputVal = '' + $("input[name='meet-place']").val();

    if (inputVal !== '') {
      $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${inputVal}&sensor=false&language=ru&key=${MAP_API_KEY}`,
        type: 'GET',
        dataType: 'json'
      })
        .done((data) => {
          let position = data.results[0].geometry.location;
          initMap(position);
        })
        .fail(() => {
          alert('Error');
        });
    }

  }
  function getPlaceCoords() {
    let lat = parseInt($('.place-map-search').attr('data-lat'), 10),
      lng = parseInt($('.place-map-search').attr('data-lng'), 10);
    return { lat: lat, lng: lng}
  }
  $('.place-map-search').click(() => {
    initMap(getPlaceCoords());
    toggleModal();
  });
  /* -----------------------End Map Search------------------------- */


  /* ------------------------Calendar------------------------ */
  function getCalendarParams(triggerName) {
    return {
      trigger: triggerName,
      width: 280,
      height: 280,
      zIndex: 100,
      customClass: 'left-aligment',
      weekArray: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      monthArray: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      format: 'dd.mm.yyyy'};
  }
  /* --------------------End Calendar------------------------ */


  /* --------------------Search form desktops/mobile  calendar------------------- */
  let startRange = '' + $("input[name='start-date']").val();
  let endRange = '' + $("input[name='finish-date']").val();
  startRange = startRange.split('.').reverse().join('/');
  endRange = endRange.split('.').reverse().join('/');

  let startDate = $('.start-date-container').calendar(getCalendarParams('#start-search'));
  startDate.calendar("setDate", new Date(startRange));
  let finishDate = $('.finish-date-container').calendar(getCalendarParams('#finish-search'));
  finishDate.calendar("setDate", new Date(endRange));

  $('.start-date-container-mobile').calendar(getCalendarParams('.start-date-mobile'));
  $('.finish-date-container-mobile').calendar(getCalendarParams('.finish-date-mobile'));

  $('.form-start-date-container').calendar(getCalendarParams('.form-start-date'));
  $('.form-finish-date-container').calendar(getCalendarParams('.form-finish-date'));
  /* -----------------End Search form desktops/mobile  calendar------------------- */


  /* --------------------Subscribe modal window calendar------------------- */
  let subscrStartRange = '' + $("input[name='subscr-start-date']").val();
  let subscrEndRange = '' + $("input[name='subscr-finish-date']").val();
  subscrStartRange = subscrStartRange.split(".").reverse().join('/');
  subscrEndRange = subscrEndRange.split(".").reverse().join('/');

  let subscrStartDate = $('.subscr-start-date-container').calendar(getCalendarParams('#subscr-start-search'));
  subscrStartDate.calendar('setDate', new Date(subscrStartRange));
  let subscrEndDate = $('.subscr-finish-date-container').calendar(getCalendarParams('#subscr-finish-search'));
  subscrEndDate.calendar('setDate', new Date(subscrEndRange));
  /* -------------------End Subscribe modal window calendar----------------- */



  /* --------------------Filters for mobile screen on index.html------------------- */

  $('.filter-mobile .filter-mobile__button span').click(() => {
    if ( $('.filter-mobile .filter-mobile__content').hasClass('active') ) {
      $('.filter-mobile .filter-mobile__button ').css('background-color', 'transparent');
      $('.filter-mobile .filter-mobile__content').slideUp();
      $('.filter-mobile .filter-mobile__content').removeClass('active');
    } else {
      $('.filter-mobile .filter-mobile__button ').css('background-color', '#ffd107');
      $('.filter-mobile .filter-mobile__content').slideDown();
      $('.filter-mobile .filter-mobile__content').addClass('active');
    }
  });
  $('.filter-mobile .sorter-mobile__button span').click(() => {

    if ( $('.filter-mobile .sorter-mobile__content').hasClass('active') ) {
      $('.filter-mobile .sorter-mobile__content').slideUp();
      $('.filter-mobile .sorter-mobile__content').css('display', 'flex');
      $('.filter-mobile .sorter-mobile__button ').css('background-color', 'transparent');
      $('.filter-mobile .sorter-mobile__content').removeClass('active');
    } else {
      $('.filter-mobile .sorter-mobile__button ').css('background-color', '#ffd107');
      $('.filter-mobile .sorter-mobile__content').slideDown();
      $('.filter-mobile .sorter-mobile__content').addClass('active');
    }
  });
  /* ----------------End Filters for mobile screen on index.html------------------- */


  /* --------------------------------Select Style---------------------------------- */
  $('.select').each(function (){
    const $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    let placeholder = $this.children('option').eq(0).text();
    $this.after('<div class="select-styled"><div class = "inner_selected">'
      + placeholder +'</div>'
      +'<button class="button remove__btn"  type="button"></button></div>');

    let $styledSelect = $this.next('div.select-styled');
    let $innerSelected = $styledSelect.find('.inner_selected');
    let $button = $styledSelect.find('.remove__btn');

    let $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    $button.click(function (e) {
      e.stopPropagation();
      if ($button.hasClass('active'))
        $button.removeClass('active');
      $('div.select-styled.active').each(() => {
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $this.val("");
      $innerSelected.text(placeholder);
      $styledSelect.removeClass('active');
      $list.hide();

    });
    for (let i = 1; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val(),
        'data-selected': $this.children('option').eq(i)[0].selected
      }).appendTo($list);
    }

    const $listItems = $list.children('li');

    $styledSelect.click(function () {
      $('div.select-styled.active').not(this).each(() => {
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function () {
      $styledSelect.removeClass('active');
      $innerSelected.text($(this).text());
      $this.val($(this).attr('rel'));
      $list.hide();
      if ($button.hasClass('active'))
        return;
      $button.addClass('active')
    });

    $(document).click((e) => {
      if (!$styledSelect.is(e.target) && $styledSelect.has(e.target).length === 0) {
        $styledSelect.removeClass('active');
        $list.hide();
      }
    });
    $listItems.each(function () {
      if ($(this).attr("data-selected") === 'true') {
        $(this).click();
      }
    });

  });
  /* ---------------------------End Select Style---------------------------------- */


  /* ------------------------------FAQ Style------------------------------------- */
  $('.event-QA .event-QA__content .event-QA__question').click(() => {
    let answer = $($(this).next());
    if ( answer.hasClass('active') ) {
      answer.slideUp();
      answer.removeClass('active');
    } else {
      answer.slideDown();
      answer.addClass('active');
    }
  });
  $('.event-QA .event-QA__content .event-QA__answer').click(() => {
    let answer = $(this);
    if ( answer.hasClass('active') ) {
      answer.slideUp();
      answer.removeClass('active');
    } else {
      answer.slideDown();
      answer.addClass('active');
    }
  });
  /* ---------------------------End FAQ Style------------------------------------- */



  /* -------------------------Event cart button "Read more"----------------------- */
  var ReadMore =  function () {

    var target = document.querySelectorAll('.js-read-more');
    var originalArr = [];
    var truncatedArr = [];

    var settings = {
      moreLink: "Читать далее",
      lessLink: "Скрыть",
    };

    return {

      init: function () {
        this.bindEvents();
      },

      bindEvents: function () {
        ReadMore.truncateText();
      },

      countWords: function (str) {
        return str.split(/\s+/).length;
      },

      generateTrimmed: function (str, wordsNum) {
        return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
      },

      truncateText: function () {

        for (let i = 0; i < target.length; i++) {

          var targetContent = target[i].innerHTML;
          var numberOfWords = target[i].dataset.rmWords;

          var trimmedTargetContent = ReadMore.generateTrimmed(targetContent, numberOfWords);
          var targetContentWords = ReadMore.countWords(targetContent);
          originalArr.push(targetContent);
          truncatedArr.push(trimmedTargetContent);

          if (numberOfWords < targetContentWords) {
            target[i].innerHTML = truncatedArr[i];
            var self = i;
            ReadMore.createLink(self)
          }
        }
        ReadMore.handleClick(target);
      },


      createLink: function (index) {
        var linkWrap = document.createElement('span');

        linkWrap.className = 'read-more__link-wrap';

        linkWrap.innerHTML = '<a id="read-more_'
          + index
          + '" class="read-more__link" style="cursor:pointer;">'
          + settings.moreLink
          + '</a>';

        target[index].parentNode.insertBefore(linkWrap, target[index].nextSibling);

      },

      handleClick: function (el) {
        var readMoreLink = document.querySelectorAll('.read-more__link');

        for (let i = 0; i < readMoreLink.length; i++) {

          readMoreLink[i].addEventListener('click', function () {

            var moreLinkID = this.getAttribute('id');
            var index = moreLinkID.split('_')[1];

            el[index].classList.toggle('is-expanded');

            if ( this.getAttribute('data-clicked') !== 'true' ) {
              el[index].innerHTML = originalArr[index];
              this.innerHTML = settings.lessLink;
              this.dataset.clicked = true;
            } else {
              el[index].innerHTML = truncatedArr[index];
              this.innerHTML = settings.moreLink;
              this.dataset.clicked = false;
            }
          });
        }
      },
    }
  }();

  ReadMore.init();

  $('.event-stages .event-stages-rout__link').on('click', function () {

    if ($(this).hasClass('open')) {
      $(this).prev('.event-stages-rout__aditional-descr').removeClass('open');
      $(this).removeClass('open');
      return false;
    } else {
      $(this).prev('.event-stages-rout__aditional-descr').addClass('open');
      $(this).addClass('open');
    }
  });
  /* ----------------------End Event cart button "Read more"--------------------- */


  /* --------------------------------Truncate text------------------------------- */
  function textTruncate(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

  $('.article__content').map((index, item) => {
    item.innerHTML = textTruncate(item.textContent, 125);
  });



  /* ----------------------------------End Truncate text------------------------- */


  /* ----------------------Multiselect on Create Event page--------------------- */
  (function ($) {
    $(function () {
      $('select[multiple]#subjectTypeSelector').multiselect({
        columns: 1,
        texts: {
          placeholder: 'Тематика', // text to use in dummy input
          selectedOptions: 'Тематика ',
        },
        showCheckbox: false,
        maxPlaceholderOpts : 3,
      });
    });
  })(jQuery);
  /* -------------------End Multiselect on Create Event page--------------------- */


  /* ----------------------Validation Register Form--------------------- */
  $('#meter').entropizer({
    target: '#password',
    update: function (data, ui) {
      ui.bar.css({
        'background-color': data.color,
        'width': data.percent + '%'
      });
    }
  });

  jQuery(function ($) {


    $('#search-place').on('click', () => {
      $('input[name=meet-place-code]').val($('input[name=meet-place]').attr('data-id'));
    });


    $('#register').on('submit', () => {
      if ( validateForm() ) { // если есть ошибки возвращает true
        event.preventDefault();
      }
    });

    function validateForm() {
      $('.text-error').remove();


      // Проверка e-mail

      var reg = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
      var el_e = $('#username');
      var v_email = el_e.val() ? false : true;

      if (v_email) {
        el_e.after('<span class="text-error for-email">Поле e-mail обязательно к заполнению</span>');
        $('.for-email').css({top: el_e.position().top + el_e.outerHeight() + 2});
      } else if (!reg.test(el_e.val())) {
        v_email = true;
        el_e.after('<span class="text-error for-email">Вы указали недопустимый e-mail</span>');
        $('.for-email').css({top: el_e.position().top + el_e.outerHeight() + 2});
      }
      $('#username').toggleClass('error', v_email);

      // Проверка паролей

      var el_p1    = $('#password');
      var el_p2    = $('#repeat_password');

      var v_pass1 = el_p1.val() ? false : true;
      var v_pass2 = el_p1.val() ? false : true;

      if ( el_p1.val() !== el_p2.val() ) {
        v_pass1 = true;
        v_pass2 = true;
        el_p1.after('<span class="text-error for-pass1">Пароли не совпадают!</span>');
        $('.for-pass1').css({ top: el_p1.position().top + el_p1.outerHeight() + 5 });
      } else if ( el_p1.val().length < 6 ) {
        v_pass1 = true;
        v_pass2 = true;
        el_p1.after('<span class="text-error for-pass1">Пароль должен быть не менее 6 символов</span>');
        $('.for-pass1').css({ top: el_p1.position().top + el_p1.outerHeight() + 5 });
      }

      $('#password').toggleClass('error', v_pass1 );
      $('#repeat_password').toggleClass('error', v_pass2 );

      return ( v_email || v_pass1 || v_pass2 );
    }

  });
  /* --------------------End Validation Register Form------------------ */


  /* -----------------------Booking/participate----------------------- */
  $('.event-participate').on('click', function () {
    let parent = $(this).parent().parent();

    if (parent.hasClass('service-card')) {
      let priceId = parent.find('.service-card__price').attr('data-id');
      let priceVal = `${parent.find('.service-card__title h2').text()} - ${parent.find('.service-card__price').text()} `;

      $('#booking-select').val(priceId);
      $('.inner_selected').text(priceVal)

    }
    toggleModal(bookingModal);
  });


  $('#booking #user-phone').bind("change keyup input click", function () {
    if (this.value.match(/[^+0-9]/g)) {
      this.value = this.value.replace(/[^+0-9]/g, '');
    }
  });

  $('#book').on('click', () => {
    let bookInfo = {};

    let url = document.location.href.split('#')[0];
    let code = url.split('/').pop();

    bookInfo["event_code"] = code;
    if ($("select[name='_booking-select']").length) {
      let price = $('#booking-select').val();
      bookInfo['price'] = price;
    }
    if ($('#user-phone').length && $('#user-email').length) {
      let e_email = $('#user-email');
      let e_phone = $('#user-phone');
      if (!ValidateEmailAndPhone(e_email, e_phone)) return;
      let email = $('#user-email').val();
      let phone = $('#user-phone').val();
      bookInfo['email'] = email;
      bookInfo['phone'] = phone;
    }
    $.ajax({
      url: '/booking/create',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(bookInfo),
    })

      .done((data) => {
        if (data.message) {
          let resMsg = data.message;
          $('#booking .user-fields__wrapp').addClass('active');
          $('#booking .user-fields__wrapp').text(resMsg);
          $('#booking .booking__wrapp').addClass('hidden');

          if ($('#user_active').length < 1) return;

          $('.event-annotation .event-participate').addClass('hidden');
          let notice = document.createElement('div');
          notice.innerHTML = resMsg;
          $('.event-annotation .event-annotation__bottom').append(notice);
          $('.service-card .event-participate').addClass('hidden');

        } else {
          $('#booking .user-fields__wrapp').text('Бронирование не удалось');
        }
      })
      .fail(() => {
        alert('Error');
      });
  });

  $('#booking .modal__close').on('click', () => {
    if ($('#user_active').length < 1) {
      $('#booking .user-fields__wrapp').removeClass('active');
      $('#booking .booking__wrapp').removeClass('hidden');
      $('#booking-select').val('hide');
      $('.inner_selected').text('Тариф');
      $('#booking .user-fields__wrapp').html('<div class="text-form"><input type="phone" id="user-phone" placeholder="Введите телефон" name="_user-phone"  /></div><div class="text-form"><input type="email" id="user-email" class="for-email" placeholder="Введите e-mail" name="_user-email" /></div>');
    }
  });
  /* --------------------------End Booking/participate---------------------- */


  /* -------------------------------Validation----------------------------- */
  function ValidateEmail(email) {
    $('.text-error').remove();
    // Проверка e-mail

    let reg = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
    let inputEmail = email;
    let valEmail = (inputEmail.val()) ? inputEmail.val() : false;

    if (!valEmail) {
      inputEmail.after('<span class="text-error for-booking">Поле должно быть заполненно</span>');
      $('.for-booking').css({ top: inputEmail.position().top + inputEmail.outerHeight() + 2 });
      return valEmail;
    }
    inputEmail.toggleClass('error', valEmail);

    if (!reg.test(valEmail)) {
      valEmail = false;
      inputEmail.after('<span class="text-error for-email">Вы указали недопустимый e-mail</span>');
      $('.for-email').css({ top: inputEmail.position().top + inputEmail.outerHeight() + 2 });
    } else valEmail = true;
    inputEmail.toggleClass('error', valEmail);

    return valEmail;
  }
  function ValidateRequireEmailAndPhone(e_email, e_phone) {
    $('.text-error').remove();
    // Проверка e-mail

    let reg = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
    let inputEmail = e_email;
    let inputPhone = e_phone;
    let v_email = (inputEmail.val()) ? inputEmail.val() : false;
    let v_phone = (inputPhone.val()) ? inputPhone.val() : false;

    if (!v_email) {
      inputEmail.after('<span class="text-error for-booking">Поле обязательно для заполнения</span>');
      $('.for-booking').css({ top: inputEmail.position().top + inputEmail.outerHeight() + 2 });
      return v_email;
    }
    inputEmail.toggleClass('error', v_email);

    if (!v_phone) {
      inputPhone.after('<span class="text-error for-booking">Поле обязательно для заполнения</span>');
      $('.for-booking').css({ top: inputPhone.position().top + inputPhone.outerHeight() + 2 });
      return v_phone;
    }
    inputEmail.toggleClass('error', v_email);

    if (!reg.test( inputEmail.val())) {
      v_email = false;
      inputEmail.after('<span class="text-error for-email">Вы указали недопустимый e-mail</span>');
      $('.for-email').css({ top: inputEmail.position().top + inputEmail.outerHeight() + 2 });
    } else v_email = true;
    inputEmail.toggleClass('error', v_email);

    return (v_email || v_phone);
  }

  function ValidateEmailAndPhone(e_email, e_phone) {
    $('.text-error').remove();
    // Проверка e-mail

    let reg = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
    let inputEmail = e_email;
    let inputPhone = e_phone;
    let vEmail = (inputEmail.val()) ? inputEmail.val() : false;
    const vPhone = (inputPhone.val()) ? inputPhone.val() : false;
    const titleBooking = $('.event-booking__title');

    if (!vEmail && !vPhone) {
      titleBooking.after('<span class="text-error for-booking">Хотя бы одно поле должно быть заполненно</span>');
      $('.for-booking').css({ top: titleBooking.position().top + titleBooking.outerHeight() + 2 });
      return vEmail;
    }
    inputEmail.toggleClass('error', vEmail);

    if (!reg.test(inputEmail.val())) {
      vEmail = false;
      inputEmail.after('<span class="text-error for-email">Вы указали недопустимый e-mail</span>');
      $('.for-email').css({ top: inputEmail.position().top + inputEmail.outerHeight() + 2 });
    } else vEmail = true;
    inputEmail.toggleClass('error', vEmail);
    return vEmail;
  }
  /* ----------------------------End Validation----------------------------- */


  /* -------------------------------Subscribe---------------------------- */
  $('.subscribe').on('click', () => {
    if ($('#subscr-user-email').length) {
      const valEmail = $('#subscr-user-email').val();
      $('#username').val(valEmail);
    }
    toggleModal(subscribeModal);
  });

  $('#subscrBtn').on('click', () => {
    const subscrInfo = {};

    if ($('#username').length) {
      if (!ValidateEmail($('#username'))) return;
      const valEmail = $('#username').val();
      subscrInfo['email'] = valEmail;
    }

    const startDate = $('#subscr-start-search').val();
    subscrInfo['begin-date'] = startDate;
    const finishDate = $('#subscr-finish-search').val();
    subscrInfo['end-date'] = finishDate;
    const pageType = $("input[name='type-subscribe-code']").val();
    subscrInfo['type-subscribe-code'] = pageType;

    $.ajax({
      url: '/subscribe/create',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(subscrInfo),
    })

      .done((data) => {
        if ($('#user_active').length < 1) {
          $('#username').val('');
          $('#subscr-user-email').val('');
        } else if (data) {
          $('.subscription .subscription__button').text('Вы подписаны на рассылку. Управлять подписками можно из личного кабинета после ее подтверждения в отправленном вам письме');
          $('.subscription .subscription__button').addClass('active');
          $('.subscription .subscription__wrapp .subscription_input').addClass('hidden');
        } else if (data.message) {
          const resMsg = data.message;
          $('.subscription .subscription__button')
            .text(resMsg);
          $('.subscription .subscription__button')
            .addClass('active');
        }
        toggleModal(subscribeModal);
      })
      .fail(() => {
        alert('Error');
      });
  });

  $('#subscr-modal .modal__close').on('click', () => {
    if ($('#user_active').length < 1) {
      $('#username').val('');
    }
  });
  /* --------------------End Subscribe------------------------ */


  /* --------------------Sending form for new event------------------------ */
  $('#create-route-form').on('submit', (event) => {
    const eEmail = $('#create-route-form #user-email');
    const ePhone = $('#create-route-form #user-phone');
    if (!ValidateRequireEmailAndPhone(eEmail, ePhone)) {
      event.preventDefault();
    }
  });
  /* --------------------End Sending form for new event------------------------ */


  /* ------------------Like sending Event page---------------- */
  $('.event-like').on('click', function () {
    const likeInfo = {};
    if ($('#user-phone').length >= 1 && $('#user-email').length >= 1) return;

    const url = document.location.href.split('#')[0];
    const code = url.split('/').pop();
    const like = $(this);
    let likeCount = parseInt(like.find('span').text(), 10);

    likeInfo['event_code'] = code;
    if (like.hasClass('like')) {
      likeInfo['like'] = false;
      like.find('img').attr('src', '/img/params/unlike.svg');
      like.removeClass('like');
      likeCount -= 1;
      like.find('span').text(likeCount);
    } else {
      likeInfo['like'] = true;
      like.find('img').attr('src', '/img/params/like.svg');
      like.addClass('like');
      likeCount += 1;
      like.find('span').text(likeCount);
    }
    $.ajax({
      url: '/like/change',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(likeInfo),
    })
      .fail(() => {
        alert('Error');
      });
  });
  /* ------------------End Like sending Event Page------------ */


  /* --------------------Like sending List Page--------------------- */
  function likeEvent() {
    const likeInfo = {};
    if ($('#user-exists').length <= 0) return;

    const like = $(this);
    let likeCount = parseInt(like.find('span').text(), 10);
    const eventLink = like.parent().parent().parent().next()
      .find('.event-card__title a')
      .attr('href');
    likeInfo['event_code'] = eventLink.split('/').pop();

    if (like.hasClass('like')) {
      likeInfo['like'] = false;
      like.find('img').attr('src', '/img/params/unlike.svg');
      like.removeClass('like');
      likeCount -= 1;
      like.find('span').text(likeCount);
    } else {
      likeInfo['like'] = true;
      like.find('img').attr('src', '/img/params/like.svg');
      like.addClass('like');
      likeCount += 1;
      like.find('span').text(likeCount);
    }
    $.ajax({
      url: '/like/change',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(likeInfo),
    });
  }

  $('.event-card__fave span').on('click', likeEvent);
  /* --------------End Like sending List Page------------- */


  /* ------------------Search form on Event list page------------ */
  if (screen.width > 768) {
    $('.filter-mobile').remove();
    $('.header-search-wrapper.mobile-version').remove();
  } else {
    $('.filter').remove();
    $('.header-search-wrapper.all-screens').remove();
  }
  /* ------------------Infinnitive scroll---------------- */

  // $(window).scroll(function () {
  //     let topOfContainer = $('.event-cards').offset().top;
  //     let hightOfContainer = $('.event-cards').outerHeight();
  //         if ($(window).scrollTop() > topOfContainer + hightOfContainer) {
  //             if (screen.width <= 768) {
  //                 $('#pagination-btn').click();
  //             }
  //         }
  // });
  /* ----------------End Infinnitive scroll-------------- */

  $("input[name='price-switch']").on('click', () => {
    $("#find-form button[type='submit']").trigger('click');
  });
  $("input[name='date-switch']").on('click', () => {
    $("#find-form button[type='submit']").trigger('click');
  });

  $('#pagination-btn').on('click', () => {
    updatePage();
  });

  function getEventType(arrayTypeEvent) {
    let strEventType = '';
    for (let i = 0; i < arrayTypeEvent.length; i++) {
      strEventType += `<div class="event-card__type"><div class="event-subj-tag">${arrayTypeEvent[i].name}</div></div>`;
    }
    return strEventType;
  }

  function getEventStatus(status) {
    let matchedStatus;
    switch (status) {
      case 'Идет сбор заявок':
        matchedStatus = `<div class="event-card__status event-card__status_green">Статус: <div>${status}</div></div>`;
        break;
      case 'Завершено':
        matchedStatus = `<div class="event-card__status event-card__status_red">Статус: <div>${status}</div></div>`;
        break;
      case 'Новое':
        matchedStatus = `<div class="event-card__status event-card__status_green">Статус: <div>${status}</div></div>`;
        break;
      default:
        break;
    }
    return matchedStatus;
  }

  function formatDate(date) {
    const day = date.getDate();
    const monthIndex = (date.getMonth() < 10) ? (`0${date.getMonth()}`) : (date.getMonth());
    const year = date.getFullYear();
    return `${day}.${monthIndex}.${year}`;
  }

  function updateEventCardsList(eventList) {
    const url = document.location.href.split('#')[0];
    const locale = url.split('/')[4];

    const typeItineraryMap = {
      snow: '/img/type_itinerary/snow.svg',
      animals: '/img/type_itinerary/animals.svg',
      cycle: '/img/type_itinerary/bike.svg',
      moto: '/img/type_itinerary/vespa.svg',
      walk: '/img/type_itinerary/hiking.svg',
      water: '/img/type_itinerary/water.svg',
    };

    for (let i = 0; i < eventList.length; i++) {
      const domItem = $(`<div class="event-card">
        <div class="event-card__social">
            <div class="event-card__social__wrapper">
                 ${(eventList[i].params.like.user_like)
    ? (`<div class="event-card__fave">
                              Понравилось?
                             <span><img src="/img/params/like.svg" alt="unlike"></span>
                       </div>`)
    : (`<div class="event-card__fave">
                              Понравилось?
                             <span><img src="/img/params/unlike.svg" alt="unlike"></span>
                       </div>`)}
                      <div class="event-card__share">
                          Поделиться:
                          <a href="javascript:void(0)"><span class="event-card_vk"><svg viewBox="0 0 16 17" width="16" height="17" xmlns="http://www.w3.org/2000/svg"><circle id="Ellipse" cx="8" cy="8" r="8" transform="translate(0 0.0826111)" fill="white"></circle><path id="XMLID 807" fill-rule="evenodd" clip-rule="evenodd" d="M 7.32392 3.0621C 7.6062 3.33769 7.90414 3.59699 8.15731 3.90038C 8.26915 4.03521 8.37504 4.17433 8.45603 4.3308C 8.57081 4.55322 8.46686 4.79798 8.26742 4.81126L 7.02768 4.8107C 6.70794 4.83723 6.45286 4.70851 6.23838 4.48989C 6.06674 4.31506 5.90778 4.12898 5.74274 3.94825C 5.67508 3.87438 5.60425 3.80487 5.51965 3.74993C 5.35041 3.64008 5.20351 3.67372 5.10679 3.85022C 5.00829 4.02975 4.98595 4.22855 4.97628 4.42863C 4.963 4.72056 4.87476 4.79731 4.58151 4.81067C 3.95482 4.84022 3.36006 4.74541 2.80755 4.42927C 2.32044 4.15057 1.9427 3.75712 1.61392 3.31169C 0.973785 2.44435 0.483567 1.49129 0.0429775 0.511523C -0.0561957 0.290781 0.0163319 0.172288 0.259889 0.168094C 0.664327 0.160237 1.06871 0.160797 1.47362 0.167535C 1.638 0.169939 1.74682 0.264219 1.81028 0.419508C 2.0291 0.957537 2.29684 1.46942 2.63292 1.9439C 2.72242 2.07022 2.81368 2.19655 2.94363 2.28546C 3.0874 2.3839 3.19686 2.35127 3.2645 2.19112C 3.30742 2.08957 3.32621 1.98019 3.33588 1.87143C 3.36792 1.49724 3.37214 1.1237 3.31594 0.750831C 3.28144 0.518122 3.15037 0.367475 2.91816 0.323438C 2.79967 0.300987 2.81731 0.256894 2.87468 0.18926C 2.97433 0.0726116 3.06805 -3.75436e-08 3.25488 -3.75436e-08L 4.65597 -3.75436e-08C 4.87655 0.0435333 4.92553 0.142623 4.95573 0.364567L 4.95693 1.92089C 4.95452 2.00681 4.99985 2.26178 5.1546 2.31865C 5.27847 2.35913 5.36011 2.26004 5.43443 2.1815C 5.76989 1.82546 6.00931 1.4047 6.2232 0.969001C 6.31812 0.777421 6.39974 0.578459 6.47883 0.379665C 6.53744 0.23215 6.6294 0.159566 6.79556 0.162782L 8.14403 0.163984C 8.18402 0.163984 8.22447 0.164571 8.2632 0.171198C 8.49043 0.209922 8.55269 0.307669 8.48251 0.529558C 8.37193 0.877684 8.15678 1.16779 7.94641 1.45925C 7.72153 1.77041 7.48102 2.07092 7.25802 2.38393C 7.05313 2.66976 7.0694 2.81384 7.32392 3.0621Z" transform="translate(3.34497 6.07468)" fill="#2F80ED"></path></svg></span></a>
                          <a href="javascript:void(0)"><span class="event-card_insta"><svg width="17" height="17" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle id="Ellipse" cx="8" cy="8" r="8" transform="translate(0.0539551 0.0826111)" fill="white"></circle><path id="Vector" d="M 6.08185 0L 2.31805 0C 1.03988 0 0 1.03993 0 2.3181L 0 6.0819C 0 7.36012 1.03988 8.4 2.31805 8.4L 6.08185 8.4C 7.36012 8.4 8.4 7.36007 8.4 6.0819L 8.4 2.3181C 8.40005 1.03993 7.36012 0 6.08185 0ZM 7.65476 6.0819C 7.65476 6.94917 6.94917 7.65471 6.0819 7.65471L 2.31805 7.65471C 1.45083 7.65476 0.745289 6.94917 0.745289 6.0819L 0.745289 2.3181C 0.745289 1.45088 1.45083 0.745289 2.31805 0.745289L 6.08185 0.745289C 6.94912 0.745289 7.65471 1.45088 7.65471 2.3181L 7.65471 6.0819L 7.65476 6.0819Z" transform="translate(3.85425 3.88228)" fill="#EB5757"></path><path id="Vector_2" d="M 2.16447 6.06518e-08C 0.970962 6.06518e-08 -7.42984e-08 0.970962 -7.42984e-08 2.16447C -7.42984e-08 3.35792 0.970962 4.32884 2.16447 4.32884C 3.35797 4.32884 4.32893 3.35792 4.32893 2.16447C 4.32893 0.970962 3.35797 6.06518e-08 2.16447 6.06518e-08ZM 2.16447 3.5835C 1.38196 3.5835 0.745289 2.94692 0.745289 2.16442C 0.745289 1.38186 1.38191 0.745239 2.16447 0.745239C 2.94702 0.745239 3.58365 1.38186 3.58365 2.16442C 3.58365 2.94692 2.94697 3.5835 2.16447 3.5835Z" transform="translate(5.8894 5.9179)" fill="#EB5757"></path><path id="Vector_3" d="M 0.546545 -2.72933e-08C 0.402953 -2.72933e-08 0.261894 0.0581326 0.160486 0.159989C 0.0585797 0.261348 -1.18271e-07 0.402456 -1.18271e-07 0.546545C -1.18271e-07 0.690187 0.0586294 0.831245 0.160486 0.933101C 0.261845 1.03446 0.402953 1.09309 0.546545 1.09309C 0.690634 1.09309 0.831246 1.03446 0.933102 0.933101C 1.03496 0.831245 1.09309 0.690137 1.09309 0.546545C 1.09309 0.402456 1.03496 0.261348 0.933102 0.159989C 0.831742 0.0581326 0.690634 -2.72933e-08 0.546545 -2.72933e-08Z" transform="translate(9.76294 5.28596)" fill="#EB5757"></path></svg></span></a>
                      </div>
                  </div>
              </div>
              <div class="event-card__wrapper">
                   ${(eventList[i].params.free_events)
    ? ('<h3 class="card-ribbon">Бесплатные мероприятия</h3>')
    : ''}   
                      <div class="event-card__img">
                          <img src="${eventList[i].photo}" alt="event">
                      </div>
                  <div class="event-card__top">
                      <h3 class="event-card__title">
                      
                          ${(typeItineraryMap[eventList[i].type_itinerary.code])
    ? (`<span href="javascript:void(0)"><img src="${typeItineraryMap[eventList[i].type_itinerary.code]}" alt="${eventList[i].type_itinerary.name}"></span>`)
    : ''}
                           
                            <a href="/event/${locale}/item/${eventList[i].code}">${eventList[i].event_name}</a>
                        </h3>
                    </div>
                               
                   ${(eventList[i].type_event)
    ? (`<div class="event-card__type-wrapper">
                            ${getEventType(eventList[i].type_event)}
                        </div>`)
    : ''}            
          <div class="event-card__subtitle">
              <a href="/place/">${eventList[i].meeting_place.place_name}</a>
          </div>
          <div class="event-card__middle">
              <div class="event-card__start">
                  Начало:<div>${formatDate(new Date(eventList[i].begin_date.date))}</div>
              </div>
              <div class="event-card__days">
                  Количество дней:<div>${eventList[i].count_days}</div>
              </div>
              
              ${getEventStatus(eventList[i].status)}
              
          </div>
          <div class="event-card__middle">
        ${(eventList[i].estimate_people_count === 0)
    ? (`<div class="event-card__members">
          Планируемое количество
          участников: <div>Неограниченно</div>
      </div>`)
    : (`<div class="event-card__members">
          Планируемое количество
          участников: <div>${eventList[i].estimate_people_count} человек</div>
      </div>`)}
                        
        <div class="event-card__finish">
            <svg viewBox="-1.7589999437332153 0.2290000021457672 16.145999908447266 18.652999877929688" width="16.146" height="18.653" xmlns="http://www.w3.org/2000/svg"><path d="M2.793 18.716c-1.228-2.556-.574-4.02.37-5.4 1.034-1.512 1.3-3.008 1.3-3.008s.813 1.057.488 2.71c1.436-1.6 1.707-4.146 1.49-5.121 3.246 2.268 4.633 7.18 2.763 10.819 9.943-5.626 2.474-14.043 1.173-14.991.434.948.516 2.553-.36 3.332C8.535 1.437 4.87.284 4.87.284c.433 2.899-1.572 6.069-3.505 8.437-.068-1.156-.14-1.953-.748-3.06-.136 2.1-1.74 3.812-2.175 5.916-.589 2.849.44 4.935 4.351 7.139z" fill="#EB5757"></path></svg>
            Дата окончания сбора заявок: <div>${formatDate(new Date(eventList[i].end_collection_orders_date.date))}</div>
        </div>
    </div>
    <div class="event-card__bottom">
        <div class="event-card__left">
            <div class="event-card__organizer">
            ${(eventList[i].verifed)
    ? (`Организатор: <div style="color: #219653"><img src="/img/params/quality.svg" alt="">${eventList[i].club.name}</div>`)
    : (`Организатор: <div style="color: black">${eventList[i].club.name}</div>`)} 
                            </div>
                        </div>
                        <div class="event-card__right">
                            <a href="/event/${locale}/item/${eventList[i].code}" type="button" class="button button_big">Смотреть</a>
                        </div>
                    </div>
                </div>
            </div>`).appendTo('.event-cards .event-cards__wrapper');
      domItem.find('.event-card__fave span').on('click', likeEvent);
    }
  }

  function getPaginatorContent(paginator) {
    const { pagesInRange } = paginator;
    let strContent = '';
    const url = document.location.href.split('#')[0];
    const locale = url.split('/')[4];

    for (let i = 0; i < pagesInRange.length; i++) {
      strContent += `${(pagesInRange[i] === paginator.current)
        ? (`<li class="paginator__item"><a href="/event/${locale}/list/${pagesInRange[i]}" id="active-page" class="active paginator__link">${pagesInRange[i]}</a></li>`)
        : (paginator.current > 4 && i === 0)
          ? (`<li class="paginator__item">
                                    <a href="/event/${locale}/list/${paginator.first}" class="paginator__link">${paginator.first}</a>
                                </li>`)
          : ((pagesInRange[i] !== paginator.last || '') && `<li class="paginator__item">
                                    <a href="/event/${locale}/list/${pagesInRange[i]}" class="paginator__link">${pagesInRange[i]}</a>
                                </li>`)}
                            ${(paginator.current > 4 && i === 0) ? ('<li class="paginator__dots">…</li>') : ''}
                            ${((paginator.last - paginator.current) > 4 && i === pagesInRange.length - 1) ? ('<li class="paginator__dots">…</li>') : ''}`;
    }
    return strContent;
  }

  function updatePaginator(paginator) {
    const url = document.location.href.split('#')[0];
    const locale = url.split('/')[4];

    const domPaginator = $('.page-nav .page-nav__wrapper').html(`<div class="page-nav__button">
    ${(paginator.next) ? ('<button id="pagination-btn" type="button" class="button button_big">Показать еще</button>') : ''}
    </div>
    <div class="page-nav__paginator">
    <div class="paginator">
    <ul class="paginator__list">
    ${(paginator.previous)
    ? (`<li class="paginator__item">
    <a href=/event/${locale}/list/${paginator.previous}>
    <i class="fa fa-angle-left" aria-hidden="true"></i>
    </a>
    </li>`)
    : (paginator.current === 1 && paginator.pageCount > 1)
      ? (`<li class="paginator__item">
      <a href=/event/${locale}/list/${paginator.last}>
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      </a>
      </li>`)
      : ''}
        ${(paginator.last > 1) ? getPaginatorContent(paginator) : ''}
        ${(paginator.last > 5 && paginator.current !== paginator.last)
    ? (`<li class="paginator__item"><a href=/event/${locale}/list/${paginator.last} class="paginator__link">${paginator.last}</a></li>`)
    : ''}
    ${(paginator.next)
    ? (`<li class="paginator__item"><a href=/event/${locale}/list/${paginator.next}><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>`)
    : ''}
    </ul>
    </div>
    </div>`);
    domPaginator.find('#pagination-btn').click(() => {
      updatePage();
    });
  }

  function updatePage() {
    const url = document.location.href.split('#')[0];
    const locale = url.split('/')[4];
    const pageNumber = url.split('/').slice(-1)[0];
    const activePage = parseInt($('#active-page').text(), 10);
    let activeUrl = url;
    if ($.isNumeric(pageNumber)) {
      activeUrl = url.split('/');
      activeUrl.pop();
      activeUrl = activeUrl.join('/');
    }

    $.ajax({
      url: `/event/${locale}/list-json/${activePage + 1}`,
      type: 'POST',
      dataType: 'json',
    })
      .done((data) => {
        updateEventCardsList(data.data.eventlist);
        updatePaginator(data.data.paginator);
        window.history.replaceState({}, document.title, `${activeUrl}/${data.data.paginator.current}`);
      })
      .fail(() => {
        alert('Error');
      });
  }
  /* ------------------End Search form on Event list page------------ */


  /* ------------------Calendar on index page---------------- */
  const localizer = {
    ru: {
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'],
    },
    en: {
      days: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Frid', 'Sat'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  };

  function GetDaysDescription(str, locale) {
    let splited = str.split(',');
    splited.pop();
    splited = splited.map((i) => {
      const arr = i.split('.');
      return [arr[1], arr[0], arr[2]].join('/');
    });
    return splited.map((i) => {
      const date = new Date(i);
      const monthName = localizer[locale].months[date.getMonth()];
      const weekDayName = localizer[locale].days[date.getDay()];
      return { month: monthName, weekD: weekDayName, day: date.getDate() };
    });
  }

  const str = $('.hidden-calendar div').text();
  const dateDesсr = GetDaysDescription(str, 'ru');

  $('.datepicker-card__month').each((idx) => {
    $(this).text(dateDesсr[parseInt(idx, 10)].month);
  });

  $('.datepicker-card__date').each((idx) => {
    $(this).text(dateDesсr[parseInt(idx, 10)].day);
  });

  $('.datepicker-card__weekday').each((idx) => {
    $(this).text(dateDesсr[parseInt(idx, 10)].weekD);
  });

  $('.datepicker-card').on('click', function () {
    if (!$(this)[0].hasAttribute('data-id')) return;
    $('.datepicker-card').removeClass('datepicker-card_active');
    $(this).addClass('datepicker-card_active');
  });

  $('.datepicker-card__events').forEach((index, item) => {
    if (item.innerHTML > 0) {
      const datepickerCard = item.parentNode;
      datepickerCard.classList.add('has_event');
    }
  });
  /* ------------------End Calendar on index page------------ */

  $('#find-form').keydown((e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
    return false;
  });
});
