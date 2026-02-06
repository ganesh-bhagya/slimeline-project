import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import abtus from "./../../assets/images/aboutus.webp";
import abtus2 from "./../../assets/images/abtus2.webp";

const COUNTUP_DURATION = 3; // seconds

export const AboutUs = ({ scrollRef }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [hasCountedOnce, setHasCountedOnce] = React.useState(false);
  const hasStartedCountRef = React.useRef(false);

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
      // First time in view: run count-up, then switch to static after animation ends
      if (!hasStartedCountRef.current) {
        hasStartedCountRef.current = true;
        const timer = setTimeout(() => setHasCountedOnce(true), COUNTUP_DURATION * 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [controls, inView]);

  return (
    <section
      ref={(node) => {
        ref(node); // Combine ref for animation
        scrollRef.current = node; // Assign to scrollRef
      }}
      className={`h-auto flex flex-col md:flex-row w-full relative justify-between items-center font-nunito px-[5%] md:px-[10%] py-[10%] pb-[40%] md:pb-[20%]`}
      style={{
        backgroundImage: `url(${abtus})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1 }}
        className="flex flex-col gap-10 md:w-[55%] items-center md:items-start"
      >
        <div className="text-start text-[25px] md:text-[50px] font-light text-theme-green-color">
          <span className="font-bold">About</span> Us
        </div>
        <p className="text-white text-center md:text-start text-xs md:text-base font-light md:w-[75%]">
        We are a passionate travel experience company dedicated to creating authentic, memorable journeys. With deep local knowledge and a strong commitment to personalized service, we help travelers explore destinations beyond the ordinary—connecting them with culture, nature, and unforgettable moments.

From the first welcome to the final farewell, every detail of your journey is thoughtfully planned to ensure comfort, safety, and genuine discovery.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:w-[80%] flex flex-col p-5 rounded-xl bg-[#00000072] border border-theme-green-color gap-3"
        >
          <div className="font-nunito font-bold text-[20px] md:text-[25px] text-white text-center md:text-start">
            Our Mission
          </div>
          <p className="text-xs md:text-base font-light text-white text-center md:text-start">
          To remain the world’s most trusted signature in elegant exploration. We stand as the global
symbol of excellence, where every journey we create becomes a legacy of wonder and your leisure is
our pleasure remains an enduring way of life.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1, delay: 0.4 }}
          className="md:w-[80%] flex flex-col p-5 rounded-xl bg-[#00000072] border border-theme-green-color gap-3"
        >
          <div className="font-nunito font-bold text-[20px] md:text-[25px] text-white text-center md:text-start">
            Our Vision
          </div>
          <p className="text-xs md:text-base font-light text-white text-center md:text-start">
          To curate the extraordinary. We orchestrate seamless, soulful journeys that transcend the
ordinary—ensuring your leisure is our pleasure through refined artistry, integrity, and the authentic
spirit of hospitality
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="hidden md:block absolute right-0 top-[10%] bottom-[10%] w-[40%] 3xl:w-[38%]"
      >
        <img
          src={abtus2}
          className="w-full max-h-[825px] 3xl:max-h-[835px]"
          alt=""
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="md:hidden mt-10"
      >
        <img
          src={abtus2}
          className="w-full max-h-[825px] 3xl:max-h-[835px]"
          alt=""
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 1, delay: 1 }}
        className="absolute w-[60%] md:w-[60%] p-8 px-[10%] bg-[#F1FFF2] flex flex-col md:flex-row items-center justify-between bottom-[-20%] md:bottom-[-8%] right-[20%]"
      >
        <div className="flex flex-col justify-center items-center">
          <span className="text-[50px] text-center text-theme-green-middle-color font-bold">
            {hasCountedOnce ? "3,000+" : inView ? <><CountUp end={3000} duration={COUNTUP_DURATION} separator="," />+</> : "0+"}
          </span>
          <span className="text-base text-center text-black font-light">
            Amazing Tours
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-[50px] text-center text-theme-green-middle-color font-bold">
            {hasCountedOnce ? "7,000+" : inView ? <><CountUp end={7000} duration={COUNTUP_DURATION} separator="," />+</> : "0+"}
          </span>
          <span className="text-base text-center text-black font-light">
            Happy Clients
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-[50px] text-center text-theme-green-middle-color font-bold">
            {hasCountedOnce ? "24+" : inView ? <><CountUp end={24} duration={COUNTUP_DURATION} />+</> : "0+"}
          </span>
          <span className="text-base text-center text-black font-light">
            Years in Business
          </span>
        </div>
      </motion.div>
    </section>
  );
};
