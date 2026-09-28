import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { summaries } from '../data/summaries'
import { jsPDF } from 'jspdf'

function Summaries() {
  // Summary ko PDF file me download karta hai
  const downloadPDF = (item) => {
    const doc = new jsPDF()

    // Header
    doc.setFillColor(30, 41, 59) // slate-800
    doc.rect(0, 0, 210, 30, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('TechSphere Summit 2025', 14, 15)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('Session Summary', 14, 23)

    // Session info
    doc.setTextColor(30, 41, 59)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    const titleLines = doc.splitTextToSize(item.session, 180)
    doc.text(titleLines, 14, 45)

    let y = 45 + titleLines.length * 7 + 4

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139) // slate-500
    doc.text(`Speaker: ${item.speaker}`, 14, y)
    y += 6
    doc.text(`Duration: ${item.duration}`, 14, y)
    y += 10

    // Divider line
    doc.setDrawColor(226, 232, 240) // slate-200
    doc.line(14, y, 196, y)
    y += 8

    // Key takeaways heading
    doc.setTextColor(30, 41, 59)
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.text('Key Takeaways', 14, y)
    y += 8

    // Bullet points
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(51, 65, 85) // slate-700

    item.summary.forEach((point, i) => {
      const text = `${i + 1}. ${point}`
      const lines = doc.splitTextToSize(text, 175)

      // Page break check
      if (y + lines.length * 6 > 280) {
        doc.addPage()
        y = 20
      }

      doc.text(lines, 14, y)
      y += lines.length * 6 + 3
    })

    // Footer
    doc.setFontSize(9)
    doc.setTextColor(148, 163, 184) // slate-400
    doc.text(
      'Generated from TechSphere 2025 microsite',
      14,
      290
    )

    // Save
    const safeTitle = item.session
      .slice(0, 30)
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')

    doc.save(`Summary_${item.id}_${safeTitle}.pdf`)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Post Event"
        title="Session Summaries"
        subtitle="Download concise, ready-to-read PDF summaries of every session from TechSphere Summit 2025."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {summaries.map((item) => (
          <article
            key={item.id}
            className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {item.duration}
              </span>
              <span className="text-xs font-medium text-slate-400">
                📄 PDF
              </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {item.session}
            </h3>
            <p className="mt-1 text-sm font-medium text-blue-700">{item.speaker}</p>

            {/* Bullet points */}
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-600">
              {item.summary.slice(0, 3).map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  <span>{point}</span>
                </li>
              ))}
              {item.summary.length > 3 && (
                <li className="text-xs text-slate-400">
                  + {item.summary.length - 3} more points in the PDF
                </li>
              )}
            </ul>

            {/* Download button */}
            <button
              onClick={() => downloadPDF(item)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              ⬇ Download PDF
            </button>
          </article>
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

export default Summaries