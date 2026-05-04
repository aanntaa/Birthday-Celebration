import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";
import type { ReactNode, ButtonHTMLAttributes } from "react";

const BUTTERFLY_IMAGES = [
  "/images/butterfly-pink.png",
  "/images/butterfly-yellow.png",
  "/images/butterfly-blue.png",
];

const TULIP_IMAGES = [
  "/images/tulip-pink.png",
  "/images/tulip-yellow.png",
  "/images/tulip-purple.png",
];

const PETAL_IMAGE = "/images/petal-pink.png";

type WatercolorButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

export function watercolorButtonClasses(
  variant: "primary" | "secondary" | "ghost" = "primary",
  size: "sm" | "md" | "lg" = "md"
) {
  const sizeMap = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };
  const base =
    "rounded-full font-bold inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap select-none";
  return `${base} ${sizeMap[size]} watercolor-btn watercolor-btn--${variant}`;
}

export function watercolorButtonStyle(
  variant: "primary" | "secondary" | "ghost" = "primary"
): React.CSSProperties {
  if (variant === "primary") {
    return {
      color: "#fff",
      background:
        "linear-gradient(135deg, #fbb6ce 0%, #f472b6 35%, #d97aae 65%, #b18acb 100%)",
      backgroundBlendMode: "soft-light, normal",
      boxShadow:
        "0 10px 26px -8px rgba(217,122,174,0.55), 0 2px 4px rgba(244,114,182,0.25), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -3px 6px rgba(168,85,247,0.18)",
      border: "1.5px solid rgba(255,255,255,0.55)",
      textShadow: "0 1px 1px rgba(157,23,77,0.25)",
    };
  }
  if (variant === "secondary") {
    return {
      color: "#6b21a8",
      background:
        "linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #ede9fe 100%)",
      boxShadow:
        "0 8px 22px -8px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 4px rgba(168,85,247,0.08)",
      border: "1.5px solid rgba(244,114,182,0.45)",
    };
  }
  return {
    color: "#7e22ce",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(253,242,248,0.8))",
    boxShadow:
      "0 4px 14px -4px rgba(168,85,247,0.25), inset 0 0 0 1.5px rgba(216,180,254,0.7)",
    border: "1.5px dashed rgba(168,85,247,0.35)",
  };
}

export function WatercolorButton({
  variant = "primary",
  size = "md",
  children,
  style,
  ...rest
}: WatercolorButtonProps) {
  return (
    <button
      {...rest}
      className={`${watercolorButtonClasses(variant, size)} ${rest.className ?? ""}`}
      style={{ ...watercolorButtonStyle(variant), ...style }}
    >
      {children}
    </button>
  );
}

export function FairyWorldSky() {
  return (
    <>
      {/* Watercolor anime art background */}
      <div
        className="fixed inset-0 -z-40"
        style={{
          backgroundImage: "url('/images/watercolor-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Soft pastel wash to keep text readable & blend scrolling */}
      <div
        className="fixed inset-0 -z-35 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(237,233,254,0.25) 0%, rgba(255,255,255,0.05) 30%, rgba(254,243,199,0.15) 70%, rgba(209,250,229,0.35) 100%)",
        }}
      />
      <div className="fixed inset-0 -z-30 bg-[radial-gradient(ellipse_at_top,rgba(216,180,254,0.18),transparent_60%),radial-gradient(circle_at_85%_30%,rgba(165,243,252,0.18),transparent_55%)] pointer-events-none" />
      <Fireflies />
      <FallingPetals />
      <FloatingTulips />
      <Butterflies />
    </>
  );
}

