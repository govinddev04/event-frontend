function SpeakerCard({ speaker }) {
  const initials = speaker.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
      {/* Photo placeholder */}
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-slate-800 text-xl font-bold text-white">
        {initials}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{speaker.name}</h3>
      <p className="text-sm font-medium text-blue-700">{speaker.designation}</p>
      <p className="text-sm text-slate-500">{speaker.company}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{speaker.bio}</p>
    </article>
  )
}

export default SpeakerCard