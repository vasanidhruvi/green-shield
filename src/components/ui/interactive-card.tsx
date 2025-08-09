'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export function InteractiveCard({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn(className)}>
            {children}
        </div>
    )
}
