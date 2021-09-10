import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    fontWeight: 600,
    padding: '15px 0',
    title: {
      regular: { fontSize: '32px' },
      small: { fontSize: '22px' },
    },
    button: {
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 17,
      textTransform: 'none',
      letterSpacing: 0,
      special: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
      },
    },
  },
  spacing: 5,
  overrides: {
    MuiInput: {
      input: {
        fontWeight: 'bold',
      },
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
    secondary: { main: '#B0B0B0' },
  },
});
