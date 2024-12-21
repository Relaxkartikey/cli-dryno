'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div ref={containerRef} className="h-screen">
      <main className="absolute inset-0 bg-black flex flex-col items-center justify-center">
        {/* 3D Grid Background */}
        <div className="absolute inset-0 perspective-1000">
          <motion.div
            className="absolute inset-0 grid grid-cols-8 gap-4 transform-style-3d"
            initial={{ rotateX: 45, y: "50%" }}
            animate={{ 
              rotateX: [45, 35, 45],
              y: ["50%", "48%", "50%"]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(32)].map((_, i) => (
              <motion.div
                key={i}
                className="h-32 bg-gray-900/30 rounded-lg border border-gray-800/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 text-center"
          style={{ y, opacity }}
        >
          {/* Main title with animation */}
          <motion.div className="relative">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter relative mb-8 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.3)"
                ]
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              DRYNO
            </motion.h1>

            {/* Glitch effect layers */}
            <motion.span
              className="absolute inset-0 text-8xl md:text-9xl font-bold tracking-tighter text-cyan-500/30"
              animate={{ 
                x: [0, -4, 0, 4, 0],
                opacity: [0.5, 0.3, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              DRYNO
            </motion.span>
            <motion.span
              className="absolute inset-0 text-8xl md:text-9xl font-bold tracking-tighter text-red-500/30"
              animate={{ 
                x: [0, 4, 0, -4, 0],
                opacity: [0.5, 0.3, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
            >
              DRYNO
            </motion.span>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Remove the tagline and adjust spacing */}
            <motion.div
              className="relative flex items-center justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <AnimatedComingSoon />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <Particles />
      </main>
    </div>
  )
}

function AnimatedComingSoon() {
  const letters = "COMING SOON".split("")
  
  return (
    <div className="flex items-center gap-[0.15em] text-2xl md:text-3xl font-light">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  )
}

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
} 