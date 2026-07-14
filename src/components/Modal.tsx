import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LuX } from 'react-icons/lu'

interface ModalProps {
  open: boolean
  onClose: () => void
  /** id of the element that titles the dialog */
  labelledBy: string
  /** id of the element that describes the dialog */
  describedBy?: string
  children: ReactNode
}

// Accessible modal shell: scrim, spring entrance, Escape / backdrop-click to
// close, body-scroll lock, focus trap, and focus return to the opener.
export default function Modal({ open, onClose, labelledBy, describedBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<Element | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return

    openerRef.current = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 50)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-[#06131e]/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={
              reducedMotion
                ? { duration: 0.2 }
                : { type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }
            }
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/70 text-ink-soft backdrop-blur transition-colors duration-200 hover:border-glow hover:text-glow focus-visible:outline-2 focus-visible:outline-glow"
            >
              <LuX size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
