var POST_URL = "EXPUNGED";
var otherUrl = "EXPUNGED";

function onSubmit(e) {
  var response = e.response.getItemResponses();
  var items = [];
  
  for (var i = 0; i < response.length ; i++) {
    var question = response[i].getItem().getTitle();
    var answer = response[i].getResponse();
    var parts = answer.match(/[\s\S]{1,1024}/g) || [];
    
    if (answer == "") {continue;}
    for (var j = 0; j< parts.length; j++) {
      if (j == 0) {
        items.push({"name": question, "value": parts[j], "inline": false});
      } else {
      items.push({"name": question.concat(" (cont.)"), "value": parts[j], "inline": false});
      }
    }   
  }
  
  var options = {
    "method" : "post",
    "payload": JSON.stringify({
      "embeds": [
        {
          "title":"**There has been a request @Economic Advisor.**",
          "fields":items,
        }
      ]
    }
   )
  };

   //UrlFetchApp.fetch(POST_URL, options);
   UrlFetchApp.fetch(otherUrl, options);
};
