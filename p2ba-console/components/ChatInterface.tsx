'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import CommandInput from './CommandInput'

export interface LogMessage {
  id: string
  timestamp: string
  type: 'user' | 'system' | 'success' | 'error' | 'info' | 'step'
  message: string
  stepNumber?: number
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<LogMessage[]>([
    {
      id: 'welcome',
      timestamp: new Date().toISOString(),
      type: 'system',
      message: '👑 Welcome to P2BA Console! Enter a command to create a business.'
    }
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleCommand = async (command: string) => {
    if (!command.trim() || isProcessing) return

    // Add user message
    const userMessage: LogMessage = {
      id: `user-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'user',
      message: command
    }
    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)

    // Add processing message
    const processingMessage: LogMessage = {
      id: `processing-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'info',
      message: '🔄 Processing your command...'
    }
    setMessages(prev => [...prev, processingMessage])

    try {
      // Call API endpoint
      const response = await fetch('/api/p2ba-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to process command')
      }

      if (!response.body) {
        throw new Error('No response body')
      }

      // Handle Server-Sent Events for real-time logs
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          // Process any remaining buffer
          if (buffer.trim()) {
            const lines = buffer.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))
                  
                  if (data.type === 'log') {
                    const logMessage: LogMessage = {
                      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                      timestamp: new Date().toISOString(),
                      type: data.logType || 'info',
                      message: data.message,
                      stepNumber: data.stepNumber
                    }
                    setMessages(prev => [...prev, logMessage])
                  } else if (data.type === 'complete') {
                    const completeMessage: LogMessage = {
                      id: `complete-${Date.now()}`,
                      timestamp: new Date().toISOString(),
                      type: data.success ? 'success' : 'error',
                      message: data.success 
                        ? `✅ ${data.message || 'Command executed successfully!'}`
                        : `❌ ${data.message || 'Command failed'}`
                    }
                    setMessages(prev => [...prev, completeMessage])
                    
                    if (data.projectId) {
                      setCurrentProjectId(data.projectId)
                    }
                    
                    setIsProcessing(false)
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
          break
        }

        // Decode chunk and add to buffer
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        
        // Keep last incomplete line in buffer
        buffer = lines.pop() || ''

        // Process complete lines
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.type === 'log') {
                const logMessage: LogMessage = {
                  id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  timestamp: new Date().toISOString(),
                  type: data.logType || 'info',
                  message: data.message,
                  stepNumber: data.stepNumber
                }
                setMessages(prev => [...prev, logMessage])
              } else if (data.type === 'complete') {
                const completeMessage: LogMessage = {
                  id: `complete-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  type: data.success ? 'success' : 'error',
                  message: data.success 
                    ? `✅ ${data.message || 'Command executed successfully!'}`
                    : `❌ ${data.message || 'Command failed'}`
                }
                setMessages(prev => [...prev, completeMessage])
                
                if (data.projectId) {
                  setCurrentProjectId(data.projectId)
                }
                
                setIsProcessing(false)
              }
            } catch (e) {
              // Skip invalid JSON
              console.warn('Failed to parse SSE data:', e)
            }
          }
        }
      }
    } catch (error) {
      const errorMessage: LogMessage = {
        id: `error-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'error',
        message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
      setMessages(prev => [...prev, errorMessage])
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 py-6 relative z-10">
      {/* Messages Display Area */}
      <div className="flex-1 overflow-y-auto mb-4 bg-light-gray rounded-xl border-3 border-soft-blue p-6 min-h-[400px] max-h-[calc(100vh-250px)]">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Command Input */}
      <CommandInput 
        onCommand={handleCommand} 
        isProcessing={isProcessing}
        projectId={currentProjectId}
      />
    </div>
  )
}

