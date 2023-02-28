export const Endpoints = {
  CLASS: import.meta.env.VITE_CLASS_ENDPOINT,
  INDIVIDUAL_DONOR: import.meta.env.VITE_INDIVIDUAL_DONOR_ENDPOINT,
  body_location_opener: import.meta.env.VITE_BODY_LOCATION_OPENER,
  subject_last_purchase: import.meta.env.SUBJECT_LINE_LAST_PURCHASE,
};

// TODO: Build a database of merge tags instead of hardcoding them like this
export const AllTagReferences = {
  body_location_opener: {
    name: "BODY_LOCATION_OPENER",
    column_headers: { locations: [] },
  },
  subject_last_purchase: {
    name: "SUBJECT_LINE_LAST_PURCHASE",
    column_headers: {
      purchase_names: null,
      date: null,
      purchase_purpose: null,
    },
  },
};

export const CreativityLevels = [
  { label: "More Direct", id: 1, value: 0.5 },
  { label: "Normal", id: 2, value: 1 },
  { label: "More Creative", id: 3, value: 1.2 },
];

export const MessageLengths = [
  { label: "Shorter", id: 1, value: "less than 100 words" },
  { label: "Medium", id: 2, value: "from 150 to 300 words" },
  { label: "Longer", id: 3, value: "400 to 600 words" },
];

export const TestDonorList = [
  {
    name: "John Doe",
    major: "Economics",
    city: "New York",
    donation: "100",
    extracurriculars: "Debate Club, Model UN",
    international: "No",
    internships: "Goldman Sachs, JPMorgan",
    job: "Manager at JPMorgan",

    year: 1994,
  },
  {
    name: "Jane Smith",
    major: "Computer Science",
    city: "San Francisco",
    donation: "200",
    extracurriculars: "Robotics Club, Hacking Society",
    international: "No",
    internships: "Google, Apple",
    job: "Software Engineer at Google",

    year: 2005,
  },
  {
    name: "Ahmed Ali",
    major: "Political Science",
    city: "Cairo",
    donation: "50",
    extracurriculars: "International Relations Society",
    international: "Yes",
    internships: "United Nations, Embassy of Egypt",
    job: "Diplomat at Embassy of Egypt",

    year: 2023,
  },
  {
    name: "Maria Rodriguez",
    major: "Biology",
    city: "Mexico City",
    donation: "75",
    extracurriculars: "Biology Club, Environmental Action Group",
    international: "Yes",
    internships: "Biotech Company, Conservation NGO",
    job: "Research Scientist at Biotech Company",

    year: 2019,
  },
  {
    name: "Robert Johnson",
    major: "English",
    city: "London",
    donation: "125",
    extracurriculars: "Creative Writing Club, Book Club",
    international: "No",
    internships: "Publishing House, Literary Agency",
    job: "Editor at Publishing House",

    year: 1997,
  },
  {
    name: "Sarah Lee",
    major: "Mathematics",
    city: "Seoul",
    donation: "150",
    extracurriculars: "Math Club, Science Olympiad",
    international: "Yes",
    internships: "Tech Company, Research Institute",
    job: "Data Analyst at Tech Company",

    year: 2008,
  },
  {
    name: "David Brown",
    major: "History",
    city: "Paris",
    donation: "175",
    extracurriculars: "History Club, Political Science Society",
    international: "No",
    internships: "Museum, Archive",
    job: "Curator at Museum",

    year: 2014,
  },
  {
    name: "Emily Davis",
    major: "Psychology",
    city: "Sydney",
    donation: "200",
    extracurriculars: "Psychology Club, Volunteer Group",
    international: "No",
    internships: "Mental Health Clinic, Research Center",
    job: "Clinical Psychologist at Mental Health Clinic",

    year: 2010,
  },
  {
    name: "Ahmed Khan",
    major: "Business",
    city: "Dubai",
    donation: "100",
    extracurriculars: "Entrepreneurship Club, Investment Society",
    international: "Yes",
    internships: "Investment Bank, Startup",
    job: "CEO of Startup",

    year: 2020,
  },
  {
    name: "Jennifer Nguyen",
    major: "Art",
    city: "Hanoi",
    donation: "50",
    extracurriculars: "Art Club, Photography Society",
    international: "Yes",
    internships: "Gallery, Museum",
    job: "Curator at Gallery",

    year: 2019,
  },
];

export const SampleCustomerContacts = [
  {
    name: "Emily Davis",
    city: "Philadelphia, PA",
    last_purchase: "Gold Skinny Minimalist Ring",
    total_spent: 3000.0,
  },
  // {
  //   name: "David Garcia",
  //   city: "San Antonio, TX",
  //   last_purchase: "Peru Wood Bracelet",
  //   total_spent: 3500.0,
  // },
  // {
  //   name: "Rachel Martinez",
  //   city: "San Diego, CA",
  //   last_purchase: "Pearl Ring Solid Silver",
  //   total_spent: 4000.0,
  // },
  // {
  //   name: "William Lee",
  //   city: "Seattle, WA",
  //   last_purchase: "Gold Skinny Minimalist Ring",
  //   total_spent: 4500.0,
  // },
  // {
  //   name: "Karen Kim",
  //   city: "Miami, FL",
  //   last_purchase: "Peru Wood Bracelet",
  //   total_spent: 5000.0,
  // },
];

export const SampleBaseLetter = `Subject: Exclusive Offer for Our Valued Customers!

Dear *|NAME|*,

We hope this email finds you well.

Priced at just $49.99, elevate your style with the affordable "Harmony" necklace, a perfect addition to any outfit.

Thank you for choosing Whimsy Wears as your go-to destination for all things jewelry.

Whimsy Wears`;

export const SampleBaseLetterSmartOpener = `Subject: Exclusive Offer for Our Valued Customers!

Dear *|NAME|*,

*|${AllTagReferences.body_location_opener.name}|*

Priced at just $49.99, elevate your style with the affordable "Harmony" necklace, a perfect addition to any outfit.

Thank you for choosing Whimsy Wears as your go-to destination for all things jewelry.

Whimsy Wears`;

export const SampleBaseLetterSmartSubjectLine = `Subject: *|${AllTagReferences.subject_last_purchase.name}|*

Dear *|NAME|*,

Priced at just $49.99, elevate your style with the affordable "Harmony" necklace, a perfect addition to any outfit.

Thank you for choosing Whimsy Wears as your go-to destination for all things jewelry.

Whimsy Wears`;

export const sampleDataChosenColumnHeaders = [
  {
    name: AllTagReferences.body_location_opener.name,
    column_headers: { locations: ["street", "city"] },
  },
  {
    name: AllTagReferences.subject_last_purchase.name,
    column_headers: {
      purchase_names: ["last_purchase"],
      date: null,
      purchase_purpose: null,
    },
  },
];
