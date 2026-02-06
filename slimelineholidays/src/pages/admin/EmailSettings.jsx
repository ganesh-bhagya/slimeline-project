import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Loader from "../../components/ui/Loader";

export default function EmailSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    host: "",
    port: 587,
    secure: false,
    user: "",
    password: "",
    from_email: "",
    from_name: "Slimeline Holidays",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axiosClient.get("/email-settings");
      if (response.data.settings) {
        setFormData({
          host: response.data.settings.host || "",
          port: response.data.settings.port || 587,
          secure: response.data.settings.secure === 1 || response.data.settings.secure === true,
          user: response.data.settings.user || "",
          password: "", // Don't show password
          from_email: response.data.settings.from_email || "",
          from_name: response.data.settings.from_name || "Slimeline Holidays",
        });
      }
    } catch (error) {
      console.error("Error fetching email settings:", error);
      // Settings might not exist yet, that's okay
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 0 : value,
      };
      
      // Auto-enable SSL/TLS when port 465 is selected
      if (name === "port" && parseInt(value) === 465) {
        newData.secure = true;
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      if (!formData.host || !formData.user || !formData.password || !formData.from_email || !formData.from_name) {
        throw new Error("Please fill in all required fields");
      }

      await axiosClient.post("/email-settings", formData);
      setSuccess("Email settings saved successfully!");
    } catch (error) {
      console.error("Error saving email settings:", error);
      setError(error.response?.data?.message || error.message || "Failed to save email settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader size="md" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-theme-green-dark-color">
        Email Settings
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <p className="text-gray-600 mb-6">
          Configure your email server settings to receive notifications for enquiries and contact form submissions.
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="smtp.gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-green-color focus:border-transparent"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Your email provider's SMTP server address
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Port <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="port"
                value={formData.port}
                onChange={handleChange}
                placeholder="587"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-green-color focus:border-transparent"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Port 465 = SSL/TLS, Port 587 = STARTTLS
              </p>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="secure"
                  checked={formData.secure}
                  onChange={handleChange}
                  className="w-4 h-4 text-theme-green-color focus:ring-theme-green-color border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Use SSL/TLS (Required for port 465)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email/Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              placeholder="your-email@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-green-color focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your email password or app password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-green-color focus:border-transparent"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              For Gmail, use an App Password instead of your regular password
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              placeholder="noreply@slimelineholidays.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-green-color focus:border-transparent"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              The email address that will appear as the sender
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Slimeline Holidays"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-green-color focus:border-transparent"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              The display name for the sender
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 bg-theme-green-color text-white rounded-md hover:bg-theme-green-dark-color transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Common SMTP Settings:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li><strong>Gmail:</strong> smtp.gmail.com, Port: 587, SSL: No (or Port: 465, SSL: Yes)</li>
            <li><strong>Outlook:</strong> smtp-mail.outlook.com, Port: 587, SSL: No</li>
            <li><strong>Yahoo:</strong> smtp.mail.yahoo.com, Port: 587, SSL: No (or Port: 465, SSL: Yes)</li>
            <li><strong>cPanel/Hosting:</strong> Your domain (e.g., slimlineholidays.com), Port: 465, SSL: Yes</li>
          </ul>
          <p className="text-xs text-blue-700 mt-2">
            <strong>Note:</strong> Port 465 requires SSL/TLS to be enabled. Port 587 uses STARTTLS (SSL: No).
          </p>
        </div>
      </div>
    </div>
  );
}

