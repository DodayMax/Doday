import * as React from 'react';
import { LayoutBlock, ClickableIcon, Icons } from '@components';
import * as H from 'history';

const vars = require('@styles/_config.scss');
const css = require('./_page.module.scss');

interface PageProps {
  history: H.History;
}

export class Page extends React.Component<PageProps, {}> {
  render() {
    return (
      <div className={css.pageContainer}>
        <LayoutBlock absolute top="1rem" right="1rem">
          <ClickableIcon
            onClick={() => {
              this.props.history.push('/');
            }}
          >
            <Icons.Close color={vars.gray6} width={30} height={30} />
          </ClickableIcon>
        </LayoutBlock>
        <LayoutBlock direction="column">{this.props.children}</LayoutBlock>
      </div>
    );
  }
}
