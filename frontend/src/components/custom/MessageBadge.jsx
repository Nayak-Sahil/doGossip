import React from 'react'
import { Badge } from "@/components/ui/badge"

export default function MessageBadge({message}) {
  return (
    <Badge variant="secondary">{message}</Badge>
  )
}
