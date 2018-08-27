var dbus = require('dbus')

var bus = dbus.getBus('system')

bus.getInterface('org.olli.i2c1', '/org/olli/i2c1', 'org.olli.i2c1.event', function(err, iface) {
    iface.buffer_handler(0x02, 0x03, function(err) {
        if(err) {

        }
        console.log('enable i2c controller')
    })
})