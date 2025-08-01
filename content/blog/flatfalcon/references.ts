import {
  BookCitation,
  JournalCitation,
  WebCitation,
} from "@/app/components/Citation";

export const Allen2018: JournalCitation = {
  type: "journal",
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

export const Dijkstra1959: JournalCitation = {
  type: "journal",
  id: "Dijkstra1959",
  author: "Dijkstra, Edsger W.",
  title: "A Note on Two Problems in Connexion with Graphs",
  journal: "Numerische Mathematik",
  volume: "1",
  number: "1",
  year: 1959,
  doi: "10.1007/BF01386390",
  url: "https://doi.org/10.1007/BF01386390",
};

export const Cormen2009: BookCitation = {
  type: "book",
  id: "Cormen2009",
  author:
    "Cormen, Thomas H. and Leiserson, Charles E. and Rivest, Ronald L. and Stein, Clifford",
  title: "Introduction to Algorithms, Third Edition",
  year: 2009,
  url: "https://dl.acm.org/doi/book/10.5555/1614191",
  isbn: "0262033844",
  publisher: "The MIT Press",
  edition: "3rd",
};
