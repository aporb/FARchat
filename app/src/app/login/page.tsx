'use client'

import { useState, useActionState } from 'react'
import Link from 'next/link'
import { login, signup, magicLinkLogin, type ActionState } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Loader2, Mail, ArrowLeft } from 'lucide-react'

const initialState: ActionState = {
    error: '',
    success: '',
}

export default function LoginPage() {
    const [mode, setMode] = useState<'signin' | 'signup' | 'magic'>('signin')
    const [email, setEmail] = useState('')

    // Separate states for different actions
    const [loginState, loginDispatch, isLoginPending] = useActionState(login, initialState)
    const [signupState, signupDispatch, isSignupPending] = useActionState(signup, initialState)
    const [magicState, magicDispatch, isMagicPending] = useActionState(magicLinkLogin, initialState)

    // Derived state based on current mode
    const currentDispatch = mode === 'signin' ? loginDispatch : mode === 'signup' ? signupDispatch : magicDispatch
    const currentState = mode === 'signin' ? loginState : mode === 'signup' ? signupState : magicState
    const isCurrentPending = mode === 'signin' ? isLoginPending : mode === 'signup' ? isSignupPending : isMagicPending

    const formMessage = currentState?.success || currentState?.error

    // Magic link mode
    if (mode === 'magic') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <button
                            onClick={() => setMode('signin')}
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
                        >
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Back to sign in
                        </button>
                        <CardTitle className="text-2xl font-bold tracking-tight text-center">
                            Sign in with Magic Link
                        </CardTitle>
                        <CardDescription className="text-center">
                            We&apos;ll send you a link to sign in without a password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={magicDispatch} className="space-y-4">
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
                                <div className="p-3 text-sm rounded-md bg-green-100 text-green-700">
                                    {magicState.success}
                                </div>
                            )}
                            {magicState?.error && (
                                <div className="p-3 text-sm rounded-md bg-red-100 text-red-700">
                                    {magicState.error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={isMagicPending}>
                                {isMagicPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Mail className="mr-2 h-4 w-4" />
                                Send Magic Link
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <Link
                        href="/"
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to home
                    </Link>
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">
                        {mode === 'signin' ? 'Sign in to FARchat' : 'Create an account'}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {mode === 'signin'
                            ? 'Enter your credentials to access your account'
                            : 'Enter your details to create a new account'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={currentDispatch} className="space-y-4">
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

                        {formMessage && (
                            <div
                                className={`p-3 text-sm rounded-md ${currentState?.success
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                                role="alert"
                            >
                                {formMessage}
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
                            <span className="bg-white px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setMode('magic')}
                    >
                        <Mail className="mr-2 h-4 w-4" />
                        Sign in with Magic Link
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-muted-foreground">
                        {mode === 'signin' ? (
                            <>
                                Don&apos;t have an account?{' '}
                                <button
                                    onClick={() => setMode('signup')}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    onClick={() => setMode('signin')}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
