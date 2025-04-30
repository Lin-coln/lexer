import { type ChangeEvent, type HTMLProps, useCallback } from "react";
import cx from "clsx";

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export function Textarea(props: TextAreaProps) {
  const { value, onValueChange, className, ...rest } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onValueChange(event.target.value);
    },
    [onValueChange],
  );

  return (
    <textarea
      value={value}
      onChange={handleChange}
      {...rest}
      className={cx(className, [
        "bg-neutral-500/15 text-neutral-50/90",
        "outline-0 ring-1 ring-neutral-50/20 hover:ring-neutral-50/20 focus:ring-neutral-50/30",
        "rounded-lg p-2",
        "h-[480px] w-[1080px]",
        "font-mono text-base",
      ])}
    />
  );
}
