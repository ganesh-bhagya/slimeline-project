import { useNavigate } from "react-router-dom";
import PackageForm from "../../components/admin/PackageForm";

export default function PackageNew() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/admin/packages");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-theme-green-dark-color">
        Create New Package
      </h1>
      <PackageForm onSuccess={handleSuccess} />
    </div>
  );
}

