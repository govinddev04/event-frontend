import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import Speakers from './pages/Speakers'
import Live from './pages/Live'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Gallery from './pages/Gallery'
import Recordings from './pages/Recordings'
import StallAttendance from './pages/StallAttendance'
import Summaries from './pages/Summaries'
import Gamification from './pages/Gamification'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/live" element={<Live />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/recordings" element={<Recordings />} />
          <Route path="/stall-attendance" element={<StallAttendance />} />
          <Route path="/summaries" element={<Summaries />} />
          <Route path="/gamification" element={<Gamification />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App