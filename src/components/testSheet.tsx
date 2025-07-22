'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Menu</Button>
      </SheetTrigger>
      <SheetContent>
        <p>This is the sheet content.</p>
      </SheetContent>
    </Sheet>
  )
}
