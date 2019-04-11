import * as React from 'react';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Input, LayoutBlock, Text } from '@components';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import { actions as builderActions } from '@ducks/builder';
import { ButtonGroup } from '../shared/_molecules/button-group';
import {
  StandartSizes,
  Activity,
  TypographySize,
  TypographyColor,
  DodayColors,
} from '@root/lib/common-interfaces';
import { RootState } from '@root/lib/models';
import {
  FetchActivityTypesAction,
  CreateAndTakeDodayAction,
  SetBuilderSuccessFlagAction,
  ParseUrlMetadataAction,
  ClearParsedMetadataAction,
  ClearBuilderAction,
} from '@root/ducks/builder/actions';
import { Page, PageHeader } from '../shared/_molecules/page';
import { ButtonSize } from '../shared/_atoms/button';
import { Doday, SerializedDoday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { detectURL } from '@root/lib/utils/regexp';
import { ParsedUrlView } from './parsed-url-view/parsed-url-view';
import { Tag } from '@root/lib/models/entities/Tag';
import DatePicker from 'react-datepicker';
import { Marker } from '../shared/_atoms/marker';
import { activityTypeColor } from '@root/lib/utils';

const styles = require('./_builder.module.scss');

interface BuilderProps {}

interface BuilderState {
  selectedGoal?: Doday;
  dodayName: string;
  selectedTags?: Tag[];
  parsingFinished?: string;
  date: Date;
}

interface PropsFromConnect {
  activityType: Activity;
  isUrlParsing?: boolean;
  parsedMetadata?: any;
  loading?: boolean;
  success?: boolean;
  fetchActivityTypes: () => FetchActivityTypesAction;
  createAndTakeDoday: (doday: SerializedDoday) => CreateAndTakeDodayAction;
  setBuilderSuccessFlag: (state?: boolean) => SetBuilderSuccessFlagAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedMetadataActionCreator: () => ClearParsedMetadataAction;
  clearBuilderActionCreator: () => ClearBuilderAction;
}

const goals = [
  {
    label: 'Goal 1',
    value: 'qwje12kj3k1j23',
  },
];

export class Builder extends React.Component<
  BuilderProps & PropsFromConnect & Partial<RouteComponentProps>,
  BuilderState
> {
  constructor(
    props: BuilderProps & PropsFromConnect & Partial<RouteComponentProps>
  ) {
    super(props);

    this.state = {
      dodayName: '',
      date: new Date(),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.success) {
      this.props.history.push('/');
      this.props.setBuilderSuccessFlag(undefined);
    }
  }

  shouldComponentUpdate(nextProps): boolean {
    if (this.props.isUrlParsing && !nextProps.isUrlParsing) {
      const parsedTags =
        nextProps.parsedMetadata && nextProps.parsedMetadata.keywords;
      const mappedTags =
        parsedTags &&
        parsedTags.map(tag => ({
          label: tag,
          value: tag,
        }));
      this.setState({
        dodayName: '',
        selectedTags: this.state.selectedTags
          ? (mappedTags && this.state.selectedTags.concat(mappedTags)) ||
            this.state.selectedTags
          : [],
      });
    }

    return true;
  }

  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });

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

  handleChangeDate = date => {
    this.setState({
      date,
    });
  };

  handleCreateDoday = () => {
    const { parsedMetadata, activityType = 'do' } = this.props;

    if (this.state.dodayName || parsedMetadata) {
      const resource = parsedMetadata && {
        ...parsedMetadata,
        did: cuid(),
      };
      this.props.createAndTakeDoday({
        did: cuid(),
        activityType,
        type: DodayTypes.Doday,
        name: this.state.dodayName || parsedMetadata.title,
        tags:
          this.state.selectedTags &&
          this.state.selectedTags.map(tag => tag.value),
        date: this.state.date.getTime(),
        resource: resource,
        public: false,
      });
    }
  };

  onCloseBuidler = () => {
    this.props.clearBuilderActionCreator();
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      this.handleCreateDoday();
    }
  };

  render() {
    const {
      loading,
      isUrlParsing,
      parsedMetadata,
      clearParsedMetadataActionCreator,
      activityType = 'do',
    } = this.props;

    return (
      <Page header={<PageHeader onClose={this.onCloseBuidler} />}>
        <LayoutBlock insideElementsMargin valign="vflex-end">
          <Text size={TypographySize.s} color={TypographyColor.Disabled}>
            activity type:
          </Text>
          <Marker
            rounded
            color={activityTypeColor(this.props.activityType)}
            text={activityType}
          />
        </LayoutBlock>
        <Input
          size={StandartSizes.large}
          autofocus
          value={this.state.dodayName}
          onChange={this.onChangeInput}
          onKeyDown={this.onKeyDown}
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
        <LayoutBlock childFlex padding="2rem 0">
          <LayoutBlock childFlex flex={1}>
            <Select
              labelKey="sysname"
              valueKey="id"
              placeholder="Related to goal"
              options={goals}
            />
          </LayoutBlock>
          <LayoutBlock childFlex flex={1} margin="0 0 0 1rem">
            <DatePicker
              minDate={new Date()}
              selected={this.state.date}
              onChange={this.handleChangeDate}
              className={styles.datePickerInput}
            />
          </LayoutBlock>
        </LayoutBlock>
        <LayoutBlock childFlex flex={1} padding="0 0 2rem">
          <div>
            <AsyncCreatableSelect
              value={this.state.selectedTags}
              onChange={(value: Tag[]) => {
                this.setState({ selectedTags: value });
              }}
              placeholder="Add tags that other people can easily find your doday"
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={this.promiseOptions}
            />
          </div>
        </LayoutBlock>
        <LayoutBlock
          insideElementsMargin
          align="flex-end"
          valign="vflex-center"
        >
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
            onClick={this.handleCreateDoday}
          />
        </LayoutBlock>
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  activityType: state.builder.activityType,
  isUrlParsing: state.builder.isUrlParsing,
  parsedMetadata: state.builder.parsedMetadata,
  loading: state.builder.loading,
  success: state.builder.success,
});

export default withRouter(connect(
  mapState,
  { ...builderActions }
)(Builder) as any);
