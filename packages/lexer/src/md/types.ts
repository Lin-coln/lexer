import type { Root, Parent, PhrasingContent, Nodes } from "mdast";
import type { Point } from "unist";

export type Transform = (tree: Root) => Root | void;
export type Handlers = Record<string, Handler>;
export type Handler = (ctx: Context, token: Token) => void;

export interface Config {
  enter: Handlers;
  exit: Handlers;
  transforms: Transform[];
}

export interface Token {
  type: string;
  start: Point;
  end: Point;
}

export type Fragment = Parent & {
  type: "fragment";
  children: PhrasingContent[];
};
export interface Context {
  stack: (Fragment | Nodes)[];
  tokenStack: [Token, void][];

  enter(token: Token, node: Nodes): void;
  exit(token: Token): void;
}
