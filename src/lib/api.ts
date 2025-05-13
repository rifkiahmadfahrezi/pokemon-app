export const API_BASE_URL = 'https://pokeapi.co/api/v2'

export const api = async <T>(url: string, config?: RequestInit): Promise<T> => {
  try {
    const req = await fetch(API_BASE_URL + url, {
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      cache: 'force-cache',
      ...config,
    })

    return await req.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
