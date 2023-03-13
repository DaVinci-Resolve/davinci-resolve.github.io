// ---
// ---
//  3D Carousel
//  ---
var captionContainer = $(".overview-onesolution .owl-carousel").children();

var carouselImgs = [
    {
        "imgsrc": "onesolution/carousel/fusion.jpg",
        "caption": $($(captionContainer[3]).children()[0]).attr("alt")
    },
    {
        "imgsrc": "onesolution/carousel/fairlight.jpg",
        "caption": $($(captionContainer[4]).children()[0]).attr("alt")
    },
    {
        "imgsrc": "onesolution/carousel/cut.jpg",
        "caption": $($(captionContainer[0]).children()[0]).attr("alt")
    },
    {
        "imgsrc": "onesolution/carousel/edit.jpg",
        "caption": $($(captionContainer[1]).children()[0]).attr("alt")
    },
    {
        "imgsrc": "onesolution/carousel/color.jpg",
        "caption": $($(captionContainer[2]).children()[0]).attr("alt")
    }
]

var carousel3D = document.getElementById("carouselSpecial");
var initcounter = Math.floor( (carouselImgs.length/2) - 2)
var moving = false;
var paginating = false
var arrowsInitialised = false;
var imgPath = ""
var direction;

carouselInit()

function carouselInit () {// initialise carousel
    imgPathInit()
    // Include initial Slides
    var frames = $(".carousel3d .frame")
    for (i=0;i<5;i++) {
        var currentFrame = $(frames[i])
        var currentImg = $(frames[i]).find(".slide")

        currentImg.attr("src", imgPath + carouselImgs[initcounter].imgsrc)
        currentImg.attr("data-index", initcounter)
        currentImg.addClass("slide-"+initcounter)
        $(".slide-info .gallery-caption").text(carouselImgs[Math.floor(carouselImgs.length/2)].caption)
        $(".slide-info .counter-current").text(Math.floor(carouselImgs.length/2) + 1)
        $(".slide-info .counter-max").text(carouselImgs.length)
        initcounter++
    }
    // Include pagination
    carouselImgs.forEach((item, index) => {
        var markup = `<div class="pag pag-${index}" data-index="${index}"></div>`
        $(".pagination").append(markup)
    })
    // Apply active class to current slide/pag
    var currentSlideIndex = $(".currentSlide").find("img").attr("data-index")
    $(".pag-" + currentSlideIndex).addClass("active")
}

function imgPathInit() {// Generate image src path
    var fullImgSrc = $(".pos--2").find("img").attr("data-path").split("/")
    fullImgSrc.pop()
    fullImgSrc.forEach((item) => {
        imgPath += item
        imgPath += "/"
    })
    return imgPath
}

function updateSlides(frame, index) {
    $(".pag").removeClass("active")
    // Update image src of end slides
    frame.find("img").attr("src", imgPath + carouselImgs[index].imgsrc)
    frame.find("img").attr("data-index", index)
    frame.find("img").removeClass().addClass("slide-" + index)
}

function paginater(direction) {
    paginating = true
    var currentSlideIndex = parseInt($(".pos-0").find("img").attr("data-index"))
    var counterCurrent = $(".slide-info .counter-current")
    var caption = $(".slide-info .gallery-caption")
    if (direction == "right") {
        if (currentSlideIndex == 0) {
            counterCurrent.text(carouselImgs.length)
            caption.text(carouselImgs[carouselImgs.length-1].caption)
        } else {

            caption.text(carouselImgs[currentSlideIndex-1].caption)
            counterCurrent.text(currentSlideIndex)
        }
        $(".pos-0").removeClass("currentSlide")
        $(".pos--1").addClass("currentSlide")
    } else {
        if ((currentSlideIndex+1) == (carouselImgs.length)) {


            counterCurrent.text(1)
            caption.text(carouselImgs[0].caption)
        } else {
            counterCurrent.text(currentSlideIndex+2)
            caption.text(carouselImgs[currentSlideIndex+1].caption)
        }
        $(".pos-0").removeClass("currentSlide")
        $(".pos-1").addClass("currentSlide")
    }
}

function carouseller() {
    if(!moving) {
        moving = true

        // Right Arrow was clicked - clone the first frame
        var firstFrame = $(".carousel3d .frame").first()
        var lastFrame = $(".carousel3d .frame").last()
        if(direction == "left" && firstFrame.attr("data-position") == "-2") {
            var $first = firstFrame.clone(true)
            $(".carousel-inner").append($first)
            $first.removeClass("pos--2").addClass("pos-3").attr("data-position", "3")
            // Check if last frame is last item in array
            if (parseInt(lastFrame.find("img").attr("data-index")) == carouselImgs.length-1) {
                updateSlides($first, 0)
            } else {

                var lastSlideIndex = parseInt(lastFrame.find("img").attr("data-index"))

                updateSlides($first, (lastSlideIndex+1))
            }
        }

        // Left Arrow was clicked - cloned the last frame
        if(direction == "right" && lastFrame.attr("data-position") == "2") {
            var $last = lastFrame.clone(true)
            $(".carousel-inner").prepend($last)
            $last.removeClass("pos-2").addClass("pos--3").attr("data-position", "-3")
            // Check if last frame is first item in array
            if (parseInt(firstFrame.find("img").attr("data-index")) == 0) {
                updateSlides($last, (carouselImgs.length-1))
            } else {
                var firstSlideIndex = parseInt(firstFrame.find("img").attr("data-index"))
                updateSlides($last, (firstSlideIndex-1))
            }
        }

        if (paginating == false) {
            paginater(direction)
        }

        if(direction == "left") {
            $(".carousel-inner").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", ".pos--3", function () {
                $(this).remove()
                paginating = false
                moving = false
            })
        } else {
            $(".carousel-inner").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", ".pos-3", function () {
                $(this).remove()
                paginating = false
                moving = false
            })
        }

        setTimeout(function() {
            var frames = $(".carousel3d .frame")
            frames.each(function (index) {

                // Remove the current position class
                $(this).removeClass(function (index, className) {
                    return (className.match (/(^|\s)pos-\S+/g) || []).join(' ')
                })

                // Get the current position number
                var newPosNumber = Number($(this).attr("data-position"))

                // Calc the new position number
                if(direction == "left") {
                    newPosNumber = newPosNumber - 1
                    if(newPosNumber == -4) newPosNumber = 3
                } else {
                    newPosNumber = newPosNumber + 1
                    if(newPosNumber == 4) newPosNumber = -3
                }

                // Apply the new info
                $(this).addClass("pos-" + newPosNumber.toString())
                $(this).attr("data-position", newPosNumber.toString())
            })
        }, 70) // End of timeout
    }
}

