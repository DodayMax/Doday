import * as React from 'react';
import { connect } from 'react-redux';
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
import { RootState } from './lib/models';
import { ThemeType } from './lib/common-interfaces';
import { colors } from '@styles/dodayColors';
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
    console.log('theme');
    const { theme, themeType } = this.props;
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
          },
        },
        MuiTooltip: {
          tooltip: {
            color: theme.palette.common.white,
          },
        },
      },
      typography: {
        useNextVariants: true,
        htmlFontSize: 10,
        h2: {
          fontSize: '3.6rem',
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

const mapState = (state: RootState) => ({
  themeType: state.heroSettings.theme,
});

export const App = connect(mapState)(withTheme()(AppComponent));
