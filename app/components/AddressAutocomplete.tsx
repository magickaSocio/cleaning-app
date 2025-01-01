'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input"

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
}

export function AddressAutocomplete({ value, onChange }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    if (inputRef.current && !autocomplete && window.google) {
      const newAutocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' }, // Restrict to US addresses, change if needed
      })

      newAutocomplete.addListener('place_changed', () => {
        const place = newAutocomplete.getPlace()
        if (place.formatted_address) {
          onChange(place.formatted_address)
        }
      })

      setAutocomplete(newAutocomplete)
    }

    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete)
      }
    }
  }, [onChange])

  return (
    <Input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter address"
    />
  )
}

