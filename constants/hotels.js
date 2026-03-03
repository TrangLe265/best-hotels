import hotelsData from '../data/hoteldata.json';

export const hotels = hotelsData.data.hotels;

export const helsinkiHotels = hotels.filter(
  h => h.address.city.toLowerCase() === 'helsinki'
);

export const category_icons = {
  original: 'briefcase',
  solo: 'star',
  break: 'umbrella-beach',
  heymo: 'dollar-sign',
};