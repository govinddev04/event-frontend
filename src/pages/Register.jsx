import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Button from '../components/Button'
import { event } from '../data/event'
import { registerUser, sendOTP, verifyOTP } from '../api'

function Register() {
  const [step, setStep] = useState('form')
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // ---------- STEP 1: FORM ----------
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const result = await registerUser(formData.name, formData.phone)

    if (result.ok) {
      const otpResult = await sendOTP(formData.phone)

      if (otpResult.ok) {
        setStep('otp')
        setMessage({
          type: 'success',
          text: '📱 OTP sent! Check the backend terminal for the code.',
        })
      } else {
        setMessage({ type: 'error', text: otpResult.data.message })
      }
    } else {
      setMessage({
        type: 'error',
        text: result.data.message || 'Something went wrong',
      })
    }

    setLoading(false)
  }

  // ---------- STEP 2: OTP ----------
  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const result = await verifyOTP(formData.phone, otp)

    if (result.ok) {
      setStep('success')
    } else {
      setMessage({ type: 'error', text: result.data.message })
    }

    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

        {/* Left: event info */}
        <div className="rounded-2xl bg-slate-900 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
            Registration
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Reserve your seat</h1>
          <p className="mt-4 leading-relaxed text-slate-300">
            Register with your name and phone number. Seats are limited to 300
            participants.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-white">Date</dt>
              <dd className="mt-1 text-slate-300">{event.date}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Time</dt>
              <dd className="mt-1 text-slate-300">{event.time}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Venue</dt>
              <dd className="mt-1 text-slate-300">{event.location}</dd>
            </div>
          </dl>
        </div>

        {/* Right: form area */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* Step indicator */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold">
            <span className={step === 'form' ? 'text-blue-700' : 'text-slate-400'}>
              1. Details
            </span>
            <span className="text-slate-300">→</span>
            <span className={step === 'otp' ? 'text-blue-700' : 'text-slate-400'}>
              2. Verify OTP
            </span>
            <span className="text-slate-300">→</span>
            <span className={step === 'success' ? 'text-green-700' : 'text-slate-400'}>
              3. Done
            </span>
          </div>

          {/* ---------- STEP 1: FORM ---------- */}
          {step === 'form' && (
            <form onSubmit={handleRegister}>
              <h2 className="text-xl font-semibold text-slate-900">Attendee details</h2>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rohan Patil"
                    required
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    Registered phone number
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

                {message.text && (
                  <div
                    className={`rounded-lg px-4 py-3 text-sm ${
                      message.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <Button type="submit" className="w-full">
                  {loading ? 'Please wait...' : 'Continue'}
                </Button>
              </div>
            </form>
          )}

          {/* ---------- STEP 2: OTP ---------- */}
          {step === 'otp' && (
            <form onSubmit={handleVerify}>
              <h2 className="text-xl font-semibold text-slate-900">Enter OTP</h2>
              <p className="mt-2 text-sm text-slate-600">
                OTP bheja gaya hai <span className="font-semibold">{formData.phone}</span> pe.
                Backend terminal me check karo.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-slate-700">
                    4-digit OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="e.g. 4821"
                    maxLength={4}
                    required
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-center text-2xl font-bold tracking-widest text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {message.text && (
                  <div
                    className={`rounded-lg px-4 py-3 text-sm ${
                      message.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <Button type="submit" className="w-full">
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true)
                    setMessage({ type: '', text: '' })
                    const result = await sendOTP(formData.phone)
                    setMessage(
                      result.ok
                        ? { type: 'success', text: '📱 New OTP sent. Check terminal.' }
                        : { type: 'error', text: result.data.message }
                    )
                    setLoading(false)
                  }}
                  className="w-full text-sm text-blue-700 hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* ---------- STEP 3: SUCCESS ---------- */}
          {step === 'success' && (
            <div className="text-center py-6">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700 text-3xl">
                ✅
              </div>
              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Registration Complete!
              </h2>
              <p className="mt-3 text-slate-600">
                Thank you, <span className="font-semibold">{formData.name}</span>! Your seat
                is confirmed for {event.name}.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                We will contact you on {formData.phone} soon.
              </p>

              {/* QR Code */}
              <div className="mt-8 flex flex-col items-center">
                <div className="rounded-xl border-2 border-slate-200 bg-white p-4">
                  <QRCodeSVG
                    value={JSON.stringify({
                      name: formData.name,
                      phone: formData.phone,
                      event: event.shortName,
                      verified: true,
                    })}
                    size={180}
                    level="M"
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  Show this QR code at the entry gate
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Registration ID: {formData.phone}
                </p>
              </div>

              <div className="mt-8">
                <Button to="/" variant="outline">
                  Back to Home
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Register