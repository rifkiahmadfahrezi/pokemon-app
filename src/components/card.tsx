import { clsx } from 'clsx'

export const Card = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={clsx(
        'p-2 bg-background shadow rounded-md border hover:bg-foreground hover:text-background',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
