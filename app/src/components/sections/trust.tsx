"use client"

import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Lock, FileKey, EyeOff } from "lucide-react"
import { motion } from "framer-motion"

export function Trust() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">

      {/* Background Detail */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-federal-navy via-blue-500 to-federal-navy"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-left mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 text-blue-300 border-blue-500/30">
            Mission Critical Security
          </Badge>
          <h2 className="text-3xl font-bold sm:text-4xl mb-6">
            The Wall of Security
          </h2>
          <p className="text-lg text-slate-400">
            We understand the stakes. FARchat is architected from the ground up for IL4/IL5 environments, with zero data retention on user queries.
          </p>
        </motion.div>

        {/* Security Grid - FedRAMP as Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">

          {/* FedRAMP - Featured Hero Card */}
          <motion.div
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-900/40 to-slate-800/50 rounded-3xl p-10 border border-blue-500/30 hover:border-blue-400/50 transition-all group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-blue-900/50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-800/50 transition-colors ring-1 ring-blue-500/20">
                <ShieldCheck className="text-blue-400" size={44} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">FedRAMP Ready</h3>
              <p className="text-base text-slate-300 mb-6 max-w-md">
                Controls mapped to NIST SP 800-53 Rev. 5 Moderate Baseline. Designed for federal cloud security requirements.
              </p>
              <div className="flex items-center gap-3 text-sm font-mono text-blue-300">
                <div className="relative">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                </div>
                <span className="uppercase tracking-wider">Authorization in progress</span>
              </div>
            </div>
          </motion.div>

          {/* 100% Private */}
          <motion.div
            className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-green-500/50 transition-all group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-14 h-14 bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-900/50 transition-colors">
              <EyeOff className="text-green-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Private</h3>
            <p className="text-sm text-slate-400 mb-4">
              Zero-retention architecture. We do not train on your inputs.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-green-300">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              />
              <span className="uppercase tracking-wider">Verified</span>
            </div>
          </motion.div>

          {/* AES-256 Encryption */}
          <motion.div
            className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-amber-500/50 transition-all group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-14 h-14 bg-amber-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-900/50 transition-colors">
              <Lock className="text-amber-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">AES-256</h3>
            <p className="text-sm text-slate-400 mb-4">
              End-to-end encryption in transit (TLS 1.3) and at rest.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
              <motion.div
                className="w-2 h-2 bg-amber-400 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
              />
              <span className="uppercase tracking-wider">Enforced</span>
            </div>
          </motion.div>

          {/* FIPS 140-2 */}
          <motion.div
            className="md:col-span-2 lg:col-span-2 bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-14 h-14 bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:bg-purple-900/50 transition-colors flex-shrink-0">
                <FileKey className="text-purple-400" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">FIPS 140-2 Validated</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Cryptographic modules validated for federal use cases. All encryption meets NIST standards for government systems.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                  <motion.div
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, type: "spring" }}
                  />
                  <span className="uppercase tracking-wider">Compliant</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
