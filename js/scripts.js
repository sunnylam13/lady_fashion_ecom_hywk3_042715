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
	var waypoints = $('section.newArrivals').waypoint({
		handler: function(direction) {
			switch(direction) {
				case 'up':
					// $('aside.slideOutShoppingCart').css('display', 'none');
					// TweenMax.to($('aside.slideOutShoppingCart'),2,{'display':'none',ease:Power2.easeInOut});
					TweenMax.to($('aside.slideOutShoppingCart'),2,{
							right: '-999999px',
							ease:Power2.easeInOut
						});
					break;
				case 'down':
					// $('aside.slideOutShoppingCart').css('display', 'flex');
					// TweenMax.to($('aside.slideOutShoppingCart'),2,{'display':'flex',ease:Power2.easeInOut});
					TweenMax.to($('aside.slideOutShoppingCart'),2,{
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
					// $('aside.slideOutShoppingCart').css('display', 'flex');
					TweenMax.to($('aside.slideOutShoppingCart'),2,{right:0,ease:Power2.easeInOut});
					break;
				case 'down':
					// $('aside.slideOutShoppingCart').css('display', 'none');
					TweenMax.to($('aside.slideOutShoppingCart'),2,{right:'-99999px',ease:Power2.easeInOut});
					break;
			}
		}
	});
}

function makeProductsDrag1 () {
	// sadly using Greensock doesn't give us drag and drop functionality

	Draggable.create(".wardrobeDrag",{
		onClick: function () {
			console.log('clicked');
		}
	});
	Draggable.create("section.collectionUnit",{
		onClick: function () {
			console.log('clicked');
		}
	});
}

function makeProductsDrag2 () {
	// this function uses jQuery UI and TweenMax to allow drag and drop of products onto the shopping cart
	
	$('div.wardrobeDrag').draggable({
		helper: 'clone',
		opacity: 0.7,
		start: function (event,ui) {
			ui.helper.css('border', '1px solid #FBF200');
		},
		revert: function(droppable) {
			if (droppable === false) {
				// Drop was rejected, tween back to original position.
				TweenMax.to(this, 0.4, { left:0, top:0 });
			}
			return false;
		}
	});

	// $('div.purchaseShader').draggable({
	// 	helper: 'clone',
	// 	opacity: 0.7,
	// 	revert: function(droppable) {
	// 		if (droppable === false) {
	// 			// Drop was rejected, tween back to original position.
	// 			TweenMax.to(this, 0.4, { left:0, top:0 });
	// 		}
	// 		return false;
	// 	}
	// });

	$('section.collectionUnit').draggable({
		helper: 'clone',
		opacity: 0.7,
		start: function (event,ui) {
			ui.helper.css('border', '1px solid #FBF200');
		},
		revert: function(droppable) {
			if (droppable === false) {
				// Drop was rejected, tween back to original position.
				TweenMax.to(this, 0.4, { left:0, top:0 });
			}
			return false;
		}
	});

	$('aside.slideOutShoppingCart').droppable({
		drop: function(event, ui) {
			var x = $(this).position().left;
			var y = $(this).position().top;
			TweenMax.to(ui.draggable, 0.4, { left:x, top:y });
			console.log('Product added to cart!');
		}
	});
}

//////////////////////////////////////////////////
// EXECUTION CODE

enableStickyNav();
enableSlideOutShoppingCart();
disableSlideOutShoppingCart();
// makeProductsDrag1();
makeProductsDrag2();

//////////////////////////////////////////////////

});  //end doc.onready function
