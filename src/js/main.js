var button = document.querySelector('#button');
var popup = document.querySelector('#popup');
var close = document.querySelector('#popup-close');
var submodal = document.querySelector('#submodal');
var closeThanks = document.querySelector('#close-thanks');
var closeModalTimeout = 60000;
var closeTimeoutId;

button.addEventListener('click', function () {
  popup.classList.add('popup_active');
  closeTimeoutId = window.setTimeout(function () {
    popup.classList.remove('popup_active');
  }, closeModalTimeout);
  window.addEventListener('input', function () {
    window.clearTimeout(closeTimeoutId);
  }, true);
});
close.addEventListener('click', function () {
  popup.classList.remove('popup_active');
});

closeThanks.addEventListener('click', function () {
  submodal.classList.remove('submodal_active');
});

new WOW().init();
$(document).ready(function () {
  $('.navbar-menu__link').on('click', function (e) {
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top-40 }, 2000);
    e.preventDefault();
    $('.navbar-menu__list').removeClass('navbar-menu__list-active');
    $('.menu-icon').removeClass('menu-icon-active');
  });

  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    // fade: true,
    // easing: 'linear'
  });
  $('.feedbacks-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: true,
    infinite: true,
    easing: 'linear',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
  /* Маска для валидации*/
  $('.phone').mask('+7 (999) 999-99-99');
  /*Валидация модальной формы*/
  $('#modal-form').validate({
    rules: {
      modal_username: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      modal_phone: "required"
    },
    errorElement: "span",
    errorClass: "invalid",
    messages: {
      modal_username: {
        required: "<b>Заполните поле</b>",
        minlength: jQuery.validator.format("Осталось ввести символов: {0}!"),
        maxlength: jQuery.validator.format("Символов должно быть меньше: {0}.")
      },
      modal_phone: "<b>Заполните поле</b>"
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $('#modal-form').serialize(),
        success: function (response) {
          $('#modal-form')[0].reset();
          // modal.classList.remove('popup_active');
          submodal.classList.add('submodal_active');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(jqXHR + " " + textStatus);
        }
      });
    }
  });
  /*Валидация модальной формы*/
  $('#popup-form').validate({
    rules: {
      popup_username: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      popup_phone: "required"
    },
    errorElement: "span",
    errorClass: "invalid",
    messages: {
      popup_username: {
        required: "<b>Заполните поле</b>",
        minlength: jQuery.validator.format("Осталось ввести символов: {0}!"),
        maxlength: jQuery.validator.format("Символов должно быть меньше: {0}.")
      },
      popup_phone: "<b>Заполните поле</b>"
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $('#popup-form').serialize(),
        success: function (response) {
          $('#popup-form')[0].reset();
          popup.classList.remove('popup_active');
          submodal.classList.add('submodal_active');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(jqXHR + " " + textStatus);
        }
      });
    }
  });
});

document.querySelector('.menu-icon-wrapper').onclick = function () {
  document.querySelector('.menu-icon').classList.toggle('menu-icon-active');
  document.querySelector('.navbar-menu__list').classList.toggle('navbar-menu__list-active');
};
document.querySelector('.navbar-menu__link').onclick = function () {
  document.querySelector('.navbar-menu__list').classList.remove('navbar-menu__list-active');
  document.querySelector('.menu-icon').classList.remove('menu-icon-active');
};

/* Подключение Yandex карты */
if (document.getElementById("map")) {
  var mapContainer = "map";
  var setLoadingTimeout = 4000;
} else
{
  var mapContainer = "singlemap";
  var setLoadingTimeout = 0;
}

setTimeout(function () {
  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.src =
    '//api-maps.yandex.ru/2.0/?apikey=b752e912-ec52-44b1-a92b-062e6dc1fd71&load=package.standard&lang=ru-RU&onload=getYaMap&scroll=false';
  document.getElementsByTagName('body')[0].appendChild(elem);
}, setLoadingTimeout);

function getYaMap() {
  var myMap = new ymaps.Map(mapContainer, {
    center: [55.8155087, 37.9516806],
    zoom: 15
  });

  ymaps.geocode("г. Москва, ул. Советская 48 корп. 3").then(function (res) {
    var coord = res.geoObjects.get(0).geometry.getCoordinates();
    var myPlacemark = new ymaps.Placemark(coord, { preset: 'twirl#yellowDotIcon' });
    myMap.controls.add('smallZoomControl', { 'top': 5, 'smooth': true });
    myMap.geoObjects.add(myPlacemark);
    myMap.setCenter(coord);
  });
}