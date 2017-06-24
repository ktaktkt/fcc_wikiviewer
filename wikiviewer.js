$(document).ready(function(){
  $('#search').click(function(){
    var searchTerm = $('#searchTerm').val();
    //API url with search Term 
    if (searchTerm.charCodeAt() >= 256 ) {
       var url = "https://ja.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
    }else {
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
    }
    
    $.ajax({
      type:"GET",
      url:url,
      async: false,
      dataType: "json",
      success: function(data){
        // heading console.log(data[1][0]);
      // description  console.log(data[2][0]);
     // link   console.log(data[3][0]);
        //wipe html
        $("#output").html('');
        
        for ( var i=0;i<data[1].length; i++)
{
        $("#output").prepend("<div　><a href= "+data[3][i]+" class='title'>"+data[1][i]+"</a><p>"+ data[2][i] + "</p></div>"); 
   $("#searchTerm").val('');
}    
      },
      error: function(errorMessage) {
        alert("Error");
      }     
    });
  });
  
  
  //autocomp
  $("#searchTerm").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
          
        }); 
      
    }//close source
});// close auto comp
  
});