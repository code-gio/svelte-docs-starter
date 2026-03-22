/**
 * Calculate the estimated reading time for markdown content.
 *
 * Strips code blocks and HTML tags before counting words,
 * then divides by 200 words per minute (average reading speed).
 */
export function calculateReadingTime(content: string): string {
	// Remove fenced code blocks (``` ... ```)
	let stripped = content.replace(/```[\s\S]*?```/g, "");

	// Remove inline code
	stripped = stripped.replace(/`[^`]*`/g, "");

	// Remove HTML tags
	stripped = stripped.replace(/<[^>]*>/g, "");

	// Count words by splitting on whitespace and filtering empty strings
	const words = stripped
		.split(/\s+/)
		.filter((word) => word.length > 0);

	const minutes = Math.max(1, Math.ceil(words.length / 200));

	return `${minutes} min read`;
}
