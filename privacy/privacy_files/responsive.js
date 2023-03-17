$(function() {
    // Store refine menu pop up
    // run test on initial page load
    checkSize();
    // run test on resize of the window
    $(window).resize(checkSize);
    function checkSize(){
        if ($('.filter-menu .refine-overlay').css('display') == 'none' ){
            $('.filter-menu .menu-head-wrap').on('click', function () {
                $('.filter-menu .refine-overlay').addClass('filter-menu-active');
            })
        }
        $('.filter-by-head').on('click', function() {
            $('div').removeClass('filter-menu-active');
        });
    }

    // ************************** //
    // Section Jump functionality //
    // ************************** //
    var jumping = false;

    // Adjust dropdown state
    $('.section-jump').on('click', function() {
        $('.section-jump-overlay').show();
    })
    $('.jump-arrow, .section-jump-label').on('click', function() {
        if ($('.section-jump-state').prop('checked')) {
            $('.section-jump-label').show();
            $('.section-jump-state').prop('checked', false);
        } else {
            $('.section-jump-label').hide();
            $('.section-jump-state').prop('checked', true);
        }
    })
    $('.section-jump-overlay, .section-jump-dropdown a').on('click', function() {
        $('.section-jump-state').prop('checked', false);
        $('.section-jump-overlay').hide();
    })


    var headings = $('.product-section h1, .product-section h2:not([data-nojump])');

    $('.section-jump .section-jump-dropdown').on('click', 'li', function(e) {
        e.preventDefault();
        if (!jumping) {
            jumping = true;
            $('.section-jump-label').show();
            $('.section-jump-dropdown .selected').removeClass('selected');
            $(this).parent().addClass('selected');
            $('.section-jump-label span').text($(this).text());
            $('.section-jump-state').prop('checked', false);

            // Scroll animations
            var sectionJumpTo = $(this).index();
            var sectionJumpPos = headings.eq(sectionJumpTo).offset().top;

            // Adjust for nav elements
            sectionJumpPos -= 190;
            // Disabled until "menu position adjusted on scroll" feature is reimplemented
            // sectionJumpPos -= 88;

            $('html, body').animate({
                scrollTop: sectionJumpPos
            }, 1000, function() {
                jumping = false;
                $('.section-jump-overlay').hide();
            });
        }
    })

    // Get page co-ordinates of each title and add to array
    if ($('.section-jump').length > 0) {
        headings.each(function(index) {

            $(this).attr('data-section-jump-id', index);

            // Dont include element with data-nojump
            if ($(this).is('[data-nojump]')) {
                return;
            } else {
                $('.section-jump-dropdown').append('<li><a href="#">' + $(this).text() + '</a></li>');
                var el = $(this);
                var scrollDirection;

                // Future proof for menuUp functionality
                var windowPosOffset;
                var adjustPosOffset;
                if ($('body').hasClass('menuUp')) {
                    windowPosOffset = $('.gn-sub').height() + 40;
                } else {
                    windowPosOffset = $('.global-nav').height() + 40;
                }

                // Scroll direction requires different offsets
                $(this).waypoint({
                    handler: function(direction) {
                        if (direction === 'down' && !jumping) {
                            $('.section-jump-label span').text(el.text());
                            $('.section-jump-dropdown li.selected').removeClass('selected');
                            $('.section-jump-dropdown li').eq(index).addClass('selected');
                        }
                    },
                    offset: windowPosOffset
                }).waypoint({
                    handler: function(direction) {
                        if (direction === 'up' && !jumping) {
                            $('.section-jump-label span').text(el.text());
                            $('.section-jump-dropdown li.selected').removeClass('selected');
                            $('.section-jump-dropdown li').eq(index).addClass('selected');
                        }
                    },
                    offset: function() {
                        return 130;
                    }
                });
            }
        })
        $('.section-jump-dropdown li:first-child').addClass('selected');
    }

    // Section Jump fade transitions
    $(window).on('resize', function() {
        if (window.innerWidth <= 560) {
            $('.section-jump').show();
        } else {
            $('.section-jump').hide();
        }
    })
    var timeOut;
    $(window).on('touchstart, click', function(e) {
        if (window.innerWidth <= 560) {
            $('.section-jump').fadeIn();
            clearTimeout(timeOut);
            fadeDropdown();
        }
    })


    function fadeDropdown() {
        if (window.innerWidth <= 560 && window.pageYOffset != 0) {
            timeOut = setTimeout(function() {
                if (!$('.section-jump-state').prop('checked') && window.pageYOffset != 0) {
                    $('.section-jump').fadeOut();
                }
            }, 2000);
        };
    }

    // While scrolling activate and disable interval
    // When scrolling stops - interval is active
    var sectionJumped = false;
    $(window).scroll(function() {
        if (window.innerWidth <= 560) {
            // updatePos();
            $('.section-jump').fadeIn();
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                if (!$('.section-jump-state').prop('checked') && window.pageYOffset != 0) {
                    $('.section-jump').fadeOut();
                    sectionJumped = false;
                }
            }, 2000));
        };
    });

    /**
     * Disabled until "menu position adjusted on scroll" feature is reimplemented
     */
    // Hide Global Nav on Scroll Down
    // Reveal Global Nav on Scroll Up

    // var setPos;
    // var startPos = $(window).scrollTop();
    // var posArray = [];
    // function updatePos() {
    //     setPos = setInterval(function(){
    //         startPos = $(window).scrollTop();
    //         posArray.push(startPos);
    //         if (posArray.length > 3) {
    //             posArray.splice(0, 1);
    //         }
    //         if (posArray[2] > posArray[0] && window.pageYOffset > 85 || sectionJumped === true) {
    //             $('body').addClass('menuUp');
    //         }
    //         if (posArray[2] < posArray[0] || window.pageYOffset < 85 && sectionJumped === false) {
    //             $('body').removeClass('menuUp');
    //         }
    //     }, 33);
    // }

    // $('.section-jump-dropdown a, .models-menu a').on('click', function(){
    //     sectionJumped = true;
    // })

});


