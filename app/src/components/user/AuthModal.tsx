'use client'

import React, { useState, useActionState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Loader2, ArrowLeft, Check } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, signup, magicLinkLogin, type ActionState } from '@/app/actions'

interface AuthModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    defaultMode?: 'signin' | 'signup' | 'magic' | undefined
}

const initialState: ActionState = {
    error: '',
    success: '',
}

export function AuthModal({ open, onOpenChange, defaultMode = 'signin' }: AuthModalProps) {
    const [mode, setMode] = useState<'signin' | 'signup' | 'magic'>(defaultMode)
    const [email, setEmail] = useState('')

    const [loginState, loginDispatch, isLoginPending] = useActionState(login, initialState)
    const [signupState, signupDispatch, isSignupPending] = useActionState(signup, initialState)
    const [magicState, magicDispatch, isMagicPending] = useActionState(magicLinkLogin, initialState)

    const currentDispatch = mode === 'signin' ? loginDispatch : mode === 'signup' ? signupDispatch : magicDispatch
    const currentState = mode === 'signin' ? loginState : mode === 'signup' ? signupState : magicState
    const isCurrentPending = mode === 'signin' ? isLoginPending : mode === 'signup' ? isSignupPending : isMagicPending

    const handleModeChange = (newMode: 'signin' | 'signup' | 'magic') => {
        setMode(newMode)
    }

    const resetAndClose = () => {
        setMode('signin')
        setEmail('')
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={resetAndClose}>
            <DialogContent className="sm:max-w-md">
                <AnimatePresence mode="wait">
                    {mode === 'magic' ? (
                        <motion.div
                            key="magic"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <DialogHeader>
                                <button
                                    onClick={() => handleModeChange('signin')}
                                    className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 w-fit"
                                >
                                    <ArrowLeft className="mr-1 h-4 w-4" />
                                    Back
                                </button>
                                <DialogTitle>Sign in with Magic Link</DialogTitle>
                                <DialogDescription>
                                    We&apos;ll send you a link to sign in without a password
                                </DialogDescription>
                            </DialogHeader>

                            <form action={magicDispatch} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="magic-email">Email</Label>
                                    <Input
                                        id="magic-email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {magicState?.success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 text-sm rounded-md bg-green-100 text-green-700 flex items-center gap-2"
                                    >
                                        <Check className="w-4 h-4" />
                                        {magicState.success}
                                    </motion.div>
                                )}

                                {magicState?.error && (
                                    <div className="p-3 text-sm rounded-md bg-red-100 text-red-700">
                                        {magicState.error}
                                    </div>
                                )}

                                <Button type="submit" className="w-full" disabled={isMagicPending}>
                                    {isMagicPending ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Mail className="mr-2 h-4 w-4" />
                                    )}
                                    Send Magic Link
                                </Button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="auth"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <DialogHeader>
                                <DialogTitle>
                                    {mode === 'signin' ? 'Welcome back' : 'Create an account'}
                                </DialogTitle>
                                <DialogDescription>
                                    {mode === 'signin'
                                        ? 'Sign in to continue to FARchat'
                                        : 'Enter your details to get started'}
                                </DialogDescription>
                            </DialogHeader>

                            <form action={currentDispatch} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                </div>

                                {currentState?.success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 text-sm rounded-md bg-green-100 text-green-700 flex items-center gap-2"
                                    >
                                        <Check className="w-4 h-4" />
                                        {currentState.success}
                                    </motion.div>
                                )}

                                {currentState?.error && (
                                    <div className="p-3 text-sm rounded-md bg-red-100 text-red-700">
                                        {currentState.error}
                                    </div>
                                )}

                                <Button type="submit" className="w-full" disabled={isCurrentPending}>
                                    {isCurrentPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                                </Button>
                            </form>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleModeChange('magic')}
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                Sign in with Magic Link
                            </Button>

                            <div className="text-sm text-center text-muted-foreground mt-4">
                                {mode === 'signin' ? (
                                    <>
                                        Don&apos;t have an account?{' '}
                                        <button
                                            onClick={() => handleModeChange('signup')}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Sign up
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <button
                                            onClick={() => handleModeChange('signin')}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Sign in
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}
