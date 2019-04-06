import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Input, LayoutBlock, Text, Icons } from '@components';
import Select from 'react-virtualized-select';
import { actions as builderActions } from '@ducks/builder';
import { ButtonGroup } from '../shared/_molecules/button-group';
import {
  TypographyColor,
  TypographySize,
  ActivityType,
  StandartSizes,
} from '@root/lib/common-interfaces';
import { ClickableIcon } from '../shared/_atoms/clickable-icon/clickable-icon';
import { RootState } from '@root/lib/models';
import {
  FetchActivityTypesAction,
  CreateAndTakeDodayAction,
  SetBuilderSuccessFlagAction,
} from '@root/ducks/builder/actions';
import { Page, PageHeader } from '../shared/_molecules/page';
import { ButtonSize } from '../shared/_atoms/button';
import { Doday, SerializedDoday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';

const vars = require('@styles/_config.scss');
const styles = require('./_builder.module.scss');

interface BuilderProps {}

interface BuilderState {
  selectedActivityType?: ActivityType;
  selectedGoal?: Doday;
  dodayName: string;
}

interface PropsFromConnect {
  activityTypes: ActivityType[];
  loading?: boolean;
  success?: boolean;
  fetchActivityTypes: () => FetchActivityTypesAction;
  createAndTakeDoday: (doday: SerializedDoday) => CreateAndTakeDodayAction;
  setBuilderSuccessFlag: (state?: boolean) => SetBuilderSuccessFlagAction;
}

export class Builder extends React.Component<
  BuilderProps & PropsFromConnect & RouteComponentProps,
  BuilderState
> {
  constructor(props) {
    super(props);

    this.state = {
      selectedActivityType: undefined,
      dodayName: '',
    };
  }

  componentDidMount() {
    this.props.fetchActivityTypes();
  }

  componentWillUpdate() {
    if (this.props.success) {
      this.props.history.push('/');
      this.props.setBuilderSuccessFlag(undefined);
    }
  }

  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      dodayName: e.target.value,
    });
  };

  selectActivityType = type => {
    this.setState({
      selectedActivityType: type,
    });
  };

  render() {
    const { activityTypes } = this.props;

    return (
      <Page header={<PageHeader />}>
        <Input
          size={StandartSizes.large}
          autofocus
          onChange={this.onChangeInput}
          placeholder="Enter name or paste link..."
        />
        <LayoutBlock direction="column">
          <div className={styles.builderAttachmentContainer}>
            <div className={styles.builderAttachmentCloseIconContainer}>
              <ClickableIcon backdrop onClick={() => {}}>
                <Icons.CloseCircle color={vars.gray5} />
              </ClickableIcon>
            </div>
            <img
              className={styles.builderAttachmentImage}
              src="https://i.imgur.com/59YOCv5.jpg"
            />
            <div className={styles.builderAttachmentTextContainer}>
              <Text text="Sample title" />
              <Text
                text="link"
                color={TypographyColor.Disabled}
                size={TypographySize.s}
              />
            </div>
          </div>
        </LayoutBlock>
        <LayoutBlock padding="2rem 0">
          <LayoutBlock>
            <Select
              options={activityTypes}
              value={this.state.selectedActivityType}
              onChange={this.selectActivityType}
              labelKey="sysname"
              valueKey="id"
              placeholder="Activity type"
            />
          </LayoutBlock>
          <LayoutBlock flex={1} margin="0 0 0 1rem">
            <Select
              labelKey="sysname"
              valueKey="id"
              placeholder="Choose goal"
            />
          </LayoutBlock>
          <LayoutBlock flex={1} margin="0 0 0 1rem">
            <Select
              labelKey="sysname"
              valueKey="id"
              placeholder="Estimate time"
            />
          </LayoutBlock>
        </LayoutBlock>
        <LayoutBlock flex={1} padding="0 0 2rem">
          <Select labelKey="sysname" valueKey="id" placeholder="Add tags" />
        </LayoutBlock>
        <LayoutBlock align="flex-end" valign="flex-center">
          <ButtonGroup>
            <Button
              size={ButtonSize.small}
              text={'Private'}
              onClick={() => {}}
            />
            <Button
              size={ButtonSize.small}
              text={'Public'}
              onClick={() => {}}
            />
          </ButtonGroup>
          <Button
            primary
            text={'Create'}
            onClick={() => {
              this.props.createAndTakeDoday({
                did: 'test',
                type: DodayTypes.Doday,
                name: this.state.dodayName,
                public: false,
              });
            }}
          />
        </LayoutBlock>
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  activityTypes: state.builder.activityTypes,
  loading: state.builder.loading,
  success: state.builder.success,
});

export default withRouter(connect(
  mapState,
  { ...builderActions }
)(Builder) as any);
