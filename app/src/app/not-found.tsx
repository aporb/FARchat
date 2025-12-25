import Link from "next/link"
import { FileQuestion, Home, MessageSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-federal-navy/5">
          <FileQuestion className="h-12 w-12 text-federal-navy/60" />
        </div>

        {/* Error Code */}
        <p className="mb-2 font-mono text-sm font-medium uppercase tracking-widest text-federal-navy/40">
          Error 404
        </p>

        {/* Title */}
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mb-8 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Primary Actions */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/chat">
              <MessageSquare className="h-4 w-4" />
              Start Chatting
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Popular destinations
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/#features"
              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200"
            >
              Features
            </Link>
            <Link
              href="/#compliance"
              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200"
            >
              Compliance
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200"
            >
              Sign In
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200"
            >
              About
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <p className="mt-6 text-sm text-gray-500">
          Looking for something specific?{" "}
          <Link
            href="/chat"
            className="font-medium text-federal-navy hover:underline"
          >
            Ask FARchat
          </Link>
        </p>
      </div>
    </div>
  )
}
