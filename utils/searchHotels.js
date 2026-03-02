/**
 * Filters hotels by name or city, case-insensitively.
 *
 * @param {Array}  hotels - Full hotel list from hoteldata.json
 * @param {string} query  - User search string
 * @returns {Array} Matching hotels, or [] when query is blank
 */
export function searchHotels(hotels, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return hotels.filter(
    h =>
      h.name.toLowerCase().includes(q) ||
      h.address.city.toLowerCase().includes(q)
  );
}
