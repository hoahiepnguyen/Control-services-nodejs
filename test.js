var execFile = require('child_process').execFile

var child = execFile('/usr/bin/amixer', ['scontrols',], function(err, stdout, stderr) {
    console.log(stdout)
})
