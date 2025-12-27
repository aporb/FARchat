import { AlertTriangleIcon, InfoIcon, AlertCircleIcon } from "lucide-react"

type CalloutVariant = "info" | "warning" | "important"

interface LegalCalloutProps {
    variant: CalloutVariant
    title: string
    children: React.ReactNode
}

const variantStyles: Record<CalloutVariant, {
    container: string
    icon: string
    iconComponent: React.ComponentType<{ className?: string }>
    title: string
    content: string
}> = {
    info: {
        container: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50",
        icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        iconComponent: InfoIcon,
        title: "text-blue-800 dark:text-blue-200",
        content: "text-blue-700 dark:text-blue-300"
    },
    warning: {
        container: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/50",
        icon: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
        iconComponent: AlertTriangleIcon,
        title: "text-amber-800 dark:text-amber-200",
        content: "text-amber-700 dark:text-amber-300"
    },
    important: {
        container: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50",
        icon: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
        iconComponent: AlertCircleIcon,
        title: "text-red-800 dark:text-red-200",
        content: "text-red-700 dark:text-red-300"
    }
}

export function LegalCallout({ variant, title, children }: LegalCalloutProps) {
    const styles = variantStyles[variant]
    const IconComponent = styles.iconComponent

    return (
        <div className={`border rounded-xl p-4 md:p-6 my-6 ${styles.container}`}>
            <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.icon}`}>
                    <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${styles.title}`}>
                        {title}
                    </h3>
                    <div className={`text-sm ${styles.content}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
