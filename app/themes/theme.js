import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Poppins',
    h6: {
      fontSize: 18,
      fontWeight: '500',
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#19317e',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#41A58D',
      main: '#42B391',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#69273B',
    },
    common: {
      black: '#333',
    },
    // error: will use the default color
  },
  shadows: [
    'none',
    '0px 10px 18px rgba(0, 0, 0, 0.02)',
    '0px 10px 18px rgba(0, 0, 0, 0.03)',
    '0px 10px 18px rgba(0, 0, 0, 0.05)',
    '0px 10px 18px rgba(0, 0, 0, 0.07)',
    ...Array(20).fill('none'),
  ],
});
