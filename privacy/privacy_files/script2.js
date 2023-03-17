function isRetinaDevice(e){if(e.devicePixelRatio>1)return!0;if(e.matchMedia){var o=["only screen and (-webkit-min-device-pixel-ratio: 2)","only screen and (min-resolution: 2dppx)","only screen and (min-resolution: 192dpi)"].join(",");return e.matchMedia(o).matches}return!1}function launchVideo(e){var o=$(".blackout.video"),t=$(".video-container");if(!o.hasClass("video-is-open")){$("html").css("overflow","hidden");var n,i="undefined"!=typeof $(e).attr("data-videoresponsive"),a=$(e).attr("rel"),c=$(e).attr("player")||"vimeo";if(i){var r=$('<a class="close-video"></a>');switch($(".video-container").append(r),c){case"vimeo":n=['<iframe src="//player.vimeo.com/video/',a,'?autoplay=true&dnt=1" allowfullscreen frameborder="0"></iframe>'].join("");break;case"youku":n=['<iframe src="http://player.youku.com/embed/',a,'?autoplay=true" allowfullscreen frameborder="0"></iframe>'].join("");break;case"youtube":n=['<iframe src="https://www.youtube.com/embed/',a,'?autoplay=1&fs=1&playsinline=0" allowfullscreen frameborder="0"></iframe>'].join("")}}else{var s=$(e).data("width")||960,l=$(e).data("height")||540,u=s/2*-1,d=l/2*-1;switch(t.css({width:s,height:l,marginLeft:u,marginTop:d}),c){case"vimeo":n=['<iframe src="//player.vimeo.com/video/',a,'?autoplay=true&dnt=1" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" width="',s,'" height="',l,'"></iframe>'].join("");break;case"youku":n=['<iframe src="http://player.youku.com/embed/',a,'?autoplay=true" allowfullscreen frameborder="0" width="',s,'" height="',l,'"></iframe>'].join("");break;case"youtube":n=['<iframe src="https://www.youtube.com/embed/',a,'?autoplay=1&fs=1&playsinline=0" allowfullscreen frameborder="0" width="',s,'" height="',l,'"></iframe>'].join("")}}o.bind("mousewheel",function(e){e.preventDefault()}),$(".blackout").fadeIn(function(){t.fadeIn(function(){t.bind("mousewheel",function(e){e.preventDefault()}),t.append(['<div class="video-content">',n,"</div>"].join("")),o.addClass("video-is-open"),i?$(".video-content").css({"box-shadow":"0 0 15px rgba(0,0,0,0.3)"}):t.css({"box-shadow":"0 0 15px rgba(0,0,0,0.3)"})})}),$(".blackout a, .blackout, .close-video").click(function(e){return $("html").css("overflow",""),!!o.hasClass("video-is-open")&&(o.removeClass("video-is-open"),t.fadeOut(function(){o.fadeOut();var e=document.location.hash;e&&e.match(/play-(.*)/)&&(document.location.hash=""),t.empty(),t.unbind("mousewheel"),o.unbind("mousewheel")}),e.preventDefault(),void 0)})}}$(function(){function e(){$("#gn-menu-state").prop("checked")?($(".gn-list").addClass("click-closed"),$(".location").addClass("click-closed")):($(".gn-list").removeClass("click-closed"),$(".location").removeClass("click-closed"))}function o(){$("#gn-menu-state").prop("checked")||$("#sub-menu-state").prop("checked")||$("#sub-menu-location-state").prop("checked")&&!$("html").hasClass("no-scroll")?$("html").addClass("no-scroll"):$("html").removeClass("no-scroll")}function t(e){$("body").hasClass("responsive")||(e=e<0?0:e,$(".global-nav").css({position:"absolute",top:e}))}function n(){$(".location-changer-modal").removeClass("location-changer-active"),$(".blackout").removeClass("blackout-active"),$("html").removeClass("noScroll")}function i(){var e=$(".lc-bottom-arrow"),o=$(".gf-location-flag"),t=$(".location-changer").width(),n=$(".gf-baseline").width(),i=o.position();if(i&&$(window).width()>999){var a=i.left-(n-t)/2+5;e.css("left",Math.round(a))}}function a(e,o,t,n){if(o.length<2)return'<div id="lightboxTitle">'+e+"</div>";var i=window.jsTranslation||{ImageXOfY:"Image {0} of {1}",Previous:"Previous",Next:"Next"},a=i.ImageXOfY.replace("{0}","<b>"+(t+1)+"</b>").replace("{1}","<b>"+o.length+"</b>");return['<div id="lightboxTitle">',e,"&nbsp;","<span>",a,"&nbsp;&nbsp; ",'<a href="javascript:;" onclick="$.fancybox.prev()">&lt; ',i.Previous,"</a>"," | ",'<a href="javascript:;" onclick="$.fancybox.next()">',i.Next," &gt;</a>","</span>","</div>"].join("")}if($("#gn-menu-state").on("click",function(){$("#sub-menu-state").is(":checked")&&$("#sub-menu-state").prop("checked",!1),o()}),$(window).resize(function(){$(window).width()>999&&($("#gn-menu-state").prop("checked",!1),$("#sub-menu-state").prop("checked",!1),$(".gn-list").removeClass("click-closed"),$(".sub-menu-location-state").prop("checked")&&$(".sub-menu-location-state").prop("checked",!1),o()),$(window).width()<=999&&($(".subnav-location-changer").hide(),o())}),$(".gn-burger").on("click",function(){e()}),$(".gn-overlay, .sub-overlay, .sub-content").on("click",function(){e(),$("#gn-menu-state").prop("checked",!1),$("#sub-menu-state").prop("checked",!1),$("#sub-menu-location-state").prop("checked",!1),o()}),$("html").on("touchmove","no-scroll",function(e){e.preventDefault()}),$("footer.small .gf-links h1").click(function(e){$(this).parent().toggleClass("open")}),$(".sub-menu-location-dropdown").click(function(){var e=!1,t=!1;return $(".countries-state").prop("checked")&&($(".countries-state").prop("checked",!1),e=!0),$(".sub-menu-state").prop("checked")&&($(".sub-menu-state").prop("checked",!1),t=!0),t?setTimeout(function(){$(".sub-menu-location-state").prop("checked",function(e,o){return!o})},300):e?(setTimeout(function(){$(".sub-menu-location-state").prop("checked",function(o,t){return e=!1,!t})},300),setTimeout(function(){o()},300)):($(".sub-menu-location-state").prop("checked",function(e,o){return!o}),setTimeout(function(){o()},300)),!1}),$(".image-sizer").css({height:"auto"}),window.screen.availWidth<1e3){if(!$("body").hasClass("responsive")){var c=$(window).scrollTop();t(c)}$(window).on("touchstart",function(e){var o=setInterval(function(){c>=window.pageYOffset+5&&(clearInterval(o),t(0)),c=window.pageYOffset},33)}),$(window).on("touchmove",function(e){c>=window.pageYOffset+10&&t(0)}),$(window).on("touchend",function(e){var o=0,n=setInterval(function(){c==window.pageYOffset?o++:(o=0,t(0)),3==o&&(clearInterval(n),t(c)),c=window.pageYOffset},150)}),$(window).on("gestureend",function(e){t(c)})}if($(".sub-menu-location-dropdown").click(function(){return $(".location-changer").is(":visible")&&$(".location-changer").toggle("blind",{direction:"down"},250),$(".subnav-location-changer").toggle("blind",{direction:"up"},250),!1}),$(".gf-location-changer-link").click(function(){return $(".subnav-location-changer").is(":visible")&&$(".subnav-location-changer").toggle("blind",{direction:"up"},250),$(".location-changer").toggle("blind",{direction:"down"},250),!1}),$(".sf-location-changer-link").click(function(e){$(".location-changer-modal").addClass("location-changer-active"),$(".blackout").addClass("blackout-active"),$("html").addClass("noScroll");var o=$(".location-changer-modal .location-changer-sites a:first-child").attr("current-country");$(".location-changer-modal .location-changer-sites a."+o).addClass("active"),e.preventDefault()}),$(".location-changer-close").click(function(e){n(),e.preventDefault()}),$(".blackout").bind("touchend",function(e){n(),e.preventDefault()}),$(".sub-dropdown").click(function(){var e=!1;return $(".sub-menu-location-state").prop("checked")&&($(".sub-menu-location-state").prop("checked",!1),e=!0),e?(setTimeout(function(){$(".sub-menu-state").prop("checked",function(o,t){return e=!1,!t})},300),setTimeout(function(){o()},300)):($(".sub-menu-state").prop("checked",function(e,o){return!o}),setTimeout(function(){o()},300)),!1}),$("footer.small .gf-location").click(function(e){$(".countries-state").prop("checked",!$(".countries-state").is(":checked")),$(".sub-menu-location-state").prop("checked")&&($(".sub-menu-location-state").prop("checked",!1),o())}),setTimeout(i,2e3),$(window).resize(function(){i()}),$().fancybox){var r=$("a.lightbox");if(null!=r&&r.length){var s=!!isRetinaDevice&&isRetinaDevice(window),l=/(\.(?:jpg|gif|png|bmp|jpeg)(.*)?)$/i;r.each(function(e,o){var t=$(o),n=s&&!t.hasClass("one-x");if(n){var i=t.attr("href");l.test(i)&&t.attr("href",i.replace(l,"@2x$1"))}t.fancybox({isRetina:n,padding:30,margin:20,overlayColor:"#FFF",hideOnContentClick:!1,showNavArrows:!1,showCloseButton:!0,cyclic:!0,titlePosition:"inside",titleFormat:a})})}}window.__bmdSetFooterHeight=function(){$("#global-footer").css("height","auto");var e=$(window).height(),o=$("body").height(),t=e-o;if(t<=0)return!1;var n=$("#global-footer").height()+t;return $("#global-footer").height(n),!0};var u=null,d=!1;window.__bmdDetermineFooterHeight=function(){null==u&&(u=setTimeout(function(){var e=window.__bmdSetFooterHeight();e?d||(d=!0,$("body").on("DOMSubtreeModified",window.__bmdDetermineFooterHeight)):d&&(d=!1,$("body").off("DOMSubtreeModified",window.__bmdDetermineFooterHeight))},500))},$(window).height()>$("body").height()&&(window.__bmdSetFooterHeight(),window.__bmdDetermineFooterHeight()),$(".product-grid-row").each(function(){var e=$(this).children(".product-grid-item").length;if(e>1){var o=0;$(this).children(".product-grid-item").each(function(){$(this).height()>o&&(o=$(this).height())}),$(this).children(".product-grid-item").each(function(){if($(this).height()<o){var e=o-$(this).height()+parseInt($(this).find("p").css("marginBottom"));$(this).find("p").css("marginBottom",e)}})}});var h=$(".watch-video");if(h.length>0){var f=$('<div class="blackout video"><a href="#"></a></div>'),p=$('<div class="video-container"></div>');$("body").append(f).append(p),h.off("click"),h.click(function(e){e.preventDefault(),launchVideo($(this))});var m=function(){var e=document.location.hash;if(e){var o=e.match(/play-(.*)/);if(o){var t=o[1],n=$("#"+t+" .watch-video");n.length&&launchVideo(n)}}};m()}});