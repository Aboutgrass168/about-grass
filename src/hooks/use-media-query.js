'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // Set the initial value
    setMatches(mediaQuery.matches)

    // Create an event listener
    const handler = (event) => setMatches(event.matches)

    // Add the event listener
    mediaQuery.addEventListener('change', handler)

    // Remove the event listener on cleanup
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
