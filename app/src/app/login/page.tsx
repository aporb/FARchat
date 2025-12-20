'use client'

import { useState, useActionState } from 'react'
import { login, signup, magicLinkLogin, type ActionState } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const initialState: ActionState = {
    error: '',
    success: '',
}

export default function LoginPage() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin')

    // Separate states for different actions
    const [loginState, loginDispatch, isLoginPending] = useActionState(login, initialState)
    const [signupState, signupDispatch, isSignupPending] = useActionState(signup, initialState)
    const [magicState, magicDispatch, isMagicPending] = useActionState(magicLinkLogin, initialState)

    // Derived state based on current mode
    const currentDispatch = mode === 'signin' ? loginDispatch : signupDispatch
    const currentState = mode === 'signin' ? loginState : signupState
    const isCurrentPending = mode === 'signin' ? isLoginPending : isSignupPending

    // Magic link is separate
    const magicMessage = magicState?.success || magicState?.error
    const formMessage = currentState?.success || currentState?.error

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">
                        {mode === 'signin' ? 'Sign in to FARchat' : 'Create an account'}
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to access your account
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
                                placeholder="m.scott@dundermifflin.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>

                        {formMessage && (
                            <div className={`p-3 text-sm rounded-md ${currentState?.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {formMessage}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isCurrentPending}>
                            {isCurrentPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <form action={magicDispatch}>
                        {/* We need to capture email for magic link too. 
                            Since it's a separate form, user needs to re-enter or we sync inputs. 
                            For simplicity, let's ask for email in this form or use a hidden input if we sync.
                            Better: Just single input for magic link or re-use.
                            Actually, let's just make it a button that submits the FIRST form's email?
                            No, forms are separate. Let's create a hidden input populated by state?
                            Or easier: Just put the Magic Link button OUTSIDE a specific form and use formAction?
                            No, let's just add an Email field to the magic link flow if they choose that? 
                            OR simplify: Make Magic Link a separate "Tabs" option?
                            
                            Let's keep it simple: Magic link button as a "sub-form" that asks for email?
                            Or just duplicate the email input?
                            
                            Let's try to pass the email from the main input if possible.
                            Actually, standard pattern: Magic Link is alternative to Password.
                            Lets just start with having the user type email in the main form, 
                            and provide a "Send Magic Link" button that uses `formAction={magicDispatch}` 
                            inside the SAME form! 
                        */}
                        <Input
                            type="hidden"
                            name="email"
                            value="" /* We can't easily grab the other form's value without state. */
                        />
                        {/* 
                           Okay, the previous "controlled" input approach made this easy. 
                           To keep it simple with Server Actions and Uncontrolled inputs,
                           I will just put everything in ONE form, and use separate submit buttons 
                           with different `formAction` attributes.
                        */}
                    </form>

                    {/* Revised Strategy: Single Form, Multiple Actions */}
                </CardContent>
            </Card>
        </div>
    )
}
