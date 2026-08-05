import type { Metadata } from "next";
import GuidelinesContent from "./GuidelinesContent";

export const metadata: Metadata = {
  title: "Rental Guidelines",
  description:
    "Everything you need to know before renting from Gigi's Rentals — terms & conditions, how to rent, fitting appointments, and care reminders.",
  alternates: {
    canonical: "/guidelines",
  },
};

export default function Page() {
  return <GuidelinesContent />;
}