import { Helmet } from 'react-helmet-async';

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Slimeline Holidays",
    "description": "Leading travel agency offering exclusive travel packages to Sri Lanka, Maldives, and UAE",
    "url": typeof window !== 'undefined' ? window.location.origin : 'https://slimelineholidays.com',
    "logo": typeof window !== 'undefined' ? `${window.location.origin}/src/assets/images/logo.webp` : 'https://slimelineholidays.com/src/assets/images/logo.webp',
    "sameAs": [
      // Add social media links here if available
      // "https://www.facebook.com/slimelineholidays",
      // "https://www.instagram.com/slimelineholidays",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": "Worldwide",
      "availableLanguage": "English"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const PackageSchema = ({ packageData }) => {
  if (!packageData) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://slimelineholidays.com';
  const packageUrl = `${baseUrl}/packages/${packageData.slug}`;
  const imageUrl = packageData.image 
    ? (packageData.image.startsWith('http') ? packageData.image : `${baseUrl}${packageData.image}`)
    : `${baseUrl}/src/assets/images/logo.webp`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": packageData.name,
    "description": packageData.description || `Amazing ${packageData.days}-day travel package to ${packageData.country}`,
    "image": imageUrl,
    "url": packageUrl,
    "duration": `P${packageData.days}D`,
    "offers": packageData.price ? {
      "@type": "Offer",
      "price": packageData.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": packageUrl
    } : undefined,
    "itinerary": packageData.itinerary && Array.isArray(packageData.itinerary) 
      ? packageData.itinerary.map((day, index) => ({
          "@type": "TouristDestination",
          "name": day.day || `Day ${index + 1}`,
          "description": day.details && day.details.length > 0 ? day.details[0] : ""
        }))
      : undefined
  };

  // Remove undefined fields
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const BreadcrumbSchema = ({ items }) => {
  if (!items || items.length === 0) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://slimelineholidays.com';

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};



