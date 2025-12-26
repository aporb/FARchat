import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4">Our Mission</Badge>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
                        Empowering Federal Contracting with AI
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                        FARchat was built to solve a simple problem: the FAR is too complex to navigate manually.
                    </p>
                </div>

                <div className="prose prose-slate dark:prose-invert mx-auto">
                    <h2>Why FARchat?</h2>
                    <p>
                        Federal Acquisition Regulations (FAR) and DFARS are the backbone of government spending, yet browsing them is outdated.
                        FARchat brings <strong>semantic search</strong> and <strong>generative AI</strong> to the acquisition workforce.
                    </p>

                    <h2>Who We Are</h2>
                    <p>
                        We are a team of former Contracting Officers (1102s) and AI engineers dedicated to modernizing the acquisition process.
                    </p>

                    <h2>Security First</h2>
                    <p>
                        We understand the importance of data security. FARchat is designed with FedRAMP controls in mind (currently in Alpha).
                    </p>
                </div>
            </div>
        </div>
    )
}
