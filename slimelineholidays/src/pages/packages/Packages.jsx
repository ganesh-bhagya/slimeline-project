import React, { useEffect } from "react";
import { Header } from "../../components/layouts/Header";
import { Footer } from "../../components/layouts/Footer";
import { PackagesHero } from "./PackagesHero";
import { PackagesBody } from "./PackagesBody";
import SEO from "../../components/seo/SEO";
import { BreadcrumbSchema } from "../../components/seo/StructuredData";

export const Packages = () => {

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="Travel Packages - Sri Lanka, Maldives & UAE | Slimeline Holidays"
        description="Browse our extensive collection of travel packages to Sri Lanka, Maldives, and UAE. Find the perfect holiday package for your next adventure."
        keywords="travel packages, tour packages, Sri Lanka packages, Maldives packages, UAE packages, holiday deals, vacation packages"
        url="/packages"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Packages', url: '/packages' }
        ]}
      />
      <Header />
      <PackagesHero />
      <PackagesBody />
      <Footer />
    </>
  );
};
