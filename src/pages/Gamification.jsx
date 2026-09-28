import { useEffect, useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { getLeaderboard } from '../api'

function Gamification() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchLeaderboard = async () => {
    setLoading(true)
    setError('')

    const result = await getLeaderboard()

    if (result.ok) {
      setLeaders(result.data.data || [])
    } else {
      setError('Failed to load leaderboard. Is the backend running?')
    }

    setLoading(false)
  }

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      const result = await getLeaderboard()
      if (!isMounted) return

      if (result.ok) {
        setLeaders(result.data.data || [])
      } else {
        setError('Failed to load leaderboard. Is the backend running?')
      }
      setLoading(false)
    }

    load()

    return () => {
      isMounted = false
    }
  }, [])

  const getRankDisplay = (index) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `#${index + 1}`
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Gamification"
        title="Stall Explorer Leaderboard"
        subtitle="Attendees who explored the most stalls. Visit more stalls to unlock higher badges!"
      />

      {/* Badge legend */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-2xl">🎯</p>
          <p className="mt-2 font-semibold text-blue-900">Explorer</p>
          <p className="text-sm text-blue-700">Visit 3+ stalls</p>
        </div>
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
          <p className="text-2xl">⭐</p>
          <p className="mt-2 font-semibold text-purple-900">Enthusiast</p>
          <p className="text-sm text-purple-700">Visit 5+ stalls</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-2xl">🏆</p>
          <p className="mt-2 font-semibold text-amber-900">Champion</p>
          <p className="text-sm text-amber-700">Visit all 9 stalls</p>
        </div>
      </div>

      {/* Leaderboard header */}
      <div className="mt-12 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Leaderboard</h3>
        <button
          onClick={fetchLeaderboard}
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Leaderboard */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-slate-500">Loading...</p>
        ) : error ? (
          <p className="p-8 text-center text-red-600">{error}</p>
        ) : leaders.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate-500">
              No visits recorded yet. Start marking stall visits to see the leaderboard.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Stalls Visited</th>
                  <th className="px-6 py-3">Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {leaders.map((leader, index) => (
                  <tr key={leader.phone} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-lg font-bold text-slate-900">
                      {getRankDisplay(index)}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {leader.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{leader.phone}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {leader.visitCount} / 9
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        {leader.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Button to="/" variant="outline">
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default Gamification