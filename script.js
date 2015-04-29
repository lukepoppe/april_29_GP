var apikey = "d40a650b5d8cc7c495d91736f95dee0b8993d809";
var userInput="";
function searchCallback(results) {
	
}




$(document).ready(function(){
	$('.btn').on('click', function(e){
		$('#searchResults').empty();
		userInput = $('#search').val();
		search(userInput);
		console.log(userInput);
		e.preventDefault();

	});
	});	











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
	       
	    }
	});

}