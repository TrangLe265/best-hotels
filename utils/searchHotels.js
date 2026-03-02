//Filters hotels by name or city, case-insensitively.
export function searchHotels(hotels, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return hotels.filter(
    h =>
      h.name.toLowerCase().includes(q) ||
      h.address.city.toLowerCase().includes(q)
  );
}
