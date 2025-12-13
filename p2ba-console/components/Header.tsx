'use client'

export default function Header() {
  return (
    <header className="w-full border-b-4 border-soft-blue bg-white z-10 relative">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#3A8DFF",stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#FFC700",stopOpacity:1}} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#headerGradient)" stroke="#1a1a1a" strokeWidth="2"/>
              <circle cx="50" cy="50" r="30" fill="#FFFFFF" stroke="#1a1a1a" strokeWidth="2"/>
              <path d="M 50 20 L 45 35 L 48 30 L 50 27 L 52 30 L 55 35 Z" fill="#FFC700" stroke="#1a1a1a" strokeWidth="1.5"/>
              <circle cx="50" cy="23" r="2" fill="#FFD700"/>
              <circle cx="45" cy="48" r="4" fill="#1a1a1a"/>
              <circle cx="46" cy="47" r="1.5" fill="#FFFFFF"/>
              <ellipse cx="55" cy="55" rx="2" ry="1.5" fill="#1a1a1a"/>
              <path d="M 25 45 Q 20 35, 25 30 Q 30 28, 32 38" fill="none" stroke="url(#headerGradient)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M 28 50 Q 23 40, 28 35 Q 33 33, 35 43" fill="none" stroke="url(#headerGradient)" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-soft-blue">P2BA Console</h1>
            <p className="text-sm text-dark-gray opacity-70">Prompt-to-Business Automation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-warm-yellow rounded-lg border-3 border-soft-blue font-semibold text-dark-gray">
            Chiara's World
          </div>
        </div>
      </div>
    </header>
  )
}

