(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    /*ext.get_temp = function(location, callback) {
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
    };*/


    ext.get_latitude = function(username, callback) {
		// Obtain location data for username from Location Services Broker
		var xhttp = new XMLHttpRequest();
		//var postdata= "service=getlocationdata&username=Marc&field=latitude";
		var postdata= "service=getlocationdata&username="+username;

		// Open HTTP request
		xhttp.open("POST", "http://108.167.143.127/inventiveproject/locationserver.php", true);

		//Send the proper header information along with the request
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("Content-length", postdata.length);
		xhttp.setRequestHeader("Connection", "close");

		xhttp.onreadystatechange = function() {//Call a function when the state changes.
		   if(xhttp.readyState == 4 && xhttp.status == 200) {
			  var location_data = JSON.parse(xhttp.responseText);
			  callback(location_data.latitude);
		   }
		}
		xhttp.send(postdata);	
    };
	
	
    ext.get_longitude = function(username, callback) {
		// Obtain location data for username from Location Services Broker
		var xhttp = new XMLHttpRequest();
		//var postdata= "service=getlocationdata&username=Marc&field=latitude";
		var postdata= "service=getlocationdata&username="+username;

		// Open HTTP request
		xhttp.open("POST", "http://108.167.143.127/inventiveproject/locationserver.php", true);

		//Send the proper header information along with the request
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("Content-length", postdata.length);
		xhttp.setRequestHeader("Connection", "close");

		xhttp.onreadystatechange = function() {//Call a function when the state changes.
		   if(xhttp.readyState == 4 && xhttp.status == 200) {
			  var location_data = JSON.parse(xhttp.responseText);
			  callback(location_data.longitude);
		   }
		}
		xhttp.send(postdata);	
    };
	
	
    ext.get_altitude = function(username, callback) {
		// Obtain location data for username from Location Services Broker
		var xhttp = new XMLHttpRequest();
		var postdata= "service=getlocationdata&username="+username;

		// Open HTTP request
		xhttp.open("POST", "http://108.167.143.127/inventiveproject/locationserver.php", true);

		//Send the proper header information along with the request
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("Content-length", postdata.length);
		xhttp.setRequestHeader("Connection", "close");

		xhttp.onreadystatechange = function() {//Call a function when the state changes.
		   if(xhttp.readyState == 4 && xhttp.status == 200) {
			  var location_data = JSON.parse(xhttp.responseText);
			  callback(location_data.altitude);
		   }
		}
		xhttp.send(postdata);	
    };
	
	
    ext.get_accuracy = function(username, callback) {
		// Obtain location data for username from Location Services Broker
		var xhttp = new XMLHttpRequest();
		var postdata= "service=getlocationdata&username="+username;

		// Open HTTP request
		xhttp.open("POST", "http://108.167.143.127/inventiveproject/locationserver.php", true);

		//Send the proper header information along with the request
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("Content-length", postdata.length);
		xhttp.setRequestHeader("Connection", "close");

		xhttp.onreadystatechange = function() {//Call a function when the state changes.
		   if(xhttp.readyState == 4 && xhttp.status == 200) {
			  var location_data = JSON.parse(xhttp.responseText);
			  callback(location_data.accuracy);
		   }
		}
		xhttp.send(postdata);	
    };

	
	// Ancillary trigonometric functions not supported by ScratchX	
    ext.get_sine = function(angle, callback) {
        // Return the sine of a given angle in degreees
		
		callback(Math.sin(angle * (Math.PI / 180)));
    };

    ext.get_cosine = function(angle, callback) {
        // Return the cosine of a given angle in degreees
		
		callback(Math.cos(angle * (Math.PI / 180)));
    };

	
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            //['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
			['R', '%s s latitude', 'get_latitude', 'Marc'],
			['R', '%s s longitude', 'get_longitude', 'Marc'],
			['R', '%s s altitude', 'get_altitude', 'Marc'],
			['R', '%s s accuracy', 'get_accuracy', 'Marc'],
			['R', 'sine of %d', 'get_sine', '0'],
			['R', 'cosine of %d', 'get_cosine', '0'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Location Services extension', descriptor, ext);
})({});

