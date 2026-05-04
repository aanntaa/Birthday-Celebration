import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../App";
import {
  Heart,
  Sparkles,
  Cake,
  Stars,
  ArrowDown,
  Gift,
  PartyPopper,
  Home as HomeIcon,
  Image as ImageIcon,
  ScrollText,
  Mail,
  Gem,
  Flower2,
  Wand2,
  Coffee,
  IceCream,
  Music,
  Film,
  BookOpen,
  Camera,
  ShoppingBag,
  Soup,
  Dices,
  Cookie,
  Volume2,
  VolumeX,
  Motorbike,
  Gamepad, // <-- ADDED THIS BACK TO FIX THE ERROR!
} from "lucide-react";
import { Link } from "wouter";
import { Confetti } from "@/components/Confetti";

const HER_NAME = "Wigatining Ve Utami";
const YEARS_TOGETHER = "2+";
const NICKNAME = "Ve";

const memories = [
  {
    src: "/images/bogor.png",
    title: "Our first Bogor in Jiwan",
    body: "We sat there enjoying the foods and the pool's scenery.",
    rotate: -3,
  },
  {
    src: "/images/seblak.png",
    title: "Our first Seblak",
    body: "You ask me all of sudden to join your Seblak Kuliner",
    rotate: 4,
  },
  {
    src: "/images/GBK.png",
    title: "Picnic Time",
    body: "Its Our 1st Anniversary and our first park date in Hutan Kota GBK.",
    rotate: -2,
  },
  {
    src: "/images/Birthday1.png",
    title: "Your 1st Birthday Treat with me",
    body: "Hunting for freebies together for the first time",
    rotate: 5,
  },
  {
    src: "/images/GalleryArt.png",
    title: "The Art Gallery",
    body: "ROH Project is a must visit place to enjoy art",
    rotate: 3,
  },
  {
    src: "/images/Quantum.png",
    title: "Gaming Together in Quantum",
    body: "It Takes Two and Split Fiction are the best",
    rotate: -4,
  },
];

const quirks = [
  "Berani berisik saat ngerasa ga adil.",
  "Your alarm rings at 4 A.M everyday just to wake me up 🤗.",
  ".",
  ".",
];

const favoriteThings = [
  {
    icon: Coffee,
    title: "Xingfutang",
    note: "Brown Sugar Boba Milk wajib dibeli kalo ke Lippo.",
    color: "#eaddce",
  },
  {
    icon: Cake,
    title: "Chocolate",
    note: "Cake, ice cream, Drink — apapun yang ada coklatnya.",
    color: "#eaddce",
  },
  {
    icon: Soup,
    title: "Indomie",
    note: "Goreng, telur, tanpa sayur. Nikmat No Debat 🤤.",
    color: "#eaddce",
  },
  {
    icon: Film,
    title: "Shark",
    note: "Film Hiu genre favorit 🦈.",
    color: "#eaddce",
  },
  {
    icon: Music,
    title: "Musik",
    note: "Hafal semua genre musik.",
    color: "#eaddce",
  },
  {
    icon: Gamepad,
    title: "Gaming",
    note: "rebahan sambil gaming di hp .",
    color: "#eaddce",
  },
  {
    icon: ShoppingBag,
    title: "Belanja",
    note: "ahlinya pencari Thrift dan diskonan 🛒.",
    color: "#eaddce",
  },
  {
    icon: Camera,
    title: "Photobooth",
    note: "gapernah absen buat photobooth di tempat baru.",
    color: "#eaddce",
  },
  {
    icon: Cookie,
    title: "Kue",
    note: "Nastar tanpa nanas itu wajib.",
    color: "#eaddce",
  },
  {
    icon: BookOpen,
    title: "Late-night talks",
    note: "Voice notes that go on forever. My favorite genre.",
    color: "#eaddce",
  },
  {
    icon: Motorbike,
    title: "Long drives",
    note: "tidur di motor tiap jalan jauh.",
    color: "#eaddce",
  },
  {
    icon: IceCream,
    title: "Boba runs",
    note: "Brown sugar, half sweet, less ice. I'll always order with you.",
    color: "#eaddce",
  },
];

