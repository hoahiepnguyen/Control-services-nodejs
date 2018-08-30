const I2C_ADDRESS = 0x68;
const LED_RING = 0x00
const MIC_ARRAY = 0x01
const CYPRESS_BUTTON = 0x02
const USER_EVENT = 0x03

const VOLUME_UP = 0x20
const VOLUME_DOWN = 0x21
const VOLUME_MUTE = 0x22
const BT_WAKEWORD_START = 0x23
const WAKE_WORD_STOP = 0x24
const VOLUME_UNMUTE = 0x25
const MICROPHONE_MUTE = 0x26
const MICROPHONE_UNMUTE = 0x27
var data = new Buffer([0x00, 0x00, 0x00])

const i2c = require('i2c-bus');
var ioctl = require('./ioctl')
var EventEmitter = require('events').EventEmitter

const i2c1 = i2c.openSync(1)

var BufferEvents = new EventEmitter()


//var button = new EventEmitter()
//var led_ring = new EventEmitter()

BufferEvents.on('button', (command)=> {
	switch(command) {
		case VOLUME_UP:
			ioctl.Transmit(CYPRESS_BUTTON, VOLUME_UP, 0x06)
			console.log('volume up')
			break;
		case VOLUME_DOWN:
			ioctl.Transmit(CYPRESS_BUTTON, VOLUME_DOWN, 0x03)
			console.log('volume down')
			break;
		case VOLUME_MUTE:
			//do something here
			ioctl.mute()
			ioctl.Transmit(CYPRESS_BUTTON, VOLUME_MUTE)
			console.log('volume mute')
			break;
		case VOLUME_UNMUTE:
			ioctl.unmute()
			ioctl.Transmit(CYPRESS_BUTTON, VOLUME_UNMUTE, 0x02)
			console.log('volume unmute')
			break;
		case MICROPHONE_MUTE:
			ioctl.Transmit(CYPRESS_BUTTON, MICROPHONE_MUTE)
			console.log('microphone mute')
			break;
		case MICROPHONE_UNMUTE:
			ioctl.Transmit(CYPRESS_BUTTON, MICROPHONE_UNMUTE)
			console.log('microphone unmute')
			break;
		case BT_WAKEWORD_START:
			//recording audio
			console.log('recording')
			break;
	}
})

BufferEvents.on('led_ring', (command) => {
	switch(command) {

	}
})

function Controller(target, command) {
	switch(target) {
		case LED_RING:
			BufferEvents.emit('led_ring', command)
			break;
		case CYPRESS_BUTTON:
			BufferEvents.emit('button', command)
			break;
	}
}


BufferEvents.on('i2c event', (target, command) => {
	setImmediate(() => {
		Controller(target, command)

	})
})

module.exports = BufferEvents
