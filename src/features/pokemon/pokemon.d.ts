export type PokeResponse = {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export type Pokemon = {
  name: string
  height: number
  weight: number
  // get image only
  sprites: {
    front_default: string
  }
}
