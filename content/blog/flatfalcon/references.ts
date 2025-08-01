import { BookCitation, WebCitation } from "@/app/components/Citation";

export const Allen2018: BookCitation = {
  type: "book",
  id: "Allen2018",
  author: "Allen, Jeff",
  title: "Using Network Segments in the Visualization of Urban Isochrones",
  journal: "Cartographica",
  volume: "53",
  number: "4",
  year: 2018,
  doi: "10.3138/cart.53.4.2018-0013",
  url: "https://doi.org/10.3138/cart.53.4.2018-0013",
};

export const Smith2020: WebCitation = {
  type: "web",
  id: "smith2020",
  url: "https://example.com",
  lastAccessed: new Date("2025-08-01"),
};

export const Mk2021: WebCitation = {
  type: "web",
  id: "mk2021",
  url: "https://example.com",
  lastAccessed: new Date("2025-08-01"),
};
