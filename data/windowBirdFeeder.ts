import type { ProductImage } from "@/data/products";

const image = (src: string, alt: string, width: number, height: number): ProductImage => ({
  src: `/products-ai/${src}`,
  alt,
  width,
  height,
});

export const windowBirdFeeder = {
  slug: "clear-window-bird-feeder",
  brand: "Nature Anywhere",
  name: "Nature Anywhere Clear Window Bird Feeder",
  shortTitle: "Clear Window Bird Feeder",
  description:
    "A crystal-clear window bird feeder with four EVERGRIP suction cups, an easy-clean sliding seed tray, and no-tool setup for close-up bird watching from home.",
  affiliateUrl: "https://link.amazon/B0avvqtmZ",
  price: "$29.99",
  images: {
    hero: image(
      "clear-window-bird-feeder-cardinals.png",
      "Nature Anywhere clear window bird feeder with two cardinals and a chickadee",
      1231,
      1277,
    ),
    suction: image(
      "evergrip-suction-cups-winter-window.png",
      "Window bird feeder held by EVERGRIP suction cups on a snowy window with a chickadee",
      1254,
      1254,
    ),
    setup: image(
      "no-tools-window-bird-feeder-setup.png",
      "Window bird feeder parts with sliding seed tray and suction cups, ready to attach without tools",
      1254,
      1254,
    ),
    pets: image(
      "window-bird-feeder-pets.png",
      "Dog watching two cardinals at a clear window bird feeder from inside the home",
      1254,
      1254,
    ),
    gift: image(
      "window-bird-feeder-holiday-gift.png",
      "Birds-I-View window bird feeder and gift box in a festive holiday setting",
      1145,
      1374,
    ),
  },
  highlights: ["No tools needed", "4 EVERGRIP suction cups", "Sliding seed tray"],
  features: [
    {
      title: "Crystal-Clear Bird Watching",
      description: "Enjoy incredible close-up views of your favorite birds without stepping outside.",
      icon: "eye",
    },
    {
      title: "4 Strong EVERGRIP Suction Cups",
      description: "Four heavy-duty suction cups help keep your feeder securely attached to clean glass.",
      icon: "grip",
    },
    {
      title: "Easy-Clean Sliding Seed Tray",
      description:
        "Refill your feeder in seconds. Simply slide out the tray, add fresh bird seed, and slide it back into place.",
      icon: "tray",
    },
    {
      title: "Weather-Resistant Construction",
      description: "Durable polycarbonate construction helps protect your feeder through changing outdoor conditions.",
      icon: "shield",
    },
    {
      title: "Built-In Drainage and Ventilation",
      description:
        "A thoughtfully designed feeding tray includes drainage and airflow features to help reduce trapped moisture.",
      icon: "drop",
    },
    {
      title: "No Tools. No Complicated Assembly.",
      description: "Attach the feeder to a clean glass window, fill it with bird seed, and start enjoying nature.",
      icon: "spark",
    },
  ],
  steps: [
    { title: "Clean Your Window", description: "Wipe the glass surface to prepare it for secure installation." },
    { title: "Attach the Feeder", description: "Firmly press the four suction cups against your window." },
    {
      title: "Fill and Enjoy",
      description: "Add your favorite bird seed and enjoy the beautiful visitors that discover your feeder.",
    },
  ],
  giftIdeas: [
    "Bird-watching enthusiasts",
    "Parents and grandparents",
    "Nature-loving families",
    "Apartment and balcony residents",
    "Cat owners",
    "Christmas and birthday gifts",
  ],
};
