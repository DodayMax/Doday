import * as React from 'react';
import { Button, Input } from '@components';
import { inject, observer } from 'mobx-react';
import Select from 'react-virtualized-select';
import { BuilderUIStore, ConfigStore } from '@stores';

interface BuilderProps {
  builderUIStore?: BuilderUIStore;
  configStore?: ConfigStore;
}

@observer
export class Builder extends React.Component<BuilderProps, any> {
  render() {
    const { builderUIStore, configStore } = this.props;

    return (
      <div className="builder__container">
        <Input
          autofocus
          placeholder="Enter name or paste link..."
          value={builderUIStore!.dodayNameInput}
          onChange={(event) => builderUIStore!.changeDodayNameInput(event.target.value)}
        />
        <Select
          labelKey='sysname'
          multi
          onChange={(tags) => builderUIStore!.changeDodayTagsInput(tags)}
          searchable
          value={builderUIStore!.tags}
          valueKey='id'
          options={configStore!.tags}
        />
        <Button
          text={'Draft'}
          onClick={() => builderUIStore!.createDoday('draft')}
        />
        <Button
          text={'Private'}
          onClick={() => builderUIStore!.createDoday('private')}
        />
        <Button
          text={'Public'}
          onClick={() => builderUIStore!.createDoday('public')}
        />
      </div>
    );
  }
}

export default inject('builderUIStore', 'configStore')(Builder);