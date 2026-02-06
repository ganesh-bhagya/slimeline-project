import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PackageForm from "../../components/admin/PackageForm";
import axiosClient from "../../../axios-client";
import Loader from "../../components/ui/Loader";

export default function PackageEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPackage();
    }
  }, [id]);

  const fetchPackage = async () => {
    try {
      const response = await axiosClient.get(`/packages/${id}`);
      const data = response.data;
      if (data && data.package) {
        setPackageData(data.package);
      } else if (data) {
        // Fallback in case the response structure is different
        setPackageData(data);
      }
    } catch (error) {
      console.error("Error fetching package:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    navigate("/admin/packages");
  };

  if (loading) {
    return <Loader size="md" />;
  }

  if (!packageData) {
    return <div className="text-xl text-red-600">Package not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-theme-green-dark-color">
        Edit Package
      </h1>
      <PackageForm packageData={packageData} onSuccess={handleSuccess} />
    </div>
  );
}

