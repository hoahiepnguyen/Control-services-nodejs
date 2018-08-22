var buff = new Buffer([0x00, 0x00])
const i2c = require('./i2c.js')

i2c.I2C_Transmit(0x03, 0x04)
i2c.I2C_Receive(buff)