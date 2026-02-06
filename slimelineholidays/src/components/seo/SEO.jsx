import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Slimeline Holidays - Best Travel Packages in Sri Lanka, Maldives & UAE',
  description = 'Discover amazing travel packages to Sri Lanka, Maldives, and UAE. Book your perfect holiday with our expert travel services and exclusive deals.',
  keywords = 'travel packages, Sri Lanka tours, Maldives holidays, UAE packages, travel agency, holiday packages',
  image = '',
  url = '',
  type = 'website',
  siteName = 'Slimeline Holidays',
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://slimelineholidays.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image 
    ? (image.startsWith('http') ? image : `${baseUrl}${image}`)
    : `${baseUrl}/src/assets/images/logo.webp`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Slimeline Holidays" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  );
};

export default SEO;



