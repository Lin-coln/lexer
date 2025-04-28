export enum Constant {
  Whitespace = " ",
  LineFeed = "\n",

  // symbol - bracket
  LeftBracket = "(",
  RightBracket = ")",
  LeftBrace = "{",
  RightBrace = "}",
  LeftSquareBracket = "[",
  RightSquareBracket = "]",

  // symbol - others
  Dot = ".",
  Comma = ",",
  Semicolon = ";",
  Quotation = "'",
  DoubleQuotation = '"',
  Sharp = "#",
  Question = "?",
  Colon = ":",
  Escape = "\\",

  // char operators
  Plus = "+",
  Subtract = "-",
  Times = "*",
  Divide = "/",
  Mode = "%",
  Not = "!",
  Great = ">",
  Less = "<",
  Assign = "=",
  BitAnd = "&",
  BitOr = "|",
  BitNot = "~",
  BitXOR = "^",

  // double char operators
  GreatEqual = ">=",
  LessEqual = "<=",
  Equal = "==",
  NotEqual = "!=",
  ConditionAnd = "&&",
  ConditionOr = "||",
  BitLeftShift = "<<",
  BitRightShift = ">>",
}

export const CharsetCharOperators: string[] = [
  Constant.Plus,
  Constant.Subtract,
  Constant.Times,
  Constant.Divide,
  Constant.Mode,
  Constant.Not,
  Constant.Great,
  Constant.Less,
  Constant.Assign,
  Constant.BitAnd,
  Constant.BitOr,
  Constant.BitNot,
  Constant.BitXOR,
];

export const CharsetDoubleCharOperators: string[] = [
  Constant.GreatEqual,
  Constant.LessEqual,
  Constant.Equal,
  Constant.NotEqual,
  Constant.ConditionAnd,
  Constant.ConditionOr,
  Constant.BitLeftShift,
  Constant.BitRightShift,
];

export const CharsetSymbols: string[] = [
  Constant.LeftBracket,
  Constant.RightBracket,
  Constant.LeftBrace,
  Constant.RightBrace,
  Constant.LeftSquareBracket,
  Constant.RightSquareBracket,
  Constant.Dot,
  Constant.Comma,
  Constant.Semicolon,
  Constant.Quotation,
  Constant.DoubleQuotation,
  Constant.Sharp,
  Constant.Question,
  Constant.Colon,
];

export const Keywords: string[] = [
  "char",
  "int",
  "short",
  "long",
  "float",
  "double",
  "sizeof",
  "signed",
  "unsigned",
  "if",
  "else",
  "while",
  "for",
  "do",
  "break",
  "continue",
  "goto",
  "main",
  "void",
  "return",
  "switch",
  "case",
  "default",
  "const",
  "static",
  "auto",
  "extern",
  "register",
  "struct",
  "union",
  "enum",
  "typedef",
  "include",
];

export enum DfaState {
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
