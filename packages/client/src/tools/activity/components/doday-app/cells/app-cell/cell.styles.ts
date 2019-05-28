import { Theme, createStyles } from '@material-ui/core';
import { config } from '@root/styles/config';

export const css = (theme: Theme) =>
  createStyles({
    listItemContainer: {
      cursor: 'pointer',
      padding: '6px',
      '&:hover': {
        background:
          theme.palette.type === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[200],
      },
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    padded: {
      padding: `${config.spacing.spaceS}px`,
    },
    pinned: {
      backgroundColor: `#BAA54A !important`,
    },
    name: {
      paddingLeft: '6px',
    },
    timeLabel: {
      color:
        theme.palette.type === 'dark'
          ? theme.palette.grey[700]
          : theme.palette.grey[400],
    },
    scrollContainer: {
      width: '17px',
      flex: 1,
      background:
        theme.palette.type === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.grey[100],
    },
    checkboxIconButton: {
      padding: '6px',
    },
  });
