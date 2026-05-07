import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useAudio } from "../App";
import { toPng } from "html-to-image";
import "../Dice.css";
import {
  Heart,
  Sparkles,
  Cake,
  Stars,
  ArrowDown,
  PartyPopper,
  Home as HomeIcon,
  Image as ImageIcon,
  ScrollText,
  Mail,
  Gem,
  Flower2,
  Wand2,
  Coffee,
  Music,
  Film,
  BookOpen,
  Camera,
  MicVocal,
  ShoppingBag,
  Soup,
  Dices,
  Donut,
  Volume2,
  VolumeX,
  Gamepad,
  Download,
  Plus,
  Brush,
  CarFront,
  Trees,
  PawPrint,
  Star,
  Gift,
} from "lucide-react";
import { Link } from "wouter";
import { Confetti } from "@/components/Confetti";

const HER_NAME = "Wigatining Ve Utami";
const YEARS_TOGETHER = "2+";
const NICKNAME = "Ve";

const memories = [
  {
    src: "/images/Jiwan.jpg",
    title: "Our first Bogor",
    body: "Our first long commute, going to Jiwan Bogor 🚊.",
    rotate: -3,
  },
  {
    src: "/images/Movie.jpg",
    title: "Our Usual Cinema",
    body: "Us watching Mission Impossible and crave our names in a Cola can 🥤",
    rotate: 1,
  },
  {
    src: "/images/Pancake.jpg",
    title: "Birthday Pancake",
    body: "Its you with your birthday pancake in Pancious 🥞.",
    rotate: 2,
  },
  {
    src: "/images/Playtopia.jpg",
    title: "Playtopia",
    body: "Us playing Playtopia Adventure in SPARK 🚀",
    rotate: 5,
  },
  {
    src: "/images/GalleryArt.jpg",
    title: "The Art Gallery",
    body: "Roh Project is one of the best exhibition place we ever visit",
    rotate: 1,
  },
  {
    src: "/images/Quantum.jpg",
    title: "Gaming Time",
    body: "Quantum is your favorite place to play game, even though you never beat me in any game :Þ",
    rotate: -4,
  },
  {
    src: "/images/Picnic.jpg",
    title: "Picnic",
    body: "Its one of your favorite things to do in Hutan Kota GBK",
    rotate: 3,
  },
  {
    src: "/images/Painting.jpg",
    title: "Painting",
    body: "Our 2nd Bogor with our 'Mountain and Sky' painting 🎨",
    rotate: 1,
  },
  {
    src: "/images/Lightshop.jpg",
    title: "Pop-Up Experience",
    body: "Experiencing the 'Light Shop' adventure",
    rotate: -2,
  },
];

const quirks = [
  "You hate being late even for a minute 🕒.",
  "Your alarm rings at 4 A.M sometimes just to wake me up 🤗.",
  "You have a highly competitive nature 💪🏼",
  "You laugh easily di setiap humor receh 😂",
  "You can easily 'click' with anyone you've just met 💖",
];

const favoriteThings = [
  {
    icon: Coffee,
    title: "Drinks",
    note: "Xing Fu Tang lebih dari apapun, sampe request jadi BA nya 😭.",
  },
  {
    icon: Cake,
    title: "Cake",
    note: "Kue apapun yang bercoklat pasti kamu sikat.",
  },
  {
    icon: Soup,
    title: "Food",
    note: "Bebek Ahyar selalu jadi andalan saat lapar (selain indomie tentunya 😅).",
  },
  {
    icon: Film,
    title: "Movie",
    note: "Hobi nonton horror, tapi takut sama setan (×_×).",
  },
  {
    icon: Music,
    title: "Music",
    note: "Playlist lengkap banget, dari genre apa aja kayaknya kamu hafal semua.",
  },
  {
    icon: Gamepad,
    title: "Gaming",
    note: "Paling suka kalau main simulator jadi manajer kaya raya 🤑.",
  },
  {
    icon: ShoppingBag,
    title: "Shopping",
    note: "Suka ke mall buat cuci mata, tapi kalo liat diskon langsung checkout.",
  },
  {
    icon: Camera,
    title: "Photobooth",
    note: "Suka banget foto-foto. sampe kalo photobooth gacukup sekali.",
  },
  {
    icon: Donut,
    title: "Doughnut",
    note: "Selalu ngidam Butter Baby kalo ke Central Park 😋.",
  },
  {
    icon: BookOpen,
    title: "Books",
    note: "Novels dan TTS selalu yang dicari saat ke Gramedia.",
  },
  {
    icon: Flower2,
    title: "Flowers",
    note: "Tulip blooming in pink is what you like the most.",
  },
  {
    icon: MicVocal,
    title: "Karaoke",
    note: "Suka banget karaokean. Belom pulang kalo suara belom abis.",
  },
  {
    icon: Brush,
    title: "Painting",
    note: "Suka melukis dan mewarnai, apalagi kalo gambarnya lucu-lucu.",
  },
  {
    icon: PawPrint,
    title: "Cute Things",
    note: "Suka sama yang lucu2, entah itu blindbox, hewan, anak kecil, dll.",
  },
  {
    icon: CarFront,
    title: "Cars",
    note: "Suka banget sama Civic yang udah di modif karna bentuknya kaya Hiu 😅.",
  },
  {
    icon: Trees,
    title: "Picnic",
    note: "Suka piknik atau bengong di taman.",
  },
];

const memoryLane = [
  {
    year: "2023 · Agustus",
    title: "Our first 'date'",
    body: "You asked me to join you to eat seblak, and thats when our chemistry began to bloom.",
  },
  {
    year: "2023 · Oktober",
    title: "First 'I love you'",
    body: "You made me feel impatient and anxious every day, just so that i would confess to you as soon as possible. and yes, you succeed :)",
  },
  {
    year: "2024 · May",
    title: "First 'Birthday Treat' with me",
    body: "We were celebrating your birthday by going around the mall and claim your treats.",
  },
  {
    year: "2024 · Oktober",
    title: "Our 365 Days",
    body: "It was our first anniversary and we were celebrating it on Hutan Kota GBK.",
  },
  {
    year: "2025 · May",
    title: "Your 582 Days with me",
    body: "Long years, every good and bad day, every laugh and sadness, and you still with me on your 20th Day. Hunting Birthday Treat with me with more preparation 🍜.",
  },
  {
    year: "2026 · Today",
    title: "Your 21st birthday",
    body: "2+ years in and counting, we are still together in your 21st birthday and you're still my favorite person. Happy Birthday to you 𖹭.",
  },
];

const initialDateIdeas = [
  "Piknik Santai — Mencari udara segar ditengah asap kota.",
  "Melukis — Mencoret kanvas, membuat pemandangan. Gimanapun hasilnya kita pajang!!.",
  "Nonton Bioskop — Nonton apa aja yang lagi kamu pengen banget.",
  "Jajan Lagi — Eksplor kuliner yang masuk di wish-list tapi belum sempat kita kunjungin.",
  "Trip Lagi — Ke Bogor udah pernah, kemana lagi nih? Siapin Itinerary-nya ya :D.",
  "Mabar Time — Lets go to Quantum selesain It Takes Two kita!",
  "Main ke Pantai — Nikmatin sunset atau cuma sekedar nikmatin suasana pinggir laut.",
  "Art Exhibition — Cari-cari pameran atau Pop-Up Experience lagi yuk!.",
  "Bookstore Date — Nyari buku seru atau lanjutin ritual kita ngisi TTS bareng.",
  "Birthday Treat — Kalo ini wajib sih! Semua tempat harus dapet!",
];

