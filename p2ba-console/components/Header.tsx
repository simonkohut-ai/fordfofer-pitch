'use client'

export default function Header() {
  return (
    <header className="w-full border-b-4 border-soft-blue bg-white z-10 relative">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-soft-blue rounded-xl flex items-center justify-center text-white font-bold text-xl">
            CW
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

