import { Textarea } from "@src/components/Textarea.tsx";
import { useState } from "react";
import cx from "clsx";

const CODE = `int a = 10;
int b = 20;
int c = 20;

float f = 928.2332;
char b = 'b';

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
  return (
    <div className={cx("flex flex-col gap-4 p-4")}>
      <Textarea
        className={cx("mx-auto")}
        value={code}
        onValueChange={setCode}
      />

      <div className={cx("mx-auto")}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        alias aliquid autem dignissimos ex hic id incidunt inventore iusto
        minima nam nemo, odio quis reiciendis sit tempore totam ut vitae?
      </div>
    </div>
  );
}
