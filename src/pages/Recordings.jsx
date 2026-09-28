import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { recordings } from '../data/recordings'

function Recordings() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Post Event"
        title="Session Recordings"
        subtitle="Missed a session? Watch the complete recordings of every talk from TechSphere Summit 2025."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {recordings.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Video embed */}
            <div className="aspect-video bg-slate-900">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-blue-700">
                  {item.speaker}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  ⏱ {item.duration}
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button to="/" variant="outline">
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default Recordings