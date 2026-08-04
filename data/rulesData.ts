// --- TYPES ---
export const TABS = [
  { key: 'terms', label: 'Terms & Condition', icon: 'scroll' },
  { key: 'how', label: 'How to Rent', icon: 'mirror' },
  { key: 'appointment', label: 'Fitting', icon: 'calendar' },
  { key: 'reminder', label: 'Reminder', icon: 'swan' },
] as const;

export type TabKey = typeof TABS[number]['key'];

export interface StepItem {
  num: string;
  title: string;
  desc: string;
}

// Discriminated Union for exact typing
interface BaseTab {
  title: string;
  subtitle: string;
  bowColor: string;
}

interface GridOrListTab extends BaseTab {
  type: 'grid' | 'list';
  items: StepItem[];
}

interface ProseTab extends BaseTab {
  type: 'prose';
  intro: string;
  items: string[];
  outro: string;
  signOff: string;
}

export type TabContentData = GridOrListTab | ProseTab;

// --- DATA ---
export const TAB_DATA: Record<TabKey, TabContentData> = {
  appointment: {
    type: 'grid',
    title: 'Fitting Appointment',
    subtitle: 'Everything You Need to Know',
    bowColor: '#E46888',
    items: [
      { num: '01', title: 'Book Your Appointment', desc: 'Send us a message with your preferred date and time for your fitting appointment.' },
      { num: '02', title: 'Wait for Confirmation', desc: "We'll confirm your schedule based on our private studio availability." },
      { num: '03', title: 'Visit Our Studio', desc: 'Come to our studio at your confirmed appointment time. Please arrive on time so we can assist you comfortably.' },
      { num: '04', title: 'Browse & Try On', desc: 'Explore our collection and try on your favorite modern Vietnamese dresses to find the perfect fit.' },
      { num: '05', title: 'Reserve Your Dress', desc: "Once you've found your favorite, we'll check its availability and reserve it for your event." },
      { num: '06', title: 'Complete Your Booking', desc: 'Submit the required details and settle the down payment to confirm your reservation.' },
      { num: '07', title: 'See You on Pickup Day', desc: 'Your dress will be prepared and ready for pickup on your scheduled rental date.' },
    ]
  },
  how: {
    type: 'grid',
    title: 'How to Rent',
    subtitle: 'Everything You Need to Know',
    bowColor: '#EA829B',
    items: [
      { num: '01', title: 'Choose Your Dress', desc: 'Browse our online collection and send us a screenshot of your chosen dress, along with your size and event date.' },
      { num: '02', title: 'Check Availability', desc: "We'll confirm if your selected dress is available on your preferred date." },
      { num: '03', title: 'Send Your Details', desc: 'Provide one valid government-issued ID and a selfie holding your ID for verification.' },
      { num: '04', title: 'Complete Agreement', desc: 'Fill out our Rental Form and sign the Rental Agreement before your booking can be confirmed.' },
      { num: '05', title: 'Read Our Policy', desc: 'Please review our rental terms and guidelines carefully prior to your fitting.' },
      { num: '06', title: 'Secure Reservation', desc: 'Settle the required reservation fee to officially reserve your dress.' },
      { num: '07', title: 'Pick Up Your Dress', desc: "Claim your dress on your scheduled pickup date. We'll have it ready for your special occasion." },
      { num: '08', title: 'Return Your Dress', desc: 'Return the dress on the agreed date in its original condition to avoid additional charges.' },
    ]
  },
  terms: {
    type: 'list',
    title: 'Terms & Conditions',
    subtitle: 'Please take a moment to read our rental etiquette.',
    bowColor: '#EA829B',
    items: [
      { num: '01', title: 'Booking Confirmation', desc: 'Your booking is confirmed once all required information has been submitted and the reservation fee has been received.' },
      { num: '02', title: 'Verification', desc: 'One valid government-issued ID and a selfie holding your ID are required for verification before your booking can be confirmed.' },
      { num: '03', title: 'Reservation Fee', desc: 'A reservation fee is required to secure your chosen dress. This fee is non-refundable and non-transferable once your booking is confirmed.' },
      { num: '04', title: 'Rental Period', desc: 'Please return the dress on the agreed return date and time to ensure availability for our next client.' },
      { num: '05', title: 'Late Returns', desc: "Late returns may be subject to additional charges. If you're running late, kindly let us know as soon as possible." },
      { num: '06', title: 'Handle with Care', desc: 'Please take extra care of the dress throughout your rental. Avoid stains, tears, burns, broken zippers, missing accessories, or any damage.' },
      { num: '07', title: 'No Alterations', desc: 'Do not cut, sew, pin, dye, iron, wash, or make any permanent alterations to the dress.' },
      { num: '08', title: 'Damage & Loss', desc: 'Clients are responsible for any permanent stains, excessive damage, missing accessories, or loss of the rented dress. Corresponding charges may apply.' },
      { num: '09', title: 'Cancellations & Changes', desc: 'Reservation fees are non-refundable. Any changes to your booking are subject to dress availability.' },
      { num: '10', title: 'A Friendly Reminder', desc: 'We kindly ask that you return the dress clean, complete, and in the same condition you received it.' },
    ]
  },
  reminder: {
    type: 'prose',
    title: 'Friendly Reminder',
    subtitle: 'To Our Valued Client',
    bowColor: '#EA829B',
    intro: "Thank you for choosing Gigi's Rentals. We truly appreciate your trust in us and hope you enjoy wearing one of our dresses. To help us maintain the quality and beauty of every rental, we kindly ask that you handle your dress with care throughout the rental period.",
    items: [
      'Keep the dress in a clean, dry, and secure place when not in use.',
      'Please avoid contact with food, drinks, makeup, ink, perfumes, and other substances that may cause stains or damage.',
      'Handle all accessories with care and return them together with the dress.',
      'Any permanent stains, tears, missing accessories, or other damages may be subject to corresponding charges.',
      'Please return the dress on or before the agreed return date to avoid late fees.',
    ],
    outro: "Thank you for treating our dresses with love and care. We hope you feel beautiful and confident in your chosen silhouette. Until your next special occasion!",
    signOff: "With love, Gigi's Rentals"
  }
};