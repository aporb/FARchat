'use client'

import React from 'react'
import { MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface User {
    id: string
    email: string
    role: string | null
    tier: string | null
    created_at: string
}

interface UserCardProps {
    user: User
    onChangeRole?: (userId: string, newRole: string) => void
    onChangeTier?: (userId: string, newTier: string) => void
}

function getInitials(email: string): string {
    const username = email.split('@')[0]
    return username ? username.slice(0, 2).toUpperCase() : '??'
}

function getRoleBadgeVariant(role: string | null): 'default' | 'secondary' | 'outline' {
    if (role === 'admin') return 'default'
    if (role === 'pro') return 'secondary'
    return 'outline'
}

export function UserCard({ user, onChangeRole, onChangeTier }: UserCardProps) {
    return (
        <div className="glass-card rounded-lg p-4 hover-elevate">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-federal-navy text-white text-sm font-semibold">
                            {getInitials(user.email)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-sm truncate max-w-[180px]">
                            {user.email}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge
                                variant={getRoleBadgeVariant(user.role)}
                                className="text-xs"
                            >
                                {user.role || 'user'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {user.tier || 'free'}
                            </Badge>
                        </div>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {/* 44x44px touch target */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="min-w-[44px] min-h-[44px]"
                        >
                            <MoreVertical className="w-5 h-5" />
                            <span className="sr-only">User actions</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onChangeRole?.(user.id, 'admin')}>
                            Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onChangeRole?.(user.id, 'user')}>
                            Make User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onChangeTier?.(user.id, 'pro')}>
                            Upgrade to Pro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onChangeTier?.(user.id, 'free')}>
                            Set to Free
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            Suspend User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
                Joined {new Date(user.created_at).toLocaleDateString()}
            </p>
        </div>
    )
}
