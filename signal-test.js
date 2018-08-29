var i2c = require('./ioctl.js')
i2c.Transmit(0x02, 0x25, 0x01)
console.log('sent command')
