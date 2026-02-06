import { useState, useEffect, useRef } from "react";
import axiosClient from "../../../axios-client";

const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:3001/api").replace(
  /\/api\/?$/,
  ""
);

function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${apiBase}${path.startsWith("/") ? path : `/${path}`}`;
}

const MAX_GALLERY = 6;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function TestimonialForm({ testimonial, onSuccess }) {
  const [formData, setFormData] = useState({
    quote: "",
    author_name: "",
    author_location: "",
    image: "",
    gallery_images: [],
    sort_order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const authorInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        quote: testimonial.quote || "",
        author_name: testimonial.author_name || "",
        author_location: testimonial.author_location || "",
        image: testimonial.image || "",
        gallery_images: Array.isArray(testimonial.gallery_images)
          ? testimonial.gallery_images
          : [],
        sort_order: testimonial.sort_order ?? 0,
      });
    }
  }, [testimonial]);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Invalid file type. Use JPEG, PNG, WebP or GIF.");
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError("File too large. Maximum size is 10MB.");
      return false;
    }
    return true;
  };

  const handleAuthorImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateFile(file)) {
      e.target.value = "";
      return;
    }
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const response = await axiosClient.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.path) {
        setFormData((prev) => ({ ...prev, image: response.data.path }));
      } else {
        setError(response.data?.error || "Upload failed");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error uploading image.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (formData.gallery_images.length >= MAX_GALLERY) {
      setError(`Maximum ${MAX_GALLERY} gallery images.`);
      e.target.value = "";
      return;
    }
    if (!validateFile(file)) {
      e.target.value = "";
      return;
    }
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const response = await axiosClient.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.path) {
        setFormData((prev) => ({
          ...prev,
          gallery_images: [...prev.gallery_images, response.data.path],
        }));
      } else {
        setError(response.data?.error || "Upload failed");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error uploading image.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...formData,
        sort_order: parseInt(formData.sort_order, 10) || 0,
      };
      if (testimonial) {
        await axiosClient.put(`/testimonials/${testimonial.id}`, payload);
      } else {
        await axiosClient.post("/testimonials", payload);
      }
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to save testimonial"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quote *
        </label>
        <textarea
          required
          rows={5}
          value={formData.quote}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, quote: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
          placeholder="Client testimonial text..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author name *
          </label>
          <input
            type="text"
            required
            value={formData.author_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, author_name: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
            placeholder="e.g. Steve David"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author location
          </label>
          <input
            type="text"
            value={formData.author_location}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                author_location: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
            placeholder="e.g. UK"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Author photo
        </label>
        <input
          ref={authorInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleAuthorImageUpload}
          className="hidden"
        />
        <div className="flex items-center gap-4">
          {formData.image ? (
            <div className="relative">
              <img
                src={getImageUrl(formData.image)}
                alt="Author"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, image: "" }))
                }
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-sm leading-none flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => authorInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : formData.image ? "Change photo" : "Upload photo"}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gallery images (right side grid, max {MAX_GALLERY})
        </label>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleGalleryUpload}
          className="hidden"
        />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
          {formData.gallery_images.map((path, index) => (
            <div key={index} className="relative aspect-square rounded overflow-hidden border border-gray-200">
              <img
                src={getImageUrl(path)}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-bl text-sm leading-none flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {formData.gallery_images.length < MAX_GALLERY && (
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 border border-dashed border-gray-400 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Add gallery image"}
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort order
        </label>
        <input
          type="number"
          min={0}
          value={formData.sort_order}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              sort_order:
                e.target.value === "" ? 0 : parseInt(e.target.value, 10),
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
        />
        <p className="text-xs text-gray-500 mt-1">
          Lower numbers appear first on the homepage.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-theme-green-color text-white rounded-md hover:bg-theme-green-dark-color disabled:opacity-50"
        >
          {loading ? "Saving..." : testimonial ? "Update" : "Add Testimonial"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