const memoryLane = [
  {
    year: "2023 · Agustus",
    title: "The first hello",
    body: "We met in an Independence Day event as a committee.",
  },
  {
    year: "2023 · Summer",
    title: "Our first 'date' ",
    body: "Hot Seblak with Mixue Drink is a first step toward a happy future.",
  },
  {
    year: "2023 · Autumn",
    title: "First 'I love you'",
    body: "It slipped out before I planned it. You smiled like you'd been waiting for it. I'll remember that smile forever.",
  },
  {
    year: "2024 · Spring",
    title: "Our first little trip",
    body: "We got lost twice, took a hundred photos, and made up a song about a cat. Best weekend of my life.",
  },
  {
    year: "2024 · Winter",
    title: "Surviving everything together",
    body: "Long days, hard weeks, and you still showed up for me with snacks and bad jokes. I love you for that.",
  },
  {
    year: "2026 · Today",
    title: "Your 21st birthday",
    body: "Three years in and you're still my favorite person to wake up thinking about. Here's to many more.",
  },
];

const dateIdeas = [
  "Piknik — Menghilangkan kelam dengan merasakan keindahan alam.",
  "Melukis — Mengubah ambisi menjadi imajinasi yang dituang ke dalam canvas.",
  "Coffee Shop — Seruput kopi di sudut tepi ruangan kafe.",
  "Movie — Nonton film di Cinepolis pake birthday treat.",
  "Kuliner — Explore kuliner yang belum pernah dicoba.",
  "Bogor — ke Surya Kencana lagi (kalo libur panjang).",
  "Gaming Time — booking quantum lanjutin Split Fiction 😅.",
  "Pantai — Enjoy sunset di pantai Aloha PIK.",
  "Pameran — lihat-lihat pameran di Galeri Seni.",
  "Bookstore day — Gramedia buat main TTS.",
  "Birthday Treat — Hunting Birthday treats di Central Park.",
];

function MemoryCard({ src, title, body, rotate, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className={`relative w-64 ${className}`}
    >
      <div className="relative p-3 pb-5 rounded-sm bg-[#132020]/80 backdrop-blur-md border border-[#eaddce]/30 shadow-2xl">
        <div className="w-full h-56 md:h-64 overflow-hidden mb-4 border border-[#eaddce]/20">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover filter grayscale-[20%] sepia-[10%]"
          />
        </div>
        <p className="text-center text-lg mb-2 font-['Playfair_Display'] italic text-[#eaddce]">
          {title}
        </p>
        <p className="text-center text-xs px-2 leading-relaxed font-['Inter'] text-[#eaddce]/70">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

function StickyNote({ children, rotate, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, rotate: rotate - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.06, rotate: 0, y: -6 }}
      transition={{ type: "spring", stiffness: 130 }}
      className={`relative w-60 ${className}`}
    >
      <div className="bg-[#1a2b2b]/90 backdrop-blur-md p-6 pt-8 shadow-2xl border border-[#eaddce]/20 rounded-sm">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#eaddce]/20 backdrop-blur-xl shadow-md" />
        <p className="text-lg md:text-xl leading-relaxed text-center font-['Playfair_Display'] italic text-[#eaddce]">
          "{children}"
        </p>
      </div>
    </motion.div>
  );
}

// Reusable Editorial Button
const EditorialButton = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = "",
}) => (
  <motion.button
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    whileHover={{ scale: 1.05, backgroundColor: "#eaddce", color: "#132020" }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`px-8 py-4 border border-[#eaddce] text-[#eaddce] rounded-full text-xs tracking-widest uppercase font-['Inter'] transition-colors flex items-center justify-center gap-2 ${className}`}
  >
    {children}
  </motion.button>
);

