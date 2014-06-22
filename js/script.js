(function ( $ ) {



/* NOTE: The following section deals with the doTimeout plugin
   scroll to the bottom of this files for instructions on how to 
   follow along (Like the material was presented at the conference) */

/************************************************************

	First Try: Fade in the label on mouseenter, and fade it
	out on mouseleave.

	Expected Interaction:
		1. As soon as the user moves their mouse over an
		   item, its label should fade in.
		2. As soon as the user's mouse leaves the item,
		   the label should fade out.

************************************************************/
function first_try() {
	$( "#avators" )
		.delegate( "li", "mouseenter", function ( e ) {
			$( this ).find( "div" ).fadeIn( 200 );
		})
		.delegate( "li", "mouseleave", function ( e ) {
			$( this ).find( "div" ).fadeOut( 200 );
		});
}

/************************************************************

	Second Try: Fade in the label on mouseenter, and fade it
	out on mouseleave, but don't allow the animation to queue up.
	
	Notes: We are trying to solve the problem where the animations
	get queued up if the user moves their mouse rapidly. The result
	is that the labels will keep appearing and disappearing long
	after the user has stopped moving their mouse.

	Expected Interaction:
		1. As soon as the user moves their mouse over an
		   item, its label should stop fading out, and
		   immediately fade in.
		2. As soon as the user's mouse leaves the item,
		   it should finish fading in, then fade out.

************************************************************/

function second_try() {
	$( "#avators" )
		.delegate( "li", "mouseenter", function ( e ) {
			$( this ).find( "div" ).stop( true ).fadeIn( 200 );
		})
		.delegate( "li", "mouseleave", function ( e ) {
			$( this ).find( "div" ).fadeOut( 200 );
		});
}


/************************************************************

	Third Try: Fade in the label on mouseenter, and fade it
	out on mouseleave, but don't allow the animation to queue up,
	and make sure it still fades to 100%
	
	Notes: We are trying to solve the problem where a fadeIn animation
	will stop fading to 100% if it is ever stopped half way through.

	Expected Interaction:
		1. As soon as the user moves their mouse over an
		   item, its label should stop fading out, and
		   immediately fade in.
		2. As soon as the user's mouse leaves the item,
		   it should finish fading in, then fade out.
		3. The label should be at 100% opacity when fully
		   faded in.

************************************************************/
function third_try() {
	$( "#avators" )
		.delegate( "li", "mouseenter", function ( e ) {
			$( this ).find( "div" ).stop( true ).fadeTo( 200, 1.0 );
		})
		.delegate( "li", "mouseleave", function ( e ) {
			$( this ).find( "div" ).fadeOut( 200 );
		});
}

/************************************************************

	Fourth Try: Use doTimeout to delay showing the label
	until the user has kept their mouse there for a period
	of time. This does the same thing as the 
	hoverIntent plugin.
	
	Notes: We use doTimeout in its plugin form: $li.doTimeout
	which scopes the key we provide to just that element. The
	timer is not shared among portfolio items.

	Expected Interaction:
		1. Use must keep the cursor over a single portfolio
		   item for at least 0.5 seconds before the label
		   shows up
		2. Once the mouse has been off all portolio items
		   for at least 0.5 seconds, the visible label
		   fades out
		3. It takes this long on each item to fadeIn/Out

************************************************************/

function fourth_try() {
	$( "#avators" )
		.delegate( "IMG", "mouseenter", function ( e ) {
			var $IMG = $( this );

			$IMG.doTimeout( "hoverOut" );
			$IMG.doTimeout( "hoverIn", 500, function () {
				$IMG.find( "div" ).fadeTo( 200, 1.0 );
			});
		})
		.delegate( "IMG", "mouseleave", function ( e ) {
			var $IMG = $( this );

			$IMG.doTimeout( "hoverIn" );
			$IMG.doTimeout( "hoverOut", 500, function () {
				$IMG.find( "div" ).stop( true ).fadeOut();
			});
		});
}


/************************************************************

	Final Code: Uses an advanced blend of doTimeout, and
	checking the previous element to provide an advanced
	interaction.
	
	Notes: We use the global doTimeout format: $.doTimeout.
	The timer is shared globally among all the portfolio items.

	Expected Interaction:
		1. Use must keep the cursor over a single portfolio
		   item for at least 0.5 seconds before the label
		   shows up
		2. Once the label is visible, changing to any other
		   portfolio items immediately fades out the previous
		   label, and immediately fades in the new one.
		3. Once the mouse has been off all portolio items
		   for at least 0.5 seconds, the visible label
		   fades out

************************************************************/

function final_code() {
	var IMG_cache, over = false;

	$( "#avators" )
		.delegate( "IMG", "mouseenter", function ( e ) {
			var $IMG = $( this ), speed;

			if ( IMG_cache === this && over ) {
				console.log("IMG_cache == this");
				$.doTimeout( "hoverOut" );
				return;
			}

			if ( over ) {
				console.log("over");
				$.doTimeout( "hoverOut", true );
				speed = 0;
			} else {
				console.log("else ");
				$.doTimeout( "hoverOut" );
				speed = 500;
			}

			$.doTimeout( "hoverIn", speed, function () {
				console.log("hoverIn");
				over = true;
				$IMG.find( "div" ).fadeTo( 200, 1.0 );
			});
		})
		.delegate( "IMG", "mouseleave", function ( e ) {
			console.log("mouseleave");
			var $IMG = $( this );

			$.doTimeout( "hoverIn" );
			$.doTimeout( "hoverOut", 500, function () {
				over = false;
				$IMG.find( "div" ).stop( true ).fadeOut();
			});
		});
}

/* To follow the steps I took while live coding this,
   only uncomment one function at a time: */

 //first_try();
 //second_try();
third_try();
 //fourth_try();
//final_code();



}( jQuery ));