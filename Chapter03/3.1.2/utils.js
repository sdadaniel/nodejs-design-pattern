import { readFile, readFileSync } from "fs";

const cache = new Map();
function inconsitentRead(filename, cb) {
  console.log("inconsitentRead");
  if (cache.has(filename)) {
    console.log("캐시");
    cb(cache.get(filename));
  } else {
    console.log("노캐시");
    readFile(filename, "utf8", (err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }

  // if (cache.has(filename)) {
  //   return cache.get(filename);
  // } else {
  //   return readFileSync(filename, "utf8");
  // }
}

function createFileReader(filename) {
  console.log("createFR");
  const listeners = [];

  inconsitentRead(filename, (value) => {
    console.log("inconsitentRead");
    listeners.forEach((action) => {
      action(value);
    });
  });

  return {
    // onDataReady: (action) => listeners.push(action),
    onDataReady: (action) => {
      console.log("onDataReady");
      listeners.push(action);
    },
  };
}

export { createFileReader };
