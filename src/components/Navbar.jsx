import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { event } from '../data/event'

const mainLinks = [
  { name: 'Home', path: '/' },
  { name: 'Agenda', path: '/agenda' },
  { name: 'Speakers', path: '/speakers' },
  { name: 'Live', path: '/live' },
  { name: 'Register', path: '/register' },
]

const moreLinks = [
  { name: 'Gallery', path: '/gallery' },
  { name: 'Recordings', path: '/recordings' },
  { name: 'Stalls', path: '/stall-attendance' },
  { name: 'Summaries', path: '/summaries' },
  { name: 'Leaderboard', path: '/gamification' },
  { name: 'Admin', path: '/admin' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-700 text-sm font-bold text-white">
              TS
            </span>
            <span className="text-base font-semibold text-slate-900 sm:text-lg">
              {event.shortName}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            {mainLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.name}
              </NavLink>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-700"
              >
                More
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {moreOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-2 shadow-lg"
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  {moreLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-blue-700'
                        }`
                      }
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile links */}
        {menuOpen && (
          <div className="flex flex-col gap-4 border-t border-slate-200 py-4 md:hidden">
            {mainLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mt-2 border-t border-slate-200 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                More
              </p>
              {moreLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="block py-1">{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar