import type { Config, Context as IContext, Fragment, Token } from "./types.ts";
import type { Nodes, Root } from "mdast";
import type { Point } from "unist";

class Context implements IContext {
  stack: (Fragment | Nodes)[];
  tokenStack: [Token, void][] = [];

  constructor(root: Root) {
    this.stack = [root];
  }

  enter(openToken: Token, node: Nodes) {
    const parent = this.stack[this.stack.length - 1];
    const validParent = parent && "children" in parent;
    if (!validParent) throw new Error("Unexpected parent");
    const siblings = parent.children as Nodes[];
    siblings.push(node);
    this.stack.push(node);
    this.tokenStack.push([openToken, void 0]);
    node.position = {
      start: point(openToken.start),
      end: void 0 as any,
    };
  }

  exit(closeToken: Token) {
    const node = this.stack.pop();
    if (!node) throw new Error("node not found");

    const open = this.tokenStack.pop();
    if (!open) throw new Error("failed to close token - open token not found");

    const [openToken] = open;
    if (openToken.type !== closeToken.type)
      throw new Error("failed to close token - invalid token type");

    if (node.type === "fragment") throw new Error("Unexpected node type");

    if (!("position" in node)) throw new Error("node position not found");
    node.position!.end = point(closeToken.end);
  }
}

function point(d: Point): Point {
  return { line: d.line, column: d.column, offset: d.offset };
}

function compile(config: Config) {
  let idx: number;
  const events: { type: "enter" | "exit"; token: Token }[] = [];

  let tree: Root = { type: "root", children: [] };
  const ctx: IContext = new Context(tree);

  // todo list
  // idx = -1;
  // const listStack: number[] = [];
  // while (++idx < tokens.length) {
  //   // ...
  // }

  idx = -1;
  while (++idx < events.length) {
    const { type, token } = events[idx];
    const handlers = config[type];
    const handler = handlers[token.type];
    if (!handler) continue;
    handler(ctx, token);
  }

  if (ctx.tokenStack.length) {
    throw new Error(`failed to compile - unexpected tokenStack length`);
  }

  // todo assign root position

  // transforms
  idx = -1;
  while (++idx < config.transforms.length) {
    tree = config.transforms[idx](tree) ?? tree;
  }

  return tree;
}
