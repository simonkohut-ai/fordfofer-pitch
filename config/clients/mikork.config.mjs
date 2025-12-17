/**
 * MikoRK pohrebníctvo - Client Configuration
 * 
 * All client-specific data lives here.
 * Switching client = switching config file only.
 * 
 * Last Updated: 2025-12-17
 */

export default {
  // Business Information
  business: {
    name: 'MikoRK pohrebníctvo',
    legalName: '[LEGAL_NAME_PLACEHOLDER]', // TODO: Add legal business name
    tagline: 'Profesionálna starostlivosť s úctou a pochopením',
    description: 'MikoRK pohrebníctvo poskytuje dôstojnú a profesionálnu starostlivosť v najťažších chvíľach života. Sme tu pre vás s úctou, pochopením a profesionálnym prístupom. Lokálna spoločnosť s dlhodobou tradíciou.',
  },

  // Contact Information
  contact: {
    phone: '+421XXXXXXXXX', // TODO: Replace with actual phone number
    phoneDisplay: '+421 XXX XXX XXX', // Display format
    email: 'info@mikork.sk', // TODO: Replace with actual email
    emergencyPhone: '+421XXXXXXXXX', // TODO: Replace with emergency phone if different
    emergencyPhoneDisplay: '+421 XXX XXX XXX',
    emergencyAvailable: '24/7',
  },

  // Address
  address: {
    street: '[STREET_ADDRESS_PLACEHOLDER]', // TODO: Add street address
    city: '[CITY_PLACEHOLDER]', // TODO: Add city
    postalCode: '[POSTAL_CODE_PLACEHOLDER]', // TODO: Add postal code
    country: 'SK',
    region: '[REGION_PLACEHOLDER]', // TODO: Add region (e.g., "Bratislavský kraj")
  },

  // Location (for Google Maps / Structured Data)
  location: {
    // TODO: Get coordinates from Google Maps
    // Search for business address on Google Maps, right-click, select coordinates
    latitude: null, // e.g., 48.1486
    longitude: null, // e.g., 17.1077
  },

  // Language
  language: {
    primary: 'sk', // Slovak
    secondary: 'cz', // Czech (optional)
  },

  // Business Hours
  hours: {
    // Format: "Mo-Su 00:00-23:59" for 24/7
    // Or: "Mo-Fr 08:00-17:00, Sa 09:00-13:00, Su closed"
    display: '24/7',
    structured: 'Mo-Su 00:00-23:59', // For Schema.org
    emergency: '24/7',
  },

  // Social Media (Optional)
  social: {
    facebook: null, // TODO: Add Facebook page URL if exists
    website: 'https://www.mikork.sk', // TODO: Update with actual domain
  },

  // Email Configuration
  email: {
    from: 'MikoRK pohrebníctvo <noreply@mikork.sk>', // TODO: Update domain
    to: 'info@mikork.sk', // Owner email for notifications
    replyTo: 'info@mikork.sk',
  },

  // SEO
  seo: {
    keywords: [
      'pohrebníctvo',
      'pohrebné služby',
      'pohreb',
      'pohrebná služba',
      'MikoRK',
    ],
    city: '[CITY_PLACEHOLDER]', // TODO: Add city for local SEO
    region: '[REGION_PLACEHOLDER]', // TODO: Add region for local SEO
  },

  // Services (for homepage)
  services: [
    {
      title: 'Kompletná organizácia pohrebu',
      description: 'Zabezpečíme všetko potrebné pre dôstojný pohreb podľa vašich predstáv.',
    },
    {
      title: 'Poradenstvo a podpora',
      description: 'Poskytujeme odborné poradenstvo a emocionálnu podporu v tejto ťažkej dobe.',
    },
    {
      title: 'Doplnkové služby',
      description: 'Široká ponuka doplnkových služieb podľa vašich potrieb a preferencií.',
    },
  ],

  // Values (for homepage)
  values: [
    {
      title: 'Stabilita',
      description: 'Dlhodobá tradícia a spoľahlivosť v našej komunite.',
    },
    {
      title: 'Starostlivosť',
      description: 'Genuínna súčasť a pozornosť k detailom v každom kroku.',
    },
    {
      title: 'Dôstojnosť',
      description: 'Profesionálny a rešpektujúci prístup k vašim potrebám.',
    },
  ],

  // Footer Links
  footer: {
    links: [
      { text: 'Služby', href: '/services' },
      { text: 'O nás', href: '/about' },
      { text: 'Kontakt', href: '/contact' },
    ],
  },
};

