/**
 * Utility functions for author display and formatting
 */

/**
 * Generates a user-friendly author name from a user ID
 * @param authorId - The UUID of the author
 * @returns A formatted author name
 */
export function getAuthorName(authorId: string): string {
  // Extract the first 8 characters and format them nicely
  const shortId = authorId.substring(0, 8);
  
  // Convert to a more readable format
  const formattedId = shortId.replace(/(.{2})/g, '$1').substring(0, 8);
  
  return `Author ${formattedId}`;
}

/**
 * Generates a consistent color for an author based on their ID
 * @param authorId - The UUID of the author
 * @returns A hex color code
 */
export function getAuthorColor(authorId: string): string {
  // Simple hash function to generate consistent colors
  let hash = 0;
  for (let i = 0; i < authorId.length; i++) {
    hash = authorId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Generate a color from the hash
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

/**
 * Generates initials from an author ID for avatar display
 * @param authorId - The UUID of the author
 * @returns Two-letter initials
 */
export function getAuthorInitials(authorId: string): string {
  // Use the first two characters of the ID as initials
  return authorId.substring(0, 2).toUpperCase();
}

/**
 * Formats a date for display in author info
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else if (diffInHours < 24 * 7) {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
