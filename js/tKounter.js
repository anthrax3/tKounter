var TKounter = {
    debug: null,
	showTime: null,
    maximumValue: 999999999,
    displayValue: null,
	tmpValue: null,
	//UI elements in backwards order from array
	//ones column is on left, hundred million column is on right
    columnValues: [0,0,0,0,0,0,0,0,0],
    
    init: function( options ) {
        if( undefined !== options ) {
            TKounter.debug = options.debug || false;
			TKounter.showTime = options.showTime || false;
        }

		// Notification
		if( TKounter.debug ) {
            console.log( 'TKounter is in debug mode' );
        }

		// Set start time
		if( TKounter.showTime ) {
		}

		// Fire off increment sequence
		TKounter.startCounter();
    },

	startCounter: function(){
		// Debug code
		if ( TKounter.debug && TKounter.showTime ) {
			var startTime = TKounter.getTime();
			console.log( 'Start time is: ' + startTime.hours + ':' + startTime.minutes + ' ' + startTime.meridiem );
        }
		
		//TODO: Execute counter 
		setInterval( TKounter.fireIterator, 1000 );
	},

	fireIterator: function() {
		// Get the batch value
		var cycleValue = TKounter.getRandomBatch();

		// Call incrementBy
		TKounter.incrementBy( cycleValue );

		// Call valueRoller (recursive method to update each
		// columnValue array element accordingly

		// UpdateUI loop (run against length of array)
		/*
		for( var v = 0; v < 8; v++ ) {
			TKounter.updateUI( TKounter.columnValues[v] );
		}
		*/
	},

    incrementBy: function( value ) {
		console.log( 'incrementBy' );
		// Quick sanity check, do not show more than max
		if( !TKounter.maxReachedCheck( value ) ) {
			for( var x = 0; x < value; x++ ) {
				TKounter.addOne();
			}
		}
    },

	addOne: function() {
		console.log( 'addOne' );
		// ++ the ones column
		TKounter.displayValue += 1;
		// This increments the ones column by one
		TKounter.columnValues[0] += 1;
		//TODO: Need to update the UI columns starting from ones
		//column using a recursive function...how best to do it?
		TKounter.updateUI( TKounter.columnValues[0] + 1, 'v0' );
	},

	valueRoller: function() {
		console.log( 'valueRoller' );
		// This can be a large number, needs to be broken down quickly
		var onesColumnValue = TKounter.columnValues[0];
		var currentColumn = 0;
		var nextColumn = currentColumn + 1;
		var maxColumn = 8; //number of total columns

		// Recursive function to iterate columnValues accordingly
		function roller( passedVal ) {
			if( 9 < passedVal ) {
				//TODO: need to figure out this logic
				//TODO: call updateUI?
			}
		}
	},

	updateUI: function( newVal, el ){
		console.log( 'updateUI' );
		document.getElementById( el ).innerHTML = newVal;
	},

	padWithZeroes: function(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	},

	maxReachedCheck: function( testVal ) {
		var tmpVal = testVal + TKounter.displayValue;
		if( TKounter.maximumValue < tmpVal ) {
			return true;
		}

		return false;
	},

	getRandomBatch: function() {
		// Returns value between 1 and 50, this represents the amount
		// of times to addOne to the running total
		var val = Math.floor( ( Math.random()*50 ) + 1 );
		return val;
	},

	// Debug method
	getTime: function(){
		var currentDate = new Date();
		var meridiem = 'AM';
		// Do a little math
		var hours = currentDate.getHours();
		if (hours >= 12) {
			meridiem = hours > 12 ? 'PM' : 'AM';
			hours = hours - 12;
		}
		if (hours == 0) {
			hours = 12;
		}
		if (hours < 10) {
			hours = '0' + hours
		}
		
		var minutes = currentDate.getMinutes();
		if (minutes < 10) {
			minutes = '0' + minutes
		}

		var timeObj = { hours: hours, minutes: minutes, meridiem: meridiem };
		return timeObj;
	}
};
