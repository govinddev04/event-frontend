// ---------- Registration APIs ----------

export const registerUser = async (name, phone) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone }),
  })
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

export const sendOTP = async (phone) => {
  const response = await fetch('/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  })
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

export const verifyOTP = async (phone, otp) => {
  const response = await fetch('/api/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp }),
  })
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

export const getAllRegistrations = async () => {
  const response = await fetch('/api/registrations')
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

// ---------- Visit APIs (Stall Attendance) ----------

export const markVisit = async (phone, stallId, stallName) => {
  const response = await fetch('/api/mark-visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, stallId, stallName }),
  })
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

export const getAllVisits = async () => {
  const response = await fetch('/api/visits')
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

export const getVisitStats = async () => {
  const response = await fetch('/api/visits/stats')
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

// ---------- Leaderboard API (Gamification) ----------

export const getLeaderboard = async () => {
  const response = await fetch('/api/leaderboard')
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}