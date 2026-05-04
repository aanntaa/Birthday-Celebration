import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Pin } from "lucide-react";

interface StickyNoteProps {
  children: ReactNode;
  rotation?: number;
  color?: "yellow" | "pink" | "blue" | "green";
  className?: string;
  index?: number;
}

const colors = {
  yellow: "from-[#fdf8c2] to-[#fcf3a1]",
  pink: "from-[#fce4ec] to-[#fbcfe8]",
  blue: "from-[#e0f2fe] to-[#bae6fd]",
  green: "from-[#dcfce7] to-[#bbf7d0]",
};

export function StickyNote({ children, rotation = 0, color = "yellow", className = "", index = 0 }: StickyNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
      className={`relative p-6 pr-8 pb-8 w-56 md:w-64 bg-gradient-to-b ${colors[color]} text-foreground/90 shadow-md ${className}`}
      style={{
        boxShadow: "2px 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-primary/40 z-10 rotate-12">
        <Pin size={32} fill="currentColor" strokeWidth={1} />
      </div>
      <div className="font-sans font-medium text-lg leading-snug">
        {children}
      </div>
      
      {/* Dog ear fold */}
      <div 
        className="absolute bottom-0 right-0 w-0 h-0 border-solid"
        style={{
          borderWidth: '15px 15px 0 0',
          borderColor: 'rgba(0,0,0,0.1) transparent transparent transparent',
        }}
      />
    </motion.div>
  );
}
