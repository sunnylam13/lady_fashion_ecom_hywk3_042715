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
					TweenMax.to($('aside.slideOutShoppingCart'),2,{
							right: '-999999px',
							ease:Power2.easeInOut
						});
					break;
				case 'down':
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
					TweenMax.to($('aside.slideOutShoppingCart'),2,{right:0,ease:Power2.easeInOut});
					break;
				case 'down':
					TweenMax.to($('aside.slideOutShoppingCart'),2,{right:'-99999px',ease:Power2.easeInOut});
					break;
			}
		}
	});
}

function makeProductsDrag2 () {
	// this function uses jQuery UI and TweenMax to allow drag and drop of products onto the shopping cart
	
	// Friday, May 1, 2015 3:16 PM:  using div.wardrobeDrag fails to work on the outermost div.right... there must be a reason

	// set TimelineMax instance
	var tm = new TimelineMax({repeat:-1});

	var animateSections1 = [
		'div.wardrobeDrag',
		'div.specialDressDrag',
		'section.collectionUnit'
	];

	for (var i = 0; i < animateSections1.length; i++) {
		$(animateSections1[i]).draggable({
			helper: 'clone',
			opacity: 0.7,
			start: function (event,ui) {
				// don't forget to pass event, ui as args or you get undefined
				// ui.helper.css('border', '1px solid #FBF200');
				TweenMax.to(ui.helper,1,{
					border:'3px solid #FBF200',
					// width:'100%',
					zIndex:500
				});
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

	// $('div.wardrobeDrag').draggable({
	// 	helper: 'clone',
	// 	opacity: 0.7,
	// 	start: function (event,ui) {
	// 		// don't forget to pass event, ui as args or you get undefined
	// 		// ui.helper.css('border', '1px solid #FBF200');
	// 		TweenMax.to(ui.helper,1,{
	// 			border:'3px solid #FBF200',
	// 			width:'100%',
	// 			zIndex:500
	// 		});
	// 	},
	// 	revert: function(droppable) {
	// 		if (droppable === false) {
	// 			// Drop was rejected, tween back to original position.
	// 			TweenMax.to(this, 0.4, {
	// 				left:0, 
	// 				top:0,
	// 				border:'none',
	// 				zIndex:0
	// 			});
	// 		}
	// 		return false;
	// 	}
	// });


	// $('div.wardrobeDrag').draggable({
	// 	helper: 'clone',
	// 	opacity: 0.7,
	// 	start: function (event,ui) {
	// 		// don't forget to pass event, ui as args or you get undefined
	// 		// ui.helper.css('border', '1px solid #FBF200');
	// 		TweenMax.to(ui.helper,1,{
	// 			border:'3px solid #FBF200',
	// 			width:'100%',
	// 			zIndex:500
	// 		});
	// 	},
	// 	revert: function(droppable) {
	// 		if (droppable === false) {
	// 			// Drop was rejected, tween back to original position.
	// 			TweenMax.to(this, 0.4, {
	// 				left:0, 
	// 				top:0,
	// 				border:'none',
	// 				zIndex:0
	// 			});
	// 		}
	// 		return false;
	// 	}
	// });


	// $('section.collectionUnit').draggable({
	// 	helper: 'clone',
	// 	opacity: 0.7,
	// 	start: function (event,ui) {
	// 		// don't forget to pass event, ui as args or you get undefined
	// 		// ui.helper.css('border', '1px solid #FBF200');
	// 		TweenMax.to(ui.helper,1,{
	// 			border:'3px solid #FBF200',
	// 			zIndex:500
	// 		});
	// 	},
	// 	revert: function(droppable) {
	// 		if (droppable === false) {
	// 			// Drop was rejected, tween back to original position.
	// 			TweenMax.to(this, 0.4, {
	// 				left:0, 
	// 				top:0,
	// 				border:'none',
	// 				zIndex:0
	// 			});
	// 		}
	// 		return false;
	// 	}
	// });

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

//////////////////////////////////////////////////
// EXECUTION CODE

enableStickyNav();
enableSlideOutShoppingCart();
disableSlideOutShoppingCart();
makeProductsDrag2();

//////////////////////////////////////////////////

});  //end doc.onready function
