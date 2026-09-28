import SectionTitle from '../components/SectionTitle'
import { event } from '../data/event'

// Change this to true when your YouTube live stream starts.
const isLive = false

function Live() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Watch online"
        title="Live Stream"
        subtitle="Cannot make it to the venue? Watch every session live right here."
      />

      <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Status bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isLive ? 'animate-pulse bg-red-600' : 'bg-slate-300'
              }`}
            />
            <span className="text-sm font-semibold text-slate-800">
              {isLive ? 'Live now' : 'Stream offline'}
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">{event.time}</span>
        </div>

        {/* Video area */}
        <div className="relative aspect-video bg-slate-900">
          {isLive ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
              title="TechSphere Summit 2025 Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                >
                  <rect x="3" y="6" width="13" height="12" rx="2" />
                  <path d="M16 10l5-3v10l-5-3" />
                </svg>
              </div>
              <p className="mt-5 text-lg font-semibold text-white">
                The live stream has not started yet
              </p>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Live coverage begins on {event.date} at {event.time}. Please check back
                then.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        The stream is free to watch. No login or registration is required.
      </p>
    </div>
  )
}

export default Live