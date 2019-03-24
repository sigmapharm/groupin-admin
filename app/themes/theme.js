import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#276955',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#41A58D',
      main: '#42B391',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#69273B',
    },
    // error: will use the default color
  },
});
