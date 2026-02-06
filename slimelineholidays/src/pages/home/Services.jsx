import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Icon Components
const TailorMadeIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 8L12 18V32C12 45.2548 20.7452 56 32 56C43.2548 56 52 45.2548 52 32V18L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 24V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 32H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LuxuryIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 24L32 8L48 24V48C48 52.4183 44.4183 56 40 56H24C19.5817 56 16 52.4183 16 48V24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 24H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 24V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 24V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HoneymoonIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 12C32 12 20 20 20 32C20 40.8366 27.1634 48 36 48C44.8366 48 52 40.8366 52 32C52 20 40 12 32 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 28C28 28 30 30 32 30C34 30 36 28 36 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GroupIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="44" cy="20" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 44C12 38 15.5817 34 20 34C24.4183 34 28 38 28 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 44C36 38 39.5817 34 44 34C48.4183 34 52 38 52 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 34C32 30 35.5817 26 40 26C44.4183 26 48 30 48 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CulturalIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 8L16 16V32C16 40.8366 23.1634 48 32 48C40.8366 48 48 40.8366 48 32V16L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 24L32 28L40 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 28V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AdventureIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 8L12 20V36C12 46.4934 20.5066 56 32 56C43.4934 56 52 46.4934 52 36V20L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 28L32 32L40 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 36L32 40L36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SafariIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 20L44 44M44 20L20 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ActiveIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 8L16 16V32C16 40.8366 23.1634 48 32 48C40.8366 48 48 40.8366 48 32V16L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 24L32 28L40 24M24 32L32 36L40 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HotelIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M8 56V20L32 8L56 20V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 32H56" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 32V48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 32V48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M44 32V48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AirRailIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M8 40L32 24L56 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 32L32 20L48 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 36L32 30L40 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FleetIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="8" y="32" width="48" height="20" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 32V24C16 20 18 18 22 18H42C46 18 48 20 48 24V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="48" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="44" cy="48" r="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const GuideIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 8L16 16V32C16 40.8366 23.1634 48 32 48C40.8366 48 48 40.8366 48 32V16L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="24" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 32C24 28 27.5817 26 32 26C36.4183 26 40 28 40 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VisaIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="12" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28H44M20 36H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="28" cy="44" r="2" fill="currentColor"/>
    <circle cx="36" cy="44" r="2" fill="currentColor"/>
  </svg>
);

export const Services = ({ scrollRef }) => {
  const services = [
    // Personalized Journey Curation
    {
      id: 1,
      category: "Personalized Journey Curation",
      icon: TailorMadeIcon,
      title: "Tailor-Made Tour Packages",
      description: "Bespoke itineraries crafted to your unique desires."
    },
    {
      id: 2,
      category: "Personalized Journey Curation",
      icon: LuxuryIcon,
      title: "Luxury Travel Experiences",
      description: "The pinnacle of exclusivity and comfort."
    },
    {
      id: 3,
      category: "Personalized Journey Curation",
      icon: HoneymoonIcon,
      title: "Honeymoon Packages",
      description: "Intimate, romantic escapes in the world's most secluded corners."
    },
    {
      id: 4,
      category: "Personalized Journey Curation",
      icon: GroupIcon,
      title: "Group & Corporate Tours",
      description: "Seamlessly managed travel for teams and social circles."
    },
    // Thematic Explorations
    {
      id: 5,
      category: "Thematic Explorations",
      icon: CulturalIcon,
      title: "Cultural & Heritage Odysseys",
      description: "Immersive encounters with history and tradition."
    },
    {
      id: 6,
      category: "Thematic Explorations",
      icon: AdventureIcon,
      title: "Adventure & Nature Expeditions",
      description: "Thrilling journeys through the world's wild heart."
    },
    {
      id: 7,
      category: "Thematic Explorations",
      icon: SafariIcon,
      title: "National Park Safaris",
      description: "Expertly guided wildlife encounters and safari bookings."
    },
    {
      id: 8,
      category: "Thematic Explorations",
      icon: ActiveIcon,
      title: "Active Adventures",
      description: "Hand-picked adventure activities for the spirited traveler."
    },
    // Premium Concierge & Logistics
    {
      id: 9,
      category: "Premium Concierge & Logistics",
      icon: HotelIcon,
      title: "World-Class Stays",
      description: "Curated Hotel & Resort reservations globally."
    },
    {
      id: 10,
      category: "Premium Concierge & Logistics",
      icon: AirRailIcon,
      title: "Seamless Air & Rail",
      description: "Domestic and international Air & Train ticket management."
    },
    {
      id: 11,
      category: "Premium Concierge & Logistics",
      icon: FleetIcon,
      title: "Luxury Fleet",
      description: "Professional Transportation services and private Airport Transfers."
    },
    {
      id: 12,
      category: "Premium Concierge & Logistics",
      icon: GuideIcon,
      title: "Expert Guidance",
      description: "Licensed Professional Tour Guides at your service."
    },
    {
      id: 13,
      category: "Premium Concierge & Logistics",
      icon: VisaIcon,
      title: "Essential Support",
      description: "Comprehensive Visa Assistance for effortless entry."
    }
  ];

  const personalizedServices = services.filter(
    (s) => s.category === "Personalized Journey Curation"
  );
  const thematicServices = services.filter(
    (s) => s.category === "Thematic Explorations"
  );
  const premiumServices = services.filter(
    (s) => s.category === "Premium Concierge & Logistics"
  );

  return (
    <section
      ref={scrollRef}
      className="px-[5%] md:px-[10%] w-full flex flex-col justify-center items-center py-[10%] font-nunito bg-[#F9F9F9]"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-center text-[25px] md:text-[50px] font-light"
      >
        <span className="font-bold">Our</span> Signature Services
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 md:mt-6 text-center text-black text-sm md:text-base font-normal max-w-3xl"
      >
        Discover our comprehensive range of travel services designed to make your journey extraordinary
      </motion.div>

      {/* Personalized Journey Curation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-[8%] md:mt-[6%] w-full"
      >
        <h3 className="text-[20px] md:text-[30px] font-bold text-theme-green-middle-color mb-6 md:mb-8">
          Personalized Journey Curation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {personalizedServices.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </motion.div>

      {/* Thematic Explorations */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-[8%] md:mt-[6%] w-full"
      >
        <h3 className="text-[20px] md:text-[30px] font-bold text-theme-green-middle-color mb-6 md:mb-8">
          Thematic Explorations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {thematicServices.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </motion.div>

      {/* Premium Concierge & Logistics */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-[8%] md:mt-[6%] w-full"
      >
        <h3 className="text-[20px] md:text-[30px] font-bold text-theme-green-middle-color mb-6 md:mb-8">
          Premium Concierge & Logistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {premiumServices.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const ServiceItem = ({ service }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center md:items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-theme-green-middle-color">
        {React.createElement(service.icon)}
      </div>
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h4 className="text-base md:text-lg font-bold text-theme-green-middle-color">
          {service.title}
        </h4>
        <p className="text-sm md:text-base text-gray-700 font-light">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};
