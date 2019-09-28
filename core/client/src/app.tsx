import * as React from 'react';
import { Route } from 'react-router-dom';
import {
  MuiThemeProvider,
  createMuiTheme,
  withTheme,
  WithTheme,
  Theme,
} from '@material-ui/core/styles';
import i18next from 'i18next';
import Media from 'react-media';
import { Shell, DesktopShell } from '@components';
import { ThemeType, colors } from '@doday/lib';
import { Toast, DodayDialog } from './containers';

interface AppProps {}

interface PropsFromConnect {
  theme: Theme;
  themeType: ThemeType;
}

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

export class AppComponent extends React.Component<
  AppProps & Partial<PropsFromConnect> & TranslationProps & WithTheme
> {
  private get theme() {
    const { theme, themeType = 'dark' } = this.props;
    const themeConfig = createMuiTheme({
      palette: {
        type: themeType,
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
      typography: {
        htmlFontSize: 10,
        fontFamily: [
          'Avenir',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        h1: {
          fontSize: '5rem',
          fontFamily: 'Avenir Light',
          lineHeight: '6rem',
        },
        h2: {
          fontSize: '3.2rem',
          fontFamily: 'Avenir Light',
          lineHeight: '3.6rem',
        },
        h3: {
          fontSize: '3rem',
          fontFamily: 'Avenir Medium',
          lineHeight: '3.6rem',
        },
        subtitle1: {
          fontSize: '2rem',
          fontFamily: 'Avenir Medium',
          textTransform: 'uppercase',
          lineHeight: '2.6rem',
        },
        subtitle2: {
          fontSize: '2rem',
          fontFamily: 'Avenir Medium',
          lineHeight: '2.4rem',
        },
      },
    });
    return themeConfig;
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <div className="app-container">
          <React.Suspense fallback={null}>
            <Media query="(max-width: 767px)">
              {matches =>
                matches ? (
                  <Route path="/" component={Shell} />
                ) : (
                  <Route path="/" component={DesktopShell} />
                )
              }
            </Media>
          </React.Suspense>
        </div>
        <Toast />
        <DodayDialog />
      </MuiThemeProvider>
    );
  }
}

export const App = withTheme(AppComponent);
