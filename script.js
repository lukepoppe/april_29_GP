var apikey = ''; 
var interval;
var maxInt;
function searchCallback(results) {
	$('#searchResults').empty();
	console.log("Here are the results: ", results);
	for (var i = 0; i < 8; i++) {
		var platformName = "";
		
		var platformsObject = results[i].platforms;
		if(platformsObject == null){
			platformsObject = [];
		}

		console.log("Results / Platforms: " , results[i].platforms);
		for (var j = 0; j < platformsObject.length; j++) {
			platformName += " - " + results[i].platforms[j].name;
		}
		$('#searchResults').append(
				'<div id="result' + i + '" class="col-md-6 well resultHeight text-center hidden">' +
					'<div id="name"><p>Game: ' + results[i].name + '</p></div>' +
					'<div id="image"><img class="hidden-sm hidden-xs" src="' + results[i].image.small_url + '"/></div>' +
					'<div id="description" class="bill"><h5>Description:</h5> ' + results[i].deck + '</div>' +
					'<div id="platforms" class="bill"><h5>Supported Platforms:</h5> ' + platformName + '</div>' +
					'<button class="btn btn-sm btn-success expandBtn">More</button>' +
					'<button class="btn btn-sm btn-danger removeBtn">remove</button>' + 
				'<div>'
			).hide().fadeIn('slow');
			
	}
	$('#searchResults').children().first().removeClass('hidden');
	interval = 0;
	maxInt = i;
};	

var userInput = "";
var apikey = "d40a650b5d8cc7c495d91736f95dee0b8993d809";
$(document).ready(function() {
	console.log("Document Ready");
	$('.searchBtn').on('click', function(){
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

	$('.container').on("click", ".right", function (e){
		e.preventDefault();
		interval++;
			if(interval == 8){
			interval = 0;
			}
		$('#searchResults').children().addClass('hidden');
		$('#searchResults').children('#result' + interval).removeClass('hidden');
		console.log(interval);
	});
	$('.container').on("click", ".left", function (e){
		e.preventDefault();
		interval--;
			if(interval == -1){
			interval = 7;
			}

		$('#searchResults').children().addClass('hidden');
		$('#searchResults').children('#result' + interval).removeClass('hidden');
		console.log(interval);
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
	    
	    },
	    success: function(data) {
	        searchCallback(data.results);
	        
	    }
	});

}
