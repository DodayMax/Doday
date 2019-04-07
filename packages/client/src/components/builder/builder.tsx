import * as React from 'react';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Input, LayoutBlock } from '@components';
import Select from 'react-virtualized-select';
import { actions as builderActions } from '@ducks/builder';
import { ButtonGroup } from '../shared/_molecules/button-group';
import { ActivityType, StandartSizes } from '@root/lib/common-interfaces';
import { RootState } from '@root/lib/models';
import {
  FetchActivityTypesAction,
  CreateAndTakeDodayAction,
  SetBuilderSuccessFlagAction,
  ParseUrlMetadataAction,
  ClearParsedMetadataAction,
} from '@root/ducks/builder/actions';
import { Page, PageHeader } from '../shared/_molecules/page';
import { ButtonSize } from '../shared/_atoms/button';
import { Doday, SerializedDoday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { detectURL } from '@root/lib/utils/regexp';
import { ParsedUrlView } from './parsed-url-view/parsed-url-view';

const styles = require('./_builder.module.scss');

interface BuilderProps {}

interface BuilderState {
  selectedActivityType?: ActivityType;
  selectedGoal?: Doday;
  dodayName: string;
}

interface PropsFromConnect {
  activityTypes: ActivityType[];
  isUrlParsing?: boolean;
  parsedMetadata?: any;
  loading?: boolean;
  success?: boolean;
  fetchActivityTypes: () => FetchActivityTypesAction;
  createAndTakeDoday: (doday: SerializedDoday) => CreateAndTakeDodayAction;
  setBuilderSuccessFlag: (state?: boolean) => SetBuilderSuccessFlagAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedMetadataActionCreator: () => ClearParsedMetadataAction;
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

  onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = String(e.target.value);
    const matches = detectURL(value);

    if (matches) {
      // parse meta of the link on server
      matches.map(url => this.props.parseUrlMetadataActionCreator(url));
    }

    this.setState({
      dodayName: value,
    });
  };

  selectActivityType = type => {
    this.setState({
      selectedActivityType: type,
    });
  };

  render() {
    const {
      activityTypes,
      loading,
      isUrlParsing,
      parsedMetadata,
      clearParsedMetadataActionCreator,
    } = this.props;

    return (
      <Page header={<PageHeader />}>
        <Input
          size={StandartSizes.large}
          autofocus
          value={this.state.dodayName}
          onChange={this.onChangeInput}
          placeholder="Enter name or paste link..."
        />
        <ParsedUrlView
          onClose={() => {
            this.setState({
              // TODO: replace only removed parsed link from text
              dodayName: '',
            });
            clearParsedMetadataActionCreator();
          }}
          loading={isUrlParsing}
          parsedMetadata={parsedMetadata}
        />
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
        <LayoutBlock align="flex-end" valign="vflex-center">
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
            isLoading={loading}
            text={'Create'}
            onClick={() => {
              if (this.state.dodayName) {
                this.props.createAndTakeDoday({
                  did: cuid(),
                  type: DodayTypes.Doday,
                  name: this.state.dodayName,
                  date: Date.now(),
                  public: false,
                });
              }
            }}
          />
        </LayoutBlock>
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  activityTypes: state.builder.activityTypes,
  isUrlParsing: state.builder.isUrlParsing,
  parsedMetadata: state.builder.parsedMetadata,
  loading: state.builder.loading,
  success: state.builder.success,
});

export default withRouter(connect(
  mapState,
  { ...builderActions }
)(Builder) as any);
