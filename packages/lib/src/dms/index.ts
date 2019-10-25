import { Theme, createMuiTheme } from '@material-ui/core';
import { colors } from './colors';
import { typography } from './typography';

export * from './colors';
export * from './typography';
export * from './sizes';

export const configureDodayTheme = (theme: Theme) =>
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        ...colors.yellow,
      },
      secondary: {
        ...colors.blue,
      },
      error: {
        ...colors.red,
      },
    },
    spacing: 4,
    overrides: {
      MuiButton: {
        label: {
          fontSize: '1.2rem',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: colors.yellow.dark,
          border: `2px solid ${
            theme.palette.type === 'light'
              ? theme.palette.common.white
              : theme.palette.grey[800]
          }`,
          '&:hover': {
            backgroundColor: colors.yellow.main,
          },
          '&$disabled': {
            border: '2px solid rgba(0, 0, 0, 0.12)',
          },
        },
      },
      MuiTooltip: {
        tooltip: {
          color: theme.palette.common.white,
        },
      },
    },
    typography,
  });