/**
 * A helper function to dynamically select images on a page.
 *
 * To allow for a greater flexibility a "data-selector-id" and a "data-selectable-id" attribute
 * should be used respectively on the buttons and on the dynamicly controlled content.
 *
 * Example:
 *     <div>
 *         <div class="my-custom-image-container-class">
 *             <img data-selectable-id="1" class="an-image-class" src="src.jpg">
 *             <img data-selectable-id="2" class="an-image-class" src="src.jpg">
 *             <img data-selectable-id="3" class="an-image-class" src="src.jpg">
 *             <img data-selectable-id="4" class="an-image-class" src="src.jpg">
 *         </div>
 *         <div class="my-custom-selector-class">
 *             <p data-selector-id="1" class="active">AAA</p>
 *             <p data-selector-id="2">BBB</p>
 *             <p data-selector-id="3">CCC</p>
 *             <p data-selector-id="4">DDD</p>
 *         </div>
 *     </div>
 *
 *     makeImgSelector(".my-custom-selector-class", "my-custom-image-container-class", "active")
 *
 * @param  {String} buttonsContainerSelector    A CSS selector used to find the buttons triggering the image change. (ie: ".my-control-class")
 * @param  {String} imageContainerSelector      A CSS selector used to find the image container. (ie: ".my-section my-container")
 * @param  {String} activeClass                 (Optional) The class used to represent the active state (ie/default: "active")
 * @param  {Bool}   dissolve                     (Optional) Enable animation
 * @param  {Bool}   autoplay                     (Optional) Enable automatic switching only availabe if "dissolve" is true
 */
