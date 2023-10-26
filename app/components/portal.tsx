import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'

interface props {
  children: React.ReactNode
  wrappedId: string
}

// 1
const createWrapper = (wrapperId: string) => {
  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', wrapperId)
  document.body.appendChild(wrapper)
  return wrapper
}

export const Portal: React.FC<props> = ({ children, wrappedId }) => {
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null)

  // 2
  useEffect(() => {
    let element = document.getElementById(wrappedId)
    let created = false

    if (!element) {
      created = true
      element = createWrapper(wrappedId)
    }

    setWrapper(element)

    // 3
    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrappedId])

  if (wrapper === null) return null

  // 4
  return createPortal(children, wrapper)
}
