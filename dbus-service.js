const LED_RING = 0x00
const MIC_ARRAY = 0x01
const CYPRESS_BUTTON = 0x02

const VOLUME_UP = 0x20
const VOLUME_DOWN = 0x21
const VOLUME_MUTE = 0x22
const WAKE_WORD_START = 0x23
const WAKE_WORD_STOP = 0x24

var dbus = require('dbus')

var service = dbus.registerService('system', 'org.olli.i2c1')
var obj = service.createObject('/org/olli/i2c1')

var iface = obj.createInterface('org.olli.i2c1.event')

iface.addMethod('buffer_handler', {
    in: [dbus.Define(Number), dbus.Define(Number)],
    out: dbus.Define(String)
}, function(object, command, callback) {
        console.log(object)
        console.log(command)
        if(object == LED_RING) {
        }
        else if(object == MIC_ARRAY) {
        }
        else if(object == CYPRESS_BUTTON) {
            switch(command) {
                case VOLUME_UP:
                break;
                case VOLUME_DOWN:
                break;
                case VOLUME_MUTE:
                break;
                case WAKE_WORD_START:
                break;
                case WAKE_WORD_STOP:
                break;
            }
        }
        callback()
})

iface.update()
console.log('Nodejs Service created')
