import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Loader from "../../components/ui/Loader";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPackages: 0,
    sriLankaPackages: 0,
    indiaPackages: 0,
    maldivesPackages: 0,
    totalEnquiries: 0,
    pendingEnquiries: 0,
    totalContacts: 0,
    pendingContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [packagesResponse, enquiriesResponse, contactsResponse] = await Promise.all([
        axiosClient.get('/packages?admin=true'),
        axiosClient.get('/enquiries'),
        axiosClient.get('/contacts')
      ]);

      const packagesData = packagesResponse.data;
      const enquiriesData = enquiriesResponse.data;
      const contactsData = contactsResponse.data;

      const packages = Array.isArray(packagesData) ? packagesData : (packagesData.packages || []);
      setStats((prev) => ({
        ...prev,
        totalPackages: packages.length,
        sriLankaPackages: packages.filter((p) => p.country === "Sri Lanka").length,
        indiaPackages: packages.filter((p) => p.country === "India").length,
        maldivesPackages: packages.filter((p) => p.country === "Maldives").length,
      }));

      const enquiries = Array.isArray(enquiriesData) ? enquiriesData : (enquiriesData.enquiries || []);
      setStats((prev) => ({
        ...prev,
        totalEnquiries: enquiries.length,
        pendingEnquiries: enquiries.filter((e) => e.status === "pending").length,
      }));

      const contacts = Array.isArray(contactsData) ? contactsData : (contactsData.contacts || []);
      setStats((prev) => ({
        ...prev,
        totalContacts: contacts.length,
        pendingContacts: contacts.filter((c) => c.status === "pending").length,
      }));
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader size="md" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-theme-green-dark-color">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Packages
          </h3>
          <p className="text-3xl font-bold text-theme-green-color">
            {stats.totalPackages}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Enquiries
          </h3>
          <p className="text-3xl font-bold text-theme-green-color">
            {stats.totalEnquiries}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Contacts
          </h3>
          <p className="text-3xl font-bold text-theme-green-color">
            {stats.totalContacts}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Pending Enquiries
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {stats.pendingEnquiries}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Pending Contacts
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {stats.pendingContacts}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Sri Lanka Packages
          </h3>
          <p className="text-3xl font-bold text-theme-green-color">
            {stats.sriLankaPackages}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            India Packages
          </h3>
          <p className="text-3xl font-bold text-theme-green-color">
            {stats.indiaPackages}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Maldives Packages
          </h3>
          <p className="text-3xl font-bold text-theme-green-color">
            {stats.maldivesPackages}
          </p>
        </div>
      </div>
    </div>
  );
}

