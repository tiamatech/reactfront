import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, responsiveFontSizes, alpha } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

declare module "@mui/material/styles" {
  interface Palette {
    tech: {
      gradient: string;
      cyber: string;
      neon: string;
      holographic: string;
    };
  }
  interface PaletteOptions {
    tech?: {
      gradient?: string;
      cyber?: string;
      neon?: string;
      holographic?: string;
    };
  }
}

const techColors = {
  light: {
    primary: "#0A192F",
    secondary: "#0066FF",
    accent: "#00FF92",
    background: "#F8FAFF",
    text: "#1A202C",
    overlay: "rgba(255, 255, 255, 0.8)",
  },
  dark: {
    primary: "#1D1F26",
    secondary: "#00D4FF",
    accent: "#00FF99",
    background: "#2A2E36",
    text: "#fff",
    overlay: "rgba(29, 31, 38, 0.8)",
  },
};

const baseTheme = (mode: "light" | "dark") => {
  const colors = techColors[mode];
  // Note: deepmerge requires two arguments: an empty target and our theme object.
  return deepmerge({}, {
    palette: {
      mode,
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      tech: {
        gradient: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
        cyber: colors.secondary,
        neon: colors.accent,
        holographic: `linear-gradient(45deg, ${colors.secondary} 0%, ${colors.accent} 50%, ${colors.primary} 100%)`,
      },
      background: {
        default: colors.background,
        paper: mode === "light" ? "#FFFFFF" : "#13182B",
      },
      text: mode === "dark"
        ? { primary: "#fff", secondary: alpha("#fff", 0.8) }
        : { primary: colors.text, secondary: alpha(colors.text, 0.8) },
    },
    typography: {
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
      h1: {
        fontWeight: 700,
        fontSize: "4.5rem",
        letterSpacing: "-0.04em",
        background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      h2: {
        fontWeight: 700,
        fontSize: "3.2rem",
        letterSpacing: "-0.03em",
        background: `linear-gradient(135deg, ${colors.secondary} 30%, ${colors.accent} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "0.03em",
      },
    },
    spacing: 8,
    shadows: [
      "none", "none", "none", "none", "none",
      "none", "none", "none", "none", "none",
      "none", "none", "none", "none", "none",
      "none", "none", "none", "none", "none",
      "none", "none", "none", "none", "none"
    ] as [
      string, string, string, string, string,
      string, string, string, string, string,
      string, string, string, string, string,
      string, string, string, string, string,
      string, string, string, string, string
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: mode === "dark" ? "#fff" : undefined,
            backgroundColor: colors.background,
            "&::before": {
              content: '""',
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: mode === "light"
                ? `linear-gradient(45deg, ${colors.background} 0%, ${alpha(colors.secondary, 0.05)} 100%)`
                : `radial-gradient(circle at 50% 50%, ${alpha(colors.secondary, 0.1)} 0%, ${colors.background} 70%)`,
              zIndex: -1,
            },
          },
        },
      },
    },
  });
};

const lightTheme = responsiveFontSizes(createTheme(baseTheme("light")));
const darkTheme = responsiveFontSizes(createTheme(baseTheme("dark")));

type ColorModeContextType = {
  toggleColorMode: () => void;
  isDarkMode: boolean;
};

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) throw new Error("useColorMode must be used within a ThemeProvider");
  return context;
};

export const ThemeProviderWithToggle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
      isDarkMode: mode === "dark",
    }),
    [mode]
  );

  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderWithToggle;
