import { Link } from 'react-router-dom'

const baseStyles =
  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'

const variants = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800',
  outline:
    'border border-slate-300 bg-white text-slate-700 hover:border-blue-700 hover:text-blue-700',
  ghost: 'border border-white/30 text-white hover:bg-white/10',
}

function Button({ to, children, variant = 'primary', type = 'button', className = '' }) {
  const classes = `${baseStyles} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  )
}

export default Button