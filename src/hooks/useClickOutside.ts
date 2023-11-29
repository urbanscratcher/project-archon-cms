import useEventListener from './useEventListener';

/**
 *
 * @param ref
 * @param callback
 * @example
 *
 * export default function ClickOutsideComponent() {
 *   const [open, setOpen] = useState(false)
 *   const modalRef = useRef()
 *
 *   useClickOutside(modalRef, () => {
 *     if (open) setOpen(false)
 *   })
 *
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Open</button>
 *       <div ref={modalRef}>
 *         <span>Modal</span>
 *       </div>
 *     </>
 *   )
 * }
 */
export default function useClickOutside(ref: any, callback: Function): void {
  useEventListener(
    'click',
    (e) => {
      if (ref.current == null || ref.current.contains(e.target)) return;
      callback(e);
    },
    document,
  );
}
