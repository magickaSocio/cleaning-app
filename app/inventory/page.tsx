'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAppContext } from '../contexts/AppContext'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InventoryForm } from '../components/InventoryForm'

export default function Inventory() {
  const { inventory } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handleAddItem = () => {
    setSelectedItem(null)
    setIsDialogOpen(true)
  }

  const handleEditItem = (item: any) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <Button onClick={handleAddItem}>Add New Item</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Minimum Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link href={`/inventory/${item.id}`} className="text-blue-600 hover:underline">
                  {item.name}
                </Link>
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.minimumAmount}</TableCell>
              <TableCell>
                {getStockStatus(item.amount, item.minimumAmount)}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          </DialogHeader>
          <InventoryForm
            item={selectedItem}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

