import * as React from 'react';
import { Button, Input } from '@components';
import Select from 'react-virtualized-select';

interface BuilderProps {
}

export class Builder extends React.Component<BuilderProps, any> {
  render() {
    return (
      <div className="builder__container">
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
        />
        <Button
          text={'Private'}
        />
        <Button
          text={'Public'}
        />
      </div>
    );
  }
}

export default Builder;