chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var setTimeOut;
		$element = $('#bodyContent a');

		$element.on('mouseenter', function(event){
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
			    fullURL = baseURL+url; //Combine those two together to get the link

			$.get(fullURL, function(data) {
			    var content = $(data).find('#bodyContent').find('p').html(),
			        cssRules = {
			        	position: 'fixed',
			        	top: 10+"px",
			        	left: 10+"px",
			        	right: 10+"px",
			        	maxHeight: 500+"px",
			        	background: "#fff",
			        	boxShadow: "2px 2px 15px rgba(50,50,50,.75)",
			        	zIndex: 100
			        };
			    var picture = $(data).find('#bodyContent').find('img').filter(function(index) {
			    	return $(this).attr('height') > 100;
			    });
			    if (picture.attr('src') !== undefined) {
			    	var new_html = '';
			    		new_html += '<div id="popup-notification" style="display: flex;">';
			    		new_html += '<div style="margin-top: 10px; margin-bottom: 10px; padding-left: 10px; align-self: center;">';
			    		new_html += content;
			    		new_html += '</div>';
			    		new_html += '<img src=';
			    		new_html += picture.attr('src');
			    		new_html += ' style="width: auto; max-height: 500px; margin: 0px; padding: 0px; margin-right: 10px;">';
			    		new_html += '</div>';
			    		new_html += '</div>';
			    	$(new_html).css(cssRules).appendTo('body').fadeIn();
			    }
			    else {
			    	$('<div id="popup-notification" style="padding: 10px;">'+content+'</div>').css(cssRules).appendTo('body').fadeIn();
			    }

			});
		}
	}
	}, 10);
});