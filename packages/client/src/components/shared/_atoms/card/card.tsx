import * as React from 'react';
import * as classnames from 'classnames';
import { LayoutBlock } from '../layout-block';

const css = require('./card.module.scss');

interface CardProps {}

export class Card extends React.Component<CardProps> {
  render() {
    const { children } = this.props;
    const cx = classnames({
      [css.cardContainer]: true,
    });

    return <LayoutBlock className={cx}>{children}</LayoutBlock>;
  }
}
