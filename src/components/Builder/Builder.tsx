import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from '@components';
import Select from 'react-virtualized-select';
import { ButtonGroup } from '../shared/_molecules/button-group';
import { LayoutBlock } from '../shared/_atoms/layout-block';

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
        <Select
          labelKey='sysname'
          multi
          searchable
          valueKey='id'
        />
        <LayoutBlock align="flex-center">
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