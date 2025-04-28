import { type Char as SourceCodeChar, SourceCode } from "./reader.ts";

export abstract class Automaton<State, Token, Char = string> {
  state: State | null;
  tokens: Token[];
  charQueue: Char[];
  paths: { char: Char; prev: State | null; next: State | null }[];

  abstract resolveNextState(
    prev: State | null,
    current: Char,
    chars: Char[],
  ): State | null;
  abstract resolveToken(state: State, chars: Char[]): Token;

  constructor() {
    this.state = null;
    this.charQueue = [];
    this.tokens = [];
    this.paths = [];
  }

  flowToNextState(state: State | null, char: Char): this {
    this.state = state;
    this.charQueue.push(char);
    return this;
  }

  produceToken(): this {
    if (this.state !== null && this.charQueue.length) {
      const token = this.resolveToken(this.state, this.charQueue);
      this.tokens.push(token);
      this.charQueue = [];
    }
    this.state = null;
    return this;
  }

  static run<State, Token>(dfa: Automaton<State, Token>, src: SourceCode) {
    type Flag = "none" | "matched" | "end";

    let char: SourceCodeChar;
    let cur = 0;
    do {
      char = src.getChar(cur);

      let flag: Flag = "none";
      let prev = dfa.state;
      let next = dfa.resolveNextState(prev, char.value, dfa.charQueue);

      if (next !== null) flag = "matched";
      if (cur === src.length - 1) flag = "end";

      dfa.paths.push({ char: char.value, prev, next, flag } as any);
      if (["matched", "end"].includes(flag)) {
        cur++;
        dfa.flowToNextState(next, char.value);
      }

      if (["none", "end"].includes(flag)) {
        dfa.produceToken();
      }
    } while (cur < src.length);
  }
}
