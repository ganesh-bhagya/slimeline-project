import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Icon Components
const TrustedIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 8L20 16V30C20 42.1503 25.3726 52.8034 32 56C38.6274 52.8034 44 42.1503 44 30V16L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 28L30 34L40 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="20" r="3" fill="currentColor"/>
  </svg>
);

const PersonalizedIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 12L16 20V36C16 44.8366 23.1634 52 32 52C40.8366 52 48 44.8366 48 36V20L32 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 24L32 30L40 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 32L32 36L36 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="40" r="2" fill="currentColor"/>
  </svg>
);

const LocalExpertIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="32" cy="24" r="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 48C16 40 22 34 32 34C42 34 48 40 48 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 20L32 12L44 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="26" cy="22" r="2" fill="currentColor"/>
    <circle cx="38" cy="22" r="2" fill="currentColor"/>
  </svg>
);

const ComfortIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="12" y="28" width="40" height="24" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28V20C20 16 22 14 26 14H38C42 14 44 16 44 20V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="44" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="40" cy="44" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 32H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M28 36H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const TransparentPricingIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M20 20L32 12L44 20V44C44 48.4183 40.4183 52 36 52H28C23.5817 52 20 48.4183 20 44V20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 28H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 36H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="28" cy="44" r="2" fill="currentColor"/>
    <circle cx="36" cy="44" r="2" fill="currentColor"/>
    <path d="M32 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PromiseIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 12C32 12 20 20 20 32C20 40.8366 27.1634 48 36 48C44.8366 48 52 40.8366 52 32C52 20 40 12 32 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 28L32 32L36 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 32V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="44" r="2" fill="currentColor"/>
  </svg>
);

export const WhyUs = () => {
  const choose_items = [
    {
      id: 1,
      icon: TrustedIcon,
      title: "Trusted for 24 Years",
      description:
        "Guests keep coming back—experience you can rely on."
    },
    {
      id: 2,
      icon: PersonalizedIcon,
      title: "Journeys Made for You",
      description:
        "Every trip crafted around your pace and preferences."
    },
    {
      id: 3,
      icon: LocalExpertIcon,
      title: "True Local Expertise",
      description:
        "We know Sri Lanka from the inside out."
    },
    {
      id: 4,
      icon: ComfortIcon,
      title: "Comfort & Peace of Mind",
      description:
        "Luxury vehicles and worry-free travel, always."
    },
    {
      id: 5,
      icon: TransparentPricingIcon,
      title: "Honest, Transparent Pricing",
      description:
        "No hidden costs, only trust and value."
    },
    {
      id: 6,
      icon: PromiseIcon,
      title: "Your Leisure, Our Promise",
      description:
        "We handle every detail so you can fully relax."
    }
  ];

  return (
    <section className="px-[5%] md:px-[10%] w-full flex flex-col justify-center items-center  py-[4%] pb-[15%] md:pb-[4%] pt-[80%] md:pt-[10%] font-nunito">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-center text-[25px] md:text-[50px] font-light"
      >
        <span className="font-bold">Why</span> Choose Us
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-2 md:mt-0 text-center text-black text-sm md:text-base font-normal"
      >
        Exceptional Travel Solutions Tailored for You. Experience the Best in
        Comfort, Service, and Value
      </motion.div>

      <div className="mt-[10%] flex flex-col md:flex-row items-center justify-between w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-[50%] flex flex-col gap-8 md:border-r md:border-[#DDDDDD] md:p-5 pt-10"
        >
          {choose_items.slice(0, 3).map((item) => {
            return <ChooseItem key={item.id} data={item} />;
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="md:w-[50%] flex flex-col gap-8 md:pl-[5%] md:p-5 pt-10"
        >
          {choose_items.slice(3).map((item) => {
            return <ChooseItem key={item.id} data={item} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const ChooseItem = ({ data }) => {
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
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8 }}
      className="flex items-start justify-between gap-4 w-full md:pr-[3%]"
    >
      <span className="w-[10%] text-theme-green-middle-color">
        {React.createElement(data.icon)}
      </span>
      <div className="w-[90%] md:w-[85%] flex flex-col gap-2">
        <div className="text-base md:text-lg font-bold text-theme-green-middle-color">
          {data.title}
        </div>
        <div className="text-sm md:text-base">
          {data.description}
        </div>
      </div>
    </motion.div>
  );
};
