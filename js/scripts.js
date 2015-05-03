jQuery(document).ready(function($) {

//////////////////////////////////////////////////
// GLOBAL VARIABLES

// declare count variable
var shopCartItems=0;

//////////////////////////////////////////////////
// FUNCTIONS

function enableStickyNav () {
	// set the primary nav z-index so it's above everything else
	// NOTE:  when using the exact CSS names within .css() you must surround them with quotes or convert them to camelCasing
	$("nav.primaryNav1").css({
		"position": 'relative',
		"z-index": '15'
	});

	// enable sticky nav
	$("nav.primaryNav1").sticky({topSpacing:0});
}

function enableSlideOutShoppingCart () {
	// when user scrolls to New Arrivals
	// setting the time to 2 seconds is too slow
	// you want it immediate, lower the time
	var waypoints = $('section.newArrivals').waypoint({
		handler: function(direction) {
			switch(direction) {
				case 'up':
					TweenMax.to($('aside.slideOutShoppingCart'),0.4,{
							right: '-999999px',
							ease:Power2.easeInOut
						});
					break;
				case 'down':
					TweenMax.to($('aside.slideOutShoppingCart'),0.4,{
							right: 0,
							ease: Power2.easeInOut
						});
					break;
			}
			
		}
	});
}

function disableSlideOutShoppingCart () {
	// when user scrolls to Testimonials
	var waypoints = $('section.testimonials').waypoint({
		handler: function(direction) {
			switch(direction) {
				case 'up':
					TweenMax.to($('aside.slideOutShoppingCart'),0.4,{right:0,ease:Power2.easeInOut});
					break;
				case 'down':
					TweenMax.to($('aside.slideOutShoppingCart'),0.4,{right:'-99999px',ease:Power2.easeInOut});
					break;
			}
		}
	});
}

function makeProductsDrag2 () {
	// this function uses jQuery UI and TweenMax to allow drag and drop of products onto the shopping cart
	
	// DRAGGABLES
	// Friday, May 1, 2015 3:16 PM:  using div.wardrobeDrag fails to work on the outermost div.right... there must be a reason

	// set TimelineMax instance
	var tm = new TimelineMax({repeat:-1});

	var animateSections1 = [
		'.wardrobeDrag',
		'.specialDressDrag',
		'.collectionUnit'
	];

	for (var i = 0; i < animateSections1.length; i++) {
		$(animateSections1[i]).draggable({
			helper: 'clone',
			opacity: 0.7,
			containment: "body",
			start: function (event,ui) {
				// don't forget to pass event, ui as args or you get undefined				
				if (animateSections1[i]='div.specialDressDrag') {
					TweenMax.to(ui.helper,1,{
						border:'3px solid #FBF200',
						width:'14.375em',
						zIndex:500
					});
				} else {
					TweenMax.to(ui.helper,1,{
						border:'3px solid #FBF200',
						zIndex:500
					});
				}
			},
			revert: function(droppable) {
				if (droppable === false) {
					// Drop was rejected, tween back to original position.
					TweenMax.to(this, 0.4, {
						left:0, 
						top:0,
						border:'none',
						zIndex:0
					});
				}
				return false;
			}
		});
	}

	// DROPPABLES
	$('aside.slideOutShoppingCart').droppable({
		tolerance: 'touch',
		over: function (event,ui) {
			tm.to($('aside.slideOutShoppingCart'),0.25,{border:'5px solid #FBF200',ease:Power1.easeIn});
			tm.to($('aside.slideOutShoppingCart'),0.25,{border:'1px solid #FBF200',ease:Power1.easeIn});
			tm.to($('aside.slideOutShoppingCart'),0.25,{border:'1px solid black',ease:Power1.easeIn});
			tm.to($('aside.slideOutShoppingCart'),0.25,{border:'5px solid black',ease:Power1.easeIn});
			tm.play();
		},
		out: function (event,ui) {
			tm.to($('aside.slideOutShoppingCart'),0.25,{
				border:'5px solid black',
				ease:Power1.easeIn
			});
			tm.play();
			tm.kill();

		},
		drop: function(event, ui) {
			var x = $(this).position().left;
			var y = $(this).position().top;

			// TweenMax.to(ui.draggable, 0.4, {
			// 	left: x, 
			// 	top: y 
			// });
			
			// fold up the dragged object and make it disappear
			ui.helper.hide("fold");

			// increase the shopping cart count
			shopCartItems+=1;
			updateShopCartDisplayValue1(shopCartItems);

			console.log('Product added to cart!');
			
			// animations
			tm.to($('aside.slideOutShoppingCart'),0.25,{
				border:'5px solid black',
				ease:Power1.easeIn
			});
			tm.play();
			tm.kill();
		}
	});
}

function shopCartCount1 () {
	// whenever someone clicks on those Add to Cart buttons, update the counter 
	// later on we can add functionality to remove cart items
	
	// declare count variable
	// var shopCartItems=0;

	// the buttons to target
	var buttonObjArray = [
		$('div.purchaseShader a.button'),
		$('div.addToCartButton a.button')
	];

	// use a for loop to iterate through the array, select the object and set a click event handler on each
	for (var i = 0; i < buttonObjArray.length; i++) {
		// setup the click function on all of the a elements so they will update the shop cart count variable
		buttonObjArray[i].each(function(index, val) {
			$(this).click(function(event) {
				event.preventDefault();
				console.log("I've been clicked!");
				shopCartItems+=1;
				console.log('The number of items in the shopping cart is %s',shopCartItems);

				// or use a handler function to automatically update the DOM for the shopping cart display
				// this needs to happen each time the button is clicked
				updateShopCartDisplayValue1(shopCartItems);
			});
		});
	}

	

	// return the value of the shopCartItems for later use or updating span values
	// return shopCartItems;
	
}

function updateShopCartDisplayValue1 (shopCartItems) {
	// find the banner shopping cart and change its value in the DOM
	$('section.banner span.cartCount').text(shopCartItems);

	// find the slide out shopping cart and change its value in the DOM
	$('aside.slideOutShoppingCart span.shopCartCount').text(shopCartItems);
}

function testimonySlider1 () {

	// to make this function work well or at all you need to give your li elements unique IDs that are numbered and can be tied directly to the numbering of the slider nav...
	// you use the index() method to return the position of the li that was clicked (i.e. $(this) element clicked) and that helps you acquire the targeting on corresponding ID#

	var $testimonyRef = $('ul.testimonialList');
	var $testimonyNav = $('ul.selectorNav li');
	var $target;
	var myAnimation;
	var navClickIndex;
	var $liToTarget

	$testimonyNav.each(function(index, val) {

		$(this).on('click', function(event) {
			event.preventDefault();
			$target = $(this);

			// get this item's index value so we can match it to the correct li element to target for the testimonial list
			// use the array.index() method which returns the matched element's position
			navClickIndex = $testimonyNav.index($(this));
			console.log('Array index position of the nav button clicked %s',navClickIndex);

			// since arrays start numbering at 0 we must add one to match my 1,2,3 naming
			$liToTarget = '#testimonial' + (navClickIndex+1);

			// when this slider nav button is clicked, change its background to yellow
			$target.css('background', '#FBF200');

			// make this one's testimonial list entry appear
			// $(this).parents('section.testimonials').find($liToTarget).css('display','flex');
			// myAnimation = TweenMax.to($target.parents('section.testimonials').find($liToTarget),0.8,{display:'flex', opacity: 1, scaleX: 1.3, scaleY: 1.3, transformPerspective: 300, ease:Power2.easeIn, overwrite:'all'});
			myAnimation = TweenMax.to($target.parents('section.testimonials').find($liToTarget),0.8,{display:'flex', opacity: 1, ease:Power2.easeIn, overwrite:'all'});

			// change all the other buttons to white
			// cycle through the DOM elements
			$testimonyNav.each(function(i, v) {
				// if the number doesn't match the recorded click index that means it's not the button we pressed so change its colour
				if (i != navClickIndex) {
					$(this).css('background', 'white');

					// go up to the highest parent for this section, find the li to target and change its display value
					// since arrays start numbering at 0 we must add one to match my 1,2,3 naming
					var $liToTarget = '#testimonial'+(i+1);

					// $(this).parents('section.testimonials').find($liToTarget).css('display','none');

					TweenMax.to($(this).parents('section.testimonials').find($liToTarget),0.1,{display:'none', opacity:0, ease:Power2.easeIn, overwrite:'all'});
				} else {
					// break out of the loop if it is equal because it's the one that was pressed
					return;					
				}
			});
		});

		$(this).on('mouseout', function(event) {
			event.preventDefault();
			// myAnimation.reverse();
			// TweenMax.to($target.parents('section.testimonials').find($liToTarget),0.8,{display:'flex', opacity: 1, scaleX: 1, scaleY: 1, transformPerspective: 300, ease:Power2.easeIn, overwrite:'all'});
			TweenMax.to($target.parents('section.testimonials').find($liToTarget),0.8,{display:'flex', opacity: 1, ease:Power2.easeIn, overwrite:'all'});
		});
	});
}

//////////////////////////////////////////////////
// EXECUTION CODE

enableStickyNav();
enableSlideOutShoppingCart();
disableSlideOutShoppingCart();
makeProductsDrag2();

shopCartCount1();
testimonySlider1();

//////////////////////////////////////////////////

});  //end doc.onready function
