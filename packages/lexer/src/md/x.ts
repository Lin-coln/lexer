import type { Config, Handler, Token } from "./types.ts";
import type { Nodes } from "mdast";

void main();
function main() {
  const config: Config = {
    transforms: [],
    enter: {
      atxHeading: Heading.opener,
    },
    exit: {
      atxHeading: Heading.closer,
      // atxHeadingSequence: onexitatxheadingsequence,
    },
  };
}

const Heading: {
  opener: Handler;
  closer: Handler;
} = {
  opener: (ctx, token) =>
    ctx.enter(token, { type: "heading", depth: 0 as any, children: [] }),
  closer: (ctx, token) => ctx.exit(token),
};
