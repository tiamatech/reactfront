// src/pages/Contact.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Link,
  Theme
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSubmitContactMutation } from "../services/industrialApi";
import { contactSchema } from "../validations/contactSchema";
import { Person, Email, Phone, LocationOn } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { keyframes } from "@mui/system";

const textFieldStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
});

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fadeInHeader = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitContact, { isLoading, isSuccess }] = useSubmitContactMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Mesajınızı aldık. Kısa süre içinde sizinle iletişime geçeceğiz.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }
  }, [isSuccess]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const formattedErrors = result.error.errors.reduce((acc: ContactErrors, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(formattedErrors);
      toast.error("Lütfen tüm gerekli alanları doğru şekilde doldurun.");
      return;
    }

    try {
      // First, try to submit to your API
      await submitContact(formData).unwrap();

      // Then send email through the new API route
      const emailResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      toast.success("Mesajınızı aldık. En kısa sürede size dönüş yapacağız.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("Gönderim başarısız:", err);
      toast.error("Gönderim başarısız. Lütfen daha sonra tekrar deneyin veya info@tiamatech.com adresine doğrudan mail atın.");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        color: theme.palette.mode === "dark" ? "#fff" : "inherit",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 6, animation: `${fadeInHeader} 0.8s ease both` }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            mb: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: `${shimmer} 3s linear infinite`,
          }}
        >
          İletişime Geçin
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Sizinle iletişime geçmeyi çok isteriz.
        </Typography>
      </Box>

      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 2,
          mb: 4,
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ad"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={textFieldStyles(theme)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <Person
                        sx={{
                          color: theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main,
                        }}
                      />
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="E-posta"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={textFieldStyles(theme)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <Email
                        sx={{
                          color: theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main,
                        }}
                      />
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mesaj"
                name="message"
                variant="outlined"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                sx={textFieldStyles(theme)}
              />
            </Grid>
          </Grid>
          <Box mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,
                transition: "background-color 0.3s",
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              {isLoading ? "Gönderiliyor..." : "Mesajı Gönder"}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={4} sx={{ textAlign: "center", mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Box>
            <Phone
              sx={{
                fontSize: 40,
                color: theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main,
                mb: 1,
              }}
            />
            <Typography variant="subtitle1">Telefon</Typography>
            <Typography variant="body2">+90 534 469 58 51</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <Email
              sx={{
                fontSize: 40,
                color: theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main,
                mb: 1,
              }}
            />
            <Typography variant="subtitle1">E-posta</Typography>
            <Link
              href="mailto:info@tiamatech.com"
              underline="none"
              sx={{
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              }}
            >
              info@tiamatech.com
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <LocationOn
              sx={{
                fontSize: 40,
                color: theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main,
                mb: 1,
              }}
            />
            <Typography variant="subtitle1">Adres</Typography>
            <Typography variant="body2">Serdivan/Sakarya, Türkiye</Typography>
          </Box>
        </Grid>
      </Grid>

      <Paper elevation={4} sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
        <iframe
          title="Konumumuz - Serdivan/Sakarya, Türkiye"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.679490375433!2d30.3333!3d40.7408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404f8c15a1f5a529%3A0xb4e244e7d9c94516!2sSakarya%20University!5e0!3m2!1sen!2sus!4v1681970304143!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{
            border: 0,
            filter: "grayscale(50%)",
            transform: "perspective(1000px)",
          }}
          allowFullScreen
          loading="lazy"
          tabIndex={-1}
        />
      </Paper>

      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
    </Container>
  );
};

export default Contact;
