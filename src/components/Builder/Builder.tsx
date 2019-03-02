import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from '@components';
import Select from 'react-virtualized-select';

const styles = require('./_builder.module.scss');

interface BuilderProps {
}

export class Builder extends React.Component<BuilderProps, any> {
  render() {
    return (
      <div className={styles.builderContainer}>
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
      </div>
    );
  }
}

export default connect()(Builder);