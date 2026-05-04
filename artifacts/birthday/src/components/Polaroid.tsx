import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PolaroidProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  rotation?: number;
  className?: string;
}

export function Polaroid({ src, alt, caption, rotation = 0, className = "" }: PolaroidProps) {
  return (
    <motion.div
      className={`bg-white p-3 pb-8 md:p-4 md:pb-12 polaroid-shadow wobble-hover w-64 md:w-80 flex flex-col items-center ${className}`}
      style={{ 
        '--wobble-rot': `${rotation}deg` 
      } as React.CSSProperties}
      initial={{ rotate: rotation }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="w-full aspect-square bg-muted overflow-hidden relative border border-muted-border">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
      </div>
      {caption && (
        <div className="mt-4 font-serif text-lg text-center text-foreground/80 leading-tight">
          {caption}
        </div>
      )}
    </motion.div>
  );
}
