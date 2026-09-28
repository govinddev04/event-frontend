import SectionTitle from '../components/SectionTitle'
import SpeakerCard from '../components/SpeakerCard'
import { speakers } from '../data/speakers'

function Speakers() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Meet the experts"
        title="Our Speakers"
        subtitle="Industry professionals sharing practical knowledge and real-world experience."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </div>
  )
}

export default Speakers