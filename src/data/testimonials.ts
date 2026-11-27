export interface Testimonial {
  /** The person's name as they show it publicly. */
  name: string;
  /** Their X handle with @, or an empty string for a Chrome Web Store review without one. */
  handle: string;
  /** Their words, copied exactly (no edits beyond trimming). */
  text: string;
  source: "Chrome Web Store" | "X";
  /** Where they posted it, so anyone can check. */
  url: string;
  /** When they posted it (YYYY-MM-DD). */
  date: string;
}

/**
 * Real testimonials only: each one posted publicly by a real user, copied exactly, with its link. Add them by hand.
 * Empty on purpose until there are real ones: the Testimonials section renders nothing while this list is empty.
 */
export const testimonials: Testimonial[] = [];
