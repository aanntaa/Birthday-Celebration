import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate fewer hearts, spaced out
    const newHearts: FloatingHeart[] = [];
    for (let i = 0; i < 12; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 100,
        size: 16 + Math.random() * 24,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 10,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-primary"
          style={{
            left: `${heart.x}vw`,
            opacity: heart.opacity,
          }}
          initial={{ y: "10vh", rotate: 0, scale: 0.5 }}
          animate={{
            y: "-110vh",
            rotate: Math.random() * 360 - 180,
            scale: [0.5, 1, 0.8],
            x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
