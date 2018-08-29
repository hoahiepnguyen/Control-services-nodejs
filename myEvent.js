const I2C_ADDRESS = 0x68;
const LED_RING = 0x00
const MIC_ARRAY = 0x01
const CYPRESS_BUTTON = 0x02
const EVENT_HANLE = 0x03

const VOLUME_UP = 0x20
const VOLUME_DOWN = 0x21
const VOLUME_MUTE = 0x22
const WAKE_WORD_START = 0x23
const WAKE_WORD_STOP = 0x24
const VOLUME_UNMUTE = 0x25
var data = new Buffer([0x00, 0x00, 0x00])

const i2c = require('i2c-bus');
var ioctl = require('./ioctl.js')
var EventEmitter = require('events')

const i2c1 = i2c.openSync(1)

var myI2C = new EventEmitter()


function Controller(target, command)
{
    if(target == LED_RING) {
    }
    else if(target == MIC_ARRAY) {
    }
    else if(target == CYPRESS_BUTTON) {
        switch(command) {
            case VOLUME_UP:
                ioctl.Transmit(0x02, 0x20, 0x06)
                console.log('volume up')
                break;
            case VOLUME_DOWN:
                ioctl.Transmit(0x02, 0x21, 0x03)
                console.log('volume down')
                break;
            case VOLUME_MUTE:
                ioctl.Transmit(0x02, 0x22, 0x00)
                console.log('volume mute')
                break;
            case VOLUME_UNMUTE:
                ioctl.Transmit(0x02, 0x25, 0x00)
                console.log('volume unmute')
                break;
            case WAKE_WORD_START:
            //recording audio
                console.log('recording')
                break;
        }
    }
}
function myEvents() {
    var self = this
    this.on = function() {

        myI2C.on('i2c event', (target, command) => {
            Controller(target, command)
        })
    }
    this.emit = function(target, command){
        myI2C.emit('i2c event', target, command)
    }
}

module.exports = new myEvents()

console.log('Event created')