import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import abtus from "./../../assets/images/awardsbg.webp";
import client from "./../../assets/images/client.webp";
import gallery1 from "./../../assets/images/gallery/gallery1.webp";
import gallery2 from "./../../assets/images/gallery/gallery2.webp";
import gallery3 from "./../../assets/images/gallery/gallery3.webp";
import gallery4 from "./../../assets/images/gallery/gallery4.webp";
import gallery5 from "./../../assets/images/gallery/gallery5.webp";
import gallery6 from "./../../assets/images/gallery/gallery6.webp";

const GALLERY_IMAGES = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:3001/api").replace(
  /\/api\/?$/,
  ""
);

function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${apiBase}${path.startsWith("/") ? path : `/${path}`}`;
}

const DEFAULT_TESTIMONIAL = {
  quote:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  author_name: "Steve David",
  author_location: "UK",
  image: null,
  gallery_images: [],
};

export const Testimonials = ({ scrollRef }) => {
  const swiperRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
    fetch(`${apiUrl}/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        const list = data?.testimonials ?? (Array.isArray(data) ? data : []);
        setTestimonials(Array.isArray(list) ? list : []);
      })
      .catch(() => setTestimonials([]));
  }, []);

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  const items = testimonials.length > 0 ? testimonials : [DEFAULT_TESTIMONIAL];

  return (
    <section
      ref={(node) => {
        ref(node); // Combine ref for animation
        scrollRef.current = node; // Assign to scrollRef
      }}
      className={`h-auto flex flex-col w-full relative justify-between items-center font-nunito px-[5%] md:px-[10%] py-[10%] md:py-[5%]`}
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
          <span className="font-bold">What</span> our client say
        </div>
        <p className="text-white text-center text-base font-light md:w-[75%]">
        We take pride in creating meaningful, memorable experiences for every traveler. Here’s what our guests have to say about their journey with us and the personalized service they received from start to finish.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={controls}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-[10%] md:mt-[7%] w-full"
      >
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          loop={items.length > 1}
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
              slidesPerView: 1,
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
          {items.map((item, index) => (
            <SwiperSlide className="w-full h-fit" key={item.id ?? index}>
              <div className="w-full flex flex-col md:flex-row justify-between">
                <div className="md:w-[49%] flex flex-col gap-2 mb-6 md:mb-0">
                  <div className="rounded-xl bg-[#F1FFF2] p-5 text-sm md:text-base">
                    {item.quote}
                  </div>

                  <div className="flex items-center gap-3 mt-5">
                    <img
                      src={item.image ? getImageUrl(item.image) : client}
                      className="w-14 md:w-16 rounded-full object-cover"
                      alt={item.author_name}
                    />
                    <div className="flex flex-col text-base text-white">
                      <span>{item.author_name}</span>
                      <span className="font-semibold">
                        {item.author_location || ""}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-[49%] flex flex-wrap justify-between p-3 rounded-lg bg-[#00000072] border border-theme-green-color">
                  {((item.gallery_images && item.gallery_images.length > 0)
                    ? item.gallery_images.map((path) => getImageUrl(path))
                    : GALLERY_IMAGES
                  ).slice(0, 6).map((img, idx) => (
                    <div
                      key={idx}
                      className="w-[32%] aspect-square overflow-hidden mb-3"
                    >
                      <img
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};
