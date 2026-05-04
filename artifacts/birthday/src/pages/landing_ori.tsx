import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useAudio } from "../App";
import { Heart, Sparkles, Flower2, Stars, LockKeyhole } from "lucide-react";
import { Confetti } from "@/components/Confetti";
import {
  FairyWorldSky,
  GildedCard,
  FlowerWreath,
  watercolorButtonStyle,
  watercolorButtonClasses,
} from "@/components/Fairytale";

const HER_NAME = "Wigatining Ve Utami";
// HTML dates format as YYYY-MM-DD
const HER_BIRTHDAY = "2005-05-08";

export default function Landing() {
  const [, navigate] = useLocation();
  const [denied, setDenied] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [yesShake, setYesShake] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [chaseCount, setChaseCount] = useState(0);
  const [noClicked, setNoClicked] = useState(false);
  const [yesHover, setYesHover] = useState(false);

  // New states for the verification step
  const [verifying, setVerifying] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [verifyStatus, setVerifyStatus] = useState("idle"); // 'idle', 'error', 'success'
  const [errorCount, setErrorCount] = useState(0);

  const [, setLocation] = useLocation();
  const { playInstrumental } = useAudio();

  const handleYes = () => {
    playInstrumental(); // <-- Plays the instrumental track
    setYesShake(true);
    setTimeout(() => {
      setVerifying(true);
    }, 600);
  };

  const handleVerify = () => {
    if (birthday === HER_BIRTHDAY) {
      setVerifyStatus("success");
      setConfetti(true);
      setTimeout(() => navigate("/celebrate"), 2800);
    } else {
      setVerifyStatus("error");
      setErrorCount((prev) => prev + 1);
    }
  };

  const handleNoHover = () => {
    if (chaseCount >= 5) return;
    setChaseCount((prev) => prev + 1);
    const jumpDistance = 80;
    const newX = (Math.random() - 0.5) * (jumpDistance * 2);
    const newY = (Math.random() - 0.5) * (jumpDistance * 2);
    setNoPos({ x: newX, y: newY });
  };

  const handleNoClick = () => {
    setDenied(true);
    setNoClicked(true);
    const x = (Math.random() > 0.5 ? 1 : -1) * (260 + Math.random() * 80);
    const y = (Math.random() > 0.5 ? 1 : -1) * (160 + Math.random() * 60);
    setNoPos({ x, y });
  };

  return (
    <main
      className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center px-4 py-20"
      style={{ fontFamily: "'Quicksand', sans-serif" }} // Base font for the whole page
    >
      {/* Automatically import the dreamy fonts from Google */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Quicksand:wght@400;500;600;700&display=swap');`}
      </style>

      <FairyWorldSky />
      <Confetti active={confetti} />

      {/* Floating wreath topper */}
      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
        className="relative z-20 mb-[-45px]"
      >
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FlowerWreath size={90} />
        </motion.div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, type: "spring", bounce: 0.3 }}
        className="relative max-w-2xl w-full z-10"
      >
        <GildedCard className="px-7 py-14 md:px-14 md:py-16 text-center min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!verifying ? (
              <motion.div
                key="greeting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* --- ORIGINAL GREETING CONTENT --- */}
                <div className="flex justify-center gap-3 mb-3 relative">
                  {[
                    { color: "text-rose-400", delay: 0 },
                    { color: "text-amber-400", delay: 0.3 },
                    { color: "text-violet-400", delay: 0.6 },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 20, -20, 0],
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        delay: s.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={s.color}
                    >
                      <Sparkles size={20} fill="currentColor" />
                    </motion.div>
                  ))}
                </div>

                <p
                  className="text-lg md:text-xl font-bold text-rose-500 mb-2"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  ✿ a tiny moment ✿
                </p>

                <motion.h1
                  className="leading-tight mb-4 text-4xl md:text-6xl tracking-wide"
                  style={{
                    fontFamily: "'Berkshire Swash', serif",
                    background:
                      "linear-gradient(120deg, #ec4899 0%, #a855f7 50%, #f472b6 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  Hi, Welcome to my little world
                </motion.h1>

                <p className="text-base md:text-lg text-purple-900/80 mb-6 max-w-md mx-auto leading-relaxed font-medium">
                  Before you come in, I just want to make sure
                  <br className="hidden md:block" />
                  this little surprise found the right person.
                </p>

                <motion.div
                  animate={yesShake ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 0.6, repeat: yesShake ? 2 : 0 }}
                  className="relative my-7 py-7 px-6 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(253,242,248,0.95) 0%, rgba(245,243,255,0.95) 100%)",
                    border: "1.5px dashed rgba(244,114,182,0.55)",
                    boxShadow: "inset 0 2px 4px rgba(168,85,247,0.06)",
                  }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Flower2 size={10} fill="currentColor" /> just checking
                  </div>

                  <p
                    className="text-xl md:text-2xl text-purple-900/80 mb-1"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Are you the one and only
                  </p>

                  <motion.p
                    className="text-3xl md:text-5xl font-bold leading-tight pt-1 pb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      background:
                        "linear-gradient(120deg, #be185d 0%, #db2777 35%, #c026d3 65%, #9333ea 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {HER_NAME}?
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-4 pt-4 border-t border-pink-200/50 flex flex-col items-center gap-1.5"
                  >
                    <p
                      className="text-lg md:text-xl text-purple-900/70"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      Because if you really are her...
                    </p>
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-rose-500"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Do you love me?
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Heart
                          size={20}
                          className="text-rose-400"
                          fill="currentColor"
                        />
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-[80px]">
                  <motion.button
                    layout
                    animate={{
                      scale: 1,
                      y: 0,
                      boxShadow: "0px 0px 0px 0px rgba(251,191,36,0)",
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: [0, -6, 0],
                      boxShadow: [
                        "0px 0px 15px 5px rgba(251,191,36,0.4)",
                        "0px 0px 30px 10px rgba(251,191,36,0.7)",
                        "0px 0px 15px 5px rgba(251,191,36,0.4)",
                      ],
                      transition: {
                        scale: { type: "spring", stiffness: 200, damping: 12 },
                        y: { duration: 1.4, repeat: Infinity },
                        boxShadow: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      },
                    }}
                    whileTap={{ scale: 0.94 }}
                    onMouseEnter={() => setYesHover(true)}
                    onMouseLeave={() => setYesHover(false)}
                    onClick={handleYes}
                    className={`${watercolorButtonClasses("primary", "lg")} relative overflow-visible z-20 flex items-center justify-center min-w-[100px] font-bold`}
                    style={watercolorButtonStyle("primary")}
                  >
                    {yesHover || noClicked ? (
                      <motion.span
                        key="long-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Heart size={18} fill="currentColor" /> Yes, that's me
                        and I love You!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="short-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Yes!
                      </motion.span>
                    )}

                    {yesHover && (
                      <>
                        {[0, 1, 2, 3, 4].map((i) => (
                          <motion.span
                            key={i}
                            className="absolute pointer-events-none text-amber-200"
                            initial={{ opacity: 1, scale: 0 }}
                            animate={{
                              opacity: 0,
                              scale: 1.5,
                              x: Math.cos((i / 5) * Math.PI * 2) * 50,
                              y: Math.sin((i / 5) * Math.PI * 2) * 50,
                            }}
                            transition={{
                              duration: 0.7,
                              repeat: Infinity,
                              delay: i * 0.05,
                            }}
                            style={{ left: "50%", top: "50%" }}
                          >
                            <Sparkles size={14} fill="currentColor" />
                          </motion.span>
                        ))}
                      </>
                    )}

                    {noClicked && (
                      <motion.span
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-300 to-amber-500 text-amber-900 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-md border border-amber-200 font-sans"
                      >
                        Click me!
                      </motion.span>
                    )}
                  </motion.button>

                  <motion.button
                    animate={{
                      x: noPos.x,
                      y: noPos.y,
                      scale: noClicked ? 0.4 : 1,
                      opacity: noClicked ? 0.3 : 1,
                      rotate:
                        chaseCount > 0 && chaseCount < 5 && !noClicked
                          ? [0, -15, 15, -5, 0]
                          : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 14,
                      mass: 0.8,
                    }}
                    onMouseEnter={handleNoHover}
                    onClick={handleNoClick}
                    className={`
                      ${watercolorButtonClasses("ghost", "sm")} 
                      ${noClicked ? "absolute pointer-events-none z-0" : "relative z-10"}
                      transition-colors duration-300 font-semibold
                    `}
                    style={{
                      ...watercolorButtonStyle("ghost"),
                      ...(chaseCount >= 5 && {
                        opacity: 0.7,
                        filter: "grayscale(50%)",
                      }),
                    }}
                  >
                    {chaseCount === 0 && "No, I don't"}
                    {chaseCount === 1 && "Are you sure?"}
                    {chaseCount === 2 && "Really? 🏃💨"}
                    {chaseCount === 3 && "Seriously..."}
                    {chaseCount === 4 && "Cant believe it!"}
                    {chaseCount >= 5 && "Fine, I surrender 🏳️"}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="verification"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="flex flex-col items-center py-4"
              >
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="mb-6 text-pink-400 bg-pink-50 p-4 rounded-full shadow-inner border border-pink-100"
                >
                  <LockKeyhole size={32} />
                </motion.div>

                {verifyStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <h2
                      className="text-3xl md:text-4xl font-bold text-fuchsia-600 mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      I knew it was you all along, my love. ✨
                    </h2>
                    <p
                      className="text-2xl text-purple-900/70"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      Taking you to your surprise...
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex flex-col items-center text-center mb-4">
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-rose-500 text-2xl md:text-3xl mb-3 font-bold"
                        style={{ fontFamily: "'Caveat', cursive" }}
                      >
                        Of course I knew you'd say yes ✨
                      </motion.p>

                      <h2
                        className="text-2xl md:text-3xl font-bold text-purple-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        But wait... I need to be absolutely sure. 🥺
                      </h2>
                    </div>

                    <p className="text-purple-900/80 mb-8 max-w-sm mx-auto leading-relaxed text-base font-medium">
                      Just to prove you're the one... tell me, on what magical
                      day did the universe get a little brighter? 🌸
                    </p>

                    <div className="flex flex-col gap-4 items-center w-full max-w-xs">
                      <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 bg-white/50 text-purple-900 font-bold focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all text-center"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      />

                      <button
                        onClick={handleVerify}
                        className={`${watercolorButtonClasses("primary", "md")} w-full font-bold`}
                        style={watercolorButtonStyle("primary")}
                      >
                        Unlock my surprise 💝
                      </button>

                      <AnimatePresence>
                        {verifyStatus === "error" && (
                          <motion.p
                            key={errorCount}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: [-10, 10, -10, 10, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-sm text-rose-500 font-bold mt-2 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100"
                          >
                            Hmm... that doesn't seem right. Are you an imposter?
                            🤨 Try again, sweetie.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <p
            className="text-xl mt-10 text-purple-900/50 font-bold"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Made with way too much love, just for you.
          </p>
          <p
            className="text-xl mt-10 text-purple-900/50 font-bold"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            ~ ANANTA ~
          </p>
        </GildedCard>
      </motion.div>

      {/* Bottom badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8 flex items-center gap-3 text-purple-900/70 text-sm font-bold z-10"
      >
        <Stars size={14} className="text-amber-500" fill="currentColor" />
        <span>A little surprise is waiting on the other side</span>
        <Stars size={14} className="text-amber-500" fill="currentColor" />
      </motion.div>
    </main>
  );
}
