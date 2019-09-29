import React from 'react';
import { LayoutBlock } from '../../_atoms/layout-block';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  ButtonGroup,
  Button,
  Grow,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@material-ui/core';

export interface GoodSelectProps<T> {
  options: T[];
  renderLabel?: (option: T) => JSX.Element;
  labelProp?: string;
  onSelect: (option: T) => void;
  disabled?: boolean;
}

export function GoodSelect<T>(props: GoodSelectProps<T>) {
  const [open, updateOpen] = React.useState(false);
  const anchorRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(
    null
  );

  const {
    options,
    renderLabel,
    labelProp = 'label',
    onSelect,
    disabled,
  } = props;

  const handleMenuItemClick = (event: React.MouseEvent<any>, index: number) => {
    onSelect(options[index]);
    updateOpen(false);
  };

  const handleToggle = () => {
    updateOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current!.contains(event.target as any)) {
      return;
    }

    updateOpen(false);
  };

  return (
    <LayoutBlock>
      <ButtonGroup
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button disabled={disabled} onClick={e => handleMenuItemClick(e, 0)}>
          {renderLabel ? renderLabel(options[0]) : options[0][labelProp]}
        </Button>
        <Button
          disabled={disabled}
          color="primary"
          size="small"
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      disabled={index === 2}
                      onClick={e => handleMenuItemClick(e, index)}
                    >
                      {renderLabel ? renderLabel(option) : option[labelProp]}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </LayoutBlock>
  );
}
