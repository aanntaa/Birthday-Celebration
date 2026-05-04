import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  speed: number;
  delay: number;
}

const colors = ["#f43f5e", "#fb923c", "#fde047", "#a78bfa", "#fbcfe8", "#ffffff"];

export function Confetti({ active = false }: { active?: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    const generatePieces = () => {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 150; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100, // vw
          y: -20 - Math.random() * 20, // vh
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 0.5 + Math.random() * 1.5, // rem
          rotation: Math.random() * 360,
          speed: 1 + Math.random() * 3, // duration in s
          delay: Math.random() * 2, // delay in s
        });
      }
      setPieces(newPieces);
    };

    generatePieces();
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}vw`,
            top: `${piece.y}vh`,
            width: `${piece.size}rem`,
            height: `${piece.size}rem`,
            backgroundColor: piece.color,
          }}
          animate={{
            y: ["0vh", "120vh"],
            rotate: [piece.rotation, piece.rotation + 360 * (Math.random() > 0.5 ? 1 : -1)],
            x: [`${piece.x}vw`, `${piece.x + (Math.random() * 20 - 10)}vw`],
          }}
          transition={{
            duration: piece.speed * 2,
            delay: piece.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
