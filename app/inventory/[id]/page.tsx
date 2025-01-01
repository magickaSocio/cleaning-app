'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../../contexts/AppContext'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InventoryForm } from '../../components/InventoryForm'

export default function InventoryItemDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getInventoryItemById } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const itemId = parseInt(params.id)
  const item = getInventoryItemById(itemId)

  if (!item) {
    return <div>Item not found</div>
  }

  const getStockStatus = (amount: number, minimumAmount: number) => {
    if (amount <= minimumAmount) {
      return <Badge variant="destructive">Low Stock</Badge>
    } else if (amount <= minimumAmount * 1.5) {
      return <Badge variant="warning">Medium Stock</Badge>
    } else {
      return <Badge variant="success">In Stock</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Item Details</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Edit Item</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">Amount:</dt>
              <dd>{item.amount}</dd>
            </div>
            <div>
              <dt className="font-semibold">Minimum Amount:</dt>
              <dd>{item.minimumAmount}</dd>
            </div>
            <div>
              <dt className="font-semibold">Status:</dt>
              <dd>{getStockStatus(item.amount, item.minimumAmount)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-semibold">Notes:</dt>
              <dd>{item.notes}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
          </DialogHeader>
          <InventoryForm
            item={item}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

