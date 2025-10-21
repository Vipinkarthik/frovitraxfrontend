import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function VendorSettings() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'Light');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (selectedTheme === 'Dark') {
      root.classList.add('dark');
    } else if (selectedTheme === 'Light') {
      root.classList.add('light');
    } else if (selectedTheme === 'Auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    }
    localStorage.setItem('theme', selectedTheme);
  };

  const handleThemeChange = (e) => {
    const selected = e.target.value;
    setTheme(selected);
    applyTheme(selected);
  };

  const handleSave = () => {
    applyTheme(theme);
    alert(`Theme set to ${theme}. This will apply across all vendor pages.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-500">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center">
          Vendor Settings
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Notification Preferences
            </label>
            <select className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-blue-400 focus:border-blue-400 transition">
              <option>Email Only</option>
              <option>SMS Only</option>
              <option>Email & SMS</option>
              <option>None</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Theme
            </label>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-blue-400 focus:border-blue-400 transition"
            >
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => navigate('/vendoraccount')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
          >
            Back to Account
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition shadow"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
