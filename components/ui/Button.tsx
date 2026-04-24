interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  loading?: boolean
}

export default function Button({ variant = 'primary', loading, children, className = '', ...props }: ButtonProps) {
  const base = 'w-full py-3 px-6 rounded-full font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  const primary = 'hover:-translate-y-0.5 hover:brightness-110'
  const ghost = 'border border-slate-600 hover:border-slate-400 bg-transparent'

  return (
    <button
      className={`${base} ${variant === 'primary' ? primary : ghost} ${className}`}
      style={variant === 'primary' ? { background: 'var(--color-cream)', color: '#0d0d0d' } : {}}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Loading…' : children}
    </button>
  )
}
