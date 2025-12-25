"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, PlayIcon, CheckIcon } from "@/components/common/icons"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-50 min-h-screen flex flex-col justify-center">

            {/* Hero Background Image with Fallback */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/hero-bg-network.png"
                    alt="Network background visualization showing federal regulatory connections"
                    fill
                    priority
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XqoKoPtKdVFjvTyX3N6rXbRau8K0r7Vbcv+TBVsYi9VAAAAAElFTkSuQmCC"
                    sizes="100vw"
                    className="object-cover"
                    style={{
                        objectPosition: 'center',
                    }}
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-slate-50/80 z-10"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex flex-col items-center text-center">

                    {/* Alpha Badge - Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge
                            variant="outline"
                            className="mb-6 bg-white/70 backdrop-blur-md text-federal-navy border-federal-navy/20 px-4 py-1.5 shadow-sm"
                        >
                            Currently in Alpha — Your feedback shapes the product
                        </Badge>
                    </motion.div>

                    {/* Main Headlines */}
                    <motion.div
                        className="max-w-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl mb-6">
                            Total Acquisition <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-federal-navy to-blue-600">
                                Command
                            </span>
                        </h1>

                        <p className="mt-6 text-xl leading-8 text-slate-700 max-w-2xl mx-auto font-medium">
                            The only AI trained on <span className="font-bold text-federal-navy">25+ federal regulation libraries</span>.
                            From FAR to agency supplements, in one place.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="mt-10 flex flex-col sm:flex-row items-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Button
                            size="lg"
                            className="bg-federal-navy hover:bg-federal-navy/90 text-white px-10 py-6 text-lg font-semibold shadow-xl shadow-federal-navy/25 transition-all hover:scale-105"
                            asChild
                        >
                            <Link href="#access">
                                Start Using FARchat
                                <ArrowRightIcon className="ml-2" size={20} />
                            </Link>
                        </Button>

                        <span className="text-slate-500">or</span>

                        <Link
                            href="#demo"
                            className="text-slate-600 hover:text-federal-navy transition-colors flex items-center gap-2 text-lg font-medium"
                        >
                            <PlayIcon size={18} />
                            Watch a 2-minute demo
                        </Link>
                    </motion.div>

                    {/* Agency Logos - Enhanced Typography */}
                    <motion.div
                        className="mt-16 pt-8 border-t border-slate-200/60 w-full max-w-4xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-[0.2em]">
                            Trusted by federal contracting professionals
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                            {['DOD', 'GSA', 'VA', 'DHS', 'NASA', 'ARMY', 'NAVY'].map((agency) => (
                                <span
                                    key={agency}
                                    className="font-mono text-sm font-bold tracking-widest text-slate-400 hover:text-federal-navy transition-colors px-3 py-1.5 rounded-md hover:bg-slate-100"
                                >
                                    {agency}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* 3D App Preview Container (Perspective Tilt with Float) */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <motion.div
                    className="relative max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.5 },
                        y: { duration: 0.8, delay: 0.5, ease: "easeOut" }
                    }}
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                    <div className="relative rounded-2xl bg-slate-900 p-2 shadow-2xl ring-1 ring-white/10 transform rotate-x-12 shadow-federal-navy/30">
                        <div className="rounded-xl bg-slate-50 overflow-hidden border border-slate-200">
                            {/* Simplified Chat UI Representation for Hero */}
                            <div className="h-[600px] w-full bg-white relative flex flex-col">
                                {/* Header */}
                                <div className="h-14 border-b border-slate-100 flex items-center px-6 justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="text-xs font-mono text-slate-400">AGENCY_MODE: ACTIVE</div>
                                </div>

                                {/* Chat Content */}
                                <div className="flex-1 p-8 space-y-8 overflow-hidden bg-slate-50/50">
                                    {/* User Message */}
                                    <div className="flex justify-end">
                                        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tr-sm px-6 py-4 max-w-2xl">
                                            <p className="text-slate-800 font-medium">What are the unique TAA compliance requirements for a drone procurement under DFARS 252.225-7001?</p>
                                        </div>
                                    </div>

                                    {/* AI Response */}
                                    <div className="flex justify-start w-full">
                                        <div className="bg-white border border-federal-navy/10 shadow-lg shadow-federal-navy/5 rounded-2xl rounded-tl-sm px-8 py-6 max-w-3xl w-full relative overflow-hidden">
                                            {/* Glow Effect */}
                                            <div className="absolute top-0 left-0 w-1 h-full bg-federal-navy"></div>

                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-full bg-federal-navy flex items-center justify-center">
                                                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                                                </div>
                                                <span className="text-sm font-bold text-federal-navy">FARchat Intelligence</span>
                                            </div>

                                            <p className="text-slate-700 leading-relaxed mb-4">
                                                For drone procurements, **DFARS 252.225-7001 (Buy American and Balance of Payments Program)** applies, but you must also cross-reference **Section 848 of the NDAA for FY2020** (prohibiting operation or procurement of foreign-made unmanned aircraft systems).
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                                    <div className="text-xs font-bold text-slate-500 mb-1 border-b border-slate-200 pb-1">PRIMARY CITATION</div>
                                                    <div className="text-sm font-mono text-federal-navy">DFARS 252.225-7001(c)</div>
                                                </div>
                                                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                                    <div className="text-xs font-bold text-red-500 mb-1 border-b border-red-200 pb-1">CRITICAL RESTRICTION</div>
                                                    <div className="text-sm font-mono text-red-700">NDAA FY20 Sec 848</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Bar */}
                                <div className="p-6 bg-white border-t border-slate-100">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                            <div className="w-2 h-2 bg-federal-navy rounded-full animate-pulse"></div>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-federal-navy/20 focus:border-federal-navy outline-none text-slate-800 placeholder:text-slate-400 shadow-inner"
                                            placeholder="Ask about FAR, DFARS, VAAR, or agency supplements..."
                                            readOnly
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    )
}
