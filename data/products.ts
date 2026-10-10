export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  slug: string;
  name: string;
  shortTitle: string;
  description: string;
  affiliateUrl: string;
  heroImage: ProductImage;
  gallery: ProductImage[];
  features: { title: string; description: string; icon: string }[];
  specifications: { label: string; value: string }[];
  pros: string[];
  cons: string[];
  faq: { question: string; answer: string }[];
};

const image = (src: string, alt: string, width = 1254, height = 1254): ProductImage => ({
  src: `/ai_mages/${src}`,
  alt,
  width,
  height,
});

export const products: Product[] = [
  {
    slug: "smart-bird-feeder-with-camera",
    name: "HEAPETS Smart Bird Feeder with Camera",
    shortTitle: "Smart Bird Feeder with Camera",
    description:
      "A solar-assisted bird feeder camera with 2K video, app alerts, AI-assisted species identification, and an outdoor-ready design.",
    affiliateUrl: "https://link.amazon/B016RelPr",
    heroImage: image(
      "Smart Bird Feeder in a Sunny Garden.png",
      "Smart bird feeder with camera in a sunny garden",
      1327,
      1185,
    ),
    gallery: [
      image("2K HD Bird Feeder Camera Ad.png", "2K HD smart bird feeder camera"),
      image("Powered by the Sun Bird Feeder.png", "Solar powered smart bird feeder with camera"),
      image(
        "Instant Bird Alerts AI Identification..png",
        "Smart bird feeder AI bird identification and arrival alerts",
      ),
      image("All-Weather Bird Feeder Camera.png", "Weather resistant smart bird feeder camera"),
      image("All-Weather Tough Bird Feeder.png", "Durable outdoor bird feeder construction"),
      image("Easy Bird Feeder Assembly Guide.png", "Smart bird feeder assembly steps"),
      image("Tap to Scare Squirrels Away.png", "App-based smart bird feeder squirrel deterrent"),
      image("a-brighter-backyard-together.png", "Family enjoying backyard bird watching"),
    ],
    features: [
      {
        title: "2K HD camera",
        description: "View visiting birds in higher-resolution video through the companion app.",
        icon: "camera",
      },
      {
        title: "Solar assisted",
        description: "The integrated solar panel supports the rechargeable battery; USB-C power is also listed.",
        icon: "sun",
      },
      {
        title: "AI identification",
        description: "The listing describes AI-assisted recognition for more than 10,000 bird species.",
        icon: "spark",
      },
      {
        title: "Arrival alerts",
        description: "Motion detection is designed to notify your phone when activity is detected.",
        icon: "bell",
      },
      {
        title: "Outdoor design",
        description: "The manufacturer describes the enclosure as weather-resistant for outdoor use.",
        icon: "shield",
      },
      {
        title: "Flexible mounting",
        description: "The supplied product information lists tree, pole, and wall mounting options.",
        icon: "mount",
      },
    ],
    specifications: [
      { label: "Brand", value: "HEAPETS" },
      { label: "Product type", value: "Smart bird feeder with camera" },
      { label: "Video", value: "2K HD (manufacturer-stated)" },
      { label: "Power", value: "Solar-assisted rechargeable battery / USB Type-C" },
      { label: "Bird identification", value: "AI-assisted through companion service" },
      { label: "Notifications", value: "Motion and activity alerts" },
      { label: "Seed capacity", value: "Approximately 1.25 liters" },
      { label: "Mounting", value: "Tree, pole, or wall" },
      { label: "Featured color", value: "Red" },
    ],
    pros: [
      "2K video for a clearer view of visiting birds",
      "Solar charging can reduce manual charging frequency",
      "Motion alerts help you catch visits as they happen",
      "Multiple mounting options for different yards",
      "Shareable clips and two-user live viewing are listed",
    ],
    cons: [
      "AI identification may require a subscription after the trial",
      "Battery performance depends on sunlight and camera activity",
      "The available information does not specify the power cable length",
      "App-based features require power and a compatible connection",
    ],
    faq: [
      {
        question: "Does the solar panel work on cloudy days?",
        answer:
          "The feeder is designed to continue solar charging in lower light, but performance depends on available sunlight. Position the panel for good daylight access; USB-C power is listed as a backup option.",
      },
      {
        question: "How long does the battery last?",
        answer:
          "There is no responsible single estimate. Battery life varies with sunlight, motion events, live viewing, recording, and other usage, so buyers should not rely on a fixed number of days.",
      },
      {
        question: "Can I use wired power instead of solar power?",
        answer:
          "Yes. According to the supplied product information, the feeder supports a USB Type-C wired connection. Outdoor connections should be suitable for exterior use and protected from moisture.",
      },
      {
        question: "How long is the power cable?",
        answer:
          "The available product information does not specify an exact cable length. Check the current listing and package details before purchasing if wired placement is important.",
      },
      {
        question: "Can the bird feeder work without power?",
        answer:
          "It can still hold seed, but the camera, live view, alerts, and AI-assisted identification require sufficient battery or wired power.",
      },
      {
        question: "Is it suitable for outdoor use?",
        answer:
          "The manufacturer describes the feeder as weather-resistant and intended for outdoor conditions. Electrical connections should still be kept appropriately protected from water.",
      },
      {
        question: "How often will I need to refill the seed?",
        answer:
          "Refill frequency depends on bird traffic, season, seed choice, and other wildlife. The supplied information states an approximate capacity of 1.25 liters, so check the level regularly.",
      },
      {
        question: "Does it identify bird species automatically?",
        answer:
          "The listing describes recognition for more than 10,000 species. It also states that the service includes a one-month free trial, after which a paid plan may be needed.",
      },
      {
        question: "Can I receive an alert when a bird arrives?",
        answer:
          "Yes. Motion detection and app notifications are designed to alert you when activity is detected so you can open the live view or review footage.",
      },
    ],
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
