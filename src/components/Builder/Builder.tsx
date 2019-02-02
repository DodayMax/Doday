import * as React from 'react';
import { Button, Input } from '@components';
import { inject, observer } from 'mobx-react';
import { BuilderUIStore } from '@stores';
import { sysnames } from '@lib/constants';
import './_builder.scss';


interface BuilderProps {
  builderUIStore?: BuilderUIStore;
}

@observer
export class Builder extends React.Component<BuilderProps> {
  render() {
    const { builderUIStore } = this.props;

    if (!builderUIStore!.selectedDodayType) {
      return (
        <div className="builder__menu">
          {builderUIStore!.dodayTypes.map(type => {
            return (
              <Button
                className="builder__menu-item"
                key={type.id}
                text={type.sysname}
                onClick={() => builderUIStore!.selectDodayType(type.sysname)}
              />
            );
          })}
        </div>
      );
    }
    switch (builderUIStore!.selectedDodayType) {
      case sysnames.dodayTypes.todo:
        return (
          <div className="builder__container">
            <Input
              value={builderUIStore!.dodayNameInput}
              onChange={(event) => builderUIStore!.changeDodayNameInput(event.target.value)}
            />
            <Button
              text={'+'}
              onClick={() => builderUIStore!.createDoday()}
            />
          </div>
        );
      case sysnames.dodayTypes.watch:
        return (
          <div className="builder__container">
            <Input
              value={builderUIStore!.dodayNameInput}
              onChange={(event) => builderUIStore!.changeDodayNameInput(event.target.value)}
            />
            <Button
              text={'+'}
              onClick={() => builderUIStore!.createDoday()}
            />
          </div>
        );
      case sysnames.dodayTypes.read:
        return (
          <div className="builder__container">
            <Input
              value={builderUIStore!.dodayNameInput}
              onChange={(event) => builderUIStore!.changeDodayNameInput(event.target.value)}
            />
            <Button
              text={'+'}
              onClick={() => builderUIStore!.createDoday()}
            />
          </div>
        );
      default:
        return 'nothing'
    }
  }
}

export default inject('builderUIStore')(Builder);