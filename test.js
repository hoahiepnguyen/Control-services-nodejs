var i2c = require('./i2c-control.js')

i2c.Transmit(0x32, 0x42)
i2c.dbus_interface_controller('org.olli.i2c1', '/org/olli/i2c1', 'org.olli.i2c1.event')
