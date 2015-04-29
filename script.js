var apikey = ''; 


function searchCallback(results) {
$('#searchResults').empty();
	for (var i = 0; i < 8; i++) {
		var platformName = "";
		for (var j = 0; j < results[i].platforms.length; j++) {
			platformName += " - " + results[i].platforms[j].name;
		}
		$('#searchResults').append(
				'<div id="result' + i + '" class="col-md-6 well resultHeight text-center">' +
					'<div id="name"><p>Game: ' + results[i].name + '</p></div>' +
					'<div id="image"><img class="hidden-sm hidden-xs" src="' + results[i].image.small_url + '"/></div>' +
					'<div id="description" class="bill"><h5>Description:</h5> ' + results[i].deck + '</div>' +
					'<div id="platforms" class="bill"><h5>Supported Platforms:</h5> ' + platformName + '</div>' +
					'<button class="btn btn-sm btn-success expandBtn">More</button>' +
					'<button class="btn btn-sm btn-danger removeBtn">remove</button>' + 
				'<div>'
			).hide().fadeIn('slow');
			hideImages("#result"+i);
		};

		function hideImages (selector){
		$(".col-md-6").hide();
		$(selector).fadeIn();
		$(".right").on("click", function(){
			$(".addcontent").fadeOut();
			i++;
			$(".addcontent").fadeIn();
		});
	};

	}





	

var userInput = "";
var apikey = "d40a650b5d8cc7c495d91736f95dee0b8993d809";
$(document).ready(function() {
	$('.btn').on('click', function(){
		$('#searchResults').empty();
		userInput = $('#searchField').val();
		search(userInput);
	});
	$('#searchResults').on('click', ".expandBtn", function(){
		if($(this).siblings('.bill').css('display') != 'none') {
			$(this).siblings('.bill').hide();
		} else {
			$(this).siblings('.bill').show();
				}
	});
	$('#searchResults').on('click', '.removeBtn', function(){
		$(this).parent().fadeOut('slow');
		});
	});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	        console.log(data.results);
	    }
	});

}
