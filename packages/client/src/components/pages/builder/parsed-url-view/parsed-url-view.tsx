import * as React from 'react';
import { LayoutBlock, Icons } from '@shared';
import { Space } from '@root/lib/common-interfaces';
import { css } from './css.parsed-url-view';
import {
  WithStyles,
  withStyles,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface ParsedUrlViewProps {
  loading?: boolean;
  parsedMetadata?: any;
  onClose?: () => void;
}

export const ParsedUrlView = withStyles(css)(
  (props: ParsedUrlViewProps & WithStyles) => {
    const { loading, parsedMetadata, onClose, classes } = props;
    return (
      <>
        {loading && (
          <LayoutBlock
            align="flexCenter"
            valign="vflexCenter"
            paddingBelow={Space.Small}
            paddingLeft={Space.Small}
            paddingRight={Space.Small}
            paddingAbove={Space.Small}
          >
            <Icons.InlineLoader />
          </LayoutBlock>
        )}
        {!loading && parsedMetadata && (
          <LayoutBlock direction="column">
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
              <div className={classes.builderAttachmentTextContainer}>
                <Typography variant="body1">
                  {parsedMetadata ? parsedMetadata.title || '' : ''}
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  {parsedMetadata ? parsedMetadata.url || '' : ''}
                </Typography>
              </div>
            </div>
          </LayoutBlock>
        )}
      </>
    );
  }
);
