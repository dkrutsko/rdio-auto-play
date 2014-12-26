////////////////////////////////////////////////////////////////////////////////
// -------------------------------------------------------------------------- //
//                                                                            //
//                        (C) 2014-2015  David Krutsko                        //
//                        See LICENSE.md for copyright                        //
//                                                                            //
// -------------------------------------------------------------------------- //
////////////////////////////////////////////////////////////////////////////////

"use strict";

//----------------------------------------------------------------------------//
// Extension                                                                  //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////

(function()
{
	// We only support lists from an artists top-songs section
	var regex = /.*:\/\/www\.rdio\.com\/artist\/.*\/songs\/?/i;

	// Selector paths for various controls
	var prevPath = ".player_bottom .prev";
	var nextPath = ".player_bottom .next";
	var playPath = ".player_bottom .play_pause";

	var timePath = ".player_bottom .time";
	var spanPath = ".player_bottom .duration";

	var listPath = ".Catalog_Artist_Songs"  +
		":not([style*=\"display: none\"]) " +
		".scrollable_content .PlayButton"

	var prev = [ ], next = [ ], play = [ ];
	var time = [ ], span = [ ], list = [ ];

	var url = "";
	var active = -1; // Start with nothing queued

	////////////////////////////////////////////////////////////////////////////////
	/// Converts a standard time in the form of mm:ss to seconds, or zero on error.

	var toSeconds = function (time)
	{
		if (time.match (/-?\d+:\d+/))
		{
			// If we need to negate the result
			var ng = time[0] === "-" ? -1 : 1;

			time = time.split (":");
			return parseInt (time[0]) * 60 +
				   parseInt (time[1]) * ng;
		}

		return 0;
	}

	////////////////////////////////////////////////////////////////////////////////
	/// Returns true if all UI elements have been loaded correctly, false otherwise.

	var isValid = function()
	{
		return prev.length && next.length &&
			   play.length && time.length &&
			   span.length && list.length;
	}

	////////////////////////////////////////////////////////////////////////////////

	var handlePrev = function()
	{
		if (active > 0 && toSeconds
			(time[0].innerHTML) < 3)
		{
			list[--active].click();
		}
	}

	////////////////////////////////////////////////////////////////////////////////

	var handleNext = function (event)
	{
		if (active >= 0 && active < list.length - 1)
		{
			list[++active].click();
			// Prevent going to white screen
			event && event.stopPropagation();
		}
	}

	////////////////////////////////////////////////////////////////////////////////

	var handleList = function()
	{
		active = -1;

		// Find the new selected active song
		for (var i = 0; i < list.length; ++i)
		{
			if (list[i] === this) {
				active = i; break;
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////

	var bindElements = function()
	{
		if (isValid())
		{
			// Unbind any previously bound UI elements
			prev[0].removeEventListener ("click", handlePrev);
			next[0].removeEventListener ("click", handleNext);

			for (var i = 0; i < list.length; ++i)
				list[i].removeEventListener ("click", handleList);
		}

		// Verify supported URL
		if (url.match (regex))
		{
			prev = document.querySelectorAll (prevPath);
			next = document.querySelectorAll (nextPath);
			play = document.querySelectorAll (playPath);

			time = document.querySelectorAll (timePath);
			span = document.querySelectorAll (spanPath);

			list = document.querySelectorAll (listPath);

			if (isValid())
			{
				prev[0].addEventListener ("click", handlePrev);
				next[0].addEventListener ("click", handleNext);

				for (var i = 0; i < list.length; ++i)
					list[i].addEventListener ("click", handleList);
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////

	setInterval (function()
	{
		// Check if the URL was modified
		if (url !== window.location.href)
		{
			url = window.location.href;
			bindElements(); active = -1;
		}

		else if (isValid())
		{
			// Check whether more items have been added
			if (document.querySelectorAll (listPath).
				length !== list.length) bindElements();

			if (active >= 0)
			{
				// Check whether or not to go to next track
				var timeVal = toSeconds (time[0].innerHTML);
				var spanVal = toSeconds (span[0].innerHTML);

				if (spanVal > 0)
					spanVal = timeVal - spanVal;

				if (spanVal > -2)
					handleNext();
			}
		}

	}, 200);

}());
