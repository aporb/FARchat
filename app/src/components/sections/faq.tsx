'use client'

import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ_ITEMS = [
    {
        question: "What regulations does FARchat cover?",
        answer: "FARchat covers 25+ federal acquisition regulations including FAR, DFARS, VAAR, GSAM, AFARS, NFS, and all major agency supplements. Our AI is trained on the complete text of each regulation and updated regularly."
    },
    {
        question: "Is FARchat compliant with federal security requirements?",
        answer: "FARchat is designed with federal security requirements in mind. We're actively pursuing FedRAMP authorization, building for Section 508 accessibility, and have SOC 2 on our roadmap. See our Compliance page for current status."
    },
    {
        question: "How accurate are FARchat's responses?",
        answer: "FARchat provides citations for every response, linking directly to the official regulation text on acquisition.gov. We recommend always verifying critical decisions against the source documents."
    },
    {
        question: "Can I use FARchat for CUI or classified information?",
        answer: "FARchat is designed for unclassified use with publicly available regulations. Do not enter CUI, classified, or sensitive information. Contact us for enterprise deployment options with enhanced security controls."
    },
    {
        question: "What's included in the Pro tier?",
        answer: "Pro includes unlimited queries, priority response times, conversation history, saved bookmarks, and advanced search filters. Enterprise adds SSO, audit logging, and dedicated support."
    },
    {
        question: "How do I get started?",
        answer: "Click 'Start Using FARchat' above to create a free account. No credit card required. You can upgrade to Pro at any time from your account settings."
    },
]

export function FAQ() {
    return (
        <section id="faq" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-muted/30 dark:bg-slate-900/50 relative overflow-hidden">
            {/* Subtle geometric network accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <svg className="absolute top-20 right-10 w-[350px] h-[250px] opacity-[0.015] dark:opacity-[0.03]" viewBox="0 0 350 250">
                    <g stroke="currentColor" strokeWidth="1" fill="none">
                        <line x1="50" y1="50" x2="150" y2="100" />
                        <line x1="150" y1="100" x2="280" y2="70" />
                        <line x1="100" y1="150" x2="200" y2="180" />
                    </g>
                    <g fill="currentColor" opacity="0.4">
                        <circle cx="150" cy="100" r="3" />
                        <circle cx="200" cy="180" r="2" />
                    </g>
                </svg>
                <svg className="absolute bottom-20 left-10 w-[300px] h-[200px] opacity-[0.015] dark:opacity-[0.025]" viewBox="0 0 300 200">
                    <g stroke="currentColor" strokeWidth="1" fill="none">
                        <line x1="30" y1="80" x2="120" y2="50" />
                        <line x1="120" y1="50" x2="220" y2="100" />
                        <line x1="80" y1="140" x2="180" y2="160" />
                    </g>
                    <g fill="currentColor" opacity="0.4">
                        <circle cx="120" cy="50" r="2" />
                        <circle cx="180" cy="160" r="2" />
                    </g>
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground">
                            Everything you need to know about FARchat
                        </p>
                    </div>

                    {/* Accordion */}
                    <Accordion type="single" collapsible className="w-full">
                        {FAQ_ITEMS.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-medium py-3 sm:py-4 min-h-[48px] sm:min-h-[56px]">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-3 sm:pb-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
