"use client"

import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/common/logo"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/compliance", label: "Compliance" },
    { href: "/demo", label: "Demo" },
]

export function Navigation() {
    const [sheetOpen, setSheetOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 w-full glass-header">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo & Alpha Badge */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo size="md" />
                        <Badge
                            variant="secondary"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200 font-medium dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                        >
                            Alpha
                        </Badge>
                    </Link>

                    {/* Trust Badges - Hidden on mobile */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <Badge
                            variant="outline"
                            className="text-xs text-slate-600 border-slate-300 bg-slate-50 dark:text-slate-400 dark:border-slate-700 dark:bg-slate-900"
                        >
                            Pursuing FedRAMP
                        </Badge>
                        <Badge
                            variant="outline"
                            className="text-xs text-slate-600 border-slate-300 bg-slate-50 dark:text-slate-400 dark:border-slate-700 dark:bg-slate-900"
                        >
                            Building for 508
                        </Badge>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-slate-100"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons & Mobile Menu */}
                    <div className="flex items-center space-x-3">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:inline-flex text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                            asChild
                        >
                            <Link href="/demo">
                                View Demo
                            </Link>
                        </Button>
                        <Button
                            size="sm"
                            className="bg-federal-navy hover:bg-federal-navy/90 text-white font-medium px-4 hidden sm:inline-flex"
                            asChild
                        >
                            <Link href="#access">
                                Get Started
                            </Link>
                        </Button>

                        {/* Mobile Menu Trigger */}
                        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden min-w-[44px] min-h-[44px]"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[280px]">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col space-y-4 mt-8">
                                    {navLinks.map(link => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setSheetOpen(false)}
                                            className="text-lg font-medium text-slate-700 hover:text-federal-navy transition-colors py-2"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <hr className="my-4" />
                                    <Button
                                        className="w-full bg-federal-navy hover:bg-federal-navy/90"
                                        asChild
                                    >
                                        <Link href="#access" onClick={() => setSheetOpen(false)}>
                                            Get Started
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        asChild
                                    >
                                        <Link href="/demo" onClick={() => setSheetOpen(false)}>
                                            View Demo
                                        </Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </div>
        </nav>
    )
}
