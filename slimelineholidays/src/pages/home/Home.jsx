import React, { useContext, useEffect } from "react";
import { Header } from "../../components/layouts/Header";
import { HomeHero } from "./HomeHero";
import { OurPackages } from "./OurPackages";
import { AboutUs } from "./AboutUs";
import { WhyUs } from "./WhyUs";
import { Services } from "./Services";
import { HowItWorks } from "./HowItWorks";
import { Gallery } from "./Gallery";
import { Footer } from "../../components/layouts/Footer";
import { Awards } from "./Awards";
import { FAQ } from "./FAQ";
import { Testimonials } from "./Testimonials";
import { ContactUs } from "./ContactUs";
import NavigationContext from "../../contexts/NavigationContext";
import SEO from "../../components/seo/SEO";
import { OrganizationSchema } from "../../components/seo/StructuredData";

export const Home = () => {
  const scrollRefs = useContext(NavigationContext);

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="Slimeline Holidays - Best Travel Packages in Sri Lanka, Maldives & UAE"
        description="Discover amazing travel packages to Sri Lanka, Maldives, and UAE. Book your perfect holiday with our expert travel services, exclusive deals, and personalized itineraries."
        keywords="travel packages, Sri Lanka tours, Maldives holidays, UAE packages, travel agency, holiday packages, Sri Lanka travel, Maldives vacation, UAE tourism"
        url="/"
      />
      <OrganizationSchema />
      <Header scrollRefs={scrollRefs} />
      <HomeHero />
      <OurPackages />
      <AboutUs scrollRef={scrollRefs.abtus} />
      <WhyUs />
      <Services scrollRef={scrollRefs.services} />
      <HowItWorks />
      <Gallery scrollRef={scrollRefs.gallery} />
      {/* <Awards /> */}
      <FAQ scrollRef={scrollRefs.faq} />
      <Testimonials scrollRef={scrollRefs.testimonials} />
      <ContactUs scrollRef={scrollRefs.contactus} />
      <Footer scrollRefs={scrollRefs} />
    </>
  );
};
