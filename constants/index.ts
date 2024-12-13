export const GenderOptions = ["Male", "Female"];

export const Manicurists = [
  {
    image: "/assets/images/Katerina.png",
    name: "Katerina",
  },
  {
    image: "/assets/images/Lidia.png",
    name: "Lidia",
  },
  {
    image: "/assets/images/Svetlana.png",
    name: "Svetlana",
  },
];

export const ClientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  primaryManicurist: "",
  comment: "",
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};