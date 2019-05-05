import * as React from 'react';
import { Text, LayoutBlock, ClickableIcon, Icons } from '@shared';
import {
  TypographyColor,
  TypographySize,
  Space,
} from '@root/lib/common-interfaces';
import { AnyAction } from 'redux';

const vars = require('@styles/_config.scss');
const css = require('./_parsed-url-view.module.scss');

interface ParsedUrlViewProps {
  loading?: boolean;
  parsedMetadata?: any;
  onClose?: () => void;
}

export class ParsedUrlView extends React.Component<ParsedUrlViewProps> {
  render() {
    const { loading, parsedMetadata, onClose } = this.props;
    return (
      <>
        {loading && (
          <LayoutBlock
            align="flex-center"
            valign="vflex-center"
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
            <div className={css.builderAttachmentContainer}>
              {onClose && (
                <div className={css.builderAttachmentCloseIconContainer}>
                  <ClickableIcon backdrop onClick={onClose}>
                    <Icons.CloseCircle color={vars.gray3} />
                  </ClickableIcon>
                </div>
              )}
              <img
                className={css.builderAttachmentImage}
                src={parsedMetadata ? parsedMetadata.image || '' : ''}
              />
              <div className={css.builderAttachmentTextContainer}>
                <Text>{parsedMetadata ? parsedMetadata.title || '' : ''}</Text>
                <Text color={TypographyColor.Disabled} size={TypographySize.s}>
                  {parsedMetadata ? parsedMetadata.url || '' : ''}
                </Text>
              </div>
            </div>
          </LayoutBlock>
        )}
      </>
    );
  }
}
