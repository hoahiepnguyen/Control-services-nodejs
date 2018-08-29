const i2c = require('i2c-bus');
const gpio = require('onoff').Gpio
const delay = require('delay')

const pin67 = new gpio(67, 'out')
const pin66 = new gpio(66, 'out')

const I2C_ADDRESS = 0x68;
const BUFF_SIZE = 0x03

var data = new Buffer([0x00, 0x00, 0x00]);

const i2c1 = i2c.openSync(1)

function pulse() {
    pin67.writeSync(1)
    pin67.writeSync(0)
    pin67.writeSync(1)
}

exports.reset = function() {
    pin66.writeSync(1)
    delay(10)
    pin66.writeSync(0)
    delay(10)
    pin66.writeSync(1)
}

exports.Transmit = function(target, command, value) {
    //create pulse before transmission
    pulse()

    //console.log('Sending data to Mic-array');
    data[0] = target
    data[1] = command
    data[2] = value
    i2c1.i2cWriteSync(I2C_ADDRESS, BUFF_SIZE, data, function(err) {
        if (err) {
            gpio.reset()
            throw err;
        }
    })
}
