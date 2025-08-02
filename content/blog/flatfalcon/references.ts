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

export const Dial1969: JournalCitation = {
  type: "journal",
  id: "Dial1969",
  author: "Dial, Robert B.",
  title: "Algorithm 360: shortest-path forest with topological ordering [H]",
  journal: "Communications of the ACM",
  volume: "12",
  number: "11",
  year: 1969,
  doi: "10.1145/363269.363610",
  url: "https://doi.org/10.1145/363269.363610",
};

export const Dimacs9thChallenge: WebCitation = {
  type: "web",
  id: "Dimacs9thChallenge",
  url: "http://www.diag.uniroma1.it/challenge9/",
  lastAccessed: new Date("2025-08-02"),
};

export const Criterion: WebCitation = {
  type: "web",
  id: "Criterion",
  url: "https://docs.rs/criterion/latest/criterion/",
  lastAccessed: new Date("2025-08-02"),
};

export const Keller2025: WebCitation = {
  type: "web",
  id: "Keller2025",
  url: "https://github.com/kelmich/practical_work",
  lastAccessed: new Date("2025-08-02"),
};
