import { promises } from "fs";
import fetch from "node-fetch";

export type FileInput = {
  __typeName: "FileInput";
  location: string;
};

export type FileOutput = {
  __typeName: "FileOutput";
  location: string;
};

export type ConsoleOutput = {
  __typeName: "ConsoleOutput";
};

export type URLInput = {
  __typeName: "URLInput";
  url: string;
};

type InputPath = FileInput | URLInput;
type OutputPath = FileOutput | ConsoleOutput;

export class Input {
  private inputContent: string;

  constructor(private path: InputPath) {
    this.inputContent = "";
  }

  private isUrlInput(path: InputPath): path is URLInput {
    return path.__typeName === "URLInput";
  }

  private isFileInput(path: InputPath): path is FileInput {
    return path.__typeName === "FileInput";
  }

  private isFileOutput(path: OutputPath): path is FileOutput {
    return path.__typeName === "FileOutput";
  }

  private isConsoleOutput(path: OutputPath): path is ConsoleOutput {
    return path.__typeName === "ConsoleOutput";
  }

  async read() {
    if (this.isFileInput(this.path)) {
      this.inputContent = await promises.readFile(this.path.location, {
        encoding: "utf8",
      });
    } else if (this.isUrlInput(this.path)) {
      const response = await fetch(this.path.url);
      const json = await response.json();
      const raw = JSON.stringify(json);
      this.inputContent = raw;
    }

    return this;
  }

  trim() {
    this.inputContent = this.inputContent.replace(/\s+/g, " ");
    return this;
  }

  replace(wordsToBeReplaced: string[], newWord: string) {
    this.inputContent = this.inputContent.replace(
      new RegExp(wordsToBeReplaced.join("|"), "ig"),
      newWord
    );
    return this;
  }

  cut(toIndex: number) {
    this.inputContent = this.inputContent.slice(0, toIndex);
    return this;
  }

  async save(path: OutputPath) {
    try {
      if (this.isFileOutput(path)) {
        await promises.writeFile(path.location, this.inputContent);
      } else if (this.isConsoleOutput(path)) {
        console.log(this.inputContent);
      } else {
        console.log(this.inputContent);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
