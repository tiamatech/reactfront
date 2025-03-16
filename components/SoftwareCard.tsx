import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";

interface Software {
  id: string;
  name: string;
  image: string;
  description: string;
  details: string;
}

interface SoftwareCardProps {
  software: Software;
  animationDelay?: string;
  onClick: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SoftwareCard: React.FC<SoftwareCardProps> = ({ software, animationDelay = "0s", onClick }) => {
  return (
    <Card
      sx={{
        width: "100%",
        animation: `${fadeIn} 0.6s ease forwards`,
        animationDelay: animationDelay,
        opacity: 0,
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="160"
          image={software.image}
          alt={software.name}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {software.name}
          </Typography>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {software.description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SoftwareCard;
