const i2c = require('i2c-bus');
const gpio = require('onoff').Gpio
var BufferEvents = require('./myEvent')
var ioctl = require('./ioctl')

// Export gpio48 as an interrupt generating input with a debounceTimeout of 10
const gpio48 = new gpio(48, 'in', 'rising', {debounceTimeout: 10});

const I2C_ADDRESS = 0x68;
const BUFF_SIZE = 0x02

var RxBuff = new Buffer([0x00, 0x00]);

const i2c1 = i2c.openSync(1)

gpio48.watch((err, value) => {
	if (err) {
		throw err;
	}
	//console.log('Receiving data from Mic-array')
	i2c1.i2cReadSync(I2C_ADDRESS, BUFF_SIZE, RxBuff, function(error) {
		if(err) {
			ioctl.reset()
			throw err;
		}
	})
	BufferEvents.emit('i2c event', RxBuff[0], RxBuff[1])
})

console.log('Event created')