"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/sections/footer"
import { PageBackground, GlassCard } from "@/components/layout/page-background"
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
        <>
            <Navigation />
            <PageBackground variant="softBlue" overlay="light" imageOpacity={0.03}>
                <div className="pt-20 pb-16">
                    {/* Hero Section */}
                    <section className="py-12 md:py-20">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                            <div className="text-center">
                                <Badge variant="outline" className="mb-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
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
                                    <GlassCard variant="heavy" className="p-6 md:p-8">
                                        {formState === "success" ? (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 rounded-full bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center mx-auto mb-4">
                                                    <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                                    Message Sent!
                                                </h2>
                                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                                    We typically respond within 1 business day.
                                                </p>
                                                <Button onClick={() => setFormState("idle")} variant="outline" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
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
                                                            className="h-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
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
                                                            className="h-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
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
                                                            className="h-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="subject">Subject *</Label>
                                                        <select
                                                            id="subject"
                                                            name="subject"
                                                            required
                                                            disabled={formState === "submitting"}
                                                            className="flex h-12 w-full rounded-md border border-input bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                                                        className="flex w-full rounded-md border border-input bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                                    />
                                                </div>

                                                {formState === "error" && (
                                                    <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-800/50">
                                                        <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
                                                        <p className="text-sm">{errorMessage}</p>
                                                    </div>
                                                )}

                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                    className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
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
                                    </GlassCard>
                                </div>

                                {/* Contact Info Sidebar */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                            Other ways to reach us
                                        </h2>
                                        <div className="space-y-4">
                                            {contactMethods.map((method) => (
                                                <GlassCard
                                                    key={method.email}
                                                    variant="light"
                                                    hover
                                                    className="p-4"
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
                                                </GlassCard>
                                            ))}
                                        </div>
                                    </div>

                                    <GlassCard variant="medium" className="p-4 border-blue-200/50 dark:border-blue-800/50 bg-blue-50/60 dark:bg-blue-900/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MailIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <p className="font-medium text-slate-900 dark:text-slate-100">
                                                Response Time
                                            </p>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            We typically respond within 1 business day.
                                        </p>
                                    </GlassCard>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PageBackground>
            <Footer />
        </>
    )
}
