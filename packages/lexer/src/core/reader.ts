export type Char = { index: number; start: number; end: number; value: string };

export class SourceCode {
  bytes: Uint8Array;
  chars: Char[];
  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.chars = resolveChars(bytes);
  }

  get length() {
    return this.chars.length;
  }

  getChar(index: number) {
    return this.chars[index];
  }
}

function resolveChars(bytes: Uint8Array): Char[] {
  const chars: Char[] = [];
  const decoder = new TextDecoder("utf-8");
  let cur = 0;
  while (cur < bytes.length) {
    const len = resolveCharLen(bytes[cur]);
    const value = decoder.decode(bytes.subarray(cur, cur + len));
    chars.push({
      index: chars.length,
      start: cur,
      end: cur + len,
      value: value,
    });
    cur += len;
  }
  return chars;
}

function resolveCharLen(byte: number): number {
  if ((byte & 0b10000000) === 0) return 1;
  if ((byte & 0b11100000) === 0b11000000) return 2;
  if ((byte & 0b11110000) === 0b11100000) return 3;
  if ((byte & 0b11111000) === 0b11110000) return 4;
  throw new Error(`Invalid UTF-8 start byte: 0x${byte.toString(16)}`);
}
