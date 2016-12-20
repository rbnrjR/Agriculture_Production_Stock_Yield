var fs = require('fs');
//Reading the csv file
var reader = fs.createReadStream('../csv/Production-Department_of_Agriculture_and_Cooperation_1.csv', 'utf-8');
//Writing the file in json format
var writer = fs.createWriteStream('../json/Production-Department_of_Agriculture_and_Cooperation_1.json', 'utf-8');
reader.on('data', function(chunk) {
    var file = '';
    file += chunk;
    var lines = file.split('\n');
    var heading = lines[0].split(',');
    var row = lines.length;
    var col = heading.length;
    for (var i = 1; i < row - 1; i++) {         //fetching the nextLine at every iteration
        var newLines = lines[i].split(',');
        writer.write('{');
        writer.write('\r\n');
        for (var j = 0; j < col; j++) {         //traverse through the newLine
            writer.write('\r\n');
            writer.write(heading[j] + ":" + newLines[j]); //key:values
            writer.write('\r\n');
        };
        writer.write('}');
        writer.write('\r\n');
        writer.write('\r\n');
    };
});
