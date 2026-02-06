import { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";

// Helper function to convert path to URL for preview
// Backend returns URLs when fetching packages, but we store paths in form data
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL (from backend when editing existing packages), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a path (from new uploads), convert to URL by prepending base URL
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  
  // Extract base URL from API URL (remove /api if present)
  let baseUrl = apiUrl;
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4); // Remove '/api'
  } else if (baseUrl.includes('/api/')) {
    baseUrl = baseUrl.split('/api')[0];
  }
  
  // Ensure path starts with /
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}${path}`;
};

export default function PackageForm({ packageData, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    country: "Sri Lanka",
    days: 1,
    image: "",
    price: "",
    stars: 4,
    description: "",
    itinerary: [],
    inclusion: {
      included: [],
      excluded: [],
      booking_information: "",
      cancellation_policy: ""
    },
    summary: {
      description: "",
      activities: [],
      locations: []
    },
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (packageData) {
      setFormData({
        name: packageData.name || packageData.title || "",
        slug: packageData.slug || "",
        country: packageData.country || "Sri Lanka",
        days: packageData.days || 1,
        image: packageData.image || "",
        price: packageData.price || "",
        stars: packageData.stars || 4,
        description: packageData.description || "",
        itinerary: packageData.itinerary || [],
        inclusion: packageData.inclusion || {
          included: [],
          excluded: [],
          booking_information: "",
          cancellation_policy: ""
        },
        summary: packageData.summary || {
          description: "",
          activities: [],
          locations: []
        },
        images: packageData.images || [],
      });
    }
  }, [packageData]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = packageData ? `/packages/${packageData.id}` : '/packages';
      const method = packageData ? 'put' : 'post';

      await axiosClient[method](url, {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        days: parseInt(formData.days),
        stars: parseInt(formData.stars),
      });

      onSuccess();
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Itinerary management
  const addItineraryDay = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: "",
          details: [],
          image: "",
          activities: [],
          highlight: []
        }
      ]
    }));
  };

  const updateItineraryDay = (index, field, value) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      newItinerary[index] = { ...newItinerary[index], [field]: value };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const removeItineraryDay = (index) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const addDetail = (itineraryIndex) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        details: [
          ...(newItinerary[itineraryIndex].details || []),
          ""
        ]
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const updateDetail = (itineraryIndex, detailIndex, value) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      const newDetails = [...newItinerary[itineraryIndex].details];
      newDetails[detailIndex] = value;
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        details: newDetails
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const removeDetail = (itineraryIndex, detailIndex) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        details: newItinerary[itineraryIndex].details.filter(
          (_, i) => i !== detailIndex
        )
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const addActivity = (itineraryIndex) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      const existingActivities = newItinerary[itineraryIndex].activities || [];
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        activities: [
          ...existingActivities,
          {
            title: "",
            list_items: []
          }
        ]
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const updateActivity = (itineraryIndex, activityIndex, field, value) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      const newActivities = [...newItinerary[itineraryIndex].activities];
      newActivities[activityIndex] = {
        ...newActivities[activityIndex],
        [field]: value
      };
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        activities: newActivities
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const addActivityItem = (itineraryIndex, activityIndex) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      const newActivities = [...newItinerary[itineraryIndex].activities];
      newActivities[activityIndex] = {
        ...newActivities[activityIndex],
        list_items: [...(newActivities[activityIndex].list_items || []), ""]
      };
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        activities: newActivities
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const updateActivityItem = (itineraryIndex, activityIndex, itemIndex, value) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      const newActivities = [...newItinerary[itineraryIndex].activities];
      const newListItems = [...newActivities[activityIndex].list_items];
      newListItems[itemIndex] = value;
      newActivities[activityIndex] = {
        ...newActivities[activityIndex],
        list_items: newListItems
      };
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        activities: newActivities
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const removeActivityItem = (itineraryIndex, activityIndex, itemIndex) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      const newActivities = [...newItinerary[itineraryIndex].activities];
      newActivities[activityIndex] = {
        ...newActivities[activityIndex],
        list_items: newActivities[activityIndex].list_items.filter(
          (_, i) => i !== itemIndex
        )
      };
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        activities: newActivities
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const removeActivity = (itineraryIndex, activityIndex) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      newItinerary[itineraryIndex] = {
        ...newItinerary[itineraryIndex],
        activities: newItinerary[itineraryIndex].activities.filter(
          (_, i) => i !== activityIndex
        )
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  // Inclusion management
  const addIncluded = () => {
    setFormData((prev) => ({
      ...prev,
      inclusion: {
        ...prev.inclusion,
        included: [...prev.inclusion.included, ""]
      }
    }));
  };

  const updateIncluded = (index, value) => {
    setFormData((prev) => {
      const newIncluded = [...prev.inclusion.included];
      newIncluded[index] = value;
      return {
        ...prev,
        inclusion: { ...prev.inclusion, included: newIncluded }
      };
    });
  };

  const removeIncluded = (index) => {
    setFormData((prev) => ({
      ...prev,
      inclusion: {
        ...prev.inclusion,
        included: prev.inclusion.included.filter((_, i) => i !== index)
      }
    }));
  };

  const addExcluded = () => {
    setFormData((prev) => ({
      ...prev,
      inclusion: {
        ...prev.inclusion,
        excluded: [...prev.inclusion.excluded, ""]
      }
    }));
  };

  const updateExcluded = (index, value) => {
    setFormData((prev) => {
      const newExcluded = [...prev.inclusion.excluded];
      newExcluded[index] = value;
      return {
        ...prev,
        inclusion: { ...prev.inclusion, excluded: newExcluded }
      };
    });
  };

  const removeExcluded = (index) => {
    setFormData((prev) => ({
      ...prev,
      inclusion: {
        ...prev.inclusion,
        excluded: prev.inclusion.excluded.filter((_, i) => i !== index)
      }
    }));
  };

  // Summary management
  const addSummaryActivity = () => {
    setFormData((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        activities: [...(prev.summary.activities || []), ""]
      }
    }));
  };

  const updateSummaryActivity = (index, value) => {
    setFormData((prev) => {
      const newActivities = [...prev.summary.activities];
      newActivities[index] = value;
      return {
        ...prev,
        summary: { ...prev.summary, activities: newActivities }
      };
    });
  };

  const removeSummaryActivity = (index) => {
    setFormData((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        activities: prev.summary.activities.filter((_, i) => i !== index)
      }
    }));
  };

  const addSummaryLocation = () => {
    setFormData((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        locations: [...(prev.summary.locations || []), ""]
      }
    }));
  };

  const updateSummaryLocation = (index, value) => {
    setFormData((prev) => {
      const newLocations = [...prev.summary.locations];
      newLocations[index] = value;
      return {
        ...prev,
        summary: { ...prev.summary, locations: newLocations }
      };
    });
  };

  const removeSummaryLocation = (index) => {
    setFormData((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        locations: prev.summary.locations.filter((_, i) => i !== index)
      }
    }));
  };

  const handleImageUpload = async (e, setImageCallback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only images are allowed.');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size too large. Maximum size is 10MB.');
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await axiosClient.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.path) {
        // Store the path (backend will convert to URL when fetching packages)
        // But for immediate preview, we can use the URL from response
        setImageCallback(response.data.path);
        setError('');
      } else {
        setError(response.data?.error || 'Failed to upload image');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error uploading image. Please try again.');
    }

    // Reset file input
    e.target.value = '';
  };

  const handleMainImageUpload = async (e) => {
    await handleImageUpload(e, (path) => {
      setFormData((prev) => ({ ...prev, image: path }));
    });
  };

  const handleAdditionalImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await axiosClient.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.path) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, response.data.path],
        }));
        setError('');
      } else {
        setError(response.data?.error || 'Failed to upload image');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error uploading image. Please try again.');
    }

    e.target.value = '';
  };

  const handleImageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleItineraryImageUpload = async (e, dayIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await axiosClient.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.path) {
        updateItineraryDay(dayIndex, 'image', response.data.path);
        setError('');
      } else {
        setError(response.data?.error || 'Failed to upload image');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error uploading image. Please try again.');
    }

    e.target.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold mb-4 text-theme-green-dark-color">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
              placeholder="package-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, country: e.target.value }))
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
            >
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="India">India</option>
              <option value="Maldives">Maldives</option>
              <option value="UAE">UAE</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Days *
            </label>
            <input
              type="number"
              value={formData.days}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, days: e.target.value }))
              }
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
            />
            {formData.image && (
              <div className="mt-2 relative inline-block">
                <img
                  src={getImageUrl(formData.image)}
                  alt="Preview"
                  className="h-32 w-48 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stars Rating
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={formData.stars}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, stars: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
          />
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-theme-green-dark-color">Itinerary</h2>
          <button
            type="button"
            onClick={addItineraryDay}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Day
          </button>
        </div>

        {formData.itinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-6 p-4 border border-gray-300 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Day {dayIndex + 1}</h3>
              <button
                type="button"
                onClick={() => removeItineraryDay(dayIndex)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day Title
                </label>
                <input
                  type="text"
                  value={day.day || ""}
                  onChange={(e) =>
                    updateItineraryDay(dayIndex, "day", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                  placeholder="Day 01 - Kandy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleItineraryImageUpload(e, dayIndex)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                />
                {day.image && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={getImageUrl(day.image)}
                      alt="Day preview"
                      className="h-32 w-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => updateItineraryDay(dayIndex, "image", "")}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Details
                </label>
                {(day.details || []).map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex gap-2 mb-2">
                    <textarea
                      value={detail}
                      onChange={(e) =>
                        updateDetail(dayIndex, detailIndex, e.target.value)
                      }
                      rows="3"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                    />
                    <button
                      type="button"
                      onClick={() => removeDetail(dayIndex, detailIndex)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addDetail(dayIndex)}
                  className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                >
                  Add Detail
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities
                </label>
                {(day.activities || []).map((activity, activityIndex) => (
                  <div key={activityIndex} className="mb-4 p-3 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <input
                        type="text"
                        value={activity.title || ""}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, "title", e.target.value)
                        }
                        placeholder="Activity Title"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                      />
                      <button
                        type="button"
                        onClick={() => removeActivity(dayIndex, activityIndex)}
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      {(activity.list_items || []).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              updateActivityItem(dayIndex, activityIndex, itemIndex, e.target.value)
                            }
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                            placeholder="Activity item"
                          />
                          <button
                            type="button"
                            onClick={() => removeActivityItem(dayIndex, activityIndex, itemIndex)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addActivityItem(dayIndex, activityIndex)}
                        className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addActivity(dayIndex)}
                  className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                >
                  Add Activity
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inclusion Section */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold mb-4 text-theme-green-dark-color">Inclusions & Exclusions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Included</label>
              <button
                type="button"
                onClick={addIncluded}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                Add
              </button>
            </div>
            {formData.inclusion.included.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateIncluded(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                />
                <button
                  type="button"
                  onClick={() => removeIncluded(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Excluded</label>
              <button
                type="button"
                onClick={addExcluded}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                Add
              </button>
            </div>
            {formData.inclusion.excluded.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateExcluded(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                />
                <button
                  type="button"
                  onClick={() => removeExcluded(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Booking Information
          </label>
          <textarea
            value={formData.inclusion.booking_information || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                inclusion: {
                  ...prev.inclusion,
                  booking_information: e.target.value
                }
              }))
            }
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cancellation Policy
          </label>
          <textarea
            value={formData.inclusion.cancellation_policy || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                inclusion: {
                  ...prev.inclusion,
                  cancellation_policy: e.target.value
                }
              }))
            }
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
          />
        </div>
      </div>

      {/* Summary Section */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold mb-4 text-theme-green-dark-color">Summary</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary Description
          </label>
          <textarea
            value={formData.summary.description || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                summary: { ...prev.summary, description: e.target.value }
              }))
            }
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Activities</label>
              <button
                type="button"
                onClick={addSummaryActivity}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                Add
              </button>
            </div>
            {formData.summary.activities.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateSummaryActivity(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                />
                <button
                  type="button"
                  onClick={() => removeSummaryActivity(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Locations</label>
              <button
                type="button"
                onClick={addSummaryLocation}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                Add
              </button>
            </div>
            {formData.summary.locations.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateSummaryLocation(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
                />
                <button
                  type="button"
                  onClick={() => removeSummaryLocation(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Images
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleAdditionalImageUpload}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={getImageUrl(img)}
                alt={`Gallery ${index + 1}`}
                className="h-32 w-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-theme-green-middle-color text-white rounded-md hover:bg-theme-green-dark-color transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {loading ? "Saving..." : packageData ? "Update Package" : "Create Package"}
        </button>
      </div>
    </form>
  );
}

