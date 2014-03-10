function listThearter(data) 
{
	var output = '<ul data-role="listview">';
	$.each(data.movies,function(key,val){
		output += '<li><a href="#showpage" onclick="showMovie('+ val.id +')">';
		output += '<h5>' + val.title + '</h5>';
		output += '<img src=' + val.posters.detailed + ' alt="movie_img"/>';
		output += '</a></li>';
	});
	output += '</ul>';
	$('#theaterData').html(output);
	
}

function listUpcoming(data) 
{
	var output = '<ul data-role="listview">';
	$.each(data.movies,function(key,val){
		output += '<li><a href="#showpage" onclick="showMovie('+ val.id +')">';
		output += '<h5>' + val.title + '</h5>';
		output += '<img src=' + val.posters.detailed + ' alt="movie_img"/>';
		output += '</a></li>';
	});
	output += '</ul>';
	$('#upcomingData').html(output);
	
}

function showMovie(id)
{     
	var movie_url = "http://api.rottentomatoes.com/api/public/v1.0/movies/"+ id
					+".json?apikey=s3ambfa7xaaddxh7f6qgv2x7&callback=?"; 
					
	var showDataWidth = $('#showpage').width();

	$.getJSON(movie_url,function(data){
		var output = '<div class="banner">';
		output 	  += '<h2>' + data.title + '(' + data.year + ') </h2>';	
		output	  += '</div>';
		output	  += '<div class="basic-info">'
		output	  += '<img src=' + data.posters.original + ' width="'+ showDataWidth +'">'
		output	  += '<p> Genres: '; 
			for (i=0; i <= data.genres.length; i++)
			{
				output += data.genres[i] + ', ';
			}  
		output    += '</p>';
		output 	  += '<p> MPAA: ' + data.mpaa_rating + '| Runtime: ' + data.runtime + 'min</p>';
		output 	  += '<p> Release Date: ' + data.release_dates['theater'] +'</p>';
		output    += '</div>';
		output    += '<p> Cast: '; 
		output	  += '<ul class="list-view">';
			for (j=0; j < data.abridged_cast.length; j++)
			{
				output += '<li>' + data.abridged_cast[j]['name'] + '</li>';
			}
		output	 +=	'</ul></p>';		
		$('#showData').html(output);
	});
}

$(document).ready(function(){
	$('#searchButton').click(function(){
		var movie = $('#searchMovie').val().split(" ").join("+")
		var url   = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=s3ambfa7xaaddxh7f6qgv2x7&q=" + movie
		
		$.getJSON(url,function(data){
			console.log(data);
			if(data.movies.length == 0) {
				var output = "<h3>No Movie Found</h3>";
			}
			else{
				var output = '';
				$.each(data.movies,function(key,val){
					output += '<li><a href="#showpage" onclick="showMovie('+ val.id +')">';
					output += '<h5>' + val.title + '</h5>';
					output += '<img src=' + val.posters.detailed + ' alt="movie_img"/>';
					output += '</a></li>';
				});
			}
			
			$('#searchData').html(output); 
			$("#searchData").listview("refresh"); 
			
		});
    });
});
