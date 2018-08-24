var dbus = require('dbus-native')
var systemBus = dbus.systemBus()

const serviceName = 'org.olli.i2c1'

const interfaceName = serviceName;

// Check the connection was successful
if (!systemBus) {
  throw new Error('Could not connect to the DBus session bus.');
}


const objectPath = '/org/olli/i2c1'

systemBus.requestName(serviceName, 0x4, (err, retCode) => {
    if(err){
        throw new Error(
            `Could not request service name ${serviceName}, the error was: ${err}.`
        )
    }
  // Return code 0x1 means we successfully had the name
    if (retCode === 1) {
        console.log(`Successfully requested service name "${serviceName}"!`);
        proceed();
    } else {
        throw new Error(
            `Failed to request service name "${serviceName}". Check what return code "${retCode}" means.`
        );
    }
})

function proceed() {
    var ifaceDesc = {
        name: interfaceName,
        methods: {
            emitSignal: ['', 's', [], []]
        },

        signals: {
            wakeupSignal: ['s', 'message']
        },

        properties: {}
    }

    var iface = {
        // wakeupSignal: function(msg) {
        //     console.log(msg)
        // },

        emitSignal: function() {
            return 'hello dark'
        },
    }

    // Now we need to actually export our interface on our object
    systemBus.exportInterface(iface, objectPath, ifaceDesc)
}
