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
var data = new Buffer([0x00, 0x00, 0x00]);

const i2c = require('i2c-bus');
var gpio = require('./gpio.js')

const i2c1 = i2c.openSync(1)

//var i2c = require('./i2c-control.js')
var dbus = require('dbus')

var service = dbus.registerService('system', 'org.olli.i2c1')
var obj = service.createObject('/org/olli/i2c1')

var iface = obj.createInterface('org.olli.i2c1.event')

function Transmit(target, command, value) {
    //create pulse before transmission
    gpio.pulse()

    console.log('Sending data to Mic-array');
    data[0] = target
    data[1] = command
    data[2] = value
    i2c1.i2cWriteSync(I2C_ADDRESS, 0x03, data, function(err) {
        if (err) {
            gpio.reset()
            throw err;
        }
    })
}

iface.addMethod('buffer_handler', {
    in: [dbus.Define(Number), dbus.Define(Number)],
    out: dbus.Define(String)
}, function(object, command, callback) {
        if(object == LED_RING) {
        }
        else if(object == MIC_ARRAY) {
        }
        else if(object == CYPRESS_BUTTON) {
            switch(command) {
                case VOLUME_UP:
                    Transmit(0x02, 0x20, 0x06)
                    console.log('volume up')
                    break;
                case VOLUME_DOWN:
                    Transmit(0x02, 0x21, 0x03)
                    console.log('volume down')
                    break;
                case VOLUME_MUTE:
                    Transmit(0x02, 0x22, 0x00)
                    console.log('volume mute')
                    break;
                case VOLUME_UNMUTE:
                    Transmit(0x02, 0x25, 0x00)
                    console.log('volume mute')
                    break;
                case WAKE_WORD_START:
                //recording audio
                    console.log('recording')
                    break;
            }
        }
        callback()
})

iface.update()
console.log('Nodejs Service created')

// exports.dbus_interface_controller = function(service, obj_path, interface) {
//  bus.getInterface(service, obj_path, interface, function(err, iface) {
//      if(err)
//      {
//          console.log('Can not get Interface from Dbus')
//      }

//      gpio48.watch((err, value) => {
//          if (err) {
//              throw err;
//          }

//          console.log('Receiving data from Mic-array')
//          i2c1.i2cReadSync(I2C_ADDRESS, BUFF_SIZE, RxBuff, function(error) {
//              if(err) {
//                  throw err;
//              }
//          })

//          iface.buffer_handler(RxBuff[0], RxBuff[1], function(err) {
//              if(err)
//              {
//                  throw err
//              }
//          })
//      })
//  })
// }
