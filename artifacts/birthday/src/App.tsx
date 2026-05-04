import { useState, useRef, createContext, useContext, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Landing from "@/pages/landing";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/celebrate" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

const AudioContext = createContext<{
  playInstrumental: () => void;
  playCover: () => void;
  stopMusic: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (v: number) => void;
  currentTrack: "instrumental" | "cover" | null;
}>({
  playInstrumental: () => {},
  playCover: () => {},
  stopMusic: () => {},
  isMuted: false,
  toggleMute: () => {},
  volume: 0.5,
  setVolume: () => {},
  currentTrack: null,
});

export const useAudio = () => useContext(AudioContext);

function App() {
  const instrumentalRef = useRef<HTMLAudioElement>(null);
  const coverRef = useRef<HTMLAudioElement>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5); // Default 50% Volume
  const [currentTrack, setCurrentTrack] = useState<
    "instrumental" | "cover" | null
  >(null);

  // Apply volume to refs whenever it changes
  useEffect(() => {
    if (instrumentalRef.current) instrumentalRef.current.volume = volume;
    if (coverRef.current) coverRef.current.volume = volume;
  }, [volume]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (instrumentalRef.current) instrumentalRef.current.muted = nextMuted;
    if (coverRef.current) coverRef.current.muted = nextMuted;
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    // Unmute automatically if the user moves the slider up while muted
    if (isMuted && v > 0) {
      toggleMute();
    }
  };

  const stopMusic = () => {
    if (instrumentalRef.current) {
      instrumentalRef.current.pause();
      instrumentalRef.current.currentTime = 0;
    }
    if (coverRef.current) {
      coverRef.current.pause();
      coverRef.current.currentTime = 0;
    }
  };

  const playInstrumental = () => {
    stopMusic();
    setCurrentTrack("instrumental");
    instrumentalRef.current
      ?.play()
      .catch((err) => console.log("Autoplay dicegah:", err));
  };

  const playCover = () => {
    stopMusic();
    setCurrentTrack("cover");
    coverRef.current
      ?.play()
      .catch((err) => console.log("Autoplay dicegah:", err));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AudioContext.Provider
        value={{
          playInstrumental,
          playCover,
          stopMusic,
          isMuted,
          toggleMute,
          volume,
          setVolume,
          currentTrack,
        }}
      >
        <TooltipProvider>
          <audio
            ref={instrumentalRef}
            src="/Selamat Ulang Tahun Instrument.mp3"
            loop
          />
          <audio ref={coverRef} src="/Selamat Ulang Tahun Cover.mp3" loop />

          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AudioContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
