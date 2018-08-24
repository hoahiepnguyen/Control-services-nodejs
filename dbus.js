var dbus = require('dbus-native')
var systemBus = dbus.systemBus()

systemBus.getService('org.olli.i2c1').getInterface('/org/olli/i2c1', 'org.olli.i2c1',
    function(err, iface) {
    if(err) {
        throw err
    }

    iface.on('wakeupSignal', function() {
        console.log('Hello world')
    })

})

