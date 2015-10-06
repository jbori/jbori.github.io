(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };

	// Ancillary function to post requests to Location Server
	// Source: http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
	function post(path, params, method) {
		method = method || "post"; // Set method to post by default if not specified.

		// The rest of this code assumes you are not using a library.
		// It can be made less wordy if you use one.
		var form = document.createElement("form");
		form.setAttribute("method", method);
		form.setAttribute("action", path);

		for(var key in params) {
			if(params.hasOwnProperty(key)) {
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", params[key]);

				form.appendChild(hiddenField);
			 }
		}

		document.body.appendChild(form);
		form.submit();
	}	
	
    ext.get_latitude = function(location, callback) {
        // Try javascript call to Location Services
		//var xhttp = new XMLHttpRequest();
		//xhttp.open("GET", 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial', false);
		//xhttp.open("GET", 'http://108.167.143.127/inventiveproject/locationserver.php?service=getlocationdata&username=Marc&field=latitude', false);
		//xhttp.send();
		//document.getElementById("demo").innerHTML = xhttp.responseText;
		//temperature = xhttp.responseText;
        //callback(temperature);
		
		temperature = post('http://108.167.143.127/inventiveproject/locationserver.php', {name: 'service getlocationdata'});
		callback(temperature);
		
		// Make an AJAX call to location services
        /*$.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });*/
    };
	
	
    ext.get_longitude = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };
	
	
    ext.get_altitude = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };
	
	
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
			['R', '%s s latitude', 'get_latitude', 'Boston, MA'],
			['R', '%s s longitude', 'get_longitude', 'Boston, MA'],
			['R', '%s s altitude', 'get_altitude', 'Boston, MA'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Location Services extension', descriptor, ext);
})({});

