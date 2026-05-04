import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useLocation } from "wouter";
import { useAudio } from "../App";

const HER_NAME = "Wigatining Ve Utami";
const HER_BIRTHDAY = "2005-05-08";

const NO_PHRASES = [
  "No way!",
  "Really?!",
  "You sure??",
  "I'm so upset!",
  "OMG!",
  "Dont touch me!",
  "Press the other button",
  "Think again!",
];

export default function EditorialLanding() {
  const [, navigate] = useLocation();
  const { playInstrumental } = useAudio();

  // State for the video-style preloader and image loading
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [progressFinished, setProgressFinished] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verification states
  const [showVerification, setShowVerification] = useState(false);
  const [verificationStage, setVerificationStage] = useState("date");
  const [birthday, setBirthday] = useState("");
  const [verifyStatus, setVerifyStatus] = useState("idle");

  const [yesHover, setYesHover] = useState(false);
  const [noText, setNoText] = useState("No");

  const noButtonControls = useAnimationControls();

  // 1. Preload the background image invisibly
  useEffect(() => {
    const img = new Image();
    // Pro-tip: Change this to .webp if you compress the image!
    img.src = "/my-wiga2.png";
    img.onload = () => setBgLoaded(true);
  }, []);

  // 2. Simulate the 0-100% loading sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProgressFinished(true); // Signal that the counter is done
          return 100;
        }
        // Randomize the loading jumps to feel authentic
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Tell TypeScript this variable will hold whatever setTimeout returns
    let timeout: ReturnType<typeof setTimeout>;

    if (progressFinished && bgLoaded) {
      timeout = setTimeout(() => setIsLoading(false), 800);
    }

    // Always return a cleanup function at the end
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [progressFinished, bgLoaded]);

  const handleEnter = () => {
    playInstrumental();
    setShowVerification(true);
  };

  const handleVerifyDate = () => {
    if (birthday === HER_BIRTHDAY) {
      setVerifyStatus("idle");
      setVerificationStage("love");
    } else {
      setVerifyStatus("error");
    }
  };

  const handleVerifyLove = () => {
    setVerifyStatus("success");
    setTimeout(() => navigate("/celebrate"), 5500);
  };

  const moveNoButton = async () => {
    let randomPhrase;
    do {
      randomPhrase = NO_PHRASES[Math.floor(Math.random() * NO_PHRASES.length)];
    } while (randomPhrase === noText);

    setNoText(randomPhrase);

    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 200;

    await noButtonControls.start({
      x: randomX,
      y: randomY,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    });
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-[#132020] text-[#f4e6e1]">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400&display=swap');`}
      </style>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="preloader"
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#eaddce]"
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="text-6xl md:text-8xl tracking-tighter text-[#1e3434]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {loadingProgress.toString().padStart(3, "0")}%
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.1, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: "url('/my-wiga2.png')",
              }}
            />

            <div className="relative z-10 h-full w-full flex flex-col px-6">
              {!showVerification ? (
                <motion.div
                  className="h-full w-full flex flex-col items-center justify-between py-12 text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <div className="mt-8">
                    <p className="text-[25px] uppercase tracking-[0.3em] font-['Playfair'] text-[#eaddce] mb-6">
                      HELLO, MY LOVE
                    </p>
                  </div>

                  <motion.button
                    onClick={handleEnter}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#eaddce",
                      color: "#132020",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mb-8 px-10 py-4 border border-[#eaddce] rounded-full text-sm tracking-widest uppercase font-['Inter'] transition-colors"
                  >
                    Take me to my surprise!!
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  className="max-w-md w-full m-auto bg-[#132020]/80 backdrop-blur-md p-10 border border-[#eaddce]/20 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                  <AnimatePresence mode="wait">
                    {verifyStatus === "success" ? (
                      <motion.h2
                        key="success-stage"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-['Playfair_Display'] leading-relaxed text-[#eaddce]"
                      >
                        I know you love me so much 😉.
                        <br />
                        <span className="text-lg text-[#eaddce]/70 mt-4 inline-block font-light">
                          taking you to your surprise...
                        </span>
                      </motion.h2>
                    ) : verificationStage === "date" ? (
                      <motion.div
                        key="date-stage"
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="text-[#eaddce]"
                      >
                        <h2 className="text-2xl mb-6 font-['Playfair_Display']">
                          Are you the one?
                        </h2>
                        <p className="font-['Inter'] text-sm text-[#eaddce]/60 mb-8 leading-relaxed">
                          Please confirm the date of when the world started to
                          get bright and the sun started to smile
                        </p>

                        <input
                          type="date"
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                          className="w-full bg-transparent border-b border-[#eaddce]/50 px-0 py-2 mb-8 focus:outline-none focus:border-[#eaddce] font-['Inter'] text-center [color-scheme:dark] text-[#eaddce]"
                        />

                        <button
                          onClick={handleVerifyDate}
                          className="w-full py-4 bg-[#eaddce] text-[#132020] uppercase tracking-widest text-xs font-bold transition-opacity hover:opacity-80 rounded-full"
                        >
                          Let me in!
                        </button>

                        {verifyStatus === "error" && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-xs font-['Inter'] text-red-400 tracking-wide"
                          >
                            Incorrect date!! are you an impostor??
                          </motion.p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="love-stage"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center py-4"
                      >
                        <h2 className="text-3xl mb-12 font-['Playfair_Display'] italic">
                          Do you love me?
                        </h2>

                        <div className="relative flex w-full justify-center items-center h-20 gap-6">
                          <motion.button
                            onClick={handleVerifyLove}
                            onMouseEnter={() => setYesHover(true)}
                            onMouseLeave={() => setYesHover(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            layout
                            className="bg-[#eaddce] text-[#132020] uppercase tracking-widest font-bold rounded-full shadow-lg shadow-[#eaddce]/20 transition-all hover:bg-white z-20 flex items-center justify-center text-center px-8 py-4 min-w-[120px] min-h-[52px]"
                          >
                            {yesHover ? (
                              <motion.span
                                key="hovering"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-sm whitespace-nowrap"
                              >
                                yes, yes!! click me!!
                              </motion.span>
                            ) : (
                              <motion.span
                                key="default"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs"
                              >
                                Yes
                              </motion.span>
                            )}
                          </motion.button>

                          <motion.button
                            animate={noButtonControls}
                            onMouseEnter={moveNoButton}
                            onClick={moveNoButton}
                            layout
                            className={`px-10 py-4 border border-[#eaddce]/40 text-[#eaddce]/60 uppercase tracking-widest text-xs rounded-full z-10 bg-[#132020] transition-opacity duration-300 whitespace-nowrap ${
                              yesHover
                                ? "absolute opacity-0 pointer-events-none"
                                : "relative opacity-100"
                            }`}
                          >
                            {noText}
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
