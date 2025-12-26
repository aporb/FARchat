"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    MailIcon,
    SendIcon,
    CheckCircleIcon,
    AlertCircleIcon,
    Loader2Icon
} from "lucide-react"

const subjects = [
    { value: "general", label: "General Inquiry" },
    { value: "sales", label: "Sales & Enterprise" },
    { value: "support", label: "Technical Support" },
    { value: "security", label: "Security Questions" },
    { value: "feedback", label: "Feedback & Suggestions" },
]

const contactMethods = [
    {
        label: "General Inquiries",
        email: "hello@farchat.app",
        description: "Questions about FARchat"
    },
    {
        label: "Technical Support",
        email: "support@farchat.app",
        description: "Help with your account"
    },
    {
        label: "Security Concerns",
        email: "security@farchat.app",
        description: "Report vulnerabilities"
    },
]

export default function ContactPage() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormState("submitting")
        setErrorMessage("")

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            company: formData.get("company"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to send message")
            }

            setFormState("success")
        } catch (error) {
            setFormState("error")
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center">
                        <Badge variant="outline" className="mb-4">
                            Contact Us
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Have questions? We&apos;d love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
                                {formState === "success" ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                                            <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                            Message Sent!
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                                            We typically respond within 1 business day.
                                        </p>
                                        <Button onClick={() => setFormState("idle")} variant="outline">
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="Your name"
                                                    required
                                                    disabled={formState === "submitting"}
                                                    className="h-12"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="your.email@agency.gov"
                                                    required
                                                    disabled={formState === "submitting"}
                                                    className="h-12"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="company">Organization</Label>
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    placeholder="Organization name"
                                                    disabled={formState === "submitting"}
                                                    className="h-12"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subject">Subject *</Label>
                                                <select
                                                    id="subject"
                                                    name="subject"
                                                    required
                                                    disabled={formState === "submitting"}
                                                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <option value="">Select a subject</option>
                                                    {subjects.map((subject) => (
                                                        <option key={subject.value} value={subject.value}>
                                                            {subject.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                placeholder="How can we help?"
                                                required
                                                disabled={formState === "submitting"}
                                                rows={5}
                                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                            />
                                        </div>

                                        {formState === "error" && (
                                            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                                                <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
                                                <p className="text-sm">{errorMessage}</p>
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full"
                                            disabled={formState === "submitting"}
                                        >
                                            {formState === "submitting" ? (
                                                <>
                                                    <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <SendIcon className="w-4 h-4 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                    Other ways to reach us
                                </h2>
                                <div className="space-y-4">
                                    {contactMethods.map((method) => (
                                        <div
                                            key={method.email}
                                            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                                        >
                                            <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                                                {method.label}
                                            </p>
                                            <a
                                                href={`mailto:${method.email}`}
                                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                            >
                                                {method.email}
                                            </a>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {method.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <MailIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <p className="font-medium text-slate-900 dark:text-slate-100">
                                        Response Time
                                    </p>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    We typically respond within 1 business day.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
