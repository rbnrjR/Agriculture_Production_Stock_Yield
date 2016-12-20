const fs = require('fs');
var jArray=[];

//Reading the csv file
const reader= readline.createInterface({
	input: fs.createReadStream('../json/foodgrains.json', 'utf-8')
});
reader.on('line', function(line) {
	var content= line.split(',');
	for(var i=0;i<content.length;i++) {
			jArray[i]= content[i].trim();
	}
  console.log(jArray);
  jArray.sort(function (a, b) {
    if (parseFloat(a.Quantity) < parseFloat(b.Quantity)) {
      return 1;
    }
    if (parseFloat(a.Quantity) > parseFloat(b.Quantity)) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  //writer.write(jArray);
})
