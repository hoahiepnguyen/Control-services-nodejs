var dbus = require('dbus')
var bus = dbus.getBus('system')
const i2c = require('i2c-bus');
const gpio = require('onoff').Gpio
var myEvents = require('./myEvent.js')
var mcu_rst = require('./ioctl.js')

// Export gpio48 as an interrupt generating input with a debounceTimeout of 10
const gpio48 = new gpio(48, 'in', 'rising', {debounceTimeout: 10});

const I2C_ADDRESS = 0x68;
const BUFF_SIZE = 0x02

var RxBuff = new Buffer([0x00, 0x00]);

const i2c1 = i2c.openSync(1)

Promise.all(
				[myEvents.on()]
			)
			.then(() => {
				mcu_rst.reset()
				gpio48.watch((err, value) => {
					if (err) {
						throw err;
					}

					//console.log('Receiving data from Mic-array')
					i2c1.i2cReadSync(I2C_ADDRESS, BUFF_SIZE, RxBuff, function(error) {
						if(err) {
							mcu_rst.reset()
							throw err;
						}
					})
					myEvents.emit(RxBuff[0], RxBuff[1])
				})
			})
			.catch(function(err){
				console.error(err)
			})