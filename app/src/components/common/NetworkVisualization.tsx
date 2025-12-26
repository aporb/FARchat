"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function NetworkVisualization() {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry && entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '100px' }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    const nodes = [
        { id: "FAR", x: "20%", y: "30%" },
        { id: "DFARS", x: "50%", y: "20%" },
        { id: "VAAR", x: "80%", y: "40%" },
        { id: "GSAM", x: "30%", y: "70%" },
        { id: "AFARS", x: "70%", y: "80%" },
    ]

    const connections = [
        { from: 0, to: 1 },
        { from: 0, to: 3 },
        { from: 1, to: 2 },
        { from: 1, to: 4 },
        { from: 3, to: 4 },
        { from: 2, to: 4 },
    ]

    return (
        <div ref={ref} className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
            {isVisible ? (
                <>
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Connection Lines */}
                        {connections.map((conn, idx) => {
                            const fromNode = nodes[conn.from]
                            const toNode = nodes[conn.to]
                            if (!fromNode || !toNode) return null

                            return (
                                <motion.line
                                    key={`line-${idx}`}
                                    x1={fromNode.x}
                                    y1={fromNode.y}
                                    x2={toNode.x}
                                    y2={toNode.y}
                                    stroke="rgba(59, 130, 246, 0.2)"
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                                />
                            )
                        })}

                        {/* Nodes */}
                        {nodes.map((node, idx) => (
                            <motion.g
                                key={node.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="2"
                                    fill="#1B263B"
                                    stroke="#3b82f6"
                                    strokeWidth="0.5"
                                />
                                <motion.circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="4"
                                    fill="rgba(59, 130, 246, 0.1)"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                                />
                                <text
                                    x={node.x}
                                    y={node.y}
                                    dy="-4"
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="3"
                                    fontWeight="bold"
                                    style={{ pointerEvents: "none" }}
                                >
                                    {node.id}
                                </text>
                            </motion.g>
                        ))}
                    </svg>

                    {/* Decorative Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                </>
            ) : (
                <div className="w-full h-full bg-slate-900 animate-pulse" />
            )}
        </div>
    )
}