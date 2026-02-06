import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../components/layouts/Header";
import { Footer } from "../../components/layouts/Footer";
import { PackageDetailHero } from "./PackageDetailHero";
import { PackageDetailBody } from "./PackageDetailBody";
import { useParams } from "react-router-dom";
import NavigationContext from "../../contexts/NavigationContext";
import Loader from "../../components/ui/Loader";
import SEO from "../../components/seo/SEO";
import { PackageSchema, BreadcrumbSchema } from "../../components/seo/StructuredData";

export const PackageDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
    
    // Fetch package from backend
    const fetchPackage = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${apiUrl}/packages?slug=${slug}`);
        const result = await response.json();
        
        if (response.ok && result.package) {
          setPackageDetail(result.package);
        } else {
          setError("Package not found");
        }
      } catch (err) {
        console.error("Error fetching package:", err);
        setError("Failed to load package");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPackage();
    }
  }, [slug]);

  const scrollRefs = useContext(NavigationContext);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Loader size="lg" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !packageDetail) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl text-red-600">{error || "Package not found"}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${packageDetail.name} - Slimeline Holidays`}
        description={packageDetail.description || `Discover our amazing ${packageDetail.days}-day travel package to ${packageDetail.country}. Book now for the best travel experience.`}
        keywords={`${packageDetail.name}, ${packageDetail.country} travel package, ${packageDetail.days} days tour, travel deals, holiday packages`}
        image={packageDetail.image}
        url={`/packages/${packageDetail.slug}`}
        type="article"
      />
      <PackageSchema packageData={packageDetail} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Packages', url: '/packages' },
          { name: packageDetail.name, url: `/packages/${packageDetail.slug}` }
        ]}
      />
      <Header />
      <PackageDetailHero data={packageDetail} />
      <PackageDetailBody data={packageDetail} />
      <Footer />
    </>
  );
};
