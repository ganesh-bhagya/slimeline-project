import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TestimonialForm from "../../components/admin/TestimonialForm";
import axiosClient from "../../../axios-client";
import Loader from "../../components/ui/Loader";

export default function TestimonialEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchOne();
  }, [id]);

  const fetchOne = async () => {
    try {
      const response = await axiosClient.get(`/testimonials/${id}`);
      const data = response.data;
      setTestimonial(data?.testimonial ?? data);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      navigate("/admin/testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    navigate("/admin/testimonials");
  };

  if (loading) {
    return <Loader size="md" />;
  }

  if (!testimonial) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-theme-green-dark-color">
        Edit Testimonial
      </h1>
      <TestimonialForm testimonial={testimonial} onSuccess={handleSuccess} />
    </div>
  );
}
