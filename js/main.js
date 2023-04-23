// it detects if mobile browser. regex -> http://detectmobilebrowsers.com
const isMobile = (function (a) {
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  )
})(navigator.userAgent || navigator.vendor || window.opera)
const browser_mobile =
  /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  )

let screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width
const sliders = []

$(window).load(function () {
  $(window).scrollTo(0, 250)
  setTimeout(() => {
    $('body').removeClass('unloaded')
  }, 1600)

  $('#loader').delay(1000).slideUp('slow')
  $('.wall').delay(1000).fadeOut('slow')
  $('.logo').delay(750).fadeOut('slow')

  setTimeout(function () {
    $('header .block').animate(
      {
        left: 0
      },
      1000
    )
  }, 500)

  onScroll()
  setMainSlider()

  // BxSlider reload
  sliders.forEach((slider) => slider.reloadSlider())
})

$(window).resize(function () {
  setTimeout(function () {
    screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width
    $('.match').matchHeight()
    if (screenWidth <= 767) {
      $('nav').removeClass('scrolled')
    }

    setMainSlider()
  }, 500)

  // BxSlider reload
  sliders.forEach((slider) => slider.reloadSlider())
})

$(document).ready(function () {
  // Watch Scroll
  $(document).on('scroll', onScroll)

  $('.match').matchHeight()

  // Nav
  $('.btn-menu').click(function () {
    toggleMenu($(this))
  })

  $('.btn-close').click(function () {
    toggleMenu($(this))
  })

  $('.logo-mobile-small').click(function () {
    toggleMenu($(this))
  })

  $('nav ul li a, .logo-mobile-small').on('touchstart click', function () {
    if (screenWidth <= 767) {
      setTimeout(function () {
        $('.btn-close').trigger('click')
      }, 250)
    }

    // scrollTo
    const link = $(this).data('link')
    $(window).scrollTo(link, 1000, {
      offset: screenWidth <= 767 ? -120 : -100
    })
  })

  // Bx-Slider
  $('.bxslider li').each(function (i) {
    $(this).backstretch($(this).attr('data-bg'))
  })

  const slider = $('.bxslider.desktop').bxSlider({
    auto: $('.bxslider.desktop li').length > 1 ? true : false,
    controls: false,
    keyboardEnabled: true,
    mode: 'horizontal',
    pager: true,
    pause: 4000,
    responsive: true,
    speed: 1000
  })

  const sliderMobile = $('.bxslider.mobile').bxSlider({
    auto: $('.bxslider.mobile li').length > 1 ? true : false,
    controls: false,
    keyboardEnabled: true,
    mode: 'horizontal',
    pager: true,
    pause: 4000,
    responsive: true,
    speed: 1000
  })

  sliders.push(slider)
  sliders.push(sliderMobile)
  createMap()
})

function onScroll() {
  let scrollPosition = $(document).scrollTop() + 145
  let headerHeight = $('header').height() - 125

  if ($(window).scrollTop() > headerHeight && screenWidth > 767) {
    $('nav').addClass('scrolled')
  } else {
    $('nav').removeClass('scrolled')
  }

  $('nav ul li a').each(function () {
    if ($(this).data('link')) {
      const link = $(this)
      const refElement = $(link.data('link'))
      if (
        refElement.position().top <= scrollPosition &&
        refElement.position().top + refElement.height() > scrollPosition
      ) {
        $('nav ul li a').removeClass('active')
        link.addClass('active')
        return
      }

      link.removeClass('active')
    }
  })

  resetAnimatedElements()

  $('.animated-element').each(function () {
    const element = $(this)
    const scrolledPosition = $(document).scrollTop() + $('header').height()

    const isScrollOnElement = scrolledPosition > element.position().top
    if (isScrollOnElement) {
      element.addClass(element.data('animate'))
    }
  })

  const customBlocks = ['#what-we-do-1', '#what-we-do-2', '#what-we-do-3', '#what-we-do-4', '#where-we-are']

  customBlocks.forEach((customBlock) => {
    const customBlockPositionTop = $(customBlock).position().top
    const scrolledPosition = $(document).scrollTop() + $('header').height()
    const isScrollOnBlock = scrolledPosition > customBlockPositionTop

    if (isScrollOnBlock) {
      console.log('animando', customBlock)
      $('.animated-element-custom').each(function () {
        const element = $(this)
        element.addClass(element.data('animate'))
      })
    }
  })
}

function resetAnimatedElements() {
  if ($(document).scrollTop() === 0) {
    $('.animated-element, .animated-element-custom').each(function () {
      const animatedElement = $(this)
      const animatedClasses = animatedElement.data('animate').split(' ')
      animatedClasses.forEach((animatedClass) =>
        animatedElement.removeClass(animatedClass)
      )
    })
  }
}

function toggleMenu(btn) {
  btn.toggleClass('btn-close')
  $('nav').toggleClass('open-mobile')
}

function setMainSlider() {
  if (screenWidth <= 767) {
    $('.slider.mobile').removeClass('hidden')
    $('.slider.desktop').addClass('hidden')
    return
  }

  $('.slider.mobile').addClass('hidden')
  $('.slider.desktop').removeClass('hidden')
}

function createMap() {
  const desarrolloLatlng = new google.maps.LatLng(
    -34.711388392118316,
    -58.497470121299166
  )
  bounds = new google.maps.LatLngBounds()
  bounds.extend(desarrolloLatlng)
  const infowindow = new google.maps.InfoWindow()

  const mymap = document.getElementById('map'),
    map_options = {
      zoom: browser_mobile ? 13 : 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      scrollwheel: false,
      streetViewControl: false,
      center: desarrolloLatlng,
      styles: [
        {
          featureType: 'administrative',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#cacfc0'
            },
            {
              weight: '2'
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.fill',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#c6ccb9'
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#f8f8f8'
            },
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'labels.text.fill',
          stylers: [
            {
              visibility: 'off'
            },
            {
              hue: '#ff0000'
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#ff0000'
            },
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'landscape.natural.landcover',
          elementType: 'geometry.fill',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#afb4a3'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#afb4a3'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#5f6258'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#cacfc0'
            },
            {
              weight: '2'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.icon',
          stylers: [
            {
              color: '#7b7f73'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#afb4a3'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#525c31'
            }
          ]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#525c31'
            }
          ]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#41433d'
            }
          ]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              weight: '2.00'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#525c31'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              weight: '0.01'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#41433d'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#f9f9f9'
            },
            {
              weight: '0.01'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#cacfc0'
            },
            {
              weight: '2'
            }
          ]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry.fill',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#b0b5a4'
            }
          ]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.icon',
          stylers: [
            {
              weight: '0.01'
            }
          ]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#5f6258'
            }
          ]
        },
        {
          featureType: 'transit.station.airport',
          elementType: 'labels.icon',
          stylers: [
            {
              color: '#6a6d63'
            },
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'transit.station.bus',
          elementType: 'labels.icon',
          stylers: [
            {
              color: '#6a6d63'
            },
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'transit.station.rail',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#41433d'
            }
          ]
        },
        {
          featureType: 'transit.station.rail',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#6a6d63'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#43453e'
            }
          ]
        }
      ]
    }

  map = new google.maps.Map(mymap, map_options)
  const html = 'Código Natural - Lo natural en su estado puro'
  const marker = new google.maps.Marker({
    position: desarrolloLatlng,
    map: map,
    info: html
  })

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(this.info)
    infowindow.open(map, this)
  })
}
