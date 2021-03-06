var map;
	 
	 function CameraControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to take a picture';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '50px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Camera</b>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
	capturePhoto();
  });

}


function PhotoLibraryControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to choose a picture';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '50px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Library</b>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
	getPhoto(pictureSource.PHOTOLIBRARY);
  });

}
	  function initialize() {
	    var mapOptions = {
		 zoom: 12
	};
	 map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

	if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      	var infowindow = new google.maps.InfoWindow({
		map: map,
		position: pos, 
		content: "Current Location" 
	
	});

	map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });

	} else {
    
    handleNoGeolocation(false);
  }
  
  
  var cameraControlDiv = document.createElement('div');
  var cameraControl = new CameraControl(cameraControlDiv, map);

  cameraControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(cameraControlDiv);
  
  var photoLibraryControlDiv = document.createElement('div');
  var photoLibraryControl = new PhotoLibraryControl(photoLibraryControlDiv, map);

  photoLibraryControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(photoLibraryControlDiv);
  
}


	function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }


	var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };


	 var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

	google.maps.event.addDomListener(window, 'load', initialize);

/**
Camera
**/

document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
    
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      //alert(imageData);
      
	navigator.geolocation.getCurrentPosition(onSuccess, onError);				
    }
    

	function onSuccess(position) { 
		var marker = new google.maps.Marker({ 
			position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
			map: map
		});
	}

	function onError(error) {
		alert('code:  '+error.code+'\n' +'message:  ' +error.message+ '\n');
	}
     // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      ///alert(imageURI);
    }
    
    
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    
        function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }
    
      function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }
