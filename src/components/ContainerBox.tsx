interface ContainerBoxProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export default function ContainerBox({
  title,
  children,
  className = "",
}: ContainerBoxProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-xl border border-white bg-gray-900" />

      <div className="absolute -top-3.5 left-4 px-4 py-1 bg-gray-900 bg-inherit rounded-xl">
        <span className="relative z-10 text-white all-small-caps font-bold -top-1 font-mono">
          {title}
        </span>
      </div>

      <div
        className="absolute -top-px left-4 h-px bg-background"
        style={{ width: `calc(100% - 2rem)` }}
      />

      <div className="relative z-0 p-4 rounded-xl">{children}</div>
    </div>
  );
}