var makeImgSelector = function(buttonsContainerSelector, imagesContainerSelector, activeClass, dissolve, autoplay) {

    activeClass = activeClass || 'active';

    var multipleSelectables = false;
    var $buttonsContainer = $(buttonsContainerSelector);
    var $imageContainer = $(imagesContainerSelector);
    var $buttons = $buttonsContainer.find("[data-selector-id]");
    var $imageSelector = $imageContainer.find("[data-selectable-id]");
    var isAnimationPlaying = false;
    var defaultTimer = 3000;
    if ($buttons.length === 0) {
        console.error('No nodes with "data-selector-id" attribute found.');
    }

    if($.isArray(imagesContainerSelector)) {
        multipleSelectables = true;
        var $imagesContainer = $(imagesContainerSelector);
        var $images = [];
        for(i = 0; i < imagesContainerSelector.length; i++) {
            $(imagesContainerSelector[i]).each(function() {
                $(this).find("[data-selectable-id]").each(function(){
                    $images.push(this);
                });
            })
        }
    } else {
        var $imagesContainer = $(imagesContainerSelector);
        var $images = $imagesContainer.find("[data-selectable-id]");
        if ($images.length === 0) {
            console.error('No nodes with "data-selectable-id" attribute found.');
        }
    }
    if (autoplay && dissolve) {
        var timer = setInterval(function () {
            $($imageSelector).css({'zIndex' : '1', 'position' : 'absolute'})
            var activeButton = $buttons.filter("." + activeClass);
            var activeImage = $imageSelector.filter("." + activeClass);
            var activeButtonIndex = activeButton.index();
            var buttonLength = $buttons.length;
            var nextId = activeButtonIndex+1;
            if(nextId == buttonLength-1) {
                nextId = 0;
                $(activeImage).removeClass(activeClass).css({'zIndex' : '1'})
                $($imageSelector[activeButtonIndex]).addClass(activeClass)
                $($imageSelector[nextId]).removeClass(activeClass)
            }
            $(activeImage).addClass(activeClass).css({'zIndex' : '2'})
            // console.log("next id = " + nextId)
            // console.log("active ID = " + activeButtonIndex)
            $($imageSelector[nextId]).css({'opacity' : 0, 'zIndex' : '3', 'position' : 'relative'}).animate({ 'opacity': 1 }, defaultTimer, function() {
                $($imageSelector[nextId]).addClass(activeClass);
                $(activeImage).removeClass(activeClass);
                activeButton.removeClass(activeClass);
                $($buttons[nextId]).addClass(activeClass);
            });
        }, defaultTimer);
    }
    // Listen for click events
    $buttons.on("click", function(e) {
        e.preventDefault();
        clearInterval(timer);
        if (!isAnimationPlaying && !$(this).hasClass(activeClass)) {
            $this = $(this);

            // Remove active class on the currently active button
            $buttons.filter("." + activeClass).removeClass(activeClass);

            // Add active class on new active button
            $this.addClass(activeClass);
            if(multipleSelectables) {
                var $prevImage = [];
                var $nextImage = [];
                for(i = 0; i < $images.length; i++) {
                    if($($images[i]).hasClass(activeClass)) {
                        $prevImage.push($images[i])
                    }
                }
                for(i = 0; i < $imagesContainer.length; i++) {
                    $nextImage.push($($imagesContainer[i]).find("[data-selectable-id=" + $this.get(0).dataset.selectorId + "]"));
                }
            } else {
                var $prevImage = $images.filter('.' + activeClass);
                var $nextImage = $imagesContainer.find("[data-selectable-id=" + $this.get(0).dataset.selectorId + "]");
            }

            if (dissolve) {
                isAnimationPlaying = true;
                if(multipleSelectables) {
                    for(i = 0; i < $prevImage.length; i++) {
                        $($prevImage[i]).css('zIndex', $($prevImage[i]).css('zIndex') - 1);
                    }
                    for(i = 0; i < $nextImage.length; i++) {
                        $($nextImage[i]).css('opacity', 0);
                        // Add active class on new active image
                        $($nextImage[i]).css('zIndex', '2').animate({ 'opacity': 1 }, 250, function() {
                            $($nextImage[i]).addClass(activeClass);
                            for(i = 0; i < $prevImage.length; i++) {
                                isAnimationPlaying = false;
                                $($prevImage).css('zIndex', '');
                                // Remove active class on the currently active image
                                $($prevImage).removeClass(activeClass);
                            }
                        });
                    }
                } else {
                    // Move all images to bottom layer
                    $imagesContainer.find('[data-selectable-id]').css('zIndex', 1);

                    // Move the image to the middle layer
                    $prevImage.css('zIndex', 2);

                    // Move the image to the top and fade in
                    // and add active class on new active image
                    $nextImage.css({'zIndex': 3, 'opacity': 0}).animate({ 'opacity': 1 }, 1000, function() {
                        isAnimationPlaying = false;
                        $prevImage.css('zIndex', '');
                        $nextImage.addClass(activeClass);

                        // Remove active class on the currently active image
                        $prevImage.removeClass(activeClass);
                    });
                }
            } else {
                if(multipleSelectables) {
                    for(i = 0; i < $prevImage.length; i++) {
                        // Remove active class on the currently active image
                        $($prevImage[i]).removeClass(activeClass);
                    }
                    for(i = 0; i < $nextImage.length; i++) {
                        // Add active class on new active image
                        $($nextImage[i]).addClass(activeClass);
                    }
                } else {
                    // Remove active class on the currently active image
                    $prevImage.removeClass(activeClass);
                    // Add active class on new active image
                    $nextImage.addClass(activeClass);
                }
            }
        }
    });
};


