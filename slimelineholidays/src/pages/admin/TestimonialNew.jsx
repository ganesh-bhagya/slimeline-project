import { useNavigate } from "react-router-dom";
import TestimonialForm from "../../components/admin/TestimonialForm";

export default function TestimonialNew() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/admin/testimonials");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-theme-green-dark-color">
        Add Testimonial
      </h1>
      <TestimonialForm onSuccess={handleSuccess} />
    </div>
  );
}
