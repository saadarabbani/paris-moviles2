// The four "+" registration marks that sit on the corners of blueprint frames.

export default function Corners({ light = false }: { light?: boolean }) {
  const style = light
    ? { color: "color-mix(in srgb, var(--color-bg) 45%, transparent)" }
    : undefined;
  return (
    <>
      <i className="pm-corner tl" style={style} />
      <i className="pm-corner tr" style={style} />
      <i className="pm-corner bl" style={style} />
      <i className="pm-corner br" style={style} />
    </>
  );
}
