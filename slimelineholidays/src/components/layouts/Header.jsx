import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/logo.webp";
import logowhite from "./../../assets/images/logowhite.webp";
import { HamburgerIcon, CloseIcon } from "../../utils/icons";
import { motion } from "framer-motion";

export const Header = ({ scrollRefs }) => {
  const [visibleMobile, setVisibleMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleFadeIn = () => {
    setVisibleMobile((prev) => !prev);
    document.body.style.overflow = visibleMobile ? "visible" : "hidden";
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const scrollToDiv = (rerName) => {
    const isHomePage = window.location.pathname === "/";
    if (!isHomePage) {
      navigate(`/?scrollTo=${rerName}`);
    } else {
      if (rerName === "abtus") {
        scrollRefs.abtus.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "contactus") {
        scrollRefs.contactus.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "faq") {
        scrollRefs.faq.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "testimonials") {
        scrollRefs.testimonials.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "services") {
        scrollRefs.services.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "gallery") {
        scrollRefs.gallery.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const scrollToDivMobile = (rerName) => {
    handleFadeIn();
    const isHomePage = window.location.pathname === "/";
    if (!isHomePage) {
      navigate(`/?scrollTo=${rerName}`);
    } else {
      if (rerName === "abtus") {
        scrollRefs.abtus.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "contactus") {
        scrollRefs.contactus.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "faq") {
        scrollRefs.faq.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "testimonials") {
        scrollRefs.testimonials.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "services") {
        scrollRefs.services.current.scrollIntoView({ behavior: "smooth" });
      } else if (rerName === "gallery") {
        scrollRefs.gallery.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const isServicesLink = new URLSearchParams(window.location.search).get(
      "scrollTo"
    );
    if (isServicesLink !== null) {
      const navigationTimeout = setTimeout(() => {
        if (isServicesLink === "abtus") {
          scrollRefs.abtus.current.scrollIntoView({ behavior: "smooth" });
        } else if (isServicesLink === "contactus") {
          scrollRefs.contactus.current.scrollIntoView({ behavior: "smooth" });
        } else if (isServicesLink === "faq") {
          scrollRefs.faq.current.scrollIntoView({ behavior: "smooth" });
        } else if (isServicesLink === "testimonials") {
          scrollRefs.testimonials.current.scrollIntoView({
            behavior: "smooth"
          });
        } else if (isServicesLink === "services") {
          scrollRefs.services.current.scrollIntoView({ behavior: "smooth" });
        } else if (isServicesLink === "gallery") {
          scrollRefs.gallery.current.scrollIntoView({ behavior: "smooth" });
        }

        const urlWithoutQueryParam = window.location.pathname;
        window.history.replaceState({}, document.title, urlWithoutQueryParam);
      }, 1000);

      return () => clearTimeout(navigationTimeout);
    }
  }, [scrollRefs]);

  const navigationItems = [
    { id: "home", link: "/", name: "Home", children: 0, type: "external" },
    { id: "abtus", link: "/", name: "About Us", children: 0, type: "internal" },
    {
      id: "packages",
      link: "/packages",
      name: "Packages",
      children: 0,
      type: "external"
    },
    {
      id: "services",
      link: "/",
      name: "Services",
      children: 0,
      type: "internal"
    },
    {
      id: "gallery",
      link: "/",
      name: "Gallery",
      children: 0,
      type: "internal"
    },
    { id: "faq", link: "/", name: "FAQs", children: 0, type: "internal" },
    {
      id: "testimonials",
      link: "/",
      name: "Testimonials",
      children: 0,
      type: "internal"
    },
    {
      id: "contactus",
      link: "/",
      name: "Contact Us",
      children: 0,
      type: "internal"
    }
  ];

  return (
    <>
      <section
        className={`w-full fixed z-50 py-3 md:py-4 px-[5%] md:px-[7%] 3xl:px-[10%] flex flex-row justify-between items-center font-nunito transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
        style={{
          backdropFilter: isScrolled ? "none" : "blur(4px)",
          borderBottom: isScrolled
            ? "1px solid rgba(0, 0, 0, 0.1)"
            : "1px solid rgba(255, 255, 255, 0.01)"
        }}
      >
        <Link to="/" className="w-[60%] md:w-[25%] overflow-hidden md:hidden">
        <img src={isScrolled ? logo : logowhite} alt="" />
       
        </Link>
        <div className="w-[30%] hidden md:flex items-center justify-between">
          {navigationItems.slice(0, 4).map((item, itemIndex) => (
            <NavigationItem
              key={itemIndex}
              name={item.name}
              link={item.link}
              type={item.type}
              id={item.id}
              isScrolled={isScrolled}
              scrollToDiv={scrollToDiv}
              children={item.children}
            />
          ))}
        </div>
        <Link to="/"  className="w-[60%] md:w-[25%] hidden md:block overflow-hidden">
        <img src={isScrolled ? logowhite : logo} alt="" />
        </Link>
        <div className="w-[30%] hidden md:flex items-center justify-between">
          {navigationItems.slice(4, 8).map((item, itemIndex) => (
            <NavigationItem
              key={itemIndex}
              name={item.name}
              link={item.link}
              type={item.type}
              id={item.id}
              scrollToDiv={scrollToDiv}
              isScrolled={isScrolled}
              children={item.children}
            />
          ))}
        </div>
        <div onClick={handleFadeIn} className="md:hidden">
          <HamburgerIcon />
        </div>
        <div
          className={`fixed w-full pb-[20%] inset-0 top-0 left-0 bottom-0 bg-[#F1FFF2] flex flex-col h-[100vh] transition transform duration-500 ease-in-out ${
            visibleMobile ? "fade-up-enter-to" : "fade-up-enter-from"
          }`}
        >
          <div className="flex items-center justify-between w-full p-[20px]">
            <Link className="">
              {/* <img src={logo} className=" w-[75%] " alt="" /> */}
            </Link>
            <span onClick={handleFadeIn}>
              <CloseIcon />
            </span>
          </div>
          <Link to="/" className="w-full flex items-center justify-center mt-[20%]">
            <img src={logo} className="w-[65%]" alt="" />
          </Link>
          <div className="flex w-full flex-col items-center gap-3 p-[20px]">
            {navigationItems.map((item, itemIndex) => (
              <NavigationItemMobile
                key={itemIndex}
                name={item.name}
                link={item.link}
                type={item.type}
                id={item.id}
                children={item.children}
                scrollToDivMobile={scrollToDivMobile}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const NavigationItem = ({
  link,
  name,
  children,
  id,
  type,
  scrollToDiv,
  isScrolled
}) => {
  return (
    <>
      {type === "internal" ? (
        <button
          onClick={() => scrollToDiv(id)}
          className={`${
            isScrolled ? "text-black" : "text-white"
          } font-semibold leading-relaxed tracking-wider text-[xs] md:text-base 3xl:text-base flex items-center gap-1 hover:text-theme-green-color`}
        >
          <span>{name}</span>
          {children !== 0 && <ArrowDown />}
        </button>
      ) : (
        <Link
          to={link}
          className={`${
            isScrolled ? "text-black" : "text-white"
          } font-semibold leading-relaxed tracking-wider text-[xs] md:text-base 3xl:text-base flex items-center gap-1 hover:text-theme-green-color`}
        >
          <span>{name}</span>
          {children !== 0 && <ArrowDown />}
        </Link>
      )}
    </>
  );
};

const NavigationItemMobile = ({
  link,
  name,
  children,
  id,
  type,
  scrollToDivMobile
}) => {
  return (
    <>
      {type === "internal" ? (
        <button
          onClick={() => {
            scrollToDivMobile(id);
            document.body.style.overflow = "visible"; // Ensure scrolling is enabled
          }}
          className="text-[#008B02] font-bold leading-relaxed tracking-wider text-xl flex items-center gap-1"
        >
          <span> {name}</span>
          {children !== 0 && (
            <span>
              <ArrowDown />
            </span>
          )}
        </button>
      ) : (
        <Link
          to={link}
          onClick={() => {
            handleFadeIn();
            document.body.style.overflow = "visible"; // Ensure scrolling is enabled
          }}
          className="text-[#008B02] font-bold leading-relaxed tracking-wider text-xl flex items-center gap-1"
        >
          <span> {name}</span>
          {children !== 0 && (
            <span>
              <ArrowDown />
            </span>
          )}
        </Link>
      )}
    </>
  );
};
