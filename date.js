var POST_URL = "EXPUNGED";

function onSubmit(e) {
  
  var ss = SpreadsheetApp.openById('EXPUNGED')
  var sheet = ss.getSheetByName('Sheet1')
  var range = sheet.getRange('C4')
  var value = range.getValue().toString().substring(4,range.getValue().toString().length-24)
  
  Logger.log(value)
  
  var fields = []
  
  var data = {
    "content": "**" + value + "**"
  };
  
  var options = {
    method: "post",
    payload: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(POST_URL, options);
};