// --------------------------------------------------
// Reveal Image - Slider
// --------------------------------------------------
/**
 * A helper function to dynamically create an image slider
 *
 * To allow for a greater flexibility a "data-selector-id" and a "data-selectable-id" attribute
 * should be used respectively on the buttons and on the dynamicly controlled content.
 *
 * Example:
 *   <div class="compare">
 *      <div class="reveal">
 *          <img src="src.jpg" class="after" draggable="false" alt="alt">
 *      </div>
 *      <img src="src.jpg" class="before" draggable="false" alt="alt">
 *      <div class="slider">
 *          <img src="drag.svg" alt="Drag" draggable="false">
 *      </div>
 *   </div>
 *
 *   makeImgSlider(".compare", "30%");
 *
 * @param  {String} sliderContainer             A CSS selector used to find the container of the images overlaid on eachother
 * @param  {String} initialReveal               (Optional) A percentage value setting the initial amount the image is revealed
 */
var makeImgSlider = function(sliderContainer, initialReveal) {

    initialReveal = initialReveal || '50%';

    var container = $(sliderContainer);
    var slider = container.find('.slider');
    var reveal = container.find('.reveal');
    var revealImg = reveal.children('img');
    var startPos = container.offset().left;
    var totalWidth = container.width();

    // Set initial reveal
    revealImg.width(totalWidth);
    reveal.css('width', initialReveal);
    slider.css('left', initialReveal);

    // Update values on resize
    $(window).on('resize', function() {
        startPos = container.offset().left;
        totalWidth = container.width();
        revealImg.width(totalWidth);
    })

    // Desktop functionality
    var clicking = false;
    slider.on('mousedown', function(e) {
        clicking = true;
        e.preventDefault();
    });
    container.on('mousemove', function(e) {
        if (clicking == false) {
            return;
        };
        var revealWidth = ((e.clientX - startPos) / totalWidth) * 100;
        revealSlide(revealWidth);
    });
    $(document).on('mouseup', function(e) {
        clicking = false;
    });

    // Device functionality
    container.on('touchstart', function(e) {
        var revealWidth = ((e.originalEvent.touches[0].clientX - startPos) / totalWidth) * 100;
        revealSlide(revealWidth);
    })
    container.on('touchmove', function(e) {
        var revealWidth = ((e.originalEvent.touches[0].clientX - startPos) / totalWidth) * 100;
        revealSlide(revealWidth);
        e.preventDefault();
    })

    // Reveal logic
    function revealSlide(value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
        }
        slider.css('left', value + '%');
        container.find('.reveal').width(value + '%');
    }
}
