'use client'

import { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type InventoryFormProps = {
  item?: {
    id: number
    name: string
    amount: number
    minimumAmount: number
    notes: string
  }
  onClose: () => void
}

export function InventoryForm({ item, onClose }: InventoryFormProps) {
  const { addInventoryItem, updateInventoryItem } = useAppContext()
  const [name, setName] = useState(item?.name || '')
  const [amount, setAmount] = useState(item?.amount.toString() || '')
  const [minimumAmount, setMinimumAmount] = useState(item?.minimumAmount.toString() || '')
  const [notes, setNotes] = useState(item?.notes || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const itemData = {
      name,
      amount: parseInt(amount),
      minimumAmount: parseInt(minimumAmount),
      notes
    }
    if (item) {
      updateInventoryItem({ id: item.id, ...itemData })
    } else {
      addInventoryItem(itemData)
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Item Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="minimumAmount">Minimum Amount</Label>
        <Input
          id="minimumAmount"
          type="number"
          value={minimumAmount}
          onChange={(e) => setMinimumAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {item ? 'Update' : 'Add'} Item
        </Button>
      </div>
    </form>
  )
}

