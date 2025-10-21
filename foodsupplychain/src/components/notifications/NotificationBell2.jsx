import { FaBell } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationBell2() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Sample notifications (replace with real-time data later)
  const notifications = [
    "New order received",
    "Payment completed",
    "Low stock alert",
    "Device requires attention"
  ];

  return (
    <div className="relative">
      {/* Bell Icon */}
      <FaBell
        className="text-xl text-blue-600 cursor-pointer animate-pulse"
        onClick={() => setOpen(!open)}
      />
      
      {/* Notification Badge */}
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>

      {/* Notification Pop-up */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg z-50">
          <h4 className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
            Notifications
          </h4>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.map((note, i) => (
              <li
                key={i}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-100 text-sm"
                onClick={() => {
                  setOpen(false);
                  navigate('/vendororders'); // example redirect
                }}
              >
                {note}
              </li>
            ))}
          </ul>
          {notifications.length === 0 && (
            <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">No notifications</p>
          )}
        </div>
      )}
    </div>
  );
}
