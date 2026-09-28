import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { stalls } from '../data/stalls'
import { markVisit } from '../api'

function StallAttendance() {
  const [formData, setFormData] = useState({ phone: '', stallId: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const stall = stalls.find((s) => s.id === formData.stallId)

    if (!stall) {
      setMessage({ type: 'error', text: 'Please select a valid stall' })
      setLoading(false)
      return
    }

    const result = await markVisit(formData.phone, stall.id, stall.name)

    if (result.ok) {
      setMessage({
        type: 'success',
        text: `✅ Visit to ${stall.name} recorded for ${formData.phone}`,
      })
      setFormData({ phone: '', stallId: '' })
    } else {
      setMessage({
        type: 'error',
        text: result.data.message || 'Something went wrong',
      })
    }

    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Admin"
        title="Stall Attendance Tracking"
        subtitle="Mark attendee visits to exhibition stalls. Scan or enter the attendee's registered phone number."
      />

      {/* Form Card */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Mark a Stall Visit
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter attendee phone and select the stall they visited.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700"
            >
              Attendee Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="stallId"
              className="block text-sm font-medium text-slate-700"
            >
              Select Stall
            </label>
            <select
              id="stallId"
              name="stallId"
              value={formData.stallId}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">-- Choose a stall --</option>
              {stalls.map((stall) => (
                <option key={stall.id} value={stall.id}>
                  {stall.id} — {stall.name} ({stall.category})
                </option>
              ))}
            </select>
          </div>

          {message.text && (
            <div
              className={`sm:col-span-2 rounded-lg px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="sm:col-span-2">
            <Button type="submit" className="w-full">
              {loading ? 'Recording...' : 'Mark Visit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StallAttendance