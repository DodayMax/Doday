import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Text } from '../../shared/_atoms/typography';
import { Page, PageHeader } from '../../shared/_molecules/page';
import { TypographySize } from '@root/lib/common-interfaces';
import {
  PageWrapperChildContext,
  Pageflow,
} from '../../shared/_support/pageflow';

@Pageflow({ path: '/profile' })
export class Profile extends React.Component {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  onRequestClose = () => {
    if (this.context.requestClose) {
      this.context.requestClose();
    }
  };

  render() {
    return (
      <Page
        header={
          <PageHeader withClose onClose={this.onRequestClose}>
            <a href="/api/logout">Logout</a>
          </PageHeader>
        }
      >
        <Text size={TypographySize.h1}>Profile</Text>
      </Page>
    );
  }
}
