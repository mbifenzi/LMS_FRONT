/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @returns A URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Creates a URL-friendly slug with ID
 * @param name - The name/title of the item
 * @param id - The ID of the item
 * @returns A URL-safe slug in format: name-id
 */
export function createSlugWithId(name: string, id: string | number): string {
  const slug = slugify(name);
  return `${slug}-${id}`;
}

/**
 * Extracts ID from a slug
 * @param slug - The slug in format: name-id
 * @returns The extracted ID
 */
export function extractIdFromSlug(slug: string): string {
  const parts = slug.split("-");
  return parts[parts.length - 1];
}

/**
 * Extracts name from a slug (without ID)
 * @param slug - The slug in format: name-id
 * @returns The name part formatted for display
 */
export function extractNameFromSlug(slug: string): string {
  const parts = slug.split("-");
  // Remove the last part (ID) and join back
  const nameParts = parts.slice(0, -1);
  return nameParts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
