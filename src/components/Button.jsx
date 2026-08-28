// Buttons in the conquerblocks.com style. Primary: gradient block with pixel-notched edges and a
// top-right arrow. Danger: same block in solid terra. Secondary: underlined text link, as on the site.
const BASE_CLASSES =
  'inline-flex min-h-11 items-center justify-center gap-1 font-display text-sm font-medium transition active:scale-98'

const VARIANT_CLASSES = {
  primary:
    'clip-pixel bg-brand-gradient px-6 text-white hover:scale-[1.025] hover:animate-pixel-glitch',
  secondary:
    'px-2 text-body underline decoration-1 underline-offset-4 hover:text-orange hover:decoration-2',
  danger: 'clip-pixel bg-terra px-6 text-white hover:scale-[1.025] hover:animate-pixel-glitch',
}

// Arrow used by the site's primary CTAs.
function ArrowTopRight() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.57 7.1 4.29 21.4c-.26.25-.56.38-.9.38-.33 0-.63-.13-.88-.39a1.24 1.24 0 0 1-.39-.89c0-.34.13-.63.39-.89L16.8 5.31H4.22c-.37 0-.67-.12-.92-.37a1.22 1.22 0 0 1-.36-.9c0-.36.12-.66.36-.9.25-.24.55-.36.92-.36h15.63c.36 0 .66.12.9.36.25.25.37.55.37.91v15.63c0 .36-.13.66-.37.9-.24.25-.55.37-.9.37-.37 0-.67-.12-.91-.37a1.22 1.22 0 0 1-.36-.9V7.1Z" />
    </svg>
  )
}

function Button({ variant = 'primary', type = 'button', className = '', children, ...props }) {
  const classes = [BASE_CLASSES, VARIANT_CLASSES[variant], className].filter(Boolean).join(' ')
  return (
    <button type={type} className={classes} {...props}>
      {children}
      {variant === 'primary' && <ArrowTopRight />}
    </button>
  )
}

export default Button
