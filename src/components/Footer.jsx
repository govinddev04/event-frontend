import { Link } from 'react-router-dom'
import { event } from '../data/event'

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Agenda', path: '/agenda' },
  { name: 'Speakers', path: '/speakers' },
  { name: 'Live', path: '/live' },
  { name: 'Register', path: '/register' },
]

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-900">{event.name}</p>
            <p className="mt-1 text-sm text-slate-500">
              {event.date} • {event.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="transition-colors hover:text-blue-700"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {event.name}. Built as a BSc Computer Science project.
        </p>
      </div>
    </footer>
  )
}

export default Footer