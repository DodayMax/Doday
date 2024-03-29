import { Theme, createStyles } from '@material-ui/core';

export const css = (theme: Theme) =>
  createStyles({
    builderAttachmentContainer: {
      position: 'relative',
      width: '100%',
      clip: 'auto',
      border: `1px solid ${theme.palette.grey[400]}`,
    },
    builderAttachmentCloseIconContainer: {
      position: 'absolute',
      top: '0.6rem',
      right: '0.6rem',
    },
    builderAttachmentImage: {
      width: 'inherit',
    },
  });
