
import { createTheme } from '@mui/material/styles';
import { colors } from './utils/colors';


const theme = createTheme({
 breakpoints: {
    values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
    },
  },
  palette: {
    primary: {
        dark: colors.GREEN_COLOR,
        main: colors.MAIN_BACKGROUND,
        light: colors.WHITE
    },
    secondary: {
      main: colors.YELLOW_COLOR,
      light: colors.BLUE_BACKGROUND,
      dark: colors.GREY_FOR_BORDER
    },
    error: {
      main: colors.ERROR_COLOR,
    }
  },

  typography: {
    subtitle1: {
        fontSize: 22,
        fontFamily: 'Roboto, sans-serif',
        color: colors.SECONARY_FONTS_COLOR,
        fontWeight: 400,
    },
    subtitle2: {
        fontSize: 14,
        fontFamily: 'Roboto, sans-serif',
        color: colors.SECONARY_FONTS_COLOR,
        fontWeight: 500,
    },
    body1: {
        fontSize: 12,
        fontFamily: 'Roboto, sans-serif',
        color: colors.SECONARY_FONTS_COLOR,
        fontWeight: 400,
    },
    body2: {
        fontSize: 12,
        fontFamily: 'Roboto, sans-serif',
        color: colors.WHITE,
        fontWeight: 400,
    },
    caption: {
      fontSize: 18,
      fontFamily: 'Roboto, sans-serif',
      color: colors.SECONARY_FONTS_COLOR,
      fontWeight: 500,
    },
  }
});

export default theme;