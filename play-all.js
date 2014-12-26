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
	// Check for JQuery
	if (!jQuery) return;

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
		if (active > 0 &&
			toSeconds (time.html()) < 3)
			list[--active].click();
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
		active = list.index (this);
	}

	////////////////////////////////////////////////////////////////////////////////

	var bindElements = function()
	{
		if (isValid())
		{
			// Unbind previously bound elements
			prev.unbind ("click", handlePrev);
			next.unbind ("click", handleNext);
			list.unbind ("click", handleList);
		}

		// Verify supported URL
		if (url.match (regex))
		{
			prev = $(prevPath);
			next = $(nextPath);
			play = $(playPath);

			time = $(timePath);
			span = $(spanPath);

			list = $(listPath);

			if (isValid())
			{
				prev.bind ("click", handlePrev);
				next.bind ("click", handleNext);
				list.bind ("click", handleList);
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
			// Check if more items have been added
			if (list.length !== $(listPath).length)
				bindElements();

			if (active >= 0)
			{
				// Check whether to go to next track
				var timeVal = toSeconds (time.html());
				var spanVal = toSeconds (span.html());

				if (spanVal > 0)
					spanVal = timeVal - spanVal;

				if (spanVal > -3)
					handleNext();
			}
		}

	}, 200);
}());
