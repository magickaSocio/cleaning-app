export function getMapUrl(address: string) {
  // Encode the address for use in a URL
  const encodedAddress = encodeURIComponent(address);
  
  // Check if the user is on a mobile device
  const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    // On mobile, try to use the device's default map app
    return `maps:?q=${encodedAddress}`;
  } else {
    // On desktop, use Google Maps
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }
}

