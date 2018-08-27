var dbus = require('dbus')
var bus = dbus.getBus('system')
const i2c = require('i2c-bus');
const gpio = require('onoff').Gpio
const delay = require('delay')
const pin67 = new gpio(67, 'out');
// Export gpio48 as an interrupt generating input with a debounceTimeout of 10
const gpio48 = new gpio(48, 'in', 'rising', {debounceTimeout: 10});

const I2C_ADDRESS = 0x68;
const BUFF_SIZE = 0x02

var data = new Buffer([0x00, 0x00]);
var RxBuff = new Buffer([0x00, 0x00]);

const i2c1 = i2c.openSync(1)

function pulse () {
	pin67.writeSync(1)
	pin67.writeSync(0)
	pin67.writeSync(1)
}

exports.Transmit = function(target, command) {
	//create pulse before transmission
	pulse()

	console.log('Sending data to Mic-array');
	data[0] = target
	data[1] = command
	i2c1.i2cWriteSync(I2C_ADDRESS, BUFF_SIZE, data, function(err) {
		if (err) {
			throw err;
		}
	})
}

exports.Receive = function() {
	gpio48.watch((err, value) => {
		if (err) {
			throw err;
		}

		console.log('Receiving data from Mic-array')
		i2c1.i2cRead(I2C_ADDRESS, BUFF_SIZE, RxBuff, function(error) {
			if(err) {
				throw err;
			}
			console.log(RxBuff)
		})
	})
	return RxBuff;
}

exports.dbus_interface_controller = function(service, obj_path, interface) {
	bus.getInterface(service, obj_path, interface, function(err, iface) {
		if(err)
		{
			console.log('Can not get Interface from Dbus')
		}

		gpio48.watch((err, value) => {
			if (err) {
				throw err;
			}

			console.log('Receiving data from Mic-array')
			i2c1.i2cReadSync(I2C_ADDRESS, BUFF_SIZE, RxBuff, function(error) {
				if(err) {
					throw err;
				}
			})

			iface.buffer_handler(RxBuff[0], RxBuff[1], function(err) {
				if(err)
				{
					throw err
				}
			})
		})
	})
}
