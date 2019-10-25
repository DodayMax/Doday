import * as React from 'react';
import { css } from './css.parsed-url-view';
import {
  WithStyles,
  withStyles,
  IconButton,
  Typography,
  withTheme,
  WithTheme,
  Box,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Icons } from '../..';

interface ParsedUrlViewProps {
  loading?: boolean;
  parsedMetadata?: any;
  onClose?: () => void;
}

export const ParsedUrlView = withStyles(css)(
  withTheme((props: ParsedUrlViewProps & WithStyles & WithTheme) => {
    const { loading, parsedMetadata, onClose, classes } = props;
    return (
      <>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <Icons.InlineLoader color={props.theme.palette.action.active} />
          </Box>
        )}
        {!loading && parsedMetadata && (
          <Box display="flex" flexDirection="column">
            <div className={classes.builderAttachmentContainer}>
              {onClose && (
                <div className={classes.builderAttachmentCloseIconContainer}>
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
              <img
                className={classes.builderAttachmentImage}
                src={parsedMetadata ? parsedMetadata.image || '' : ''}
              />
              <Box display="flex" flexDirection="column" m={2}>
                <Typography variant="subtitle2">
                  {parsedMetadata ? parsedMetadata.title || '' : ''}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {parsedMetadata ? parsedMetadata.url || '' : ''}
                </Typography>
              </Box>
            </div>
          </Box>
        )}
      </>
    );
  })
);
