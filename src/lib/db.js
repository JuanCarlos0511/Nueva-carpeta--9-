import fs from "node:fs";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "data", "books.json");

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, "[]");
}

export function getBooks() {
  ensureDb();
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

export function addBook(title, author) {
  const books = getBooks();
  const book = { id: Date.now(), title, author };
  books.push(book);
  fs.writeFileSync(DB_PATH, JSON.stringify(books, null, 2));
  return book;
}

export function deleteBook(id) {
  let books = getBooks();
  books = books.filter((b) => b.id !== id);
  fs.writeFileSync(DB_PATH, JSON.stringify(books, null, 2));
}
