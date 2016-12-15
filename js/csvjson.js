var fs = require('fs');
var reader = fs.createReadStream('Production-Department_of_Agriculture_and_Cooperation_1.csv', 'utf-8');
var writer = fs.createWriteStream('Production-Department_of_Agriculture_and_Cooperation_1.json', 'utf-8');

reader.on('data', function(chunk) {
    // body...
    var file = '';
    file += chunk;
    var lines = file.split('\n');
    var header = lines[0].split(',');
    var row = lines.length;
    var col = header.length;
    var i = 0,
        j = 0;
    for (i = 1; i < row - 1; i++) {
        var newLines = lines[i].split(',');
        writer.write('{');
        writer.write('\r\n');
        for (j = 0; j < col; j++) {
            writer.write('\r\n');
            writer.write(header[j] + ":" + newLines[j]);
            writer.write('\r\n');
        };
        writer.write('}');
        writer.write('\r\n');
        writer.write('\r\n');
    };
})
