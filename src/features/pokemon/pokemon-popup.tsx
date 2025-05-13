'use client'

import { Button } from '@/components/button'
import clsx from 'clsx'
import { useState } from 'react'
import { Pokemon } from './pokemon'
import Image from 'next/image'

interface Props extends React.ComponentProps<'div'> {
  url: string
  open?: boolean
}
export const PokemonPopup = ({ open = false, url, ...props }: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const [data, setData] = useState<Pokemon | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetcher = async () => {
    setIsLoading(true)
    try {
      const req = await fetch(url)
      const res = (await req.json()) as Pokemon
      setData(res)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
          fetcher()
        }}
      >
        Details
      </Button>

      {isOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false)
            }
          }}
          key={open ? 'show' : 'hide'}
          className={clsx(
            'fixed inset-0 size-full bg-background/20 backdrop-blur-xs z-50 grid place-items-center',
            isOpen ? 'animate-fade-in' : 'animate-fade-out',
          )}
          {...props}
        >
          {data && (
            <div className="w-full max-w-[90vw] md:max-w-[650px] min-h-48 border bg-background rounded-md p-3">
              {error && <span>An error is occured</span>}
              {isLoading && <span>Loading...</span>}
              <div className="grid grid-cols-1 my-5 gap-3">
                <div className="my-5">
                  <p className="text-foreground">Name: {data.name}</p>
                  <p className="text-foreground">Height: {data.height}</p>
                  <p className="text-foreground">Weight: {data.weight}</p>
                </div>
                <figure className="aspect-square rounded overflow-hidden max-w-[200px] bg-foreground/10">
                  <Image
                    className="size-full object-cover"
                    width={200}
                    height={200}
                    src={data.sprites.front_default || ''}
                    alt={data.name || ''}
                  />
                </figure>
              </div>

              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
