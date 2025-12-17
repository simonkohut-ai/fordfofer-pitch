/**
 * Template Configuration Helper
 * 
 * This file shows how to use client config in templates.
 * In production, templates would be server-side rendered or use build-time config injection.
 * 
 * For static HTML, you can:
 * 1. Use a build script to inject config values
 * 2. Use JavaScript to load config and update DOM
 * 3. Use server-side rendering (Next.js, etc.)
 * 
 * This is a reference implementation.
 */

import clientConfig from '../../config/clients/mikork.config.mjs';

// Example: How to use config in templates
export function getConfig() {
  return clientConfig;
}

// Example: Generate meta tags from config
export function getMetaTags() {
  const config = clientConfig;
  return {
    title: `${config.business.name} - ${config.business.tagline}`,
    description: config.business.description,
    keywords: config.seo.keywords.join(', '),
    phone: config.contact.phoneDisplay,
    email: config.contact.email,
    address: `${config.address.street}, ${config.address.city}, ${config.address.postalCode}`,
  };
}

// Example: Generate structured data from config
export function getStructuredData() {
  const config = clientConfig;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@type': 'FuneralHome',
    name: config.business.name,
    description: config.business.description,
    url: config.social.website,
    telephone: config.contact.phone,
    email: config.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      postalCode: config.address.postalCode,
      addressCountry: config.address.country,
    },
    geo: config.location.latitude ? {
      '@type': 'GeoCoordinates',
      latitude: config.location.latitude,
      longitude: config.location.longitude,
    } : undefined,
    openingHours: config.hours.structured,
    areaServed: {
      '@type': 'City',
      name: config.address.city,
    },
  };
}

