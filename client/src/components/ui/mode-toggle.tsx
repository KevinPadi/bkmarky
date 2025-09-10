import { Button } from "@/components/ui/button";
import { easeOut, motion as m } from "motion/react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "outline" | "ghost";
};

export function ModeToggle({ variant = "outline" }: Props) {
  const { setTheme, theme } = useTheme();

  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {},
    },
    visible: {
      strokeOpacity: 1,
      transition: {},
    },
  };

  const rayVariant = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      // Start from center of the circle
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
        // Customize timing for each property
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const sunPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  const moonPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";
  return (
    <Button
      variant={variant}
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      className="size-8"
      size={"sm"}
    >
      <m.svg
        strokeLinecap="round"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "stroke-accent-foreground",
          theme === "light" ? "stroke-8" : "stroke-[5]"
        )}
      >
        <m.g
          variants={raysVariants}
          initial="hidden"
          animate={theme === "light" ? "visible" : "hidden"}
          className="stroke-8 stroke-accent-foreground"
          style={{ strokeLinecap: "round" }}
        >
          <m.path
            className="origin-center"
            variants={rayVariant}
            d="M50 2V11"
          />
          <m.path variants={rayVariant} d="M85 15L78 22" />
          <m.path variants={rayVariant} d="M98 50H89" />
          <m.path variants={rayVariant} d="M85 85L78 78" />
          <m.path variants={rayVariant} d="M50 98V89" />
          <m.path variants={rayVariant} d="M23 78L16 84" />
          <m.path variants={rayVariant} d="M11 50H2" />
          <m.path variants={rayVariant} d="M23 23L16 16" />
        </m.g>

        <m.path
          d={sunPath}
          fill="transparent"
          transition={{ duration: 1, type: "spring" }}
          initial={{ fillOpacity: 0, strokeOpacity: 0 }}
          animate={
            theme === "dark"
              ? {
                  d: moonPath,
                  scale: 2,
                  stroke: "var(--accent-foreground)",
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                  transition: { delay: 0.1 },
                }
              : {
                  d: sunPath,
                  stroke: "var(--accent-foreground)",
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                }
          }
        />
      </m.svg>
    </Button>
  );
}
