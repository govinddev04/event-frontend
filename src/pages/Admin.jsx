import { useEffect, useState, useCallback } from 'react'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { getAllRegistrations } from '../api'

function Admin() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

 const fetchData = useCallback(async () => {
  setLoading(true)
  setError('')
  const result = await getAllRegistrations()

  if (result.ok) {
    setRegistrations(result.data.data || [])
  } else {
    setError('Failed to load registrations. Is the backend running?')
  }
  setLoading(false)
}, [])

    useEffect(() => {
        fetchData()

}, [fetchData])

  // Stats
  const total = registrations.length
  const verified = registrations.filter((r) => r.isVerified).length
  const pending = total - verified

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Admin"
        title="Registration Dashboard"
        subtitle="All registered attendees for TechSphere Summit 2025."
      />

      {/* Stats cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{total}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
            Verified
          </p>
          <p className="mt-2 text-3xl font-bold text-green-800">{verified}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Pending
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-800">{pending}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Registrations</h3>
        <button
          onClick={fetchData}
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-slate-500">Loading...</p>
        ) : error ? (
          <p className="p-8 text-center text-red-600">{error}</p>
        ) : registrations.length === 0 ? (
          <p className="p-8 text-center text-slate-500">
            No registrations yet. Be the first to{' '}
            <a href="/register" className="text-blue-700 hover:underline">
              register
            </a>
            .
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Registered on</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {registrations.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.phone}</td>
                    <td className="px-6 py-4">
                      {user.isVerified ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                          ✅ Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                          ⏳ Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Button to="/" variant="outline">
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default Admin