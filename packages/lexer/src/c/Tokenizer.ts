import { Automaton } from "../core/automaton.ts";
import {
  CharsetCharOperators,
  CharsetDoubleCharOperators,
  CharsetSymbols,
  Constant,
  Keywords,
} from "./constants.ts";

enum State {
  // operator & symbol
  Operator,
  Symbol,

  // &&
  DoubleChar_And_1,
  DoubleChar_And_2,
  // ||
  DoubleChar_Or_1,
  DoubleChar_Or_2,
  // <<
  DoubleChar_Less_1,
  DoubleChar_Less_2,
  // >>
  DoubleChar_Great_1,
  DoubleChar_Great_2,
  // !=, ==, >=, <=
  DoubleChar_Not_1,
  DoubleChar_Equal_1,
  DoubleChar_Equal_2,

  // general
  Whitespace,
  LineFeed,
  Identifier,
  Number,
  Float,

  // string, char
  String,
  StringEscape,
  StringEnd,
  Char,
  CharEnd,

  End,
}

export class Tokenizer extends Automaton<
  State,
  { type: string; value: string }
> {
  resolveToken(state: State, chars: string[]): { type: string; value: string } {
    const value = chars.join("");
    return { type: this.resolveTokenType(state, value), value };
  }

  private resolveTokenType(state: State, value: string): string {
    // from value
    const isExists = (value: string, charset: string[]) =>
      charset.includes(value);
    if (isExists(value, CharsetCharOperators)) return "Operator";
    if (isExists(value, CharsetDoubleCharOperators)) return "DoubleOperator";
    if (isExists(value, CharsetSymbols)) return "Symbol";
    if (isExists(value, Keywords)) return "Keyword";

    // from state
    if (state === State.Whitespace) return "Whitespace";
    if (state === State.LineFeed) return "LineFeed";
    if (state === State.Identifier) return "Identifier";
    if (state === State.Number) return "Number";
    if (state === State.Float) return "Float";
    if (state === State.StringEnd) return "String";
    if (state === State.CharEnd) return "Char";

    return "Unknown";
  }

  resolveNextState(
    state: State | null,
    char: string,
    queue: string[],
  ): State | null {
    // string
    if ([State.String, State.StringEscape].includes(state!)) {
      // "\"
      if (state === State.String && char === Constant.Escape)
        return State.StringEscape;
      // "\\"
      if (state === State.StringEscape) return State.String;
      return char === Constant.DoubleQuotation ? State.StringEnd : State.String;
    }

    // char
    if ([State.Char].includes(state!)) {
      if (queue.length === 1) return State.Char;
      if (queue.length === 2 && char === Constant.Quotation)
        return State.CharEnd;
      return null;
    }

    const isAlphabetChar = (char: string) => /^[a-zA-Z]$/.test(char);
    const isNumberChar = (char: string) => /^[0-9]$/.test(char);
    // alpha
    if (isAlphabetChar(char)) {
      if ([null, State.Identifier].includes(state)) return State.Identifier;
    }
    // number
    else if (isNumberChar(char)) {
      if ([null, State.Number].includes(state)) return State.Number;
      if ([State.Float].includes(state!)) return State.Float;
      if ([State.Identifier].includes(state!)) return State.Identifier;
    }
    // operator
    else if (CharsetCharOperators.includes(char)) {
      const firstCharDict = {
        [Constant.BitAnd]: State.DoubleChar_And_1,
        [Constant.BitOr]: State.DoubleChar_Or_1,
        [Constant.Less]: State.DoubleChar_Less_1,
        [Constant.Great]: State.DoubleChar_Great_1,
        [Constant.Not]: State.DoubleChar_Not_1,
        [Constant.Assign]: State.DoubleChar_Equal_1,
      };
      const secondCharDict = {
        [Constant.BitAnd]: State.DoubleChar_And_2,
        [Constant.BitOr]: State.DoubleChar_Or_2,
        [Constant.Less]: State.DoubleChar_Less_2,
        [Constant.Great]: State.DoubleChar_Great_2,
        [Constant.Assign]: State.DoubleChar_Equal_2,
      };
      // is double char 1
      if (!!firstCharDict[char] && state === null) return firstCharDict[char];
      // is double char 2
      if (
        !!secondCharDict[char] &&
        Object.values(firstCharDict).includes(state!)
      )
        return secondCharDict[char];

      if (state === null) return State.Operator;
    }
    // symbol
    else if (CharsetSymbols.includes(char)) {
      if (state === null) {
        if (char === Constant.Quotation) {
          return State.Char;
        } else if (char === Constant.DoubleQuotation) {
          return State.String;
        }
        return State.Symbol;
      }
      if ([State.Number].includes(state) && char === Constant.Dot)
        return State.Float;
    }
    // white space & line feed & others
    else if (char === Constant.Whitespace) {
      if (state === null) return State.Whitespace;
    } else if (char === Constant.LineFeed) {
      if (state === null) return State.LineFeed;
    } else {
      if ([null, State.Identifier].includes(state)) return State.Identifier;
    }

    return null;
  }
}
