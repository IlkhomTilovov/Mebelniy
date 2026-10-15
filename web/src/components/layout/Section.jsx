export default function Section({ id, className = "", style, children }) {
  return (
    <section
      id={id}
      style={style}
      className={`min-h-screen snap-start flex flex-col justify-center py-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">{children}</div>
    </section>
  );
}
