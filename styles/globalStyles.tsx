import { GlobalStyles } from '@mui/material';

export const industrialGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
      'a': {
        textDecoration: 'none',
        color: 'inherit',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: theme.palette.background.paper,
      },
      '::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main,
        borderRadius: '4px',
        '&:hover': {
          background: theme.palette.primary.dark,
        },
      },
      '.fade-in': {
        opacity: 0,
        animation: 'fadeIn 0.5s ease-in forwards',
      },
      '@keyframes fadeIn': {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    })}
  />
);
