import { Portal } from './portal'
import { useNavigate } from '@remix-run/react'

interface props {
  children: React.ReactNode
  isOpen: boolean
  ariaLabel?: string
  className?: string
}

export const Modal: React.FC<props> = ({
  children,
  isOpen,
  ariaLabel,
  className,
}) => {
  const navigate = useNavigate()
  if (!isOpen) return null

  return (
    <Portal wrappedId={'modal'}>
      <div
        className='fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80'
        aria-labelledby={ariaLabel ?? 'modal-title'}
        role='dialog'
        aria-modal='true'
        onClick={() => navigate('/home')}
      >
        <div className='fixed inset-0 pointer-event-none flex justify-center items-center max-h-screen overflow-scroll'>
          <div
            className={`${className} p-4 bg-gray-200 pointer-event-auto max-h-screen md:rounded-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* This is where the modal content is rendered */}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
