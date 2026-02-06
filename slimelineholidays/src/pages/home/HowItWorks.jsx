import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import call from "./../../assets/images/icons/call.svg";
import handshake from "./../../assets/images/icons/handshake.svg";
import doc from "./../../assets/images/icons/doc.svg";
import headset from "./../../assets/images/icons/headset.svg";

export const HowItWorks = () => {
  const works_items = [
    {
      id: 1,
      title: "1. Enquire Now",
      icon: call,
      worklist: ["Filling the web form", "Web live chat", "Email", "Call us"]
    },
    {
      id: 2,
      title: "2. Connect Travel Expert",
      icon: handshake,
      worklist: ["Discuss your requirement", "Free expert travel advice"]
    },
    {
      id: 3,
      title: "3. Received 3 Travel Options",
      icon: doc,
      worklist: ["Discuss changes", "Finalize trip plan", "Pay 10%"]
    },
    {
      id: 4,
      title: "4. Receive Your Trip Confirmation",
      icon: headset,
      worklist: ["Receive confirmation details", "100% satisfaction guaranteed"]
    }
  ];

  return (
    <section className="px-[5%] md:px-[10%] w-full bg-[#F9F9F9] flex flex-col justify-center items-center py-[8%] font-nunito">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4"
      >
        <div className="text-[30px] md:text-[50px] font-light">
          <span className="font-bold">How</span> It Works?
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-black text-sm md:text-base font-normal mb-10"
      >
        Discover our simple process for planning and booking your perfect travel
        experience.
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {works_items.map((workItem, index) => {
          return <WorkCard key={workItem.id} data={workItem} index={index} />;
        })}
      </div>
    </section>
  );
};

const WorkCard = ({ data, index }) => {
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col bg-white rounded-lg shadow-sm p-6"
    >
      {/* Icon */}
      <div className="w-14 h-14 mb-4 rounded-full bg-theme-green-middle-color/10 flex items-center justify-center">
        <img 
          src={data.icon} 
          className="w-7 h-7" 
          style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(1200%) hue-rotate(80deg) brightness(95%) contrast(90%)' }}
          alt={data.title} 
        />
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-bold text-theme-green-middle-color mb-3">
        {data.title}
      </h3>

      {/* Work List */}
      <div className="flex flex-col gap-2">
        {data.worklist.map((work, workIndex) => {
          return (
            <div key={workIndex} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-theme-green-middle-color mt-2 flex-shrink-0"></span>
              <span className="font-light text-sm text-gray-700">
                {work}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
