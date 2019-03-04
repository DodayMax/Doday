import * as React from 'react';
import { ClickableIcon } from '@root/components/shared/_atoms/clickable-icon/clickable-icon';
import { Icons, Text } from '@root/components';
import { AnyAction } from 'redux';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { TypographySize } from '@root/lib/common-interfaces';

const vars = require('@styles/_config.scss');
const styles = require('./_default-top-bar.module.scss');

interface DefaultTopBarProps {
  title: string;
  back: boolean;
  backAction: () => AnyAction;
}

export class DefaultTopBar extends React.Component<DefaultTopBarProps> {
  renderContent = () => {
    return (
      <>
        <LayoutBlock flex={1}>
          {this.props.back &&
          <ClickableIcon
            border
            text={'back '}
            background={vars.gray1}
            onClick={this.props.backAction}>
            <Icons.Chevron />
          </ClickableIcon>}
        </LayoutBlock>
        <LayoutBlock flex={2} align="flex-center">
          <Text
            text={this.props.title}
            size={TypographySize.s}
          />
        </LayoutBlock>
        <LayoutBlock flex={1}></LayoutBlock>
      </>
    );
  }

  render() {
    return (
      <div className={styles.topbarContainer}>
        {this.renderContent()}
      </div>
    );
  }
}