const readline = require('readline');
const fs = require('fs');
var header =[],
    jArray=[],
    obj={},
    isHeader=true;
//Reading the csv file
const reader= readline.createInterface({
	input: fs.createReadStream('../csv/Production-Department_of_Agriculture_and_Cooperation_1.csv', 'utf-8')
});
reader.on('line', function(line) {
	var content= line.split(',');
	var flag= false;
	for(var i=0;i<content.length;i++) {
		if(isHeader) { //loading elements into header array
			header[i]= content[i].trim();
		}
		else if((header[i]=='Particulars')|| (header[i]=='3-2013')) {
			if(content[0].includes('Oilseeds')) {
        if(content[0].includes("Major")||content[0].includes("Area")||
                    content[0].includes("Foodgrains Production Foodgrains")||
                    content[0].includes("Yield")||content[0].includes("Volume")||
                    content[0].includes("Production Foodgrains Production")){
          break; //stops the particular iteration
        }
        else {
          flag= true;
          if(i==0) {
            obj[header[i]]= content[i]; //key : values
          }
          else {
            obj[header[i].replace('3-2013','Quantity in 2013')]= content[i+1].replace('NA',0); //key : values
          }
        }
      }
		}
	}
	if(flag) {
		jArray.push(obj);
	}
	isHeader=false;
  //Writing the JSON file
	fs.writeFileSync('../json/oilseeds.json',JSON.stringify(jArray,null,'\r\n'),'utf-8');
	obj={};
});
