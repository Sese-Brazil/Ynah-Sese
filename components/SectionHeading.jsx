export default function SectionHeading({ kicker, title, children }) {
  return (
    <div className="section-heading">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
