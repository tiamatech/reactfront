import React, { useState, useEffect, useRef } from "react"; 
import {
  Box,
  Paper,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Avatar,
  Grow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import { images } from "../images";

interface ChatMessage {
  sender: "user" | "support";
  text: string;
}

interface ChatPortalProps {
  open: boolean;
  onClose: () => void;
}

const ChatPortal: React.FC<ChatPortalProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "support", text: "Merhaba, bugün size nasıl yardımcı olabiliriz?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Mesajlar güncellendiğinde sona kaydırır.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    // 1 saniye sonra destek yanıtını simüle eder.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "support",
          text:
            "Müşteri desteğimiz kısa süre içinde sizinle olacak, sabrınız için teşekkür ederiz."
        }
      ]);
    }, 1000);
  };

  if (!open) return null; // Sohbet açık değilse hiçbir şey render edilmez.

  return (
    <Grow in={open}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 350,
          height: 450,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 6,
          zIndex: 1300,
          backgroundColor: isDark ? theme.palette.background.paper : undefined,
          color: isDark ? "#fff" : undefined,
        }}
      >
        {/* Sohbet Başlığı */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            p: 1,
            bgcolor: "black",
          }}
        >
          <Avatar
            src={images.customerSupportAvatar} 
            sx={{ width: 60, height: 60, mr: 4 }}
          />
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Müşteri Desteği
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {/* Sohbet İçerik Alanı */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            backgroundColor: isDark ? theme.palette.background.default : "inherit",
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  maxWidth: "80%",
                  backgroundColor:
                    msg.sender === "user"
                      ? isDark
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light
                      : isDark
                        ? theme.palette.grey[800]
                        : "grey.300",
                  color: isDark ? "#fff" : "inherit",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Divider />
        {/* Sohbet Giriş Alanı */}
        <Box sx={{ p: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Mesajınızı yazın..."
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            InputProps={{
              style: { color: isDark ? "#fff" : undefined },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSend}>
                    <SendIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>
    </Grow>
  );
};

export default ChatPortal;
