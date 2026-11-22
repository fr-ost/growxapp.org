/** "November 18, 2026" for a YYYY-MM-DD post date (UTC, so the day never shifts). Shared by server and client code. */
export const formatPostDate = (iso: string) =>
  new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
