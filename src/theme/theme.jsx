import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
      contrastText: '#795548',
    },
    background: {
      default: '##FDE9E9',
    },
    text: { primary: '#1B3672' },
  },
});

export default theme;