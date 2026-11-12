/**
 * The organization's contact details, used everywhere on the site (footer, contact page,
 * Google's structured data). Change them here only.
 */
export const CONTACT = {
  email: 'african.canadian.arkofhope@gmail.com',
  phone: '+1 (438) 282-7441',
  phoneHref: 'tel:+14382827441',
  address: {
    street: '101 West Drive, Unit 7',
    city: 'Brampton',
    region: 'ON',
    postalCode: 'L6T 2J6',
    country: 'CA',
  },
};

export const ADDRESS_LINES = [CONTACT.address.street, `${CONTACT.address.city}, ${CONTACT.address.region} ${CONTACT.address.postalCode}`];
export const ADDRESS_ONE_LINE = ADDRESS_LINES.join(', ');
export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_ONE_LINE)}`;
