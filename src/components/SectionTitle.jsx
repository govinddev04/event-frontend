function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-600">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle