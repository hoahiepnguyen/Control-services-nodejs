import dbus
bus = dbus.SystemBus()

remote_object = bus.get_object('org.olli.i2c1', '/org/olli/i2c1')

gpio_iface = dbus.Interface(remote_object,
    dbus_interface='org.olli.i2c1')
gpio_iface.emitSignal()