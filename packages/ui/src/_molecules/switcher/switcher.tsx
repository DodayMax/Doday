import * as React from 'react';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import {
  IconButton,
  withStyles,
  createStyles,
  WithStyles,
  Chip,
  Theme,
  Box,
} from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    iconButton: {
      padding: 0,
    },
  });

interface SwitcherProps {
  /** Items to switch between */
  items: SwitcherItem[];
  /** Selected index */
  selected?: number;
  /** Render custom component between arrows */
  render?: (item: SwitcherItem) => React.ReactNode;
  /** onChange callback to get active index item */
  onChange?: (item: SwitcherItem) => {};
}

interface SwitcherState {
  currentIndex: number;
}

export type SwitcherItem = any;

export class SwitcherComponent extends React.Component<
  SwitcherProps & WithStyles,
  SwitcherState
> {
  constructor(props: SwitcherProps & WithStyles) {
    super(props);

    this.state = {
      currentIndex: props.selected || 0,
    };
  }

  static defaultProps = { items: [] };

  render() {
    const { items, onChange, render, classes } = this.props;
    const { currentIndex } = this.state;

    return (
      <Box display="flex" alignItems="center">
        <IconButton
          className={classes.iconButton}
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
          <Chip label={items[currentIndex].sysname} />
        )}
        <IconButton
          className={classes.iconButton}
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
      </Box>
    );
  }
}

export const Switcher = withStyles(css)(SwitcherComponent);
