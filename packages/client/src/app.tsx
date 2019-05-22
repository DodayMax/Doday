import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import i18next from 'i18next';
import Media from 'react-media';
import { Shell, DesktopShell } from '@components';
import { RootState } from './lib/models';
import { ThemeType } from './lib/common-interfaces';

interface AppProps {}

interface PropsFromConnect {
  theme: ThemeType;
}

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

export class AppComponent extends React.Component<
  AppProps & Partial<PropsFromConnect> & TranslationProps
> {
  private get theme() {
    const theme = createMuiTheme({
      palette: {
        type: this.props.theme,
      },
      typography: {
        useNextVariants: true,
      },
    });
    return theme;
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <div className="app-container">
          <Media query="(max-width: 767px)">
            {matches =>
              matches ? (
                <Route path="/" component={Shell} />
              ) : (
                <Route path="/" component={DesktopShell} />
              )
            }
          </Media>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapState = (state: RootState) => ({
  theme: state.heroSettings.theme,
});

export const App = connect(mapState)(AppComponent);
