function SessionCard({ session }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {session.time}
        </span>
        <span className="text-xs font-medium text-slate-500">{session.location}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{session.title}</h3>
      <p className="mt-1 text-sm font-medium text-blue-700">{session.speaker}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {session.description}
      </p>
    </article>
  )
}

export default SessionCard