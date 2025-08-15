"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ChatData = {
  chatId: string
  chatTitle: string
  chatCreatedAt: Date
  userId: string
  userEmail: string
  totalInputTokens: number | null
  totalOutputTokens: number | null
  totalTokens: number | null
  messageCount: number
}

export const chatColumns: ColumnDef<ChatData>[] = [
  {
    accessorKey: "chatTitle",
    header: "Chat Title",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.getValue("chatTitle")}
      </div>
    ),
  },
  {
    accessorKey: "userEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("userEmail")}</div>
    ),
  },
  {
    accessorKey: "chatCreatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("chatCreatedAt") as Date
      return <div>{new Date(date).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short", 
        day: "numeric" 
      })}</div>
    },
  },
  {
    accessorKey: "messageCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Messages
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("messageCount")}</div>
    },
  },
  {
    accessorKey: "totalInputTokens",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Input Tokens
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const tokens = row.getValue("totalInputTokens") as number | null
      return <div className="text-right">{(tokens || 0).toLocaleString("en-US")}</div>
    },
  },
  {
    accessorKey: "totalOutputTokens",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Output Tokens
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const tokens = row.getValue("totalOutputTokens") as number | null
      return <div className="text-right">{(tokens || 0).toLocaleString("en-US")}</div>
    },
  },
  {
    accessorKey: "totalTokens",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Total Tokens
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const tokens = row.getValue("totalTokens") as number | null
      return <div className="text-right font-medium">{(tokens || 0).toLocaleString("en-US")}</div>
    },
  },
]