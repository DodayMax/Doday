import * as React from 'react';
import { Button } from '@components';
import { BuilderStore } from '@stores';
import { inject, observer } from 'mobx-react';
import './_builder.scss';

interface BuilderProps {
  builderStore?: BuilderStore;
}

@observer
export class Builder extends React.Component<BuilderProps> {
  render() {
    const { builderStore } = this.props;

    console.log(builderStore!.selectedDodayType);
    if (!builderStore!.selectedDodayType) {
      return (
        <div className="builder__menu">
          <Button
            className="builder__menu-item"
            text="Todo"
            onClick={() => builderStore!.selectDodayType('Todo')}
          />
          <Button
            className="builder__menu-item"
            text="Watch"
            onClick={() => builderStore!.selectDodayType('Watch')}
          />
          <Button
            className="builder__menu-item"
            text="Read"
            onClick={() => builderStore!.selectDodayType('Read')}
          />
        </div>
      );
    }
    return <div className="builder__container"></div>;
  }
}

export default inject('builderStore')(Builder);