// import * as React from 'react';
// import * as cuid from 'cuid';
// import { LayoutBlock, Button, Text, Input, Icons } from '@components';
// import {
//   TypographySize,
//   TypographyColor,
//   Size,
//   Space,
// } from '@root/lib/common-interfaces';
// import { SerializedGoal } from '@root/lib/models/entities/Goal';
// import { DodayTypes } from '@root/lib/models/entities/common';
// import { CreateGoalAction } from '@root/ducks/builder/actions';
// import { getRandomColor } from '@root/lib/utils';
// import { CustomDatePicker } from '../shared/_atoms/custom-datepicker';

// const css = require('./_builder.module.scss');

// interface GoalBuilderProps {
//   loading: boolean;
//   ownerDID: string;
//   goalNumber: number;
//   createGoalActionCreator: (goal: SerializedGoal) => CreateGoalAction;
// }

// interface GoalBuilderState {
//   goalName: string;
//   startDate: Date;
//   endDate: Date;
// }

// export class GoalBuilder extends React.Component<
//   GoalBuilderProps,
//   GoalBuilderState
// > {
//   constructor(props: GoalBuilderProps) {
//     super(props);

//     this.state = {
//       goalName: '',
//       startDate: new Date(),
//       endDate: new Date(),
//     };
//   }

//   handleCreateGoal = () => {
//     this.props.createGoalActionCreator({
//       did: cuid(),
//       public: false,
//       type: DodayTypes.Goal,
//       name: this.state.goalName,
//       ownerDID: this.props.ownerDID,
//       color: getRandomColor(this.props.goalNumber),
//       startDate: this.state.startDate.getTime(),
//       endDate: this.state.endDate.getTime(),
//     });
//   };

//   render() {
//     const { loading } = this.props;
//     const days = Math.round(
//       ((this.state.endDate as any) - (this.state.startDate as any)) /
//         (1000 * 60 * 60 * 24)
//     );

//     return (
//       <>
//         <LayoutBlock insideElementsMargin valign="vflex-end">
//           <Text size={TypographySize.s} color={TypographyColor.Disabled}>
//             create new goal:
//           </Text>
//         </LayoutBlock>
//         <Input
//           size={Size.Large}
//           autofocus
//           value={this.state.goalName}
//           onChange={e => {
//             this.setState({
//               goalName: e.target.value,
//             });
//           }}
//           onPressEnter={this.handleCreateGoal}
//           placeholder="Enter name or paste link..."
//         />
//         <LayoutBlock
//           align="space-between"
//           valign="vflex-center"
//           paddingAbove={Space.Small}
//           paddingBelow={Space.Small}
//         >
//           <CustomDatePicker
//             icon={<Icons.Flag />}
//             minDate={new Date()}
//             selected={this.state.startDate}
//             onChange={date => {
//               this.setState({
//                 startDate: date,
//               });
//             }}
//             className={css.datePickerInput}
//           />
//           <LayoutBlock
//             relative
//             flex="1"
//             valign="vflex-center"
//             align="flex-center"
//             direction="column"
//           >
//             <Text
//               color={
//                 days ? TypographyColor.Secondary : TypographyColor.Disabled
//               }
//               className={css.daysLabel}
//               size={TypographySize.s}
//             >
//               {days} days
//             </Text>
//             <div className={css.connectingLine} />
//           </LayoutBlock>
//           <CustomDatePicker
//             icon={<Icons.Flag />}
//             minDate={new Date()}
//             selected={this.state.endDate}
//             onChange={date => {
//               this.setState({
//                 endDate: date,
//               });
//             }}
//             className={css.datePickerInput}
//           />
//         </LayoutBlock>
//         <LayoutBlock
//           insideElementsMargin
//           align="flex-end"
//           valign="vflex-center"
//         >
//           <Button
//             primary
//             disabled={!this.state.goalName}
//             isLoading={loading}
//             onClick={this.handleCreateGoal}
//           >
//             Create
//           </Button>
//         </LayoutBlock>
//       </>
//     );
//   }
// }
