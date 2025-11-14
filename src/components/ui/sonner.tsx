"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-white text-gray-950 border border-gray-200 shadow-lg dark:bg-gray-950 dark:text-gray-50 dark:border-gray-800",
          description: "text-gray-500 dark:text-gray-400",
          actionButton: "bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900",
          cancelButton: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
          success: "!bg-green-50 !text-green-900 !border-green-300 dark:!bg-green-950 dark:!text-green-100 dark:!border-green-700",
          error: "!bg-red-50 !text-red-900 !border-red-300 dark:!bg-red-950 dark:!text-red-100 dark:!border-red-700",
          warning: "!bg-yellow-50 !text-yellow-900 !border-yellow-300 dark:!bg-yellow-950 dark:!text-yellow-100 dark:!border-yellow-700",
          info: "!bg-blue-50 !text-blue-900 !border-blue-300 dark:!bg-blue-950 dark:!text-blue-100 dark:!border-blue-700",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
