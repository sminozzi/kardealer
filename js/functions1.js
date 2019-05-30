/* global kardealer_screenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */
(function($) {
	var body, masthead, menuToggle, siteNavigation, socialNavigation, siteHeaderMenu, resizeTimer;
	function kardealer_initMainNavigation(container) {
		// Add dropdown toggle that displays child menu items.
		var dropdownToggle = $('<button />', {
			'class': 'dropdown-toggle',
			'aria-expanded': false
		}).append($('<span />', {
			'class': 'screen-reader-text',
			text: kardealer_screenReaderText.expand
		}));
		container.find('.menu-item-has-children > a').after(dropdownToggle);
		// Toggle buttons and submenu items with active children menu items.
		container.find('.current-menu-ancestor > button').addClass('toggled-on');
		container.find('.current-menu-ancestor > .sub-menu').addClass('toggled-on');
		// Add menu items with submenus to aria-haspopup="true".
		container.find('.menu-item-has-children').attr('aria-haspopup', 'true');
		container.find('.dropdown-toggle').click(function(e) {
			var _this = $(this),
				screenReaderSpan = _this.find('.screen-reader-text');
			e.preventDefault();
			_this.toggleClass('toggled-on');
			_this.next('.children, .sub-menu').toggleClass('toggled-on');
			// jscs:disable
			_this.attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');
			// jscs:enable
			// screenReaderSpan.text(screenReaderSpan.text() === kardealer_screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand);
            if(typeof screenReaderText !== 'undefined')
            { 
                screenReaderSpan.text(screenReaderSpan.text() === kardealer_screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand);
		    }
		});
	}
	kardealer_initMainNavigation($('.main-navigation'));
	masthead = $('#masthead');
	menuToggle = masthead.find('#menu-toggle');
	siteHeaderMenu = masthead.find('#site-header-menu');
	siteNavigation = masthead.find('#site-navigation');
	socialNavigation = masthead.find('#social-navigation');
	// Enable menuToggle.
	(function() {
		// Return early if menuToggle is missing.
		if (!menuToggle.length) {
			return;
		}
		// Add an initial values for the attribute.
		menuToggle.add(siteNavigation).add(socialNavigation).attr('aria-expanded', 'false');
		menuToggle.on('click.kardealer', function() {
			$(this).add(siteHeaderMenu).toggleClass('toggled-on');
			// jscs:disable
			$(this).add(siteNavigation).add(socialNavigation).attr('aria-expanded', $(this).add(siteNavigation).add(socialNavigation).attr('aria-expanded') === 'false' ? 'true' : 'false');
			// jscs:enable
		});
	})();
	// Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
	(function() {
		if (!siteNavigation.length || !siteNavigation.children().length) {
			return;
		}
		// Toggle `focus` class to allow submenu access on tablets.
		function kardealer_toggleFocusClassTouchScreen() {
			if (window.innerWidth >= 910) {
				$(document.body).on('touchstart.kardealer', function(e) {
					if (!$(e.target).closest('.main-navigation li').length) {
						$('.main-navigation li').removeClass('focus');
					}
				});
				siteNavigation.find('.menu-item-has-children > a').on('touchstart.kardealer', function(e) {
					var el = $(this).parent('li');
					if (!el.hasClass('focus')) {
						e.preventDefault();
						el.toggleClass('focus');
						el.siblings('.focus').removeClass('focus');
					}
				});
			} else {
				siteNavigation.find('.menu-item-has-children > a').unbind('touchstart.kardealer');
			}
		}
		if ('ontouchstart' in window) {
			$(window).on('resize.kardealer', kardealer_toggleFocusClassTouchScreen);
			kardealer_toggleFocusClassTouchScreen();
		}
		siteNavigation.find('a').on('focus.kardealer blur.kardealer', function() {
			$(this).parents('.menu-item').toggleClass('focus');
		});
	})();
	// Add the default ARIA attributes for the menu toggle and the navigations.
	function kardealer_onResizeARIA() {
		if (window.innerWidth < 910) {
			if (menuToggle.hasClass('toggled-on')) {
				menuToggle.attr('aria-expanded', 'true');
			} else {
				menuToggle.attr('aria-expanded', 'false');
			}
			if (siteHeaderMenu.hasClass('toggled-on')) {
				siteNavigation.attr('aria-expanded', 'true');
				socialNavigation.attr('aria-expanded', 'true');
			} else {
				siteNavigation.attr('aria-expanded', 'false');
				socialNavigation.attr('aria-expanded', 'false');
			}
			menuToggle.attr('aria-controls', 'site-navigation social-navigation');
		} else {
			menuToggle.removeAttr('aria-expanded');
			siteNavigation.removeAttr('aria-expanded');
			socialNavigation.removeAttr('aria-expanded');
			menuToggle.removeAttr('aria-controls');
		}
	}
	// Add 'below-entry-meta' class to elements.
	function kardealer_belowEntryMetaClass(param) {
		if (body.hasClass('page') || body.hasClass('search') || body.hasClass('single-attachment') || body.hasClass('error404')) {
			return;
		}
		$('.entry-content').find(param).each(function() {
			var element = $(this),
				elementPos = element.offset(),
				elementPosTop = elementPos.top,
				entryFooter = element.closest('article').find('.entry-footer'),
				entryFooterPos = entryFooter.offset(),
				entryFooterPosBottom = entryFooterPos.top + (entryFooter.height() + 28),
				caption = element.closest('figure'),
				newImg;
			// Add 'below-entry-meta' to elements below the entry meta.
			if (elementPosTop > entryFooterPosBottom) {
				// Check if full-size images and captions are larger than or equal to 840px.
				if ('img.size-full' === param) {
					// Create an image to find native image width of resized images (i.e. max-width: 100%).
					newImg = new Image();
					newImg.src = element.attr('src');
					$(newImg).on('load.kardealer', function() {
						if (newImg.width >= 840) {
							element.addClass('below-entry-meta');
							if (caption.hasClass('wp-caption')) {
								caption.addClass('below-entry-meta');
								caption.removeAttr('style');
							}
						}
					});
				} else {
					element.addClass('below-entry-meta');
				}
			} else {
				element.removeClass('below-entry-meta');
				caption.removeClass('below-entry-meta');
			}
		});
	}
		body = $(document.body);
		$(window).on('load.kardealer', kardealer_onResizeARIA).on('resize.kardealer', function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				kardealer_belowEntryMetaClass('img.size-full');
				kardealer_belowEntryMetaClass('blockquote.alignleft, blockquote.alignright');
			}, 300);
			kardealer_onResizeARIA();
		});
		kardealer_belowEntryMetaClass('img.size-full');
		kardealer_belowEntryMetaClass('blockquote.alignleft, blockquote.alignright');
		$("#display_loading").fadeOut("slow");
		var amountScrolled = 300;
		$(window).scroll(function() {
			if ($(window).scrollTop() > amountScrolled) {
				$('a.back-to-top').fadeIn('fast');
			} else {
				$('a.back-to-top').fadeOut('fast');
			}
		});
		$('a.back-to-top, a.simple-back-to-top').click(function() {
			$("html, body").animate({
				scrollTop: 0
			}, "fast");
			return false;
		}); 
		
		
		
		/* Sticky Header */

		$(window).bind("load resize scroll", function(e) {
			win = $(window);
    		var kardealerwidth = document.body.offsetWidth;
   			var top_header = $("#top_header");
   			var site_header = $(".site-header"); 
    			var site_header_main = $(".site-header-main");
       			var kardealer_my_shopping_cart = $(".kardealer_my_shopping_cart");
       			var site_content = $(".entry-content"); 
                /* kardealer_my_shopping_cart*/
    			var pos = site_header.offset().top;
    			var kardealerwidth = document.body.offsetWidth;
				var rolou = win.scrollTop();
				var entry_title = $(".entry-title");
				
  
	            //			site_header_main.attr('style', 'padding-bottom: 10px !important;');
 
    			rolar = rolou - 725;
				var site_header_menu  = $(".site-header-menu");
				

             if (kardealerwidth < 1000)
             {
                site_header_menu.attr('style', 'font-size: 12pt !important');
                jQuery('.search-toggle').hide();
             }
             else
             {
                 jQuery('.search-toggle').show();
			 }  
			 
			 
            if (kardealerwidth > 910) 
            {                
    			if (rolou > 1) {


					site_header_main.css({
						"opacity": ".9"
					});
					site_header.attr('style', 'margin-top: -650px !important;');
					site_header.css({
						"position": "fixed",
						"padding-top": "0px !important",
						"min-height": "90px !important"
					});
					site_header_main.attr('style', 'margin-top: -20px !important'); /* 40px */
					top_header.slideUp();
					// realestaterightnow_my_shopping_cart.slideUp();
					kardealer_my_shopping_cart.slideUp();
					rolarcontent = 30; // 110



					if (entry_title.is(':visible')) {
						rolarcontent = -400;
						entry_title.attr('style', 'margin-top: ' + (rolarcontent) + 'px !important;');
					} else {
						rolarcontent = -400;
						site_content.attr('style', 'margin-top: ' + (rolarcontent) + 'px !important;');
					}
	

				
				} else {
     				 site_header.attr('style', 'margin-top: -725px !important;') // , 'max-height: 50px!important');
    				site_header_main.attr('style', 'margin-top: 55px !important');
    				kardealer_my_shopping_cart.attr('style', 'display: block !important');
                    if (kardealerwidth > 910) {
    					top_header.attr('style', 'display: block');
                    }
                    top_header.attr('style', 'margin-top: 30px !important');
				
				
				
					rolarcontent = 670;
					if (entry_title.is(':visible')) {
						rolarcontent = 260;
						entry_title.attr('style', 'margin-top: ' + (rolarcontent) + 'px !important;');
					} else {
						rolarcontent = 240;
						
						site_content.attr('style', 'margin-top: ' + (rolarcontent) + 'px !important;');
					}
					
				
				
				
				
				
				}
             }
             else  // < 911
             {

                top_header.attr('style', 'display: none !important');
                site_header.css({
                        "position": "relative",
                    }); 
     			if (rolou > 100) {
    			    rolar = rolar + 60;
                	site_header_main.attr('style', 'margin-top: 0px !important;') // , 'max-height: 50px!important');
    				site_header.attr('style', 'margin-top: ' - rolar + 'px !important;') // , 'max-height: 50px!important');
     				site_header.attr('style', 'padding-bottom: 10px !important;') // , 'max-height: 50px!important');
				
				
				
				} else {
                       site_header_main.attr('style', 'margin-top: 40px !important;') // , 'max-height: 50px!important');
    			}
				 

				if (entry_title.is(':visible')) {
					rolarcontent = 250;
					entry_title.attr('style', 'margin-top: ' + (rolarcontent) + 'px !important;');
                } else {
					rolarcontent = 240;
					site_content.attr('style', 'margin-top: ' + (rolarcontent) + 'px !important;');
                }

			
			
			
			
			
					}
		});







                  $( "a" ).hover(
                  function() {
                    $( this ).animate({
                      opacity: .7
                      }, 500 );
                  }, 
                  function() {
                     $( this ).animate({
                         opacity: 1
                         }, 500 );      
                  }
                  );
})(jQuery);
jQuery(function () 
{ 
    jQuery(window).on('load', function () {
      jQuery("#kar-loader").fadeOut();
    });
		jQuery('#search-toggle').click(function(e) {
			if (jQuery('#kardealer_searchform').is(':visible')) {
                 jQuery("#kardealer_searchform").slideUp();
			} else {
				jQuery("#kardealer_searchform").slideDown();
			}
		});
		// Search toggle
		jQuery('.search-submit').click(function(e) {
			if (jQuery(this).parent().find('.search-field').val() == '') {
				e.preventDefault();
				jQuery("#kardealer_searchform").slideUp();
			}
		});
		if (jQuery(".kardealer_blog_grid").length) {
			var m = new Masonry(jQuery('.kardealer_blog_grid').get()[0], {
				itemSelector: ".kardealer_masonry_thumbnail",
				gutter: 0
			});
		}
});