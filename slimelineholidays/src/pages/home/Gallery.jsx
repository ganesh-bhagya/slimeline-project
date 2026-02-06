import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination, Autoplay } from "swiper/modules";

import gallery1 from "./../../assets/images/gallery/gallery1.webp";
import gallery2 from "./../../assets/images/gallery/gallery2.webp";
import gallery3 from "./../../assets/images/gallery/gallery3.webp";
import gallery4 from "./../../assets/images/gallery/gallery4.webp";
import gallery5 from "./../../assets/images/gallery/gallery5.webp";
import gallery6 from "./../../assets/images/gallery/gallery6.webp";
import gallery7 from "./../../assets/images/gallery/gallery7.webp";
import gallery8 from "./../../assets/images/gallery/gallery8.webp";

export const Gallery = ({ scrollRef }) => {
  const swiperRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  const galleryItems = [
    { img: gallery1 },
    { img: gallery2 },
    { img: gallery3 },
    { img: gallery4 },
    { img: gallery5 },
    { img: gallery6 },
    { img: gallery7 },
    { img: gallery8 }
  ];

  return (
    <section
      ref={(node) => {
        ref(node); // Combine ref for animation
        scrollRef.current = node; // Assign to scrollRef
      }}
      className="md:px-[10%] px-[5%] w-full flex flex-col justify-center items-center py-[4%] pt-[10%] md:pt-[4%] pb-[10%] md:pb-[4%] font-nunito"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
        className="text-center text-[25px] md:text-[50px] font-light"
      >
        <span className="font-bold">Gallery</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-2 md:mt-0 text-center text-black text-sm md:text-base font-normal md:w-[50%] mb-10"
      >
        Explore moments from our clients’ incredible journeys around the world.
        From breathtaking landscapes to unforgettable cultural experiences, our
        gallery showcases the essence of adventure, relaxation, and discovery.
        Let these images inspire your next travel adventure.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={controls}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="md:flex justify-between w-full h-auto mt-10 hidden"
      >
        <div className="flex flex-col gap-3 w-[24%]">
          <img src={gallery1} className="w-full aspect-[1/1.42]" alt="" />
          <img src={gallery5} className="w-full aspect-[1/1.42]" alt="" />
        </div>
        <div className="flex flex-col gap-3 mt-[5%] w-[24%]">
          <img src={gallery2} className="w-full aspect-[1/1.42]" alt="" />
          <img src={gallery6} className="w-full aspect-[1/1.42]" alt="" />
        </div>
        <div className="flex flex-col gap-3 w-[24%]">
          <img src={gallery3} className="w-full aspect-[1/1.42]" alt="" />
          <img src={gallery7} className="w-full aspect-[1/1.42]" alt="" />
        </div>
        <div className="flex flex-col gap-3 mt-[5%] w-[24%]">
          <img src={gallery4} className="w-full aspect-[1/1.42]" alt="" />
          <img src={gallery8} className="w-full aspect-[1/1.42]" alt="" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={controls}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="md:hidden w-full"
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
          {galleryItems.map((item, index) => (
            <SwiperSlide className="md:w-[30%] w-[48%] h-fit" key={index}>
              <div className="w-full h-[550px]">
                <img src={item.img} className="w-full h-[550px]" alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};
