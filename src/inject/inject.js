chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		$('#bodyContent a').on('mouseenter', function(event){
			//Clear the data
			clearData();
			//Remove the title attribute    
			$(this).removeAttr('title');

			var baseURL = window.location.origin, //Get the URL
			    url     = $(this).attr('href'), //Get the href of the link
			    fullURL = baseURL+url, //Combine those two together to get the link
			    x = event.pageX, // Get x position of mouse
			    y = event.pageY; // get right position of mouse
			    positionLeft = 10+"px", //set the position
			    positionRight = 10+"px", //Set the right position 
			    positionTop = 10+"px"; //set the position

			$.get(fullURL, function(data) {
			    var content = $(data).find('#bodyContent').find('p').html(),
			        cssRules = {
			        	position: 'fixed', 
			        	top: positionTop, 
			        	left: positionLeft, 
			        	right: positionRight,
			        	maxHeight: 500+"px",
			        	padding: 1.4+"em",
			        	background: "#fff",
			        	boxShadow: "2px 2px 15px rgba(50,50,50,.75)",
			        	zIndex: 100
			        };

			    $('<div id="popup-notification">'+content+'</div>').css(cssRules).appendTo('body').fadeIn();
			});
		});


		$('#bodyContent a').on('mouseleave', function(){
			clearData();
		});

		$('body').on('click', function(){
			clearData();
		});

		function clearData()
		{
			$('#popup-notification').remove();
			$(this).attr('title', $(this).attr('data-title'));
		}
	}
	}, 10);
});