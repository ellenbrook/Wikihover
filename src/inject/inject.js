chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var setTimeOut;
		$('#bodyContent a').on('mouseenter', function(event){
			var obj = $(this);

			setTimeOut = setTimeout(function(){
				if(obj.children('img').length === 0)
				{
					performWork(obj, event);
				}
			}, 200);

		}).on('mouseleave', function(){
			clearTimeout(setTimeOut);
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

		function performWork(element, event)
		{
			//Clear the data
			clearData();
			//Remove the title attribute    
			element.removeAttr('title');

			var baseURL = window.location.origin, //Get the URL
			    url     = element.attr('href'), //Get the href of the link
			    fullURL = baseURL+url, //Combine those two together to get the link
			    x = event.pageX, // Get x position of mouse
			    y = event.pageY; // get right position of mouse

			$.get(fullURL, function(data) {
			    var content = $(data).find('#bodyContent').find('p').html(),
			        cssRules = {
			        	position: 'fixed', 
			        	top: 10+"px", 
			        	left: 10+"px", 
			        	right: 10+"px",
			        	maxHeight: 500+"px",
			        	padding: 1.4+"em",
			        	background: "#fff",
			        	boxShadow: "2px 2px 15px rgba(50,50,50,.75)",
			        	zIndex: 100
			        };

			    $('<div id="popup-notification">'+content+'</div>').css(cssRules).appendTo('body').fadeIn();
			});
		}
	}
	}, 10);
});