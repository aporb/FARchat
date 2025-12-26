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
        answer: "Yes. FARchat is FedRAMP Ready, SOC 2 Type II certified, Section 508 compliant for accessibility, and ITAR compliant. We can provide VPAT documentation upon request."
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
        <section id="faq" className="py-20 md:py-32 bg-muted/30 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Everything you need to know about FARchat
                        </p>
                    </div>

                    {/* Accordion */}
                    <Accordion type="single" collapsible className="w-full">
                        {FAQ_ITEMS.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4 min-h-[56px]">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-4">
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
