import * as React from 'react';
import classnames from 'classnames';
import { TypographySize, DodayColors } from '@lib/common-interfaces';
import { Checkbox, Text } from '@components';
import { Doday } from '@root/lib/models/entities/Doday';
import { AnyAction } from 'redux';
import { Marker } from '@root/components/shared/_atoms/marker';
import { activityTypeColor } from '@root/lib/utils';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';

const css = require('./_doday-cell.module.scss');

interface DodayCellProps {
  doday: Doday;
  active?: boolean;
  onClick?: (route: string) => void;
  onComplete?: (doday: Doday) => AnyAction;
}

export const DodayCell: React.SFC<DodayCellProps> = ({
  doday,
  active = false,
  onClick,
  onComplete,
}) => {
  const classNames = classnames({
    [css.cell]: true,
    [css.padded]: true,
    [css.active]: active,
  });

  return (
    <li
      className={classNames}
      key={doday.did}
      onClick={() => onClick && onClick(`/dodays/${doday.did}`)}
    >
      {
        <Checkbox
          onClick={e => {
            e.stopPropagation();
            if (onComplete) {
              onComplete(doday);
            }
          }}
          checked={doday.completed}
        />
      }
      <Text
        wordwrap
        text={doday.name}
        size={TypographySize.s}
        className={css.cellTitle}
      />
      <LayoutBlock absolute top="0" right="0">
        <Marker
          color={DodayColors.gray4}
          text={doday.activityType}
          size={TypographySize.s}
        />
      </LayoutBlock>
    </li>
  );
};
