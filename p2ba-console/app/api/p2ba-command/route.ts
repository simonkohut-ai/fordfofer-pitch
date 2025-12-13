import { NextRequest, NextResponse } from 'next/server'

/**
 * P2BA Command API Route
 * Receives commands and executes them via BusinessAgentManager
 * Returns Server-Sent Events for real-time logging
 * 
 * 🔒 SECURITY: Password protected
 * NOTE: This requires p2ba-core to be built and accessible
 * Run: cd ../p2ba-core && npm run build
 */

/**
 * 🔒 Validate authentication
 */
function validateAuth(request: NextRequest): boolean {
  const password = request.cookies.get('p2ba-auth');
  const correctPassword = process.env.P2BA_PASSWORD || 'chiaras-world-2025';
  
  // Also check Authorization header for API access
  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${correctPassword}`) {
    return true;
  }
  
  return password?.value === correctPassword;
}

// Dynamic import to handle module resolution
async function getBusinessAgentManager() {
  try {
    // Try to import from built p2ba-core
    const { BusinessAgentManager } = await import('../../../../p2ba-core/dist/core/BusinessAgentManager.js')
    return BusinessAgentManager
  } catch (error) {
    // Fallback: Try source import (for development)
    try {
      const { BusinessAgentManager } = await import('../../../../p2ba-core/src/core/BusinessAgentManager.js')
      return BusinessAgentManager
    } catch (e) {
      console.error('Failed to import BusinessAgentManager:', e)
      throw new Error('P2BA Core not found. Please build p2ba-core first: cd ../p2ba-core && npm run build')
    }
  }
}

// Initialize BusinessAgentManager (singleton pattern)
let manager: any = null

async function getManager() {
  if (!manager) {
    const BusinessAgentManager = await getBusinessAgentManager()
    manager = new BusinessAgentManager()
  }
  return manager
}

export async function POST(request: NextRequest) {
  // 🔒 Authentication check
  if (!validateAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized. Please login first.' },
      { status: 401 }
    );
  }

  try {
    const { command } = await request.json()

    if (!command || typeof command !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Command is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create a ReadableStream for Server-Sent Events
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        const sendEvent = (data: any) => {
          const message = `data: ${JSON.stringify(data)}\n\n`
          controller.enqueue(encoder.encode(message))
        }

        try {
          // Send initial event
          sendEvent({
            type: 'log',
            logType: 'info',
            message: '🚀 Initializing P2BA system...'
          })

          // Get manager instance
          const managerInstance = await getManager()

          // Override console.log to capture logs
          const originalLog = console.log
          let stepCounter = 0
          const logBuffer: string[] = []

          console.log = (...args: any[]) => {
            originalLog(...args)
            
            const message = args.join(' ')
            logBuffer.push(message)
            
            // Detect step messages
            if (message.includes('[BusinessAgentManager]') || 
                message.includes('[CodeAgent]') || 
                message.includes('[MarketingAgent]') || 
                message.includes('[IntegrationAgent]')) {
              
              let logType = 'info'
              if (message.includes('✅')) logType = 'success'
              if (message.includes('❌')) logType = 'error'
              if (message.includes('📊') || message.includes('📢') || message.includes('💻') || message.includes('🔌')) {
                logType = 'step'
                stepCounter++
              }

              sendEvent({
                type: 'log',
                logType,
                message: message.replace(/\[.*?\]/g, '').trim(),
                stepNumber: logType === 'step' ? stepCounter : undefined
              })
            }
          }

          // Execute P2BA command
          sendEvent({
            type: 'log',
            logType: 'step',
            message: `📊 Executing command: "${command}"`,
            stepNumber: 0
          })

          const result = await managerInstance.executeP2BA(command)

          // Restore console.log
          console.log = originalLog

          // Send completion event
          sendEvent({
            type: 'complete',
            success: result.success,
            projectId: result.projectId,
            message: result.success 
              ? `✅ Business created successfully! Project ID: ${result.projectId}`
              : '❌ Failed to create business',
            workflow: result.workflow
          })

          controller.close()
        } catch (error) {
          console.log = originalLog
          
          sendEvent({
            type: 'log',
            logType: 'error',
            message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
          })
          
          sendEvent({
            type: 'complete',
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
          })
          
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}
