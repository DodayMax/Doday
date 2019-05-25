// import * as React from 'react';
// import classnames from 'classnames';
// import { TypographySize, DodayColor, Space } from '@lib/common-interfaces';
// import { Text, Icons } from '@components';
// import { Doday } from '@root/lib/models/entities/Doday';
// import { AnyAction } from 'redux';
// import { Marker } from '@root/components/shared/_atoms/marker';
// import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
// import { durationToMinutes } from '@root/lib/utils';

// const css = require('./public-cell.module.scss');

// interface PublicCellProps {
//   doday: Doday;
//   active?: boolean;
//   onClick?: (route: string, doday: Doday) => void;
//   onComplete?: (doday: Doday) => AnyAction;
// }

// export const PublicCell: React.FC<PublicCellProps> = ({
//   doday,
//   active = false,
//   onClick,
//   onComplete,
// }) => {
//   const classNames = classnames({
//     [css.cell]: true,
//     [css.active]: active,
//   });

//   return (
//     <li
//       className={classNames}
//       key={doday.did}
//       onClick={() => onClick && onClick(`/dodays/${doday.did}`, doday)}
//     >
//       <LayoutBlock spaceAbove={Space.XSmall} flex="1" direction="column">
//         <Text
//           spaceLeft={Space.Small}
//           wordwrap
//           size={TypographySize.m}
//           className={css.cellTitle}
//         >
//           {doday.name}
//         </Text>
//         <LayoutBlock
//           align="flexEnd"
//           spaceRight={Space.XSmall}
//           valign="vflexCenter"
//         >
//           <Text spaceRight={Space.XXSmall} size={TypographySize.s}>
//             {24}
//           </Text>
//           <Icons.Score width={16} height={16} />
//         </LayoutBlock>
//         <LayoutBlock
//           className={css.markersContainer}
//           spaceAbove={Space.XSmall}
//           paddingLeft={Space.XSmall}
//           paddingRight={Space.XSmall}
//           paddingAbove={Space.XXSmall}
//           paddingBelow={Space.XXSmall}
//           align="spaceBetween"
//         >
//           <Marker
//             bordered
//             rounded
//             color={DodayColor.gray4}
//             text={doday.activityType}
//             size={TypographySize.s}
//           />
//           <Marker
//             bordered
//             rounded
//             color={DodayColor.blueLight}
//             text={String(Math.floor(durationToMinutes(doday.duration) / 60))}
//             size={TypographySize.s}
//           />
//         </LayoutBlock>
//       </LayoutBlock>
//     </li>
//   );
// };
