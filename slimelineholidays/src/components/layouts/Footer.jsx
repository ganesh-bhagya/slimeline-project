import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "./../../assets/images/logo.webp";
import footerimg from "./../../assets/images/footer.webp";
import call from "./../../assets/images/icons/call.svg";
import email from "./../../assets/images/icons/email.svg";
import address from "./../../assets/images/icons/address.svg";
import clock from "./../../assets/images/icons/clock.svg";

export const Footer = ({ scrollRefs }) => {
  const navigate = useNavigate();

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  const scrollToDiv = (rerName) => {
    const isHomePage = window.location.pathname === "/";
    if (!isHomePage) {
      navigate(`/?scrollTo=${rerName}`);
    } else {
      scrollRefs[rerName]?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const isServicesLink = new URLSearchParams(window.location.search).get(
      "scrollTo"
    );
    if (isServicesLink) {
      setTimeout(() => {
        scrollRefs[isServicesLink]?.current?.scrollIntoView({ behavior: "smooth" });
        const urlWithoutQueryParam = window.location.pathname;
        window.history.replaceState({}, document.title, urlWithoutQueryParam);
      }, 1000);
    }
  }, [scrollRefs]);

  const navigationItems = [
    { id: "home", link: "/", name: "Home", type: "external" },
    { id: "abtus", link: "/", name: "About Us", type: "internal" },
    { id: "packages", link: "/packages", name: "Packages", type: "external" },
    { id: "services", link: "/", name: "Services", type: "internal" },
    { id: "gallery", link: "/", name: "Gallery", type: "internal" },
    { id: "faq", link: "/", name: "FAQs", type: "internal" },
    { id: "testimonials", link: "/", name: "Testimonials", type: "internal" },
    { id: "contactus", link: "/", name: "Contact Us", type: "internal" },
  ];

  return (
    <section
      ref={ref}
      className="w-full flex flex-col relative font-nunito overflow-hidden"
      style={{
        backgroundImage: `url(${footerimg})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
        className="w-full pb-[5%] flex flex-col md:flex-row justify-between py-[10%] md:py-[5%] px-[5%] md:px-[10%]"
      >
        {/* Left Section */}
        <div className="md:w-[30%] flex flex-col mb-12 md:mb-0">
          <div className="w-[300px] overflow-hidden">
            <img src={logo} alt="Logo" />
          </div>
          <div className="flex flex-col gap-5 mt-10 md:ml-5">
            {[
              { label: "Call Us", value: "(+94) 777 514 294", icon: call },
              { label: "Write Us", value: "info@slimelineholidays.com", icon: email },
              { label: "Visit Us", value: "Slimeline Tours, Modarawalla, Marawilla", icon: address },
              { label: "We are open", value: "Mon - Fri: 08.00 - 16.00", icon: clock },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-[35px] aspect-square rounded-full border border-[#03FF3F] flex items-center justify-center">
                  <img src={item.icon} className="w-4" alt={item.label} />
                </span>
                <span className="text-white font-light text-base">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="md:w-[15%] flex flex-col gap-3 mb-12 md:mb-0">
          <MenuTitle title="Quick Links" />
          <div className="w-full flex flex-col gap-1 mt-5">
            {navigationItems.map((item, index) => (
              <MenuItem
                key={index}
                name={item.name}
                link={item.link}
                type={item.type}
                id={item.id}
                scrollToDiv={scrollToDiv}
              />
            ))}
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-[40%] hidden md:flex flex-col gap-3 mb-12 md:mb-0"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.311201985419!2d79.80907687448605!3d7.430773411956828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2c695c85f03dd%3A0x731c8ea1aa4c6f51!2sSlimline%20Tours!5e0!3m2!1sen!2slk!4v1732119348477!5m2!1sen!2slk"
            width="500"
            height="350"
            className="rounded-lg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  );
};

const MenuTitle = ({ title }) => (
  <div className="text-white text-[20px] 3xl:text-[22px] font-bold leading-[30px]">
    {title}
  </div>
);

const MenuItem = ({ link, name, id, type, scrollToDiv }) => (
  <>
    {type === "internal" ? (
      <button
        onClick={() => scrollToDiv(id)}
        className="text-white text-start text-base font-normal leading-[30px]"
      >
        {name}
      </button>
    ) : (
      <Link to={link} className="text-white text-base font-normal leading-[30px]">
        {name}
      </Link>
    )}
  </>
);