function FallingPetals() {
  // Generate random petals so they don't all fall in a straight line
  const petals = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`, // Random horizontal start
    animationDuration: 5 + Math.random() * 5, // Fall speed between 5-10s
    delay: Math.random() * 5, // Stagger the start times
    scale: 0.4 + Math.random() * 0.6, // Different sizes
    rotate: Math.random() * 360, // Starting rotation
    sway: (Math.random() - 0.5) * 50, // How much they drift left/right
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-10%] w-3 h-4 bg-gradient-to-br from-[#ffb6c1] to-[#ff6289] opacity-60 shadow-[0_0_10px_rgba(244,151,169,0.5)]"
          // CSS trick to make a div look exactly like a petal!
          style={{ 
            left: petal.left, 
            scale: petal.scale,
            borderTopLeftRadius: '50%',
            borderBottomRightRadius: '50%',
            borderTopRightRadius: '5px',
            borderBottomLeftRadius: '5px'
          }}
          animate={{
            y: ["0vh", "110vh"], // Fall past the bottom of the screen
            x: [0, petal.sway, 0, -petal.sway, 0], // Sway left and right
            rotate: [petal.rotate, petal.rotate + 360], // Tumble while falling
          }}
          transition={{
            y: { duration: petal.animationDuration, delay: petal.delay, repeat: Infinity, ease: "linear" },
            x: { duration: petal.animationDuration / 2, delay: petal.delay, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: petal.animationDuration, delay: petal.delay, repeat: Infinity, ease: "linear" }
          }}
        />
      ))}
    </div>
  );
}

function MemoryCard({
  src,
  title,
  body,
  rotate,
  className = "",
}: {
  src: string;
  title: string;
  body: string;
  rotate: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotate - 6 }}
      whileInView={{ opacity: 0.99, y: 0, rotate }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className={`relative w-64 ${className}`}
    >
      <div className="relative p-3 pb-5 rounded-xl border border-white/50 shadow-[0_8px_30px_rgba(244,151,169,0.25)] group hover:border-white/70 hover:shadow-[0_8px_40px_rgba(244,151,169,0.35)] transition-[border-color,box-shadow] duration-500 ease-out">
        <div className="absolute inset-0 rounded-xl bg-white/40 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/60" />

        <div className="relative z-10">
          <div className="w-full h-56 md:h-64 overflow-hidden mb-4 border border-white/60 rounded-lg">
            <img
              src={src}
              alt={title}
              className="w-full h-full object-cover filter grayscale-[10%] sepia-[20%] hue-rotate-[-10deg]"
            />
          </div>
          <p className="text-center text-xl mb-2 font-['Playfair_Display'] font-bold italic text-[#594a4e]">
            {title}
          </p>
          <p className="text-center text-sm px-2 leading-relaxed font-['Quicksand'] font-semibold text-[#6A5258]">
            {body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StickyNote({
  children,
  rotate,
  className = "",
}: {
  children: React.ReactNode;
  rotate: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, rotate: rotate - 5 }}
      whileInView={{ opacity: 0.99, y: 0, rotate }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.06, rotate: 0, y: -6 }}
      transition={{ type: "spring", stiffness: 130 }}
      className={`relative w-60 ${className}`}
    >
      <div className="relative p-6 pt-8 rounded-xl border border-white/60 shadow-[0_8px_30px_rgba(244,151,169,0.25)] group">
        <div className="absolute inset-0 rounded-xl bg-white/40 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/60" />

        <div className="relative z-10">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/60 backdrop-blur-xl shadow-sm rounded-sm" />
          <p className="text-lg md:text-xl leading-relaxed text-center font-['Playfair_Display'] font-semibold italic text-[#594a4e]">
            "{children}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const EditorialButton = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}) => (
  <motion.button
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative px-8 py-4 rounded-full border border-white/50 text-[#594a4e] shadow-[0_4px_15px_rgba(244,151,169,0.15)] overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl transition-colors duration-500 ease-out group-hover:bg-white/60" />

    <div className="relative z-10 text-sm tracking-widest uppercase font-['Quicksand'] font-bold flex items-center justify-center gap-2">
      {children}
    </div>
  </motion.button>
);

export function PetalBackground() {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    // Generate petals ONCE when the component loads
    const generatedPetals = Array.from({ length: 35 }).map((_, i) => {
      return {
        id: i,
        startX: Math.random() * 100, // Start anywhere horizontally (0 to 100vw)
        startY: -10 - Math.random() * 20, // Start above the screen
        endY: 110 + Math.random() * 20, // End below the screen
        sway: Math.random() * 15 + 5, // Horizontal drift amount
        scale: Math.random() * 0.8 + 0.4, // Assorted sizes
        duration: Math.random() * 10 + 15, // Slow, peaceful fall (15-25 seconds)
        delay: Math.random() * 20, // Staggered start times
        rotationDirection: Math.random() > 0.5 ? 1 : -1, // Spin left or right
      };
    });

    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.startX}vw`,
            y: `${p.startY}vh`,
            scale: p.scale,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: [`${p.startY}vh`, `${p.endY}vh`],
            x: [
              `${p.startX}vw`,
              `${p.startX - p.sway}vw`,
              `${p.startX + p.sway}vw`,
              `${p.startX - p.sway}vw`,
            ],
            rotate: [0, 180 * p.rotationDirection, 360 * p.rotationDirection],
            opacity: [0, 1, 1, 0], // Fade in, stay visible, fade out at the bottom
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
            rotate: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            opacity: {
              duration: p.duration,
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1],
              delay: p.delay,
            },
          }}
          className="absolute drop-shadow-[0_2px_6px_rgba(244,151,169,0.4)] flex items-center justify-center"
        >
          {/* This CSS creates a beautiful organic petal shape! */}
          <div
            className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-[#ffffff] to-[#f497a9] opacity-80"
            style={{ borderRadius: "0 50% 50% 50%" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function VideoSection({ onOpenModal }) {
  return (
    <section
      id="video-moments"
      className="py-28 px-4 relative z-10 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.99, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
            Moments in Motion
          </p>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e] mb-4">
            Another moments of us
          </h2>
        </motion.div>

        {/* Trigger: Vintage Polaroid Style */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.05, rotate: 0, y: -5 }}
          onClick={onOpenModal}
          className="relative w-64 md:w-72 p-4 pb-16 rounded-sm bg-white border border-gray-100 shadow-[0_15px_40px_rgba(244,151,169,0.25)] cursor-pointer group"
        >
          <div className="w-full aspect-[4/5] bg-gray-100 rounded overflow-hidden relative border border-gray-200">
            <img 
              src="/images/Pancake.jpg" 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover filter grayscale-[20%] sepia-[10%] transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="font-['Playfair_Display'] font-bold italic text-2xl text-[#594a4e]">
              Press Play
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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

  const muteBG = () => { if (!isMuted) toggleMute(); };
  const unmuteBG = () => { if (isMuted) toggleMute(); };

  const [showConfetti, setShowConfetti] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [currentSweet, setCurrentSweet] = useState(
    "Selamat ulang tahun sayangku yang cantik :).",
  );
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [flippedFave, setFlippedFave] = useState<number | null>(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // <-- ADD THIS LINE

  const [showGiftModal, setShowGiftModal] = useState(false);
  const [hasOpenedGift, setHasOpenedGift] = useState(false);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoStage, setVideoStage] = useState(0);
  const videoRef = useRef(null);

  const [hasReviewed, setHasReviewed] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [dynamicDateIdeas, setDynamicDateIdeas] = useState(initialDateIdeas);
  const [dateIdeaIndex, setDateIdeaIndex] = useState<number | null>(null);
  const [diceRolling, setDiceRolling] = useState(false);
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [newDateInput, setNewDateInput] = useState("");
  const dateResultRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [butterflies, setButterflies] = useState<
    { id: number; x: number; y: number; scale: number; rotation: number }[]
  >([]);

  const [isRecordingReaction, setIsRecordingReaction] = useState(false);
  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [showRecordingOverlay, setShowRecordingOverlay] = useState(true);

  

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (showGiftModal || showReviewModal || showVideoModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showGiftModal, showReviewModal, showVideoModal]);
  
  useEffect(() => {
    const img = new Image();
    img.src = "/fairy-bg.png"; // or .webp if you converted it!
    img.onload = () => setBgLoaded(true);
  }, []);

  useEffect(() => {
    if (videoStage === 1) {
      const timer = setTimeout(() => {
        setVideoStage(2);
      }, 3500); 
      return () => clearTimeout(timer);
    }
  }, [videoStage]);

  const handleAddCustomDate = () => {
    if (newDateInput.trim()) {
      const newIdeasArray = [...dynamicDateIdeas, newDateInput.trim()];
      setDynamicDateIdeas(newIdeasArray);
      setDateIdeaIndex(newIdeasArray.length - 1); // Instantly show the new idea
      setIsAddingDate(false);
      setNewDateInput("");
    }
  };
  
  const rollDice = () => {
    if (diceRolling) return;
    setDiceRolling(true);

    // Calculate massive spins
    const spinX =
      rotation.x +
      Math.floor(Math.random() * 5 + 5) * 360 +
      Math.floor(Math.random() * 360);
    const spinY =
      rotation.y +
      Math.floor(Math.random() * 5 + 5) * 360 +
      Math.floor(Math.random() * 360);

    setRotation({ x: spinX, y: spinY, z: 0 });

    // --- NEW: SPAWN BUTTERFLIES ---
    const newButterflies = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300, // Fly outwards horizontally
      y: (Math.random() - 1) * 300, // Fly mostly upwards
      scale: Math.random() * 0.8 + 0.5,
      rotation: (Math.random() - 0.5) * 90, // Flutter angle
    }));
    setButterflies(newButterflies);

    // Clear butterflies after 2 seconds so they don't clutter the DOM
    setTimeout(() => setButterflies([]), 2000);
    // ------------------------------

    // Wait 3 seconds for the CSS animation to finish
    setTimeout(() => {
      setDateIdeaIndex(Math.floor(Math.random() * dynamicDateIdeas.length));
      setDiceRolling(false);
    }, 3000);
  };

  const handleScreenshot = async () => {
    if (dateResultRef.current && !isSaving) {
      setIsSaving(true);
      try {
        const dataUrl = await toPng(dateResultRef.current, {
          backgroundColor: "#fdf8f9",
          pixelRatio: 2, // Keeps it high-resolution!
        });
        const link = document.createElement("a");
        link.download = "our-date-idea.png";
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Error taking screenshot:", err);
        // This will now show us the EXACT error if it fails again
        alert(`Uh oh! Couldn't save: ${err}`);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSurpriseClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const startReactionRecording = async () => {
    try {
      // 1. Request screen sharing (Ask the user to share the CURRENT tab)
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { 
          displaySurface: "browser" 
        },
        audio: true,
        // @ts-ignore - Some TS versions might complain about this newer API, but it works in modern browsers
        preferCurrentTab: true 
      });

      // 2. Request camera access
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true, 
      });

      // 3. Show the camera stream in our PIP video element
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = cameraStream;
      }

      // 4. Mix the audio tracks (Web audio + Microphone audio)
      const audioContext = new AudioContext();
      const dest = audioContext.createMediaStreamDestination();
      
      if (screenStream.getAudioTracks().length > 0) {
        audioContext.createMediaStreamSource(screenStream).connect(dest);
      }
      if (cameraStream.getAudioTracks().length > 0) {
        audioContext.createMediaStreamSource(cameraStream).connect(dest);
      }

      // 5. Combine screen video and mixed audio into a single stream
      const combinedStream = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...dest.stream.getAudioTracks()
      ]);

      const recorder = new MediaRecorder(combinedStream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        // Create the video file from the recorded chunks
        const blob = new Blob(chunks, { type: "video/webm" });
        
        // Let the user know it's saving (optional: you could add a toast notification here)
        console.log("Saving reaction to database...");

        try {
          const formData = new FormData();
          formData.append("video", blob, "ve-reaction.webm");
          // You can append other data if needed, like a timestamp or user ID
          formData.append("timestamp", new Date().toISOString());

          const response = await fetch("https://birthday-celebration-q4zo.onrender.com/api/save-reaction", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            console.log("Reaction saved successfully!");
          } else {
            console.error("Failed to save reaction to server.");
          }
        } catch (error) {
          console.error("Upload error:", error);
        }

        // Stop all media tracks and update state
        screenStream.getTracks().forEach((track) => track.stop());
        cameraStream.getTracks().forEach((track) => track.stop());
        setIsRecordingReaction(false);
      };

      // Stop recording automatically if the user stops sharing via browser UI
      screenStream.getVideoTracks()[0].onended = () => {
        if (recorder.state !== "inactive") recorder.stop();
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecordingReaction(true);

    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Failed to start recording. Please allow camera & screen sharing permissions.");
    }
  };

  const stopReactionRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const generateSweetThing = () => {
    const intros = [
      "Jujur aja, ",
      "Kamu tau nggak? ",
      "Kadang aku mikir, ",
      "Tiap kali ngeliat kamu, ",
      "Nggak tau kenapa ya, ",
      "Kalau dipikir-pikir, ",
      "Lucu deh kalau inget-inget, ",
      "Satu hal yang aku sadari, ",
      "Tiap kali kita lagi jalan bareng, ",
      "Mungkin kedengeran klise, tapi ",
      "Setiap kali kepikiran kamu, ",
      "Percaya nggak percaya, ",
      "Buat aku, ",
      "Entah dari kapan, tapi ",
      "Beneran deh, ",
    ];

    const middles = [
      "cara kamu senyum tuh ",
      "dengerin ceritamu tuh ",
      "hal-hal random yang kamu lakuin ",
      "dua tahun lebih bareng kamu tuh ",
      "ada di deket kamu ",
      "suara tawa kamu pas kita lagi nonton tuh ",
      "makan atau jajan bareng kamu tuh ",
      "ngopi santai sambil ngobrol sama kamu tuh ",
      "ngeliat mata kamu pas lagi cerita excited tuh ",
      "nemenin kamu seharian tuh ",
      "momen-momen kecil kita tuh ",
      "kemana-mana motoran bareng kamu tuh ",
      "perhatian-perhatian kecil dari kamu tuh ",
      "bisa bareng terus sama kamu ",
    ];

    const endings = [
      "selalu berhasil bikin aku tenang.",
      "bikin aku ngerasa jadi cowok paling beruntung.",
      "selalu bikin hariku jauh lebih baik.",
      "kayak ngasih tau aku kalau semuanya bakal baik-baik aja.",
      "bikin aku makin sayang sama kamu.",
      "nggak pernah gagal bikin capekku hilang.",
      "selalu jadi bagian terfavorit dari hariku.",
      "bikin aku ngerasa kalau rumah tuh ya di kamu.",
      "selalu bisa bikin aku senyum-senyum sendiri.",
      "nggak akan pernah bisa dituker sama apapun.",
      "selalu bikin aku bersyukur kita bisa bareng.",
      "bikin aku sadar kalau kamu itu segalanya.",
      "jadi alasan utamaku buat selalu semangat.",
      "selalu bikin aku pengen ngasih yang terbaik buat kita.",
    ];

    const pickRandom = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    return `${pickRandom(intros)}${pickRandom(middles)}${pickRandom(endings)}`;
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
  };

  const handleCloseVideo = () => {
    // 1. Force the current video to pause instantly so audio stops
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    // 2. Hide the modal and unmute background music
    setShowVideoModal(false);
    unmuteBG();
    
    // 3. Wait 500ms (for the fade-out animation to finish) before resetting to stage 0
    // This prevents the first video from auto-playing in the background!
    setTimeout(() => {
      setVideoStage(0);
    }, 500);
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
    <main className="min-h-screen w-full relative overflow-x-hidden bg-[#fdf8f9] text-[#594a4e] selection:bg-[#f497a9]/30">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Erica+One&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Quicksand:wght@500;600;700&display=swap');`}
      </style>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-white/45 opacity-55 z-10 backdrop-blur-[2px]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: bgLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/fairy-bg.png')" }}
        />
      </div>

      <PetalBackground />
      <Confetti active={showConfetti} />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/50 shadow-[0_8px_30px_rgba(244,151,169,0.15)] text-[#594a4e] group">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-xl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-['Playfair_Display'] italic font-bold text-xl hover:opacity-80 transition-opacity text-[#594a4e]"
          >
            <Flower2 size={20} className="text-[#f497a9]" />
            <span className="hidden sm:inline">Wiga</span>
          </Link>
          <div className="flex items-center gap-1 md:gap-3 text-xs md:text-sm tracking-widest uppercase font-['Quicksand'] text-[#594a4e] font-bold">
            {navItems.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-2 rounded-full hover:bg-white/70 hover:text-[#594a4e] transition-colors duration-300 ease-out flex items-center gap-2"
              >
                <Icon size={16} strokeWidth={2.5} />
                <span className="hidden md:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        id="hero"
        className="min-h-[100dvh] flex flex-col items-center justify-center relative px-4 pt-32 pb-20 md:py-20 z-10 scroll-mt-20"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.99 }}
          transition={{ delay: 0.6 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-8 mt-10"
        >
          Today is the day
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 0.99, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="relative mb-12 w-52 h-52 md:w-64 md:h-64"
        >
          <div className="relative w-full h-full p-2 rounded-full border border-white/50 shadow-[0_8px_30px_rgba(244,151,169,0.25)] group">
            <div className="absolute inset-0 rounded-full bg-white/40 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/60" />

            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border border-white/60">
              <img
                src="/images/flowers.png" // (Consider changing this to .webp!)
                alt={HER_NAME}
                fetchPriority="high" /* <-- THIS IS THE MAGIC LINE */
                className="w-full h-full object-cover filter grayscale-[10%] sepia-[20%] hue-rotate-[-10deg] transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.99, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-['Playfair_Display'] font-bold italic leading-tight mb-4 text-4xl md:text-6xl lg:text-7xl text-[#594a4e]">
            Happy Birthday,
          </h1>
          <motion.h2
            animate={{ backgroundPosition: ["0% 50%", "300% 50%", "0% 50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="font-['Erica_One'] leading-tight text-5xl md:text-6xl mt-2 tracking-wider 
              bg-gradient-to-r from-[#FAD8AF] via-[#FF6289] to-[#FAD8AF] 
              bg-[length:400%_auto] bg-clip-text text-transparent 
              [filter:drop-shadow(2px_3px_0_#EF3340)] md:[filter:drop-shadow(3px_4px_0_#EF3340)]"
          >
            {HER_NAME}
          </motion.h2>
          <p className="text-base md:text-lg text-[#594a4e] max-w-xl mx-auto leading-relaxed font-['Quicksand'] font-semibold tracking-wide mt-20">
            To the person who holds my heart—Happy 21st 𖹭.
            <br className="hidden md:block" />
            I wanted to give you something as unique as you are,
            <br className="hidden md:block" />
            so I made this surprise to recall our moments together.
            <br className="hidden md:block" />
            Scroll down — it's all for you.
          </p>
        </motion.div>

        <motion.div
          className="absolute mt-4 bottom-0 flex flex-col items-center gap-3 text-[#594a4e]"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-xs md:text-sm font-['Quicksand'] font-bold tracking-[0.2em] uppercase">
            Keep going
          </span>
          <ArrowDown size={20} strokeWidth={2.5} />
        </motion.div>
      </section>

      <section
        id="memories"
        className="py-28 px-4 md:px-12 relative z-10 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.99, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
              A few of our days
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e]">
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

      <section
        id="timeline"
        className="py-28 px-4 md:px-12 relative z-10 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.99, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
              {YEARS_TOGETHER} years of us
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e]">
              How we got here
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/80 -translate-x-1/2 shadow-sm" />
            {memoryLane.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 0.99, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 mb-16 md:mb-24 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-[45%] w-full pl-12 md:pl-0">
                    <div
                      className={`relative p-8 rounded-xl border border-white/50 shadow-[0_8px_30px_rgba(244,151,169,0.2)] group ${isLeft ? "md:text-right" : "md:text-left"}`}
                    >
                      <div className="absolute inset-0 rounded-xl bg-white/40 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/60" />

                      <div className="relative z-10">
                        <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-['Quicksand'] font-bold text-[#6A5258] mb-3">
                          {m.year}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#594a4e] mb-4">
                          {m.title}
                        </h3>
                        <p className="text-[#594a4e] text-base leading-relaxed font-['Quicksand'] font-semibold">
                          {m.body}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-4 md:static md:w-[10%] flex justify-center -translate-x-1/2 md:translate-x-0">
                    <div className="w-5 h-5 rounded-full bg-white border-4 border-[#f497a9] shadow-[0_0_15px_rgba(244,151,169,0.6)] z-10" />
                  </div>
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="funny"
        className="py-28 px-4 relative z-10 scroll-mt-20 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.99, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
              The little
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e] mb-4">
              Things I like about you
            </h2>
            <p className="text-base md:text-lg font-['Quicksand'] font-semibold text-[#6A5258]">
              (few of the many)
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

      <section
        id="faves"
        className="py-28 px-4 md:px-12 relative z-10 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.99, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
              Tap any card
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e] mb-4">
              Your favorite things
            </h2>
            <p className="text-base md:text-lg font-['Quicksand'] font-semibold text-[#6A5258]">
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
                  whileInView={{ opacity: 0.99, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: (i % 4) * 0.06,
                    type: "spring",
                    bounce: 0.3,
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFlippedFave(isFlipped ? null : i)}
                  className="relative h-40 w-full rounded-2xl border border-white/60 shadow-[0_4px_20px_rgba(244,151,169,0.2)] group"
                >
                  <div className="absolute inset-0 rounded-2xl bg-white/40 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/60" />

                  <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                      {!isFlipped ? (
                        <motion.div
                          key="front"
                          initial={{ opacity: 0, rotateY: -90 }}
                          animate={{ opacity: 0.99, rotateY: 0 }}
                          exit={{ opacity: 0, rotateY: 90 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="flex flex-col items-center gap-4"
                        >
                          <div className="p-3 border border-white/70 rounded-full bg-white/70 text-[#594a4e] transition-colors duration-500 group-hover:bg-white shadow-md">
                            <Icon size={28} strokeWidth={2} />
                          </div>
                          <span className="font-['Playfair_Display'] font-bold italic text-xl text-[#594a4e]">
                            {fave.title}
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ opacity: 0, rotateY: 90 }}
                          animate={{ opacity: 0.99, rotateY: 0 }}
                          exit={{ opacity: 0, rotateY: -90 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="flex items-center justify-center h-full px-2"
                        >
                          <p className="text-sm md:text-base font-['Quicksand'] font-bold leading-relaxed text-[#594a4e]">
                            {fave.note}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <VideoSection onOpenModal={() => setShowVideoModal(true)} />

      <section
        id="cake"
        className="py-28 px-4 relative z-10 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
            Make a wish
          </p>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e] mb-12">
            A virtual slice
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.99, scale: 1 }}
            viewport={{ once: true }}
            className="w-full flex flex-col items-center" /* <-- Added centering here */
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
              className="relative z-10 group flex flex-col items-center" /* <-- Added centering here */
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/60 shadow-[0_8px_30px_rgba(244,151,169,0.3)] overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/60" />

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Cake
                    size={88}
                    className="text-[#594a4e]"
                    strokeWidth={1.5}
                  />
                  <AnimatePresence>
                    {!candlesBlown && (
                      <motion.div
                        exit={{ opacity: 0, scale: 0, y: -20 }}
                        className="absolute top-10 left-1/2 -translate-x-1/2 text-[#f497a9]"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 0.99, 0.7],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Stars size={28} fill="currentColor" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!candlesBlown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.99, y: 0 }}
                  className="mt-8"
                >
                  <div className="inline-flex items-center gap-2 px-6 py-3 border border-white/70 text-[#594a4e] text-sm font-bold uppercase tracking-widest bg-white/60 backdrop-blur-xl rounded-full shadow-md transition-colors duration-500 ease-out hover:bg-white/80">
                    Tap to blow them out
                  </div>
                </motion.div>
              )}
            </button>

            <AnimatePresence>
              {candlesBlown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 0.99, height: "auto" }}
                  className="mt-10 overflow-hidden text-center"
                >
                  <p className="font-['Playfair_Display'] font-bold italic text-3xl text-[#594a4e]">
                    Happy birthday, beautiful ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section id="surprises" className="py-28 px-4 relative z-10 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.99, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
              Tap, click, play
            </p>
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e] mb-4">
              Tiny gifts
            </h2>
            <p className="text-base md:text-lg font-['Quicksand'] font-semibold text-[#6A5258]">
              Three little things I hid in here just for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="relative p-8 rounded-xl border border-white/60 shadow-[0_8px_30px_rgba(244,151,169,0.25)] group min-h-[400px] flex flex-col">
              <div className="absolute inset-0 rounded-xl bg-white/30 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/50" />

              <div className="relative z-10 flex flex-col items-center text-center h-full w-full">
                <Wand2
                  size={36}
                  className="text-[#f497a9] mb-6 shrink-0"
                  strokeWidth={2}
                />
                <h3 className="font-['Playfair_Display'] font-bold italic text-3xl mb-6 text-[#594a4e] shrink-0">
                  Magic Words
                </h3>

                {/* Changed to flex-grow to take up empty space, pushing the button down */}
                <div className="flex-grow flex items-center justify-center mb-8 w-full px-2 min-h-[120px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentSweet}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 0.99, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      /* Reduced text size here */
                      className="text-lg md:text-xl text-[#594a4e] leading-snug font-['Quicksand'] font-bold italic"
                    >
                      "{currentSweet}"
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Added wrapper with mt-auto to anchor the button to the bottom */}
                <div className="mt-auto pt-4 shrink-0">
                  <EditorialButton onClick={nextSweet}>
                    Tell me another one <Sparkles size={16} strokeWidth={2.5} />
                  </EditorialButton>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="relative p-8 rounded-xl border border-white/60 shadow-[0_8px_30px_rgba(244,151,169,0.25)] flex-1 flex flex-col items-center justify-center text-center group">
                <div className="absolute inset-0 rounded-xl bg-white/30 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/50" />
                <div className="relative z-10 w-full flex flex-col items-center">
                  <h3 className="flex items-center justify-center gap-3 font-['Playfair_Display'] font-bold italic text-3xl mb-6 text-[#594a4e]">
                    Another Gifts{" "}
                    <Gift
                      className="text-[#f497a9]"
                      size={28}
                      strokeWidth={2}
                    />
                  </h3>
                  <EditorialButton
                    onClick={() => {
                      setHasOpenedGift(true);
                      setShowGiftModal(true);
                      handleSurpriseClick();
                    }}
                  >
                    {hasOpenedGift ? "Opened" : "Tap to open"}
                    {hasOpenedGift && (
                      <PartyPopper
                        size={16}
                        strokeWidth={2.5}
                        className="ml-2"
                      />
                    )}
                  </EditorialButton>
                </div>
              </div>

              <div className="relative p-8 rounded-xl border border-white/60 shadow-[0_8px_30px_rgba(244,151,169,0.25)] flex-1 flex flex-col items-center justify-center text-center overflow-hidden group">
                <div className="absolute inset-0 rounded-xl bg-white/30 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/50" />
                <div className="relative z-10 w-full flex flex-col items-center">
                  <h3 className="font-['Playfair_Display'] font-bold italic text-2xl md:text-3xl mb-8 text-[#594a4e]">
                    How much do you love me?
                  </h3>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={addLove}
                      className="w-20 h-20 rounded-full flex items-center justify-center bg-white/70 border-2 border-white text-[#f497a9] shadow-lg hover:bg-white transition-colors duration-300 relative z-20"
                    >
                      <Heart
                        size={32}
                        fill="currentColor"
                        className="opacity-90"
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
                              opacity: [0, 0.99, 0],
                              y: -90,
                              scale: 1.5,
                              rotate: 10,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute text-4xl font-['Playfair_Display'] font-bold italic text-[#f497a9]"
                          >
                            +{loveCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="mt-6 text-sm font-['Quicksand'] text-[#6A5258] font-bold uppercase tracking-widest">
                    Current count:{" "}
                    <span className="text-[#594a4e] font-extrabold text-xl ml-2">
                      {loveCount}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {loveCount >= 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.99, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-s rounded-xl"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-[#f497a9]"
                      >
                        <Heart size={72} fill="currentColor" />
                      </motion.div>
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.99 }}
                        transition={{
                          delay: 0.3,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="mt-6 text-3xl font-['Playfair_Display'] font-bold italic text-[#594a4e]"
                      >
                        100 Loves!
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.99 }}
                        transition={{
                          delay: 0.5,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="mt-2 text-base md:text-lg font-['Quicksand'] font-bold text-[#6A5258]"
                      >
                        I love you more than that (˶˃𐃷˂˶).
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="dates"
        className="py-28 px-4 relative z-10 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
            Adventure roulette
          </p>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e] mb-4">
            What should we do next?
          </h2>
          <p className="text-base md:text-lg font-['Quicksand'] font-semibold text-[#6A5258] mb-12">
            Roll the dice and let it decide.
          </p>

          <div className="relative w-full p-8 md:p-14 rounded-xl border border-white/60 shadow-[0_8px_30px_rgba(244,151,169,0.25)] group">
            <div className="absolute inset-0 rounded-xl bg-white/40 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/60" />

            <div className="relative z-10 min-h-[160px] flex flex-col items-center justify-center w-full">
              {isAddingDate ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-lg flex flex-col items-center gap-4"
                >
                  <textarea
                    value={newDateInput}
                    onChange={(e) => setNewDateInput(e.target.value)}
                    placeholder="Type your special date idea here..."
                    className="w-full p-4 rounded-xl border border-white/80 bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#f497a9] resize-none text-[#594a4e] font-['Quicksand'] font-semibold placeholder:text-[#594a4e]/50"
                    rows={3}
                  />
                  <div className="flex gap-4">
                    <EditorialButton onClick={handleAddCustomDate}>
                      Save Idea <Heart size={16} strokeWidth={2.5} />
                    </EditorialButton>
                    <button
                      onClick={() => {
                        setIsAddingDate(false);
                        setNewDateInput("");
                      }}
                      className="px-6 py-3 rounded-full text-sm font-['Quicksand'] font-bold uppercase tracking-widest text-[#6A5258] hover:bg-white/50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-6 w-full">
                  {/* THE 3D DICE */}
                  <div className="dice-scene mt-4 mb-8">
                    {/* THE BUTTERFLY BURST */}
                    <AnimatePresence>
                      {butterflies.map((b) => (
                        <motion.div
                          key={b.id}
                          initial={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 0,
                            rotate: 0,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            x: b.x,
                            y: b.y,
                            scale: b.scale,
                            rotate: [0, b.rotation, -b.rotation, b.rotation], // Flapping motion
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="absolute top-1/2 left-1/2 text-3xl z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
                        >
                          🦋
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div
                      className="dice"
                      style={{
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                      }}
                    >
                      <div className="face front">
                        <span className="pip"></span>
                      </div>
                      <div className="face back">
                        <span className="pip"></span>
                        <span className="pip"></span>
                      </div>
                      <div className="face right">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                      </div>
                      <div className="face left">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                      </div>
                      <div className="face top">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                      </div>
                      <div className="face bottom">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                      </div>
                    </div>
                  </div>

                  {/* ONLY SHOW BUTTON IF NOT ROLLING AND NO RESULT YET */}
                  {dateIdeaIndex === null && !diceRolling && (
                    <EditorialButton onClick={rollDice}>
                      Roll to decide <Dices size={16} strokeWidth={2.5} />
                    </EditorialButton>
                  )}

                  {/* SHOW RESULT ONLY AFTER ROLLING STOPS */}
                  <AnimatePresence mode="wait">
                    {dateIdeaIndex !== null && !diceRolling && (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.99, y: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="w-full flex flex-col items-center"
                      >
                        <div
                          ref={dateResultRef}
                          className="py-10 px-6 md:px-12 w-full max-w-xl flex flex-col items-center justify-center bg-[#fdf8f9]/90 rounded-2xl border border-white/60 mb-8 shadow-sm"
                        >
                          <p className="text-xs tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#f497a9] mb-4">
                            Our Date Idea
                          </p>
                          <p className="text-2xl md:text-4xl leading-snug font-['Playfair_Display'] font-bold italic text-[#594a4e]">
                            "{dynamicDateIdeas[dateIdeaIndex]}"
                          </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mt-2">
                          <EditorialButton onClick={rollDice}>
                            Roll again <Dices size={16} strokeWidth={2.5} />
                          </EditorialButton>
                          <EditorialButton onClick={handleScreenshot}>
                            {isSaving ? "Saving..." : "Save Image"}{" "}
                            <Download size={16} strokeWidth={2.5} />
                          </EditorialButton>
                        </div>

                        <button
                          onClick={() => setIsAddingDate(true)}
                          className="mt-6 flex items-center gap-2 text-xs md:text-sm font-['Quicksand'] font-bold uppercase tracking-widest text-[#6A5258] hover:text-[#f497a9] transition-colors"
                        >
                          <Plus size={16} strokeWidth={2.5} /> Or write your own
                          idea
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="letter" className="py-28 px-4 relative z-10 scroll-mt-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center min-h-[600px] justify-center">
          <p className="text-sm tracking-[0.3em] uppercase font-['Quicksand'] font-bold text-[#594a4e] mb-4">
            Just for you
          </p>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold italic text-[#594a4e] mb-12 text-center">
            A little note
          </h2>

          <AnimatePresence mode="wait">
            {!isLetterOpen ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => setIsLetterOpen(true)}
                className="relative w-full max-w-md cursor-pointer group"
              >
                {/* Glassmorphic Envelope Design */}
                <div className="relative h-56 md:h-64 rounded-2xl border border-white/60 shadow-[0_8px_40px_rgba(244,151,169,0.3)] overflow-hidden bg-white/40 backdrop-blur-md transition-all duration-500 group-hover:bg-white/60 group-hover:shadow-[0_8px_50px_rgba(244,151,169,0.4)] group-hover:-translate-y-2">
                  {/* SVG Envelope Flap Lines */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                    viewBox="0 0 400 250"
                    preserveAspectRatio="none"
                  >
                    {/* Top flap */}
                    <path
                      d="M0,0 L200,130 L400,0"
                      fill="rgba(255,255,255,0.4)"
                      stroke="white"
                      strokeWidth="3"
                    />
                    {/* Bottom flap details */}
                    <path
                      d="M0,250 L160,140"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    <path
                      d="M400,250 L240,140"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  </svg>

                  {/* Wax Seal / Heart Center */}
                  <div className="absolute top-[105px] md:top-[115px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#f497a9] to-[#ff6289] shadow-[0_0_20px_rgba(244,151,169,0.6)] flex items-center justify-center text-white border-2 border-white/90"
                    >
                      <Heart size={28} fill="currentColor" />
                    </motion.div>
                    <span className="text-xs md:text-sm font-['Quicksand'] font-bold text-[#594a4e] tracking-[0.2em] uppercase bg-white/70 px-5 py-2 rounded-full backdrop-blur-md shadow-sm transition-colors group-hover:bg-white/90">
                      Tap to open
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="open-letter"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="relative w-full p-8 md:p-16 rounded-xl border border-white/60 shadow-[0_8px_30px_rgba(244,151,169,0.3)] overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/50 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/70" />

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLetterOpen(false);
                  }}
                  className="absolute top-6 right-6 md:top-8 md:right-8 z-20 text-[#6A5258] hover:text-[#f497a9] transition-colors flex items-center gap-2 font-['Quicksand'] font-bold uppercase tracking-widest text-xs"
                >
                  Close
                </button>

                <div className="relative z-10 space-y-8 text-[#594a4e] leading-relaxed font-['Quicksand'] font-semibold mt-4">
                  <p className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold italic text-[#594a4e] mb-8">
                    Hi {NICKNAME},
                  </p>
                  <div className="text-base md:text-lg space-y-6">
                    <p>Congratulations on your 21st Birthday 𖹭</p>
                    <p>
                      Thank you for all the love you give me till this day and
                      counting. I hope with your birthday today you will get
                      everything you want and you wish for. And I hope you will
                      have a wonderful day and a wonderful year ahead.
                    </p>
                    <p>
                      I know you love surprises, so I'm thinking hard of what
                      surprise should i give you that is not common, and not
                      everyone can do. And here it is, I made this little space
                      for you as your surprise gift. It is not just any suprise,
                      but A Special Surprise no one ever made!! (not as good as
                      mine at least) :D.
                    </p>
                    <p>
                      Something you could open up whenever you're feeling down,
                      or feeling a little overwhelmed, or just need to be
                      reminded of exactly how much you are loved. So that you
                      can be happy again :).
                    </p>
                    <p>
                      Someplace to land and to go back whenever you want and to
                      be a reminder of how much you mean to me. Because you are
                      loved. So much. Ridiculously so.
                    </p>
                    <p>
                      Thank you for the days, the silly jokes, the way you
                      always know how to make everything feel okay. The last{" "}
                      {YEARS_TOGETHER} years have been my absolute favorite,
                      just because you were in them.
                    </p>
                    <p>
                      Lastly, I hope 21 brings you everything you need and
                      everything you wanted, because that's exactly what you
                      deserve. and I hope you like this little gift of mine :)
                    </p>
                    <p>Dont forget to rate this surprise below :p</p>
                  </div>
                  <div className="pt-12 border-t border-white/60 mt-12 flex justify-between items-end">
                    <div className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold italic text-[#594a4e]">
                      <p className="mb-2 text-[#6A5258] font-['Quicksand'] text-sm not-italic uppercase tracking-widest font-bold">
                        Yours always,
                      </p>
                      <p>Ananta ♡</p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-white/70 text-[#f497a9] shadow-md"
                    >
                      <Heart
                        size={24}
                        fill="currentColor"
                        className="opacity-90"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center mt-16 text-xs tracking-[0.2em] uppercase font-['Quicksand'] font-bold text-[#594a4e]">
            Made with all the love in the world
          </p>
        </div>
      </section>

      <section id="review" className="py-28 px-4 relative z-10 scroll-mt-20">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <EditorialButton onClick={() => setShowReviewModal(true)}>
            Rate your experience <Star size={16} strokeWidth={2.5} />
          </EditorialButton>
        </div>
      </section>

      {/* --- GIFT OVERLAY MODAL --- */}
      <AnimatePresence>
        {showGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          >
            {/* Dark/Blurry Backdrop */}
            <div
              className="absolute inset-0 bg-[#fdf8f9]/70 backdrop-blur-md"
              onClick={() => setShowGiftModal(false)}
            />

            <FallingPetals />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="relative z-10 w-full max-w-4xl p-6 md:p-10 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_10px_50px_rgba(244,151,169,0.3)] flex flex-col items-center"
            >
              <button
                onClick={() => setShowGiftModal(false)}
                className="absolute top-6 right-6 text-[#6A5258] hover:text-[#f497a9] transition-colors font-['Quicksand'] font-bold uppercase tracking-widest text-xs z-20"
              >
                Close
              </button>

              <h3 className="font-['Playfair_Display'] font-bold italic text-4xl mb-2 text-[#594a4e]">
                Surprise!
              </h3>
              <p className="font-['Quicksand'] font-semibold text-[#6A5258] mb-10 text-center max-w-md">
                “These pretty things are waiting, <br/> for their moment with you :D”
              </p>

              {/* The 3 Cards */}
              <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                {[
                  {
                    src: "/images/Blazer.jpg",
                    title: "A navy Korean-style blazer that's perfect for casual outings or dressing up for special moments",
                    rotate: -3,
                  },
                  {
                    src: "/images/Bostanten.webp",
                    title: "An elegant off-white shoulder bag from Bostanten to accompany you wherever you go",
                    rotate: 2,
                  },
                  {
                    src: "/images/Heels.jpg",
                    title: "A pair of classy heels to complete your collection and for formal occasions",
                    rotate: -1,
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.15 + 0.2,
                      type: "spring",
                    }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    className="relative p-3 pb-5 rounded-xl border border-white/60 bg-white/70 shadow-[0_8px_30px_rgba(244,151,169,0.25)] flex-1"
                    style={{ rotate: `${card.rotate}deg` }}
                  >
                    <div className="w-full h-48 md:h-56 overflow-hidden rounded-lg mb-3">
                      <img
                        src={card.src}
                        alt={card.title}
                        className="w-full h-full object-cover filter grayscale-[5%] sepia-[10%] hue-rotate-[-5deg] transition duration-700 hover:scale-110"
                      />
                    </div>
                    <p className="text-center text-lg font-['Playfair_Display'] font-bold italic text-[#594a4e]">
                      {card.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* --- VIDEO OVERLAY MODAL --- */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          >
            {/* Dark/Blurry Backdrop */}
            <div
              className="absolute inset-0 bg-[#fdf8f9]/80 backdrop-blur-md"
              onClick={handleCloseVideo} // <--- USE IT HERE
            />

            <FallingPetals />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // THIS LINE CHANGED: Now it's wider and flexible
              className="relative z-10 w-[90vw] max-w-3xl h-[80vh] rounded-3xl border-8 border-white/60 shadow-[0_20px_50px_rgba(244,151,169,0.3)] overflow-hidden bg-black/90 flex flex-col items-center justify-center"
            >
              {/* Close Button overlaying the video */}
              <button
                onClick={handleCloseVideo} // <--- AND USE IT HERE
                className="absolute top-4 right-4 z-30 bg-white/60 backdrop-blur-md text-[#6A5258] hover:text-[#f497a9] hover:bg-white px-4 py-2 rounded-full transition-colors font-['Quicksand'] font-bold uppercase tracking-widest text-xs shadow-md"
              >
                Close
              </button>

              <AnimatePresence mode="wait">
                {videoStage === 0 && (
                  <motion.video
                    ref={videoRef} // <--- ADD THIS LINE
                    key="video1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src="/Your Day.mp4" 
                    className="w-full h-full object-contain absolute inset-0"
                    controls
                    autoPlay
                    playsInline
                    onPlay={muteBG}
                    onPause={unmuteBG}
                    onEnded={() => setVideoStage(1)} 
                  />
                )}

                {videoStage === 1 && (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center p-8 text-center bg-[#fdf8f9]"
                  >
                    <p className="font-['Quicksand'] font-bold italic text-2xl md:text-3xl text-[#594a4e] leading-relaxed">
                      WHAT?? TOO CLASSIC??<br/>
                      <span className="text-lg font-['Quicksand'] font-semibold text-[#6A5258] not-italic mt-4 block">
                        rude. okay watch this one instead 💅
                      </span>
                    </p>
                  </motion.div>
                )}

                {videoStage === 2 && (
                  <motion.video
                    ref={videoRef} // <--- ADD THIS LINE
                    key="video2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src="/Story Board.mp4" 
                    className="w-full h-full object-contain absolute inset-0"
                    controls
                    autoPlay
                    playsInline
                    onPlay={muteBG}
                    onPause={unmuteBG}
                    onEnded={unmuteBG} 
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- REVIEW OVERLAY MODAL --- */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          >
            {/* Dark/Blurry Backdrop */}
            <div
              className="absolute inset-0 bg-[#fdf8f9]/70 backdrop-blur-md"
              onClick={() => setShowReviewModal(false)}
            />

            <FallingPetals />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-md p-8 md:p-12 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_10px_50px_rgba(244,151,169,0.3)] flex flex-col items-center text-center"
            >
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-6 right-6 text-[#6A5258] hover:text-[#f497a9] transition-colors font-['Quicksand'] font-bold uppercase tracking-widest text-xs z-20"
              >
                Close
              </button>

              {!hasReviewed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <h3 className="font-['Playfair_Display'] font-bold italic text-3xl text-[#594a4e] mb-8">
                    Rate this surprise
                  </h3>
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => {
                          setHasReviewed(true);
                          setShowConfetti(true);
                          setTimeout(() => setShowConfetti(false), 3000);
                        }}
                        className="text-[#f497a9] transition-colors duration-200 drop-shadow-sm"
                      >
                        <Star
                          size={40}
                          strokeWidth={1.5}
                          fill={hoverRating >= star ? "currentColor" : "white"}
                          className={
                            hoverRating >= star
                              ? "text-[#f497a9]"
                              : "text-white/80"
                          }
                        />
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-sm font-['Quicksand'] font-bold text-[#6A5258] uppercase tracking-widest mt-2">
                    Tap a star
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                      <motion.div
                        key={star}
                        initial={{ opacity: 0, rotate: -45, scale: 0 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        className="text-[#f497a9] drop-shadow-md"
                      >
                        <Star size={40} strokeWidth={1.5} fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                  <h3 className="font-['Playfair_Display'] font-bold italic text-3xl md:text-4xl text-[#594a4e] mb-4">
                    5 Stars!
                  </h3>
                  <p className="text-lg font-['Quicksand'] font-bold text-[#6A5258]">
                    I know you like it so much, thanks for the review 🤭
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3 items-start">
        <AnimatePresence>
          {showAudioMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 0.99, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative p-5 rounded-2xl border border-white/90 shadow-[0_8px_30px_rgba(244,151,169,0.3)] w-64 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/70 backdrop-blur-s" />
              <div className="relative z-10 flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-['Quicksand'] font-bold text-[#594a4e] uppercase tracking-[0.2em]">
                      Volume
                    </label>
                    <button
                      onClick={toggleMute}
                      className="text-[#6A5258] hover:text-[#594a4e] transition-colors duration-300"
                    >
                      {isMuted ? (
                        <VolumeX size={16} strokeWidth={2.5} />
                      ) : (
                        <Volume2 size={16} strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-[#f497a9] cursor-pointer h-2 bg-white/90 appearance-none rounded-full shadow-inner transition-colors duration-300"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-xs font-['Quicksand'] font-bold text-[#594a4e] uppercase tracking-[0.2em]">
                    Now Playing
                  </label>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={playInstrumental}
                      className={`text-sm font-['Quicksand'] font-bold tracking-wide text-left px-3 py-2.5 transition-colors duration-300 ease-out border-l-4 rounded-r-md ${currentTrack === "instrumental" ? "border-[#f497a9] text-[#594a4e] bg-white/80" : "border-transparent text-[#6A5258] hover:bg-white/60 hover:text-[#594a4e]"}`}
                    >
                      Instrumental Version
                    </button>
                    <button
                      onClick={playCover}
                      className={`text-sm font-['Quicksand'] font-bold tracking-wide text-left px-3 py-2.5 transition-colors duration-300 ease-out border-l-4 rounded-r-md ${currentTrack === "cover" ? "border-[#f497a9] text-[#594a4e] bg-white/80" : "border-transparent text-[#6A5258] hover:bg-white/60 hover:text-[#594a4e]"}`}
                    >
                      Vocal Cover
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* --- Picture in Picture Camera Element --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ 
            opacity: isRecordingReaction ? 1 : 0, 
            scale: isRecordingReaction ? 1 : 0.8,
            y: isRecordingReaction ? 0 : 50
          }}
          // 👇 NEW: Drag properties added here
          drag
          dragConstraints={{ left: -1000, right: 50, top: -1000, bottom: 50 }} // Allows dragging freely across most of the screen
          dragElastic={0.1}
          dragMomentum={false}
          className={`fixed bottom-6 right-6 w-40 h-56 md:w-48 md:h-64 z-[9999] rounded-xl overflow-hidden border-[3px] border-white/80 shadow-[0_8px_30px_rgba(244,151,169,0.5)] bg-black transition-all duration-300 ${isRecordingReaction ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
        >
          <video
            ref={cameraVideoRef}
            autoPlay
            muted // Extremely important: prevents audio feedback looping
            playsInline
            // 👇 NEW: Added pointer-events-none so the video doesn't steal the drag action
            className="w-full h-full object-cover transform scale-x-[-1] pointer-events-none" 
          />
          
          {/* Recording indicator dot */}
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
             <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
             <span className="text-[10px] text-white font-bold tracking-wider">REC</span>
          </div>

          {/* 👇 NEW: Stop Button moved INSIDE the camera container */}
          {isRecordingReaction && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-[10000]">
              <button
                // 👇 This prevents the drag event from swallowing the button click
                onPointerDownCapture={(e) => e.stopPropagation()} 
                onClick={(e) => {
                  e.stopPropagation();
                  stopReactionRecording();
                }}
                title="Stop Recording"
                className="w-12 h-12 bg-red-500/90 backdrop-blur-md text-white rounded-full shadow-[0_8px_30px_rgba(239,68,68,0.3)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border border-white/20"
              >
                <div className="w-4 h-4 bg-white rounded-sm" />
              </button>
            </div>
          )}
        </motion.div>

        {/* --- Floating Action Button for Recording (Start Button Only Now) --- */}
        <div className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-[9998] flex flex-col items-end gap-3 pointer-events-none">
          {/* 👇 Only render the Start button when NOT recording */}
          {!isRecordingReaction && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startReactionRecording}
              title="Record Reaction"
              className="pointer-events-auto w-14 h-14 bg-white/80 backdrop-blur-md text-[#f497a9] rounded-2xl shadow-[0_8px_30px_rgba(244,151,169,0.3)] border border-white/50 flex items-center justify-center hover:bg-white transition-colors"
            >
              <Camera className="w-6 h-6" />
            </motion.button>
          )}
        </div>

        {/* --- Recording Request Overlay --- */}
        <AnimatePresence>
          {showRecordingOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
            >
              <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(244,151,169,0.5)] max-w-sm text-center flex flex-col items-center gap-6 mx-4">
                <div className="w-20 h-20 bg-[#f497a9]/10 rounded-full flex items-center justify-center text-4xl shadow-inner">
                  🥺
                </div>
                <h2 className="text-xl md:text-2xl font-['Quicksand'] font-bold text-[#594a4e] leading-relaxed">
                  I want to see your live reaction, please allow me to recooorrdd :)
                </h2>
                <div className="flex w-full gap-3 mt-2">
                  <button
                    onClick={() => setShowRecordingOverlay(false)}
                    className="flex-1 px-4 py-3 rounded-full font-bold text-gray-400 hover:bg-gray-100 transition-colors font-['Quicksand']"
                  >
                    Maybe later
                  </button>
                  <button
                    onClick={() => {
                      setShowRecordingOverlay(false);
                      startReactionRecording();
                    }}
                    className="flex-1 px-4 py-3 rounded-full font-bold text-white bg-[#f497a9] hover:bg-[#e08698] shadow-lg transition-colors font-['Quicksand']"
                  >
                    Okay! 🎥
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.99, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
          onClick={() => setShowAudioMenu(!showAudioMenu)}
          className="relative w-14 h-14 rounded-full border-2 border-white/90 shadow-[0_8px_30px_rgba(244,151,169,0.35)] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/80 backdrop-blur-s transition-colors duration-500 ease-out group-hover:bg-white/90" />
          <div className="relative z-10 w-full h-full flex items-center justify-center text-[#594a4e]">
            <Music size={24} strokeWidth={2} />
          </div>
        </motion.button>
      </div>
    </main>
  );
}
