import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input, LayoutBlock, Text, Icons } from '@components';
import Select from 'react-virtualized-select';
import { ButtonGroup } from '../shared/_molecules/button-group';
import { TypographyColor, TypographySize } from '@root/lib/common-interfaces';
import { ClickableIcon } from '../shared/_atoms/clickable-icon/clickable-icon';

const vars = require('@styles/_config.scss');
console.log(vars);
const styles = require('./_builder.module.scss');

interface BuilderProps {
}

export class Builder extends React.Component<BuilderProps, any> {
  render() {
    return (
      <section className={styles.builderContainer}>
        <Input
          autofocus
          placeholder="Enter name or paste link..."
        />
        <LayoutBlock direction="column">
          <div className={styles.builderAttachmentContainer}>
            <div className={styles.builderAttachmentCloseIconContainer}>
              <ClickableIcon backdrop onClick={() => {}}>
                <Icons.CloseCircle color={vars.gray5} />
              </ClickableIcon>
            </div>
            <img className={styles.builderAttachmentImage} src="https://i.imgur.com/59YOCv5.jpg" />
            <div className={styles.builderAttachmentTextContainer}>
              <Text text="Sample title" />
              <Text text="link" color={TypographyColor.Disabled} size={TypographySize.s}  />
            </div>
          </div>
        </LayoutBlock>
        <LayoutBlock padding="2rem 0">
          <LayoutBlock>
            <Select
              style={{width: '100%'}}
              labelKey='sysname'
              valueKey='id'
              placeholder='Activity type'
            />
          </LayoutBlock>
          <LayoutBlock flex={2} margin="0 0 0 1rem">
            <Select
              style={{width: '100%'}}
              labelKey='sysname'
              valueKey='id'
              placeholder='Choose folder'
            />
          </LayoutBlock>
        </LayoutBlock>
        <LayoutBlock align="flex-center" padding="0 0 2rem 0">
          <ButtonGroup>
            <Button
              text={'Draft'}
              onClick={() => {}}
            />
            <Button
              text={'Private'}
              onClick={() => {}}
            />
            <Button
              text={'Public'}
              onClick={() => {}}
            />
          </ButtonGroup>
        </LayoutBlock>
        <LayoutBlock align="flex-end">
          <Button
            primary
            text={'Create'}
            onClick={() => {}}
          />
        </LayoutBlock>
      </section>
    );
  }
}

export default connect()(Builder);