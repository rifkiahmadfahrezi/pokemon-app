'use client'

import { useState, useEffect } from 'react'

import { api } from '@/lib/api'
import type { PokeResponse } from '../pokemon'

export const usePokemon = (limit: number = 20, offset: number = 0) => {
  const [meta, setMeta] = useState({
    offset,
    limit,
  })
  const [data, setData] = useState<null | PokeResponse>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)

  const fetchPokemon = async () => {
    setIsLoading(true)
    try {
      const res = await api<PokeResponse>(
        `/pokemon?offset=${meta.offset}&limit=${meta.limit}`,
      )
      setData(res)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchNext = () => {
    setMeta({
      ...meta,
      offset: meta.offset + limit,
    })
  }
  const fetchPrev = () => {
    setMeta({
      ...meta,
      offset: meta.offset - limit,
    })
  }

  useEffect(() => {
    fetchPokemon()
  }, [meta])

  return { data, isLoading, error, fetchNext, fetchPrev, refetch: fetchPokemon }
}
