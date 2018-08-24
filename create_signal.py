import dbus
import dbus.service
import dbus.mainloop.glib
try:
  from gi.repository import GObject
except ImportError:
    import gobject as GObject

class testService(dbus.service.Object):
    bus = None

    def __init__(self):
        self.bus = dbus.SystemBus()

    def run_service(self):
        bus_name = dbus.service.BusName("org.olli.i2c1", dbus.SystemBus())
        dbus.service.Object.__init__(self, bus_name, "/org/olli/i2c1")

    @dbus.service.method('org.olli.i2c1', in_signature='', out_signature='')
    def emitSignal(self):
        self.wakeupSignal('hello') 

    @dbus.service.signal('org.olli.i2c1', signature='s')
    def wakeupSignal(self, message):
        pass

if __name__ == '__main__':
    dbus.mainloop.glib.DBusGMainLoop(set_as_default=True)
    testSv = testService()
    testSv.run_service()
    try:
        main_loop = GObject.MainLoop()
        print('Created I2C1 DBUS')
        main_loop.run()
    except(KeyboardInterrupt, SystemExit):
        main_loop.quit()
        os._exit(1)
