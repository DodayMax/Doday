import * as React from 'react';
import { ClickableIcon } from '../../_atoms/clickable-icon/clickable-icon';
import { Marker } from '../../_atoms/marker';
import { LayoutBlock } from '../../_atoms/layout-block';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

const vars = require('@styles/_config.scss');

interface SwitcherProps {
  /** Items to switch between */
  items: SwitcherItem[];
  /** Render custom component between arrows */
  render?: (item: SwitcherItem) => React.ReactNode;
  /** onChange callback to get active index item */
  onChange?: (item: SwitcherItem) => {};
}

interface SwitcherState {
  currentIndex: number;
}

export type SwitcherItem = any;

export class Switcher extends React.Component<SwitcherProps, SwitcherState> {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  static defaultProps = { items: [] };

  render() {
    const { items, onChange, render } = this.props;
    const { currentIndex } = this.state;

    return (
      <LayoutBlock valign="vflex-center">
        <ClickableIcon
          onClick={() => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
              newIndex = items.length - 1;
            }
            this.setState({ currentIndex: newIndex });
            if (onChange) {
              onChange(items[newIndex]);
            }
          }}
        >
          <ArrowLeft />
        </ClickableIcon>
        {render ? (
          render(items[currentIndex])
        ) : (
          <Marker rounded text={items[currentIndex].sysname} />
        )}
        <ClickableIcon
          onClick={() => {
            let newIndex = currentIndex + 1;
            if (newIndex > items.length - 1) {
              newIndex = 0;
            }
            this.setState({ currentIndex: newIndex });
            if (onChange) {
              onChange(items[newIndex]);
            }
          }}
        >
          <ArrowRight />
        </ClickableIcon>
      </LayoutBlock>
    );
  }
}
