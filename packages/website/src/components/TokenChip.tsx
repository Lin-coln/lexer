import type { HTMLAttributes } from "react";
import cx from "clsx";

interface TokenChipProps extends HTMLAttributes<HTMLSpanElement> {
  type: string;
  value: string;
}

export function TokenChip(props: TokenChipProps) {
  const { type, value, className, children, ...rest } = props;
  return (
    <span
      {...rest}
      className={cx(
        className,
        [
          "rounded-xs mx-[1px] box-border h-4 px-1 py-1",
          "inline-flex w-fit items-center justify-center",
          "select-none whitespace-pre font-mono text-sm",
        ],
        {
          Operator: ["bg-neutral-50/20"],
          DoubleOperator: ["bg-neutral-50/20"],
          Symbol: ["bg-neutral-50/10", "px-0! w-4!"],
          Whitespace: ["bg-neutral-50/10", "px-0! w-2!"],
          Indent: ["bg-neutral-50/10", "px-0! w-6!"],
          LineFeed: ["bg-neutral-50/5 text-neutral-50/10", "px-1!"],
          Keyword: ["bg-orange-400/30"],
          Identifier: ["bg-blue-500/40"],
          Number: ["bg-sky-500/40"],
          Float: ["bg-sky-500/40"],
          String: ["bg-green-800/40"],
          Char: ["bg-cyan-800/40"],
        }[type] ?? ["bg-red-500/20 text-red-400"],
      )}
    >
      {type === "LineFeed" ? (
        <span>\n</span>
      ) : type === "Whitespace" ? (
        <span>&nbsp;</span>
      ) : (
        <span>{value}</span>
      )}
      {children}
    </span>
  );
}
