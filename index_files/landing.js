var sBrowser, sUsrAg = navigator.userAgent;
var tileCarouselInitialised;
var carousels = $('.overview-collaboration .owl-carousel, .overview-edit .owl-carousel, .overview-cut .owl-carousel, .overview-color .owl-carousel, .overview-fusion .owl-carousel, .overview-fairlight .owl-carousel, .overview-media .owl-carousel, .overview-multiuser .owl-carousel');

$( function() {
    videosHandler();

    if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = "Mozilla Firefox";
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
      sBrowser = "Opera";
      //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
      sBrowser = "Microsoft Internet Explorer";
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
      sBrowser = "Microsoft Edge";
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "Google Chrome or Chromium";
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "Apple Safari";
        $('.landing-3dluts .carousel-inner').addClass("smooth");
        $('.landing-3dluts .frame').addClass("smooth");
        $('.landing-3dluts .frame > img').addClass("smooth");

      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
      sBrowser = "unknown";
    }

    initialiseTileCarousel();
    setTimeout(carouselSetFontSize, 1000);
    //addGradients();
    //toggleTileCarousel();
})

$('.sound-button').on( "click", function(event) {
    if ($("#hero-video").prop('muted')) {
        $("#hero-video").prop('muted', false);
        $(".sound-button .icon").toggle();
    } else {
        $("#hero-video").prop('muted', true);
        $(".sound-button .icon").toggle();
    }
});

function initialiseTileCarousel() {
    carousels.owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        navText: "",
        /*onDrag: carouselDragCallback,
        onDragged: carouselDraggedCallback,*/
        responsive:{
          0 : {
            items: 3,
            margin: 6,
          },
          361 : {
            items: 3,
            margin: 6,
          },
          561 : {
            items: 4,
            margin: 10,
          },
          1041 : {
            items: 5,
            margin: 10,
          }
        }
    });
}

function disableTileCarousel() {
    carousels.owlCarousel('destroy');
}

function toggleTileCarousel() {
    // When:
    // Below large desktop size and carousels are not already initialised, initialise them.
    if (!tileCarouselInitialised && $(this).width() <= 1041) {
        initialiseTileCarousel();
        tileCarouselInitialised = true;
    }

    // When:
    // On large desktop size and mobile carousels are initialised, destroy them.
    if (tileCarouselInitialised && $(this).width() > 1040) {
        disableTileCarousel();
        tileCarouselInitialised = false;
    }
}

function carouselSetFontSize() {
  //Scale size based on font size 18, when tile size is 170
  //TODO Update to get the ui-card size from the carousels

  if ($(window).width() >= 769) {
    newFontSize = "19px";
  }
  else {
    var cardWidth = $($(".overview-edit .owl-carousel .ui-card")[0]).width();
    var newFontSize = (cardWidth * (19/190)).toFixed(1) + "px";
  }

  if (!newFontSize)
    return;

  carousels.each(function() {
    $(this).find(".ui-card p").each(function() {
      $(this).css({
        fontSize: newFontSize,
        lineHeight: newFontSize,
      });
    })
  })
}

window.addEventListener("resize", function() {
    //toggleTileCarousel();
    setTimeout(carouselSetFontSize, 400);
});

$('div[class*=disable-owl-swipe-]').on("touchstart mousedown", function(e) {
    // Prevent carousel swipe
    var key = "disable-owl-swipe-";
    var classes = $(this)[0].attributes.class.value;
    var index = classes.indexOf(key) + key.length;

    if (classes.substring(classes.indexOf("disable-owl-swipe-")).indexOf(" ") == -1)
      var width = classes.substring(index)
    else
      var width = classes.substring(index, index+classes.substring(index).indexOf(" "))

    if (window.innerWidth >= width)
      e.stopPropagation();
})


// ---
//  Hero video
//  ---
var heroVideo = document.getElementById('hero-video');
var replayButton = ".overview-hero .inline-video-container[data-selectable-id=1] .controls .replay-button"
heroVideo.pause();

heroVideo.onended = function() {
    $(replayButton).css("visibility","visible")

    $(replayButton).on( "click", function(event) {
        if ( heroVideo.paused ) {
           heroVideo.currentTime = 0.1;
           heroVideo.play()
           $(replayButton).css("visibility","hidden")
        }
    })
}

const heroVideoController = new ScrollMagic.Controller();
const heroVideoScene = new ScrollMagic.Scene ({
    triggerElement: ".overview-hero",
    triggerHook: 0,
});

var heroVideoAnimation = function heroVideoAnimation() {
    heroVideoScene
    .duration('100%')
    .offset(0)
    .addTo(heroVideoController)
    .on('enter', function(event){
        heroVideo.play();
    })
    .on('leave', function(event) {
        heroVideo.pause();
    })
};
heroVideoAnimation();

/*function addGradients() {
  $(".owl-stage-outer").each(function(){
      //this wrapped in jQuery will give us the current .letter-q div
      $(this).append('<div class="ui-gradient"></div>');
  });
}

function carouselDragCallback(event) {
  $($(event.currentTarget).find(".ui-gradient")[0]).css({
    opacity: 0,
  });
}


function carouselDraggedCallback(event) {
  $($(event.currentTarget).find(".ui-gradient")[0]).css({
    opacity: 1,
  });
}*/
