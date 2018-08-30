function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {
      name : "スクリプト名",
      functionName : "myFunction"
    }
  ];
  sheet.addMenu("スクリプト実行", entries);
};

　function myFunction () {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheetData = book.getSheetByName("シート1");

  var colID = 1;
  var colURL = 2;
  var colContributeCount = 3;
  var colIcon = 4;

  var rowStartData = 2
  var rowEndData = sheetData.getDataRange().getLastRow()

  for (var i = rowStartData; i <= rowEndData; i += 1) {
      var url = 'http://qiita.com/' + sheetData.getRange(i, colID).getValue();
      sheetData.getRange(i, colURL).setValue(url);
      var response = UrlFetchApp.fetch(url);
      var html = response.getContentText('UTF-8');

      var searchTag = '/contributions"><span class="userActivityChart_statCount">';
      var index = html.indexOf(searchTag)
      if (index !== -1) {
        var html = html.substring(index + searchTag.length);
        var index = html.indexOf('</span>');
        if (index !== -1) {
          sheetData.getRange(i, colContributeCount).setValue(html.substring(0, index));
        }
      }

  }
}