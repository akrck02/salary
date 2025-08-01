import { uuidv4 } from "./crypto.js"

export type signalHandler = (data : any) => Promise<void> 
const buffer : Map<string, signalHandler[]> = new Map()

/**
 * Set a new signal
 */
export function setSignal() : string {
  const id = uuidv4()
  buffer.set(id, [])
  return id
}

/**
 * Connect a function to a signal
 * @param id The signal id
 * @param handler The signal handler function
 */
export function connectToSignal(id : string, handler : signalHandler) {
    
  if(false == buffer.has(id)) {
    console.error(`Error connecting: The signal ${id} does not exist.`)
    return
  }

  buffer.get(id).push(handler)
}

/**
 * Emit a signal with the given dat 
 */
export async function emitSignal(id : string , data: any){

  if(false == buffer.has(id))
    return

  const targets = buffer.get(id)

  for (const target of targets) {
    target(data)
  }
}
