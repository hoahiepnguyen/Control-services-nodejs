#!/usr/bin/env python

usage = """Usage:
python example-signal-emitter.py &
python example-signal-recipient.py
python example-signal-recipient.py --exit-service
"""

import sys
import traceback

try:
  from gi.repository import GObject
except ImportError:
    import gobject as GObject

import dbus
import dbus.mainloop.glib

def handle_reply(msg):
    print msg

def handle_error(e):
    print str(e)

def hello_signal_handler():
    print ("gpio interrupt " )

if __name__ == '__main__':
    dbus.mainloop.glib.DBusGMainLoop(set_as_default=True)

    bus = dbus.SystemBus()
    try:
        object  = bus.get_object('org.olli.i2c1', '/org/olli/i2c1')

        object.connect_to_signal("wakeupSignal", hello_signal_handler, dbus_interface="org.olli.i2c1")
    except dbus.DBusException:
        traceback.print_exc()
        print usage
        sys.exit(1)

    loop = GObject.MainLoop()
    print('Waiting for i2c1-signal')
    loop.run()