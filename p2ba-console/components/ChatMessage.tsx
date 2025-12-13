'use client'

import { LogMessage } from './ChatInterface'

interface ChatMessageProps {
  message: LogMessage
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const getMessageStyles = () => {
    switch (message.type) {
      case 'user':
        return 'bg-soft-blue text-white ml-auto max-w-[80%]'
      case 'system':
        return 'bg-light-gray border-3 border-soft-blue text-dark-gray'
      case 'success':
        return 'bg-green-100 border-3 border-green-500 text-green-800'
      case 'error':
        return 'bg-red-100 border-3 border-red-500 text-red-800'
      case 'step':
        return 'bg-warm-yellow border-3 border-soft-blue text-dark-gray font-semibold'
      case 'info':
      default:
        return 'bg-white border-3 border-soft-blue text-dark-gray'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className={`rounded-lg p-4 ${getMessageStyles()} ${message.type === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
      <div className="flex items-start gap-3">
        {message.stepNumber && (
          <span className="flex-shrink-0 w-8 h-8 bg-soft-blue text-white rounded-lg flex items-center justify-center font-bold text-sm">
            {message.stepNumber}
          </span>
        )}
        <div className="flex-1">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.message}
          </p>
          <p className="text-xs opacity-60 mt-2">
            {formatTimestamp(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  )
}

