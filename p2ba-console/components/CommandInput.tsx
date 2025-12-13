'use client'

import { useState, useRef, KeyboardEvent } from 'react'

interface CommandInputProps {
  onCommand: (command: string) => void
  isProcessing: boolean
  projectId: string | null
}

export default function CommandInput({ onCommand, isProcessing, projectId }: CommandInputProps) {
  const [command, setCommand] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (command.trim() && !isProcessing) {
      onCommand(command.trim())
      setCommand('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommand(e.target.value)
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }

  const exampleCommands = [
    "Create a dropshipping store for eco-friendly fitness gear",
    "Launch an influencer campaign for sustainable beauty products",
    "Build an e-commerce store selling tech accessories"
  ]

  return (
    <div className="space-y-4">
      {/* Project ID Display */}
      {projectId && (
        <div className="bg-warm-yellow border-3 border-soft-blue rounded-lg p-3 text-sm font-semibold text-dark-gray">
          📦 Active Project: {projectId}
        </div>
      )}

      {/* Command Input */}
      <div className="bg-white border-3 border-soft-blue rounded-xl p-4 shadow-lg">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={command}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Enter your P2BA command... (e.g., 'Create a dropshipping store for eco-friendly fitness gear')"
              disabled={isProcessing}
              className="w-full p-4 border-3 border-soft-blue rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-soft-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              rows={3}
              style={{ minHeight: '80px', maxHeight: '200px' }}
            />
            <p className="text-xs text-dark-gray opacity-60 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!command.trim() || isProcessing}
            className="px-8 py-4 bg-warm-yellow border-3 border-soft-blue rounded-lg font-bold text-dark-gray hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {isProcessing ? '⏳ Processing...' : '🚀 Execute'}
          </button>
        </div>
      </div>

      {/* Example Commands */}
      <div className="bg-light-gray border-3 border-soft-blue rounded-lg p-4">
        <p className="text-sm font-semibold text-dark-gray mb-2">💡 Example Commands:</p>
        <div className="space-y-2">
          {exampleCommands.map((example, index) => (
            <button
              key={index}
              onClick={() => setCommand(example)}
              disabled={isProcessing}
              className="block w-full text-left text-sm text-dark-gray hover:text-soft-blue transition-colors p-2 rounded hover:bg-white disabled:opacity-50"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

