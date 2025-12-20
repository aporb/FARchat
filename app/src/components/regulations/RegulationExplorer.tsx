'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, FileText, Folder } from 'lucide-react'
import { cn } from '@/lib/utils'
import structureData from '@/data/regulations.json'

// Types for our regulation tree
export type RegulationNode = {
    id: string
    title: string
    type: string
    children?: RegulationNode[]
}

const DATA = structureData as RegulationNode[]

interface TreeNodeProps {
    node: RegulationNode
    level?: number
}

function TreeNode({ node, level = 0 }: TreeNodeProps) {
    const [isOpen, setIsOpen] = useState(false)
    const hasChildren = node.children && node.children.length > 0
    const isSection = node.type === 'topic' || node.type === 'section'

    return (
        <div className="w-full select-none">
            <div
                onClick={() => hasChildren && setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors text-sm",
                    level > 0 && "ml-4"
                )}
            >
                <span className="mr-1.5 text-muted-foreground">
                    {hasChildren ? (
                        isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                    ) : (
                        <div className="w-4" /> /* Spacer */
                    )}
                </span>

                {isSection ? (
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                ) : (
                    <Folder className={cn("h-4 w-4 mr-2", isOpen ? "text-primary" : "text-muted-foreground")} />
                )}

                <span className={cn("truncate", isSection ? 'text-foreground font-medium' : 'text-foreground/90')}>
                    {node.title}
                </span>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && hasChildren && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {node.children!.map((child) => (
                            <TreeNode key={child.id} node={child} level={level + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function RegulationExplorer() {
    return (
        <div className="h-full flex flex-col bg-sidebar border-r border-sidebar-border w-80 text-sidebar-foreground">
            <div className="p-4 border-b border-sidebar-border">
                <h2 className="font-semibold tracking-tight text-sm uppercase text-muted-foreground">Regulation Explorer</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {DATA.map((node) => (
                    <TreeNode key={node.id} node={node} />
                ))}
            </div>
        </div>
    )
}
