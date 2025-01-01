'use client'

import { useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"

interface AddressInputProps {
  value: string
  onChange: (value: string) => void
}

export function AddressInput({ value, onChange }: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.formatted_address) {
          onChange(place.formatted_address)
        }
      })
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

