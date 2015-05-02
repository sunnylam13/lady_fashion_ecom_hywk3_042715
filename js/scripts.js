jQuery(document).ready(function($) {

//////////////////////////////////////////////////
// GLOBAL VARIABLES


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
			TweenMax.to(ui.draggable, 0.4, {
				left: x, 
				top: y 
			});
			console.log('Product added to cart!');
			
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
	var shopCartItems=0;

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

//////////////////////////////////////////////////
// EXECUTION CODE

enableStickyNav();
enableSlideOutShoppingCart();
disableSlideOutShoppingCart();
makeProductsDrag2();

shopCartCount1();

//////////////////////////////////////////////////

});  //end doc.onready function
