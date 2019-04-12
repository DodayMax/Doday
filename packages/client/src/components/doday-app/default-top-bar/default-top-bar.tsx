import * as React from 'react';
import { ClickableIcon } from '@root/components/shared/_atoms/clickable-icon/clickable-icon';
import { Icons, Text } from '@root/components';
import { AnyAction } from 'redux';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { TypographySize } from '@root/lib/common-interfaces';

const styles = require('./_default-top-bar.module.scss');

interface DefaultTopBarProps {
  title: string;
  leftAction: React.ReactElement<any>;
  rightAction: React.ReactElement<any>;
}

export class DefaultTopBar extends React.Component<DefaultTopBarProps> {
  renderContent = () => {
    return (
      <>
        <LayoutBlock flex={1}>{this.props.leftAction}</LayoutBlock>
        <LayoutBlock flex={2} align="flex-center">
          <Text size={TypographySize.s}>{this.props.title}</Text>
        </LayoutBlock>
        <LayoutBlock align="flex-end" flex={1}>
          {this.props.rightAction}
        </LayoutBlock>
      </>
    );
  };

  render() {
    return <div className={styles.topbarContainer}>{this.renderContent()}</div>;
  }
}
