export const Blank: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
> = ({ children, ...props }) => (
  <span
    {...props}
    className="blur-[6px] !font-bold grayscale"
  >
    {children}
  </span>
);
