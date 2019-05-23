import * as React from 'react';
import { ClickableIcon } from '../../_atoms/clickable-icon/clickable-icon';
import { Marker } from '../../_atoms/marker';
import { LayoutBlock } from '../../_atoms/layout-block';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { IconButton } from '@material-ui/core';

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
        <IconButton
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
            aria-label="Left"
          >
            <ArrowLeft />
        </IconButton>
        {render ? (
          render(items[currentIndex])
        ) : (
          <Marker rounded text={items[currentIndex].sysname} />
        )}
        <IconButton
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
            aria-label="Left"
          >
            <ArrowRight />
        </IconButton>
      </LayoutBlock>
    );
  }
}
