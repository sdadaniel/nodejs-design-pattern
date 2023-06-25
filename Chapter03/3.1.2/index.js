import { createFileReader } from "./utils.js";
import path from "path";
import { fileURLToPath } from "url";
import { readFile, readFileSync } from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reader1 = createFileReader(path.resolve(__dirname, "data.txt"));

reader1.onDataReady((data) => {
  console.log("First Call Data:" + data);

  const reader2 = createFileReader(path.resolve(__dirname, "data.txt"));
  reader2.onDataReady((data) => {
    console.log("Second Call Data:" + data);
  });
});
