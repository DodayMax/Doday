import * as React from 'react';
import { Button } from '@components';
import { inject, observer } from 'mobx-react';
import { DodayTypeMenuItem } from '@lib/common-interfaces';
import './_builder.scss';

interface BuilderProps {
  dodayTypes: DodayTypeMenuItem[];
  selectedDodayType?: string;
  selectDodayType: (type: string) => void;
}

@observer
export class Builder extends React.Component<BuilderProps> {
  render() {
    const { dodayTypes, selectedDodayType, selectDodayType } = this.props;

    if (!selectedDodayType) {
      return (
        <div className="builder__menu">
          {dodayTypes.map(type => {
            return (
              <Button
                className="builder__menu-item"
                key={type.id}
                text={type.sysname}
                onClick={() => selectDodayType(type.sysname)}
              />
            );
          })}
        </div>
      );
    }
    return <div className="builder__container"></div>;
  }
}

export default Builder;