import { Theme, createStyles } from '@material-ui/core';
import { config } from '@root/styles/config';

export const css = (theme: Theme) =>
  createStyles({
    builder: {
      '&-attachment-container': {
        position: 'relative',
        width: '100%',
        clip: 'auto',
        border: `1px solid ${theme.palette.grey[400]}`,
      },
      '&-attachment-close-icon-container': {
        position: 'absolute',
        top: '0.6rem',
        right: '0.6rem',
      },
      '&-attachment-image': {
        width: 'inherit',
      },
      '&-attachment-text-container': {
        display: 'flex',
        flexDirection: 'column',
        padding: `${config.spacing.spaceXS} ${config.spacing.spaceM}`,
      },
    },
  });
