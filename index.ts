import { ConsoleOutput, FileInput, FileOutput, Input, URLInput } from "./Input";

const fileInput: FileInput = {
  __typeName: "FileInput",
  location: "input.txt",
};

const fileOutput: FileOutput = {
  __typeName: "FileOutput",
  location: "output.txt",
};

const urlInput: URLInput = {
  __typeName: "URLInput",
  url: "https://jsonplaceholder.typicode.com/posts/1",
};

const consoleOutPut: ConsoleOutput = {
  __typeName: "ConsoleOutput",
};

// File read
async function readFile() {
  const input = new Input(fileInput)
    .read()
    .then((input) => {
      input.trim().replace(["god"], "***").cut(100).save(fileOutput);
    })
    .catch((error) => {
      throw new Error(error.message);
    })
    .finally(() => {});
}

// URL read
async function readUrl() {
  const input = new Input(urlInput)
    .read()
    .then((input) => {
      input.trim().replace(["aut"], "***").cut(75).save(consoleOutPut);
    })
    .catch((error) => {
      throw new Error(error.message);
    })
    .finally(() => {});
}

// readFile();
// readUrl();
