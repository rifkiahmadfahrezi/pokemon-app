import { PokemonList } from '@/features/pokemon/pokemon-list'

export default function Home() {
  return (
    <>
      <h1 className="text-xl font-semibold">Pokemon app</h1>

      <PokemonList />
    </>
  )
}
