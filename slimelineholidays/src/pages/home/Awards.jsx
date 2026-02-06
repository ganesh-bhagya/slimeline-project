import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination, Autoplay } from "swiper/modules";

import abtus from "./../../assets/images/awardsbg.webp";
import certificatw from "./../../assets/images/certificate/certificate.webp";

export const Awards = ({ scrollRef }) => {
  const swiperRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  const certificateItems = [
    { img: certificatw },
    { img: certificatw },
    { img: certificatw }
  ];

  return (
    <section
      ref={(node) => {
        ref(node); // Combine ref for animation
        // scrollRef.current = node; // Assign to scrollRef
      }}
      className={`h-auto flex flex-col md:flex-row w-full relative justify-between items-center font-nunito px-[5%] md:px-[10%] py-[10%] md:py-[5%]`}
      style={{
        backgroundImage: `url(${abtus})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="text-start text-[35px] md:text-[50px] font-light text-theme-green-color">
          <span className="font-bold">Our</span> Awards
        </div>
        <p className="text-white text-center text-base font-light md:w-[75%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-[80%] hidden md:flex flex-wrap gap-3 mt-[6%] justify-between"
        >
          {certificateItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full md:w-[30%]"
            >
              <img src={item.img} className="w-full object-cover" alt="Award Certificate" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={controls}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-[10%] md:hidden w-full"
      >
        <Swiper
          ref={swiperRef}
          slidesPerView={3}
          loop={true}
          spaceBetween={30}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} custom-bullet"></span>`
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          onSlideChange={(swiper) => {
            const bullets = document.querySelectorAll(".custom-bullet");
            bullets.forEach((bullet, i) => {
              if (i === swiper.realIndex) {
                bullet.style.backgroundColor = "#2F563D";
              } else {
                bullet.style.backgroundColor = "white";
              }
            });
          }}
          onSwiper={(swiper) => {
            const bullets = document.querySelectorAll(".custom-bullet");
            bullets.forEach((bullet, i) => {
              if (i === swiper.realIndex) {
                bullet.style.backgroundColor = "#2F563D";
              } else {
                bullet.style.backgroundColor = "white";
              }
            });
          }}
        >
          {certificateItems.map((item, index) => (
            <SwiperSlide className="w-full h-fit" key={index}>
              <div className="w-full h-[550px]">
                <img src={item.img} className="w-full h-[550px]" alt="Award Certificate" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};
