import { keyframes } from "@mui/system";

export const industrialAnimations = {
  machinePulse: keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `,
  conveyorFlow: keyframes`
    0% { background-position: 0 0; }
    100% { background-position: 100px 0; }
  `,
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  slideIn: keyframes`
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  `,
  buttonBounce: keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  `,
  enterpriseBounce: keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  `,
  holographicFlow: keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `,
  techPulse: keyframes`
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  `,
  cardEntrance: keyframes`
    from { opacity: 0; transform: translateY(20px) rotateX(-10deg); }
    to { opacity: 1; transform: translateY(0) rotateX(0); }
  `,
  glow: keyframes`
    0% { filter: hue-rotate(0deg); opacity: 0.9; }
    100% { filter: hue-rotate(20deg); opacity: 1; }
  `,
  pulse: keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  `,
  colorWave: keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `,
};
