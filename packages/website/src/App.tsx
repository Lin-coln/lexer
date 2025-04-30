import { Textarea } from "@src/components/Textarea.tsx";
import { Fragment, useEffect, useState } from "react";
import cx from "clsx";

const CODE = `int a = 10;
int b = 20;
int c = 20;

float f = 928.2332;
char b = 'b';
\t
if(a == b){
    printf("Hello, World! \\"");
}else if(b!=c){
    printf("Hello, World! \\n Hello, World!");
}else{
    printf("Hello\\n");
}
`;

export default function App() {
  const [code, setCode] = useState(CODE);

  const [tokens, setTokens] = useState<{ type: string; value: string }[]>([]);

  useEffect(() => {
    if (!code) {
      setTokens([]);
      return;
    }
    setTokens(tokenize(code));
  }, [code]);

  return (
    <div className={cx("flex flex-col gap-4 p-4")}>
      <Textarea
        className={cx("mx-auto")}
        value={code}
        onValueChange={setCode}
      />

      <div className={cx("mx-auto mt-4 w-[1080px]")}>
        <div className={cx("mb-4 text-2xl")}>Tokens</div>

        <div className={cx("block", "select-none")}>
          {tokens.map((token, idx) => {
            const chip = (
              <TokenChip
                key={idx}
                type={token.type}
                value={token.value}
                onClick={() => {
                  console.log(token);
                }}
              />
            );
            if (token.type === "LineFeed") {
              return (
                <Fragment key={idx}>
                  {chip}
                  <br />
                </Fragment>
              );
            }
            return chip;
          })}
        </div>
      </div>
    </div>
  );
}

import { SourceCode, CTokenizer } from "@lexer/core";
import { TokenChip } from "@src/components/TokenChip.tsx";

function tokenize(code: string) {
  const src = new SourceCode(new TextEncoder().encode(code));
  const tokenizer = new CTokenizer();
  CTokenizer.run(tokenizer, src);
  return tokenizer.tokens;
}
