import SectionTitle from '../components/SectionTitle'
import SessionCard from '../components/SessionCard'
import { sessions } from '../data/sessions'

function Agenda() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Programme"
        title="Event Agenda"
        subtitle="A full day of talks, workshops and discussions. Timings are indicative and may change slightly."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  )
}

export default Agenda