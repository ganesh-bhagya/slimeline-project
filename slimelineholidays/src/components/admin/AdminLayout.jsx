import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import Loader from "../ui/Loader";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        throw new Error('No token found');
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/auth/check`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }

      const data = await response.json();

      if (data.authenticated) {
        setUser(data.user);
        // Store user data in localStorage
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        if (pathname === "/admin/login") {
          navigate("/admin/dashboard");
        }
      } else {
        // Clear authentication data
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        if (pathname !== "/admin/login") {
          navigate("/admin/login");
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      // Clear authentication data on error
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      if (pathname !== "/admin/login") {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear authentication data (JWT is stateless, so logout is client-side)
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      navigate("/admin/login");
    }
  };

  // Don't render layout for login page
  if (pathname === "/admin/login") {
    return <Outlet />;
  }

  if (loading) {
    return <Loader fullScreen={true} size="lg" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-theme-green-dark-color">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-gray-700">Welcome, {user.username}</span>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Link
              to="/admin/dashboard"
              className={`block px-4 py-2 rounded-md transition-colors ${
                pathname === "/admin/dashboard"
                  ? "bg-theme-green-color text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>
                  <Link
                    to="/admin/packages"
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      pathname === "/admin/packages" || pathname.startsWith("/admin/packages/")
                        ? "bg-theme-green-color text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Packages
                  </Link>
            <Link
              to="/admin/enquiries"
              className={`block px-4 py-2 rounded-md transition-colors ${
                pathname === "/admin/enquiries" || pathname.startsWith("/admin/enquiries/")
                  ? "bg-theme-green-color text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Enquiries
            </Link>
            <Link
              to="/admin/contacts"
              className={`block px-4 py-2 rounded-md transition-colors ${
                pathname === "/admin/contacts" || pathname.startsWith("/admin/contacts/")
                  ? "bg-theme-green-color text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Contacts
            </Link>
            <Link
              to="/admin/testimonials"
              className={`block px-4 py-2 rounded-md transition-colors ${
                pathname === "/admin/testimonials" || pathname.startsWith("/admin/testimonials/")
                  ? "bg-theme-green-color text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Testimonials
            </Link>
            <Link
              to="/admin/email-settings"
              className={`block px-4 py-2 rounded-md transition-colors ${
                pathname === "/admin/email-settings"
                  ? "bg-theme-green-color text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Email Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

