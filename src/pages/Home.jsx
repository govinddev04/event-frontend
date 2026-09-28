import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import { event } from '../data/event'

const stats = [
  { value: '500+', label: 'Attendees' },
  { value: '12', label: 'Sessions' },
  { value: '6', label: 'Speakers' },
  { value: '9', label: 'Stalls' },
]

const highlights = [
  {
    title: '12 Expert Sessions',
    text: 'Talks and workshops covering web development, AI, cloud and cyber security.',
  },
  {
    title: '6 Industry Speakers',
    text: 'Learn directly from engineers, researchers and product leaders.',
  },
  {
    title: 'Live Streaming',
    text: 'Watch every session online if you cannot attend in person.',
  },
  {
    title: 'Networking & Certificates',
    text: 'Meet other students and get a participation certificate for your resume.',
  },
]

function Home() {
  return (
    <div>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(37,99,235,0.35),transparent)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-200">
              {event.tagline}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {event.name}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              {event.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm text-slate-200 sm:flex-row sm:gap-8">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                {event.date}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                {event.time}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                {event.location}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/register">Register Now</Button>
              <Button to="/agenda" variant="ghost">
                View Agenda
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionTitle
          eyebrow="Why attend"
          title="Event Highlights"
          subtitle="Everything you need to learn something new, meet the right people and enjoy the day."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    {/* Post-Event Highlights section */}
<section className="border-t border-slate-200 bg-slate-50">
  <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
    <SectionTitle
      eyebrow="Post event"
      title="Event Highlights"
      subtitle="A quick look at what made TechSphere Summit 2025 a memorable day."
    />

    {/* Stats */}
    <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
        >
          <p className="text-3xl font-bold text-blue-700 sm:text-4xl">
            {item.value}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-600">
            {item.label}
          </p>
        </div>
      ))}
    </div>

    {/* CTA buttons */}
    <div className="mt-12 flex flex-wrap justify-center gap-4">
      <Button to="/gallery">View Gallery</Button>
      <Button to="/recordings" variant="outline">
        Watch Recordings
      </Button>
    </div>
  </div>
</section>
    </div>
  )
}

export default Home