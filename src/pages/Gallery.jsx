import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { gallery } from '../data/gallery'

function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Post Event"
        title="Event Gallery"
        subtitle="Relive the best moments from TechSphere Summit 2025 — sessions, networking and celebrations."
      />

      {/* Gallery grid */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="aspect-video overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                {item.category}
              </span>
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

export default Gallery