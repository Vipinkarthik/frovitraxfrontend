import { FaBell } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate receiving notifications
  useEffect(() => {
    const initialNotifications = [
      { id: 1, message: 'New order received from Vendor A', read: false, createdAt: new Date() },
      { id: 2, message: 'Inventory low: Item X', read: false, createdAt: new Date() },
      { id: 3, message: 'Device #123 needs maintenance', read: true, createdAt: new Date() },
    ];
    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.filter(n => !n.read).length);

    // Optional: simulate new notifications every 15 seconds
    const interval = setInterval(() => {
      const newNotif = {
        id: notifications.length + 1,
        message: `New notification #${notifications.length + 1}`,
        read: false,
        createdAt: new Date(),
      };
      setNotifications(prev => [newNotif, ...prev]);
      setUnreadCount(prev => prev + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
    if (!open) {
      // Mark all as read when opening
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleOpen} className="relative">
        <FaBell className="text-xl text-green-700 cursor-pointer" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <h4 className="font-semibold text-gray-700 px-4 py-2 border-b border-gray-200">Notifications</h4>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 p-4">No notifications</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className="px-4 py-3 hover:bg-gray-100 transition cursor-pointer"
                >
                  <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {notif.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
