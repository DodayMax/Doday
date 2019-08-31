import * as React from 'react';
import { LayoutBlock, Icons } from '@doday/shared';
import { Space } from '@doday/lib';
import { css } from './css.parsed-url-view';
import {
  WithStyles,
  withStyles,
  IconButton,
  Typography,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface ParsedUrlViewProps {
  loading?: boolean;
  parsedMetadata?: any;
  onClose?: () => void;
}

export const ParsedUrlView = withStyles(css)(
  withTheme()((props: ParsedUrlViewProps & WithStyles & WithTheme) => {
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
            <Icons.InlineLoader color={props.theme.palette.action.active} />
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
              <LayoutBlock
                direction="column"
                spaceAbove={Space.Small}
                spaceLeft={Space.Small}
                spaceBelow={Space.Small}
                spaceRight={Space.Small}
              >
                <Typography variant="subtitle2">
                  {parsedMetadata ? parsedMetadata.title || '' : ''}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {parsedMetadata ? parsedMetadata.url || '' : ''}
                </Typography>
              </LayoutBlock>
            </div>
          </LayoutBlock>
        )}
      </>
    );
  })
);