export default function Home() {
  const {
    playCover,
    playInstrumental,
    isMuted,
    toggleMute,
    volume,
    setVolume,
    currentTrack,
  } = useAudio();

  const [showConfetti, setShowConfetti] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const [currentSweet, setCurrentSweet] = useState(
    "Your laugh is honestly pure magic.",
  );
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [heartBurstKey, setHeartBurstKey] = useState(0);
  const [flippedFave, setFlippedFave] = useState<number | null>(null);
  const [dateIdeaIndex, setDateIdeaIndex] = useState<number | null>(null);
  const [diceRolling, setDiceRolling] = useState(false);

  const rollDice = () => {
    setDiceRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setDateIdeaIndex(Math.floor(Math.random() * dateIdeas.length));
      count++;
      if (count > 8) {
        clearInterval(interval);
        setDiceRolling(false);
      }
    }, 80);
  };

  const handleSurpriseClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const generateSweetThing = () => {
    const subjects = [
      "Your laugh",
      "The way you look at me",
      "Your kindness",
      "Every moment with you",
      "The sound of your voice",
      "Your energy",
    ];
    const middles = [
      "always makes me feel like",
      "is honestly",
      "somehow becomes",
      "reminds me of",
      "is absolute proof of",
      "has this beautiful way of being",
    ];
    const endings = [
      "pure magic.",
      "the absolute best part of my day.",
      "sunshine on a rainy day.",
      "home.",
      "everything I could ever ask for.",
      "the reason I smile so much.",
    ];
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    return `${pickRandom(subjects)} ${pickRandom(middles)} ${pickRandom(endings)}`;
  };

  const nextSweet = () => {
    let newSweet = generateSweetThing();
    while (newSweet === currentSweet) {
      newSweet = generateSweetThing();
    }
    setCurrentSweet(newSweet);
  };

  const addLove = () => {
    setLoveCount((c) => c + 1);
    setHeartBurstKey((k) => k + 1);
  };

  const navItems = [
    { href: "#hero", icon: HomeIcon, label: "Home" },
    { href: "#memories", icon: ImageIcon, label: "Us" },
    { href: "#timeline", icon: BookOpen, label: "Timeline" },
    { href: "#funny", icon: ScrollText, label: "Quirks" },
    { href: "#faves", icon: Heart, label: "Faves" },
    { href: "#surprises", icon: Gem, label: "Gifts" },
    { href: "#dates", icon: Dices, label: "Dates" },
    { href: "#cake", icon: Cake, label: "Cake" },
    { href: "#letter", icon: Mail, label: "Letter" },
  ];

  return (
    <main className="min-h-screen w-full relative overflow-x-hidden bg-[#132020] text-[#eaddce] selection:bg-[#eaddce]/30">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400&display=swap');`}
      </style>

      {/* BACKGROUND IMAGE WITH DARK OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#132020]/90 opacity-50 z-10 backdrop-blur-[2px]" />
        <div
          className="absolute inset-0 bg-cover bg-center z-0 "
          style={{ backgroundImage: "url('/fairy-bg.png')" }}
        />
      </div>

      <Confetti active={showConfetti} />

      {/* TOP NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#132020]/80 backdrop-blur-md border-b border-[#eaddce]/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-['Playfair_Display'] italic text-xl hover:opacity-80 transition-opacity text-[#eaddce]"
          >
            <Flower2 size={20} className="text-[#eaddce]/70" />
            <span className="hidden sm:inline">
              For {HER_NAME.split(" ")[0]}
            </span>
          </Link>
          <div className="flex items-center gap-1 md:gap-3 text-xs tracking-widest uppercase font-['Inter'] text-[#eaddce]/70">
            {navItems.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-2 rounded-full hover:bg-[#eaddce]/10 hover:text-[#eaddce] transition-colors flex items-center gap-2"
              >
                <Icon size={14} />
                <span className="hidden md:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="min-h-[100dvh] flex flex-col items-center justify-center relative px-4 py-20 z-10 scroll-mt-20"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/70 mb-8"
        >
          Today is the day
        </motion.p>

        {/* Photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="relative mb-12 w-52 h-52 md:w-64 md:h-64"
        >
          <div className="absolute inset-0 rounded-full border border-[#eaddce]/30 p-2">
            <div className="w-full h-full rounded-full overflow-hidden border border-[#eaddce]/20 relative group">
              <div className="absolute inset-0 bg-[#132020]/20 group-hover:bg-transparent transition-all duration-500 z-10" />
              <img
                src="/images/flowers.png"
                alt={HER_NAME}
                className="w-full h-full object-cover filter grayscale-[20%] sepia-[10%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-['Playfair_Display'] italic leading-tight mb-4 text-5xl md:text-7xl lg:text-8xl text-[#eaddce]">
            Happy Birthday,
          </h1>
          <h2 className="font-['Playfair_Display'] leading-tight mb-8 text-4xl md:text-6xl text-[#eaddce]/90">
            {HER_NAME}
          </h2>

          <p className="text-sm md:text-base text-[#eaddce]/60 max-w-xl mx-auto leading-relaxed font-['Inter'] tracking-wide">
            Twenty-one blooms so perfectly on you.
            <br className="hidden md:block" />
            I built this tiny magical world hidden in the web,
            <br className="hidden md:block" />
            hoping to bring your day a gentle and soft smile to wake up to.
            <br className="hidden md:block" />
            Scroll down — it's all for you.
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-3 text-[#eaddce]/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] font-['Inter'] tracking-[0.2em] uppercase">
            Keep going
          </span>
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* MEMORIES */}
      <section
        id="memories"
        className="py-28 px-4 md:px-12 relative z-10 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/60 mb-4">
              A few of our days
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] italic text-[#eaddce]">
              Some of our moments
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {memories.map((m, i) => (
              <MemoryCard key={i} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        id="timeline"
        className="py-28 px-4 md:px-12 relative z-10 scroll-mt-20 bg-[#eaddce]/5 border-y border-[#eaddce]/10"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/60 mb-4">
              {YEARS_TOGETHER} years of us
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] italic text-[#eaddce]">
              How we got here
            </h2>
          </motion.div>

          <div className="relative">
            {/* The vertical timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#eaddce]/20 -translate-x-1/2" />

            {memoryLane.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 mb-16 md:mb-24 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-[45%] w-full pl-12 md:pl-0">
                    <div
                      className={`p-8 bg-[#132020]/60 backdrop-blur-md border border-[#eaddce]/20 rounded-sm ${isLeft ? "md:text-right" : "md:text-left"}`}
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] font-['Inter'] text-[#eaddce]/50 mb-3">
                        {m.year}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] text-[#eaddce] mb-4">
                        {m.title}
                      </h3>
                      <p className="text-[#eaddce]/70 text-sm leading-relaxed font-['Inter']">
                        {m.body}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-4 md:static md:w-[10%] flex justify-center -translate-x-1/2 md:translate-x-0">
                    <div className="w-4 h-4 rounded-full bg-[#132020] border-2 border-[#eaddce] z-10" />
                  </div>

                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUIRKS */}
      <section
        id="funny"
        className="py-28 px-4 relative z-10 scroll-mt-20 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/60 mb-4">
              The little things
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] italic text-[#eaddce] mb-4">
              Things I love about you
            </h2>
            <p className="text-sm font-['Inter'] text-[#eaddce]/50">
              (Even the weird stuff)
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 p-4">
            {quirks.map((q, i) => (
              <StickyNote
                key={i}
                rotate={i % 2 === 0 ? 3 : -4}
                className={i % 2 === 0 ? "mt-4" : "-mt-4"}
              >
                {q}
              </StickyNote>
            ))}
          </div>
        </div>
      </section>

      {/* FAVES DASHBOARD */}
      <section
        id="faves"
        className="py-28 px-4 md:px-12 relative z-10 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/60 mb-4">
              Tap any card
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] italic text-[#eaddce] mb-4">
              Your favorite things
            </h2>
            <p className="text-sm font-['Inter'] text-[#eaddce]/50">
              All the little things that make your face light up.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {favoriteThings.map((fave, i) => {
              const Icon = fave.icon;
              const isFlipped = flippedFave === i;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: (i % 4) * 0.06,
                    type: "spring",
                    bounce: 0.3,
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFlippedFave(isFlipped ? null : i)}
                  className="relative h-40 w-full rounded-sm p-4 flex flex-col items-center justify-center text-center transition-all duration-300 bg-[#132020]/60 backdrop-blur-md border border-[#eaddce]/20 hover:border-[#eaddce]/50 group"
                >
                  <AnimatePresence mode="wait">
                    {!isFlipped ? (
                      <motion.div
                        key="front"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <div className="p-3 border border-[#eaddce]/20 rounded-full bg-[#eaddce]/5 text-[#eaddce] group-hover:bg-[#eaddce] group-hover:text-[#132020] transition-colors">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <span className="font-['Playfair_Display'] italic text-lg text-[#eaddce]">
                          {fave.title}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center h-full px-2"
                      >
                        <p className="text-sm font-['Inter'] leading-relaxed text-[#eaddce]/90">
                          {fave.note}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAKE */}
      <section
        id="cake"
        className="py-28 px-4 relative z-10 scroll-mt-20 bg-[#eaddce]/5 border-y border-[#eaddce]/10"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/60 mb-4">
            Make a wish
          </p>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] italic text-[#eaddce] mb-12">
            A virtual slice
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => {
                if (!candlesBlown) {
                  setCandlesBlown(true);
                  playCover();
                  setShowConfetti(true);
                  setTimeout(() => setShowConfetti(false), 4000);
                }
              }}
              className="relative z-10 group"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center bg-[#132020]/80 border border-[#eaddce]/30 backdrop-blur-md relative overflow-hidden transition-all group-hover:border-[#eaddce]/60 group-hover:scale-105">
                <Cake size={80} className="text-[#eaddce]" strokeWidth={1} />
                <AnimatePresence>
                  {!candlesBlown && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0, y: -20 }}
                      className="absolute top-10 left-1/2 -translate-x-1/2 text-[#eaddce]"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Stars size={24} fill="currentColor" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!candlesBlown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <div className="inline-flex items-center gap-2 px-6 py-2 border border-[#eaddce]/40 text-[#eaddce] text-xs font-bold uppercase tracking-widest bg-[#132020]/50 backdrop-blur-sm rounded-full">
                    Tap to blow them out
                  </div>
                </motion.div>
              )}
            </button>

            <AnimatePresence>
              {candlesBlown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-10 overflow-hidden"
                >
                  <p className="font-['Playfair_Display'] italic text-2xl text-[#eaddce]">
                    Happy birthday, beautiful ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* SURPRISES / INTERACTIVE */}
      <section id="surprises" className="py-28 px-4 relative z-10 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/60 mb-4">
              Tap, click, play
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] italic text-[#eaddce] mb-4">
              Tiny gifts
            </h2>
            <p className="text-sm font-['Inter'] text-[#eaddce]/50">
              Three little things I hid in here just for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Sweet thing generator */}
            <div className="p-8 bg-[#132020]/60 backdrop-blur-md border border-[#eaddce]/20 rounded-sm">
              <div className="relative flex flex-col items-center text-center">
                <Wand2
                  size={32}
                  className="text-[#eaddce] mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="font-['Playfair_Display'] italic text-2xl mb-6 text-[#eaddce]">
                  Magic Words
                </h3>
                <div className="h-28 flex items-center justify-center mb-8 w-full px-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentSweet}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="text-lg text-[#eaddce]/90 leading-snug font-['Inter'] italic"
                    >
                      "{currentSweet}"
                    </motion.p>
                  </AnimatePresence>
                </div>
                <EditorialButton onClick={nextSweet}>
                  Tell me another one <Sparkles size={14} />
                </EditorialButton>
              </div>
            </div>

            {/* Confetti / Love button */}
            <div className="flex flex-col gap-8">
              <div className="p-8 bg-[#132020]/60 backdrop-blur-md border border-[#eaddce]/20 rounded-sm flex flex-col items-center text-center justify-center flex-1">
                <h3 className="font-['Playfair_Display'] italic text-2xl mb-6 text-[#eaddce]">
                  Instant Party
                </h3>
                <EditorialButton onClick={handleSurpriseClick}>
                  Tap to celebrate <PartyPopper size={14} />
                </EditorialButton>
              </div>

              <div className="p-8 bg-[#132020]/60 backdrop-blur-md border border-[#eaddce]/20 rounded-sm flex flex-col items-center text-center justify-center flex-1 relative overflow-hidden">
                <h3 className="font-['Playfair_Display'] italic text-2xl mb-8 text-[#eaddce]">
                  How much do you love me?
                </h3>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={addLove}
                    className="w-16 h-16 rounded-full flex items-center justify-center border border-[#eaddce] text-[#eaddce] hover:bg-[#eaddce] hover:text-[#132020] transition-colors relative z-20"
                  >
                    <Heart
                      size={24}
                      fill="currentColor"
                      className="opacity-80"
                    />
                  </motion.button>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-32 flex justify-center">
                    <AnimatePresence>
                      {loveCount > 0 && (
                        <motion.span
                          key={loveCount}
                          initial={{
                            opacity: 0,
                            y: 0,
                            scale: 0.5,
                            rotate: -20,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            y: -80,
                            scale: 1.5,
                            rotate: 10,
                          }}
                          transition={{ duration: 1 }}
                          className="absolute text-3xl font-['Playfair_Display'] italic text-[#eaddce]"
                        >
                          +{loveCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-6 text-xs font-['Inter'] text-[#eaddce]/50 uppercase tracking-widest">
                  Current count:{" "}
                  <span className="text-[#eaddce] text-base ml-2">
                    {loveCount}
                  </span>
                </div>

                {/* 100 LOVE SURPRISE OVERLAY */}
                <AnimatePresence>
                  {loveCount >= 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#132020]/95 backdrop-blur-md"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-[#eaddce]"
                      >
                        <Heart size={60} fill="currentColor" />
                      </motion.div>
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-6 text-2xl font-['Playfair_Display'] italic text-[#eaddce]"
                      >
                        100 Loves!
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-2 text-sm font-['Inter'] text-[#eaddce]/70"
                      >
                        I love you more than that.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DATE ROULETTE */}
      <section
        id="dates"
        className="py-28 px-4 relative z-10 scroll-mt-20 bg-[#eaddce]/5 border-y border-[#eaddce]/10"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/60 mb-4">
            Adventure roulette
          </p>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] italic text-[#eaddce] mb-4">
            What should we do next?
          </h2>
          <p className="text-sm font-['Inter'] text-[#eaddce]/50 mb-12">
            Roll the dice and the universe picks our next little date.
          </p>

          <div className="w-full p-8 md:p-14 bg-[#132020]/60 backdrop-blur-md border border-[#eaddce]/20 rounded-sm">
            <div className="min-h-[160px] flex items-center justify-center">
              {dateIdeaIndex === null ? (
                <button onClick={rollDice} className="group relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 border border-[#eaddce]/40 bg-[#eaddce]/5 rounded-sm flex items-center justify-center text-[#eaddce] group-hover:bg-[#eaddce] group-hover:text-[#132020] transition-all duration-300 mx-auto"
                  >
                    <Dices size={40} strokeWidth={1} />
                  </motion.div>
                  <p className="mt-6 text-xs font-['Inter'] text-[#eaddce]/60 uppercase tracking-widest group-hover:text-[#eaddce] transition-colors">
                    Tap to roll
                  </p>
                </button>
              ) : (
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    {diceRolling ? (
                      <motion.div
                        key="rolling"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotate: [0, 10, -10, 0],
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#eaddce] flex justify-center"
                      >
                        <Dices size={48} strokeWidth={1} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="py-4"
                      >
                        <p className="text-2xl md:text-3xl leading-snug font-['Playfair_Display'] italic text-[#eaddce]">
                          "{dateIdeas[dateIdeaIndex]}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {dateIdeaIndex !== null && !diceRolling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 flex justify-center"
              >
                <EditorialButton onClick={rollDice}>
                  Roll again <Dices size={14} />
                </EditorialButton>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* LETTER */}
      <section id="letter" className="py-28 px-4 relative z-10 scroll-mt-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="text-xs tracking-[0.3em] uppercase font-['Inter'] text-[#eaddce]/60 mb-4">
            Just for you
          </p>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] italic text-[#eaddce] mb-12 text-center">
            A little note
          </h2>

          <div className="w-full p-8 md:p-16 relative overflow-hidden bg-[#132020]/80 backdrop-blur-md border border-[#eaddce]/20 rounded-sm">
            <div className="relative z-10 space-y-8 text-[#eaddce]/80 leading-relaxed font-['Inter'] font-light">
              <p className="text-2xl md:text-3xl font-['Playfair_Display'] italic text-[#eaddce] mb-8">
                Hi {NICKNAME},
              </p>

              <div className="text-sm md:text-base space-y-6">
                <p>
                  I wanted to give you something you could keep. Something you
                  could open up whenever you're having a bad day, or feeling a
                  little overwhelmed, or just need to be reminded of exactly how
                  much you are loved.
                </p>
                <p>Because you are loved. So much. Ridiculously so.</p>
                <p>
                  Thank you for the late nights, the silly jokes, the way you
                  always know how to make everything feel okay. The last{" "}
                  {YEARS_TOGETHER} years have been my absolute favorite, just
                  because you were in them.
                </p>
                <p>
                  I hope 21 brings you everything soft and beautiful in the
                  world, because that's exactly what you deserve.
                </p>
              </div>

              <div className="pt-12 border-t border-[#eaddce]/20 mt-12 flex justify-between items-end">
                <div className="text-xl md:text-2xl font-['Playfair_Display'] italic text-[#eaddce]">
                  <p className="mb-2 text-[#eaddce]/60 font-['Inter'] text-sm not-italic uppercase tracking-widest">
                    Yours always,
                  </p>
                  <p>Me.</p>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-14 h-14 rounded-full border border-[#eaddce]/30 flex items-center justify-center bg-[#eaddce]/5 text-[#eaddce]"
                >
                  <Heart size={20} fill="currentColor" className="opacity-50" />
                </motion.div>
              </div>
            </div>
          </div>

          <p className="text-center mt-16 text-[10px] tracking-[0.2em] uppercase font-['Inter'] text-[#eaddce]/40">
            Made with all the love in the world
          </p>
        </div>
      </section>

      {/* FLOATING AUDIO CONTROLS */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3 items-start">
        <AnimatePresence>
          {showAudioMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-[#132020]/90 backdrop-blur-md p-5 rounded-sm border border-[#eaddce]/20 shadow-2xl flex flex-col gap-6 w-64"
            >
              {/* Volume Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-['Inter'] text-[#eaddce]/60 uppercase tracking-[0.2em]">
                    Volume
                  </label>
                  <button
                    onClick={toggleMute}
                    className="text-[#eaddce]/80 hover:text-[#eaddce] transition-colors"
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-[#eaddce] cursor-pointer h-1 bg-[#eaddce]/20 appearance-none rounded-full"
                />
              </div>

              {/* Song Select */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-['Inter'] text-[#eaddce]/60 uppercase tracking-[0.2em]">
                  Now Playing
                </label>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={playInstrumental}
                    className={`text-xs font-['Inter'] tracking-wide text-left px-3 py-2.5 transition-colors border-l-2 ${
                      currentTrack === "instrumental"
                        ? "border-[#eaddce] text-[#eaddce] bg-[#eaddce]/10"
                        : "border-transparent text-[#eaddce]/50 hover:bg-[#eaddce]/5 hover:text-[#eaddce]"
                    }`}
                  >
                    Instrumental Version
                  </button>
                  <button
                    onClick={playCover}
                    className={`text-xs font-['Inter'] tracking-wide text-left px-3 py-2.5 transition-colors border-l-2 ${
                      currentTrack === "cover"
                        ? "border-[#eaddce] text-[#eaddce] bg-[#eaddce]/10"
                        : "border-transparent text-[#eaddce]/50 hover:bg-[#eaddce]/5 hover:text-[#eaddce]"
                    }`}
                  >
                    Vocal Cover
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          onClick={() => setShowAudioMenu(!showAudioMenu)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#132020]/80 backdrop-blur-md border border-[#eaddce]/30 text-[#eaddce] hover:bg-[#eaddce] hover:text-[#132020] transition-colors"
        >
          <Music size={20} strokeWidth={1.5} />
        </motion.button>
      </div>
    </main>
  );
}
