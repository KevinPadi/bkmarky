import { Link } from "react-router";
import logo from "../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { motion } from "motion/react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Floating, {
  FloatingElement,
} from "@/components/fancy/image/parallax-floating";
import YouTube from "@/assets/svg/youtube";
import Notion from "@/assets/svg/notion";
import Discord from "@/assets/svg/discord";
import Spotify from "@/assets/svg/spotify";
import XformerlyTwitter from "@/assets/svg/twitter";
import Reddit from "@/assets/svg/reddit";
import GoogleDrive from "@/assets/svg/google-drive";
import Instagram from "@/assets/svg/instagram";
import GitHub from "@/assets/svg/github";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/stores/auth-store";
import UserDropdown from "@/components/auth/user-dropdown";
import { useEffect } from "react";

const bookmarks = [
  {
    title: "YouTube",
    url: "https://www.youtube.com",
    img: YouTube,
    top: "8%",
    left: "13%",
    depth: 1,
  },
  {
    title: "Notion",
    url: "https://notion.com",
    img: Notion,
    top: "18%",
    left: "17%",
    depth: 1.5,
  },
  {
    title: "Discord",
    url: "https://discord.com",
    img: Discord,
    top: "20%",
    left: "75%",
    depth: 0.5,
  },
  {
    title: "Twitter",
    url: "https://x.com",
    img: XformerlyTwitter,
    top: "23%",
    left: "68%",
    depth: 1.5,
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com",
    img: Instagram,
    top: "78%",
    left: "70%",
    depth: 1,
  },
  {
    title: "Reddit",
    url: "https://www.reddit.com",
    img: Reddit,
    top: "66%",
    left: "76%",
    depth: 2,
  },
  {
    title: "Spotify",
    url: "https://open.spotify.com",
    img: Spotify,
    top: "58%",
    left: "5%",
    depth: 1.5,
  },
  {
    title: "Google Drive",
    url: "https://drive.google.com",
    img: GoogleDrive,
    top: "70%",
    left: "8%",
    depth: 1,
  },
];

const Home = () => {
  const { loading, user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <section className="px-4 max-h-screen w-full h-screen overflow-hidden relative flex flex-col justify-center items-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_35%_at_50%_20%,#000_0%,transparent_110%)]"></div>
      <Floating className="hidden md:block">
        {bookmarks.map(({ img: Icon, ...i }) => (
          <a
            id="floatingEl"
            href={i.url}
            target="_blank"
            rel="noopener noreferrer"
            key={i.title}
            className="absolute w-full"
            style={{ top: i.top, left: i.left }}
          >
            <FloatingElement depth={i.depth}>
              <div className="flex items-center gap-3 p-4 rounded-3xl bg-foreground/20 dark:bg-muted/30 backdrop-blur-xs border-2 hover:cursor-pointer transition-transform hover:scale-105">
                <Icon className="size-10" />
              </div>
            </FloatingElement>
          </a>
        ))}
      </Floating>

      <header className="h-14 w-full flex items-center justify-between absolute top-0 left-0 px-4 sm:px-20">
        <div className="flex items-center gap-2">
          <img src={logo} alt="bkmarky logo" className="size-7" />
          <span className="hidden sm:block">bkmarky</span>
        </div>
        {loading ? null : user !== null ? (
          <UserDropdown />
        ) : (
          <div className="flex items-center gap-2">
            <Link to={"/login"}>
              <Button size={"sm"} variant={"outline"}>
                Log in
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button size={"sm"} variant={"cta"}>
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </header>

      <div className="flex flex-col gap-4 items-center text-center relative">
        <TextEffect
          className="text-5xl text-foreground tracking-tight text-balance"
          as="h1"
          per="char"
          delay={0.2}
          variants={{
            container: {
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.02,
                },
              },
            },
            item: {
              hidden: {
                opacity: 0,
                rotateX: 90,
              },
              visible: {
                opacity: 1,
                rotateX: 0,
                y: 0,
                transition: {
                  duration: 0.2,
                },
              },
            },
          }}
        >
          Keep your things Organized
        </TextEffect>
        <TextEffect
          preset="fade-in-blur"
          delay={1}
          per="line"
          as="p"
          className="text-muted-foreground text-balance"
          variants={{
            container: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            },
            item: {
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.4,
                },
              },
            },
          }}
        >
          Bkmarky lets you keep your links organized and easy to find
        </TextEffect>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="flex items-center"
        >
          {loading ? null : user !== null ? (
            <Link to={"/bookmarks"}>
              <Button size={"lg"} variant={"cta"}>
                My bookmarks
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button size={"lg"} variant={"outline"}>
                  Log in
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button size={"lg"} variant={"cta"}>
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full px-4 sm:px-20 py-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            Made by{" "}
            <a
              className="text-accent-foreground hover:underline"
              href="https://kevin-padilla.vercel.app"
              target="_blank"
            >
              Kevin
            </a>
          </span>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://github.com/KevinPadi/bkmarky"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant={"outline"} size={"sm"} className="size-8">
                    <GitHub />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Home;
