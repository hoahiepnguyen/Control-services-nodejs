var dbus = require('dbus')

var service = dbus.registerService('system', 'org.olli.i2c1')
var obj = service.createObject('/org/olli/i2c1')

var iface = obj.createInterface('org.olli.i2c1.event')

iface.addMethod('buffer_handler', {
    in: [dbus.Define(Number), dbus.Define(Number)],
    out: dbus.Define(String)
}, function(object, command, callback) {
        console.log(object)
        console.log(command)
        callback()
})

iface.update()
console.log('Nodejs Service created')