export function FloatingTulips() {
  const tulips = Array.from({ length: 14 }, (_, i) => ({
    key: i,
    left: (i * 14.7) % 100,
    delay: (i % 7) * 1.3,
    duration: 22 + ((i * 4) % 12),
    size: 38 + ((i * 7) % 28),
    img: TULIP_IMAGES[i % TULIP_IMAGES.length],
    sway: (i % 3) === 0 ? 60 : 40,
  }));
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {tulips.map(({ key, left, delay, duration, size, img, sway }) => (
        <motion.div
          key={key}
          className="absolute"
          style={{ left: `${left}%`, bottom: "-15%" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: "-115vh",
            x: [0, sway, -sway * 0.8, sway * 0.5, 0],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, 8, -10, 6, 0],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        >
          <img
            src={img}
            alt=""
            width={size}
            height={size}
            style={{
              width: size,
              height: "auto",
              filter: "drop-shadow(0 4px 10px rgba(244,114,182,0.35))",
            }}
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function Fireflies() {
  const flies = Array.from({ length: 38 }, (_, i) => ({
    key: i,
    left: (i * 13.7) % 100,
    top: (i * 19.3) % 100,
    size: 4 + ((i * 3) % 4),
    delay: (i % 11) * 0.4,
    duration: 3 + ((i % 5) * 0.8),
    color: ["#fde68a", "#fbcfe8", "#a5f3fc", "#fef3c7", "#ddd6fe"][i % 5],
  }));
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      {flies.map(({ key, left, top, size, delay, duration, color }) => (
        <motion.span
          key={key}
          className="absolute rounded-full"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            background: color,
            boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.6, 1.4, 0.6],
            x: [0, 20, -15, 10, 0],
            y: [0, -20, 10, -15, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function DriftingClouds() {
  const clouds = [
    { top: "5%", size: 280, delay: 0, duration: 70, opacity: 0.6 },
    { top: "18%", size: 200, delay: 8, duration: 90, opacity: 0.5 },
    { top: "38%", size: 320, delay: 4, duration: 100, opacity: 0.4 },
    { top: "55%", size: 220, delay: 16, duration: 80, opacity: 0.45 },
    { top: "72%", size: 280, delay: 22, duration: 110, opacity: 0.4 },
  ];
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            top: c.top,
            width: c.size,
            height: c.size * 0.5,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,228,240,0))",
            opacity: c.opacity,
          }}
          initial={{ x: "-30%" }}
          animate={{ x: "130%" }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function FallingPetals() {
  const petals = Array.from({ length: 26 }, (_, i) => ({
    key: i,
    left: (i * 17.3) % 100,
    delay: (i % 9) * 1.1,
    duration: 14 + ((i * 3) % 8),
    size: 22 + ((i * 5) % 18),
    rotate: (i * 47) % 360,
    isImage: i % 2 === 0,
    color: [
      "text-rose-300",
      "text-pink-400",
      "text-fuchsia-300",
      "text-amber-200",
      "text-purple-300",
    ][i % 5],
  }));
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {petals.map(({ key, left, delay, duration, size, rotate, color, isImage }) => (
        <motion.div
          key={key}
          className={`absolute ${color} drop-shadow`}
          style={{ left: `${left}%`, top: "-10%" }}
          initial={{ y: 0, rotate, opacity: 0 }}
          animate={{
            y: "115vh",
            rotate: rotate + 720,
            x: [0, 30, -25, 20, 0],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeIn" }}
        >
          {isImage ? (
            <img
              src={PETAL_IMAGE}
              alt=""
              width={size}
              height={size}
              style={{
                width: size,
                height: "auto",
                filter: "drop-shadow(0 2px 4px rgba(244,114,182,0.4))",
              }}
              draggable={false}
            />
          ) : (
            <Flower2 size={size * 0.7} fill="currentColor" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function Butterflies() {
  const butterflies = [
    { delay: 0, duration: 26, top: "8%", img: 0, flip: false, size: 64 },
    { delay: 5, duration: 34, top: "18%", img: 2, flip: true, size: 54 },
    { delay: 11, duration: 30, top: "28%", img: 1, flip: false, size: 70 },
    { delay: 17, duration: 38, top: "38%", img: 0, flip: true, size: 60 },
    { delay: 3, duration: 32, top: "48%", img: 2, flip: false, size: 66 },
    { delay: 9, duration: 36, top: "58%", img: 0, flip: true, size: 56 },
    { delay: 14, duration: 28, top: "68%", img: 1, flip: false, size: 64 },
    { delay: 20, duration: 42, top: "78%", img: 2, flip: true, size: 50 },
    { delay: 7, duration: 30, top: "88%", img: 1, flip: false, size: 72 },
    { delay: 22, duration: 33, top: "55%", img: 0, flip: false, size: 48 },
  ];
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {butterflies.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: b.top }}
          initial={{ x: b.flip ? "110vw" : "-10vw" }}
          animate={{
            x: b.flip ? "-15vw" : "115vw",
            y: [0, -40, 20, -30, 0],
          }}
          transition={{
            x: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ButterflyImg src={BUTTERFLY_IMAGES[b.img]} size={b.size} flip={b.flip} />
        </motion.div>
      ))}
    </div>
  );
}

function ButterflyImg({ src, size, flip }: { src: string; size: number; flip: boolean }) {
  return (
    <motion.div
      animate={{ scaleX: flip ? [-1, -0.35, -1] : [1, 0.35, 1] }}
      transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: size,
        filter: "drop-shadow(0 4px 8px rgba(168,85,247,0.4))",
      }}
    >
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: "auto", display: "block" }}
        draggable={false}
      />
    </motion.div>
  );
}

export function FlowerMeadow() {
  return (
    <div className="fixed bottom-0 left-0 right-0 -z-10 pointer-events-none">
      <svg viewBox="0 0 1440 240" className="w-full h-auto" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
        </defs>

        {/* back hill */}
        <path
          d="M0,160 C200,110 400,140 720,120 C1040,100 1240,150 1440,130 L1440,240 L0,240 Z"
          fill="url(#hill2)"
        />
        {/* front hill */}
        <path
          d="M0,200 C200,150 400,180 720,160 C1040,140 1240,190 1440,170 L1440,240 L0,240 Z"
          fill="url(#hill)"
        />

        {/* mushrooms */}
        {[
          { x: 120, scale: 1 },
          { x: 280, scale: 0.7 },
          { x: 540, scale: 1.2 },
          { x: 880, scale: 0.85 },
          { x: 1180, scale: 1.05 },
          { x: 1340, scale: 0.7 },
        ].map((m, i) => (
          <g key={i} transform={`translate(${m.x},${175}) scale(${m.scale})`}>
            <rect x="-6" y="0" width="12" height="20" rx="3" fill="#fef3c7" />
            <ellipse cx="0" cy="0" rx="22" ry="14" fill="url(#capGrad)" />
            <circle cx="-10" cy="-3" r="3" fill="white" opacity="0.85" />
            <circle cx="6" cy="-6" r="2.5" fill="white" opacity="0.85" />
            <circle cx="9" cy="2" r="2" fill="white" opacity="0.85" />
            <circle cx="-4" cy="-7" r="1.8" fill="white" opacity="0.85" />
          </g>
        ))}

        {/* tall flowers */}
        {[
          { x: 80, color: "#f9a8d4", center: "#fde68a" },
          { x: 200, color: "#c4b5fd", center: "#fde68a" },
          { x: 380, color: "#fcd34d", center: "#fb923c" },
          { x: 640, color: "#fca5a5", center: "#fde68a" },
          { x: 760, color: "#a5f3fc", center: "#fde68a" },
          { x: 980, color: "#ddd6fe", center: "#fcd34d" },
          { x: 1240, color: "#f9a8d4", center: "#fde68a" },
          { x: 1400, color: "#c4b5fd", center: "#fde68a" },
        ].map((f, i) => (
          <g key={i} transform={`translate(${f.x},${190})`}>
            <line x1="0" y1="0" x2="0" y2="-30" stroke="#15803d" strokeWidth="2" />
            <ellipse cx="-2" cy="-15" rx="5" ry="3" fill="#22c55e" transform="rotate(-30 -2 -15)" />
            {/* Flower petals */}
            <circle cx="-6" cy="-30" r="5" fill={f.color} />
            <circle cx="6" cy="-30" r="5" fill={f.color} />
            <circle cx="0" cy="-36" r="5" fill={f.color} />
            <circle cx="0" cy="-24" r="5" fill={f.color} />
            <circle cx="0" cy="-30" r="3.5" fill={f.center} />
          </g>
        ))}

        {/* tulips along the meadow */}
        {[
          { x: 150, color: "#f472b6", scale: 1.2 },
          { x: 320, color: "#fb7185", scale: 1 },
          { x: 460, color: "#fbbf24", scale: 1.1 },
          { x: 580, color: "#a78bfa", scale: 0.95 },
          { x: 720, color: "#f472b6", scale: 1.15 },
          { x: 860, color: "#fcd34d", scale: 1 },
          { x: 1040, color: "#fda4af", scale: 1.2 },
          { x: 1140, color: "#c084fc", scale: 0.95 },
          { x: 1320, color: "#fb7185", scale: 1.1 },
        ].map((t, i) => (
          <g
            key={`tulip-${i}`}
            transform={`translate(${t.x},${195}) scale(${t.scale})`}
          >
            {/* stem */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-40"
              stroke="#15803d"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* leaf */}
            <ellipse
              cx="-5"
              cy="-18"
              rx="4"
              ry="9"
              fill="#22c55e"
              transform="rotate(-30 -5 -18)"
            />
            <ellipse
              cx="5"
              cy="-22"
              rx="3.5"
              ry="7"
              fill="#16a34a"
              transform="rotate(30 5 -22)"
              opacity="0.8"
            />
            {/* tulip bulb — outer petals */}
            <path
              d="M-9,-40 Q-10,-52 -3,-58 Q0,-60 3,-58 Q10,-52 9,-40 Q4,-36 0,-36 Q-4,-36 -9,-40 Z"
              fill={t.color}
            />
            {/* inner petal */}
            <path
              d="M-4,-42 Q-3,-52 0,-56 Q3,-52 4,-42 Q2,-38 0,-38 Q-2,-38 -4,-42 Z"
              fill={t.color}
              opacity="0.65"
            />
            {/* highlight */}
            <ellipse cx="-4" cy="-50" rx="1.8" ry="3.5" fill="white" opacity="0.55" />
          </g>
        ))}

        {/* grass tufts */}
        {Array.from({ length: 36 }, (_, i) => i * 42 + 20).map((x, i) => (
          <g key={`g${i}`}>
            <path
              d={`M${x},230 Q${x - 4},220 ${x - 6},212 M${x},230 Q${x + 1},218 ${x + 2},210 M${x},230 Q${x + 6},220 ${x + 8},213`}
              stroke="#15803d"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function GoldCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={`absolute w-14 h-14 ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id="goldCorner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M10 70 Q10 30 40 20 Q50 18 60 22 M14 60 Q20 40 40 32 Q55 28 64 34"
        stroke="url(#goldCorner)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="14" cy="62" r="3" fill="url(#goldCorner)" />
      <circle cx="26" cy="50" r="2.2" fill="url(#goldCorner)" />
      <circle cx="42" cy="34" r="3" fill="url(#goldCorner)" />
    </svg>
  );
}

export function GildedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[2rem] overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(145deg, #ffffff 0%, #fef9f3 50%, #fdf2f8 100%)",
        boxShadow:
          "0 30px 80px -20px rgba(168,85,247,0.35), 0 15px 40px -10px rgba(244,114,182,0.3), inset 0 0 0 2px rgba(251,207,232,0.6)",
      }}
    >
      <div
        className="absolute inset-3 rounded-[1.7rem] pointer-events-none"
        style={{
          border: "1px solid rgba(244,114,182,0.3)",
        }}
      />
      <GoldCorner className="top-3 left-3" />
      <GoldCorner className="top-3 right-3 -scale-x-100" />
      <GoldCorner className="bottom-3 left-3 -scale-y-100" />
      <GoldCorner className="bottom-3 right-3 -scale-x-100 -scale-y-100" />
      {children}
    </div>
  );
}

export function FlowerWreath({ size = 90 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ filter: "drop-shadow(0 4px 12px rgba(244,114,182,0.4))" }}
    >
      {/* leaves */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * 360;
        return (
          <ellipse
            key={`l${i}`}
            cx="50"
            cy="12"
            rx="3"
            ry="6"
            fill="#22c55e"
            transform={`rotate(${angle} 50 50)`}
            opacity="0.85"
          />
        );
      })}
      {/* flowers */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * 360;
        const colors = ["#f472b6", "#a78bfa", "#fbbf24", "#f9a8d4"];
        const c = colors[i % colors.length];
        return (
          <g key={`f${i}`} transform={`rotate(${angle} 50 50)`}>
            <g transform="translate(50 12)">
              <circle cx="-3.5" cy="0" r="3" fill={c} />
              <circle cx="3.5" cy="0" r="3" fill={c} />
              <circle cx="0" cy="-3.5" r="3" fill={c} />
              <circle cx="0" cy="3.5" r="3" fill={c} />
              <circle cx="0" cy="0" r="2" fill="#fde68a" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
