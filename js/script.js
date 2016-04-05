$(function () {
    var searchField = $('#query');
    var icon = $('#search-btn');
    
    //focus handler
    $(searchField).on('focus', function(){
        $(this).animate({
            width: '100%'
        }, 400);
        $(icon).animate({
            right: '10px'
        }, 400)
    });
    
    // Blur handler
    
    $(searchField).on('blur', function(){
        if(searchField.val() == ''){
            $(searchField).animate({
                width: '45%'
            }, 400, function(){});
            $(icon).animate({
                width: '390px'
            }, 400, function(){})
        }
    });
    
    //prevent form from submitting
    $('#search-form').submit(function(e){
        e.preventDefault();
    })
})

//create seach function

function search(){
    // clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //get form input
    q = $('#query').val();
    
    //Run GET request on API using JQUERY GET method
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type:'video',
            key: 'AIzaSyA3bHU_wyQrcrZP3hFw4hGF1DxIc4UbPfo'},
        function(data){
            //get prevtoken and nexttoken to add pagination to results
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            //log data
            console.log(data);
            
            //each loop
            $.each(data.items, function(i, item){
                var output = getOutPut(item);
                
                //diplay results by appeding to results element
                $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken );
            
            //display button
            $('#buttons').append(buttons);
        }
    );
}


//Next buttons
function nextPage(){
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    
     // clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //get form input
    q = $('#query').val();
    
    //Run GET request on API using JQUERY GET method
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type:'video',
            key: 'AIzaSyA3bHU_wyQrcrZP3hFw4hGF1DxIc4UbPfo'},
        function(data){
            //get prevtoken and nexttoken to add pagination to results
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            //log data
            console.log(data);
            
            //each loop
            $.each(data.items, function(i, item){
                var output = getOutPut(item);
                
                //diplay results by appeding to results element
                $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken );
            
            //display button
            $('#buttons').append(buttons);
        }
    );
    
}

//Prev buttons
function prevPage(){
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    
     // clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //get form input
    q = $('#query').val();
    
    //Run GET request on API using JQUERY GET method
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type:'video',
            key: 'AIzaSyA3bHU_wyQrcrZP3hFw4hGF1DxIc4UbPfo'},
        function(data){
            //get prevtoken and nexttoken to add pagination to results
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            //log data
            console.log(data);
            
            //each loop
            $.each(data.items, function(i, item){
                var output = getOutPut(item);
                
                //diplay results by appeding to results element
                $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken );
            
            //display button
            $('#buttons').append(buttons);
        }
    );
    
}

//build output

function getOutPut(item) {
    //set all variables we need
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    
    //build output string
    var output = '<li>' +
    '<div class="list-left">' +
        '<img src="' +thumb+ '">'+
    '</div>' +
    '<div class="list-right">' +
        '<h3>'+ '<a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">' +title+ '</a>' + '</h3>' +
        '<small>By <span class="cTitle">' +channelTitle+ '</span>on ' +videoDate+ '</small>' +
        '<p>' +description+ '</p>' +
    '</div>' +
    '</li>' +
    '<div class="clear"></div>' + 
    '';
    
    
    return output;
}

// Build the buttons
function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Prev Page</button></div>';
	}
	
	return btnoutput;
}
