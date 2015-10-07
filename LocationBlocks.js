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
	/*function post(path, params, method) {
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
	}*/	
	
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
	
	
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
			['R', '%s s latitude', 'get_latitude', 'Marc'],
			['R', '%s s longitude', 'get_longitude', 'Boston, MA'],
			['R', '%s s altitude', 'get_altitude', 'Boston, MA'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Location Services extension', descriptor, ext);
})({});

