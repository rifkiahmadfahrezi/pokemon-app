'use client'

import { usePokemon } from './hooks/use-pokemon'
import { Button } from '@/components/button'
import { PokemonPopup } from './pokemon-popup'
import { Card } from '@/components/card'

export const PokemonList = () => {
  const { data, isLoading, error, fetchNext, fetchPrev, refetch } = usePokemon()

  if (error) {
    return (
      <div className="p-3 rounded-md">
        <p>An error is occured</p>

        <Button onClick={refetch}>Try again</Button>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="grid mt-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div
              className="w-full h-26 bg-foreground/20 rounded-md animate-pulse"
              key={i}
            />
          ))}
      </div>
    )
  }
  if (!data) return <span>Data tidak ditemukan</span>
  return (
    <>
      <div className="grid mt-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {data?.results.map((item) => (
          <Card key={item.name}>
            <h3 className="capitalize font-medium text-lg my-3">{item.name}</h3>
            <PokemonPopup url={item.url} />
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 mt-4 flex-wrap">
        <p>
          Showing {data.results.length} of {data.count} data
        </p>

        <div className="flex items-center gap-1 justify-between">
          <Button onClick={fetchPrev} disabled={!data?.previous}>
            Prev
          </Button>
          <Button onClick={fetchNext} disabled={!data?.next}>
            Next
          </Button>
        </div>
      </div>
    </>
  )
}