// Trigger the move on nav click
$(".carousel-button").on("click", function () {
    direction = $(this).attr("data-direction")
    if($(window).width() >= 768) {
        carouseller()
    }
}) // End of button click

function containerScaler() {
    if($(window).width() >= 769 && $(window).width() < 1440) {
        var insetWindowWidth = ($(window).width() - 40)
        $('.overview-onesolution .owl-carousel').owlCarousel('destroy')

        var contentWidth = $(".carousel3d").width()
        var contentSize = $('.carousel3d .frame.currentSlide')[0].getBoundingClientRect();
        var scaleAmount = insetWindowWidth / contentWidth
        var captionWidth = ((contentSize.width) - 2)

        $('.carousel3d').attr('style', '-webkit-transform:scale(' + scaleAmount + ')')

        contentSize = $('.carousel3d .frame.currentSlide')[0].getBoundingClientRect();
        scaleAmount = insetWindowWidth / contentWidth
        captionWidth = ((contentSize.width) - 2)

        $('.slide-info').css('max-width', captionWidth)
    }

    if($(window).width() <= 768) {
        initialiseCarousel()

        var currentSlide = $(".owl-item.active .image-cont").attr("data-position")
        var currentSlideCaption = $(".owl-item.active .image-cont img").attr("alt")
        $(".owl-carousel-captions .counter-current").text(currentSlide)
        $(".owl-carousel-captions .gallery-caption").text(currentSlideCaption)

        var owl = $('.owl-carousel.sml')
        owl.on('dragged.owl.carousel', function(event) {
            changeSlideCaptions();
        });

        owl.on('translated.owl.carousel', function(event) {
            changeSlideCaptions();
        });

        function changeSlideCaptions(event) {
            var currentSlide = $(".owl-item.active .image-cont").attr("data-position")
            var currentSlideCaption = $(".owl-item.active .image-cont img").attr("alt")
            $(".owl-carousel-captions .counter-current").text(currentSlide)
            $(".owl-carousel-captions .gallery-caption").text(currentSlideCaption)
            $(".owl-carousel-captions .counter-max").text($(".owl-item .image-cont").length)
        }
    };

    if($(window).width() >= 1441) {
        $('.carousel3d').attr('style', '-webkit-transform:scale(1)')
        $('.slide-info').css('max-width', '846px')
    };

    if (!arrowsInitialised && $(this).width() <= 768) {
        addNavArrows();
        arrowsInitialised = true;
    }

    if (arrowsInitialised && $(this).width() > 768) {
        removeNavArrows();
        arrowsInitialised = false;
    }
}

function addNavArrows() {
  $(".carosel-background .owl-nav .owl-prev").append('<svg width="10px" height="10px" viewBox="0 0 37 64" class="carousel-button second" data-direction="right"><g> <polygon id="Next" points="2.81502678 29.8876471 32.7026739 1.25136985e-13 36.9723378 4.26966388 9.2195226 32.0224791 36.9723378 59.7752943 32.7026739 64.0449581 0.680194847 32.0224791 2.81502678 29.8876471" fill="#000000"></polygon></g></svg>');
  $(".carosel-background .owl-nav .owl-next").append('<svg width="10px" height="10px" viewBox="0 0 37 64" class="carousel-button second" data-direction="right"><g> <polygon id="Next" points="2.81502678 29.8876471 32.7026739 1.25136985e-13 36.9723378 4.26966388 9.2195226 32.0224791 36.9723378 59.7752943 32.7026739 64.0449581 0.680194847 32.0224791 2.81502678 29.8876471" fill="#000000"></polygon></g></svg>');
}

function removeNavArrows() {
  $($(".carosel-background .owl-nav .owl-prev")[0]).empty();
  $($(".carosel-background .owl-nav .owl-next")[0]).empty();
}

$( window ).resize(function() {
    containerScaler()
})

$(window).load(function() {
    containerScaler()
});

// Start Owl Carousel initialise and destroy functions
function initialiseCarousel() {
    $('.overview-onesolution .owl-carousel').owlCarousel({
        loop: false,
        margin: 0,
        nav: true,
        dots: true,
        items: 1,
        navText: ""
    });
}
