import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import call from "./../../assets/images/icons/call.svg";
import email from "./../../assets/images/icons/email.svg";
import address from "./../../assets/images/icons/address.svg";
import clock from "./../../assets/images/icons/clock.svg";

const ICON_STYLE = {
  filter:
    "brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(1200%) hue-rotate(80deg) brightness(95%) contrast(90%)",
};

export const ContactUs = ({ scrollRef }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  React.useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [controls, inView]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
      const response = await fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      label: "Business Phone",
      value: "+94 32 22 52052",
      icon: call,
      link: "tel:+94322252052",
      color: "bg-blue-50 border-blue-200",
    },
    {
      label: "Mobile",
      value: "+94 74 144 5294",
      icon: call,
      link: "tel:+94741445294",
      color: "bg-green-50 border-green-200",
    },
    {
      label: "WhatsApp",
      value: "+94 777 514 294",
      icon: call,
      link: "https://wa.me/94777514294",
      color: "bg-emerald-50 border-emerald-200",
    },
    {
      label: "Email",
      value: "info@slimelineholidays.com",
      icon: email,
      link: "mailto:info@slimelineholidays.com",
      color: "bg-purple-50 border-purple-200",
    },
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/94777514294",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61585755797054",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/slim.linetours/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "TripAdvisor",
      url: "https://www.tripadvisor.com/Attraction_Review-g612379-d14122585-Reviews-Slim_Line_Tours-Marawila_North_Western_Province.html",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
          <path d="M8.5 9.5L12 6l3.5 3.5M8.5 14.5L12 18l3.5-3.5" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={(node) => {
        ref(node);
        scrollRef.current = node;
      }}
      className="font-nunito w-full bg-white bg-gradient-to-b from-white to-gray-50/50 py-10 sm:py-12 lg:py-16"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-2">
            <span className="font-bold text-theme-green-middle-color">Contact</span>{" "}
            <span className="text-gray-900">Us</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Get in touch with us. We're here to help you plan your perfect journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12">
          {/* Left: Contact info + Visit + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact cards - 2 cols on sm+, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactItems.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`${item.color} border-2 rounded-xl p-3 sm:p-4 flex items-center gap-3 transition-transform active:scale-[0.98] hover:shadow-sm`}
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <img src={item.icon} className="w-5 h-5" style={ICON_STYLE} alt="" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Visit + Hours - one card */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-theme-green-middle-color/10 flex items-center justify-center flex-shrink-0">
                  <img src={address} className="w-5 h-5" style={ICON_STYLE} alt="" />
                </div>
                <div>
                  <h3 className="font-bold text-theme-green-middle-color text-sm mb-0.5">Visit Us</h3>
                  <p className="text-gray-700 text-sm">Slimeline Tours, Modarawalla, Marawilla</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-theme-green-middle-color/10 flex items-center justify-center flex-shrink-0">
                  <img src={clock} className="w-5 h-5" style={ICON_STYLE} alt="" />
                </div>
                <div>
                  <h3 className="font-bold text-theme-green-middle-color text-sm mb-0.5">Opening Hours</h3>
                  <p className="text-gray-700 text-sm">Monday – Saturday: 8:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social - horizontal row, same width as cards */}
            <div>
              <h3 className="font-bold text-theme-green-middle-color text-sm mb-3">Follow Us</h3>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ name, url, icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-theme-green-middle-color text-white font-semibold text-sm hover:bg-theme-green-color transition-colors active:scale-[0.98]"
                    aria-label={name}
                  >
                    {icon}
                    <span>{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-8 shadow-sm"
          >
            <h3 className="text-lg sm:text-xl font-bold text-theme-green-middle-color mb-4 sm:mb-6">
              Send us a Message
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, name: e.target.value }));
                    setErrors((e) => ({ ...e, name: "" }));
                  }}
                  className="w-full px-3 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-theme-green-middle-color focus:ring-2 focus:ring-theme-green-middle-color/20 text-gray-900"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, email: e.target.value }));
                    setErrors((e) => ({ ...e, email: "" }));
                  }}
                  className="w-full px-3 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-theme-green-middle-color focus:ring-2 focus:ring-theme-green-middle-color/20 text-gray-900"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, subject: e.target.value }));
                    setErrors((e) => ({ ...e, subject: "" }));
                  }}
                  className="w-full px-3 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-theme-green-middle-color focus:ring-2 focus:ring-theme-green-middle-color/20 text-gray-900"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, message: e.target.value }));
                    setErrors((e) => ({ ...e, message: "" }));
                  }}
                  className="w-full px-3 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-theme-green-middle-color focus:ring-2 focus:ring-theme-green-middle-color/20 text-gray-900 resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-theme-green-middle-color text-white font-semibold hover:bg-theme-green-color transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-md"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
