import { clsx } from 'clsx'

export interface Props extends React.ComponentProps<'button'> {}
export const Button = ({ className, children, ...props }: Props) => (
  <button
    className={clsx(
      'py-2 px-5 rounded border bg-foreground text-background hover:bg-background hover:text-foreground disabled:opacity-75 disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
