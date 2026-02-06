import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StarWhiteIcon, StarYellowIcon } from "../../utils/icons";
import { Link } from "react-router-dom";
import Loader from "../../components/ui/Loader";

export const OurPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${apiUrl}/packages`);
        const data = await response.json();
        if (data && data.packages && Array.isArray(data.packages)) {
          setPackages(data.packages);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="px-[5%] md:px-[10%] w-full bg-[#03FF000D] flex flex-col justify-center items-center md:py-[4%] pt-[50%] md:pt-[4%] font-nunito"
      >
        <Loader size="md" />
      </motion.section>
    );
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="px-[5%] md:px-[10%] w-full bg-[#03FF000D] flex flex-col justify-center items-center md:py-[4%] pt-[50%] md:pt-[4%] font-nunito"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center text-[25px] md:text-[50px] font-light"
        >
          <span className="font-bold">Our</span> Packages
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-3 w-full text-theme-green-middle-color text-[20px] md:text-[25px] font-bold md:font-semibold"
        >
          Sri Lanka Tour Packages
        </motion.div>

        <div className="flex gap-[1%] w-full flex-col md:flex-row md:flex-wrap mt-5">
          {packages
            .filter((item) => item.country === "Sri Lanka")
            .map((item, packageIndex) => {
              return <PakcageCard key={item.id || packageIndex} data={item} />;
            })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-3 w-full text-theme-green-middle-color text-[20px] md:text-[25px] font-bold md:font-semibold"
        >
          Maldives Tour Packages
        </motion.div>

        <div className="flex  gap-[1%] w-full flex-col md:flex-row md:flex-wrap mt-5">
          {packages
            .filter((item) => item.country === "Maldives")
            .map((item, packageIndex) => {
              return <PakcageCard key={item.id || packageIndex} data={item} />;
            })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-3 w-full text-theme-green-middle-color text-[20px] md:text-[25px] font-bold md:font-semibold"
        >
          UAE Tour Packages
        </motion.div>

        <div className="flex gap-[1%] w-full flex-col md:flex-row md:flex-wrap mt-5">
          {packages
            .filter((item) => item.country === "UAE")
            .map((item, packageIndex) => {
              return <PakcageCard key={item.id || packageIndex} data={item} />;
            })}
        </div>
      </motion.section>
    </>
  );
};

const PakcageCard = ({ data }) => {
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
      transition={{ duration: 0.8 }}
      className="flex flex-col md:w-[24%] aspect-[1/1.5] mb-10 group overflow-hidden"
    >
      {/* Wrapper with gradient */}
      <div className="w-full h-full relative flex flex-col overflow-hidden  justify-end p-3 pb-3">
        {/* Gradient Layer */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none"
        ></div>

        {/* Scaling Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-100 transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${data.image})`,
          }}
        ></div>

        {/* Content */}
        <span className="absolute right-2 top-2 bg-theme-green-color p-2 px-5 text-black font-semibold text-[14px] z-20">
          {data.days} Days
        </span>
        <div className="text-white text-[14px] mb-3 z-20">{data.name}</div>
        {/* <div className="flex justify-between w-full items-end text-white z-20">
          <div className="flex flex-col gap-[2px]">
            <span className="text-[10px] font-semibold"> From</span>
            <span className="text-[25px] font-bold"> $ {data.price}</span>
            <span className="text-[10px] font-semibold"> per person</span>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <span className="bg-theme-green-middle-color p-1 px-3 text-white font-semibold text-[10px] mb-1 w-fit">
              {data.country || "Sri Lanka"}
            </span>
            <div className="flex items-center gap-1">
              <StarWhiteIcon />
              <StarYellowIcon />
              <StarYellowIcon />
              <StarYellowIcon />
              <StarYellowIcon />
            </div>
          </div>
        </div> */}
      </div>
      <Link
        to={`/packages/${data.slug}`}
        className="bg-theme-green-middle-color hover:bg-transparent border border-theme-green-middle-color  w-full flex justify-center items-center text-white hover:text-theme-green-middle-color transition-colors duration-300 ease-in-out text-[16px] mt-3 py-3"
      >
        Explore
      </Link>
    </motion.div>
  );
};
