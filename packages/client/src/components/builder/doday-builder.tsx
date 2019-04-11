import * as React from 'react';
import * as cuid from 'cuid';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {
  LayoutBlock,
  Input,
  Text,
  Marker,
  Button,
  ButtonSize,
  ButtonGroup,
  EditableDatePicker,
} from '@components';
import { ParsedUrlView } from './parsed-url-view/parsed-url-view';
import Select from 'react-select/lib/Select';
import {
  TypographySize,
  TypographyColor,
  StandartSizes,
  Activity,
} from '@root/lib/common-interfaces';
import { activityTypeColor, detectURL } from '@root/lib/utils';
import {
  ClearParsedMetadataAction,
  CreateAndTakeDodayAction,
  ParseUrlMetadataAction,
} from '@root/ducks/builder/actions';
import { Tag } from '@root/lib/models/entities/Tag';
import { Goal } from '@root/lib/models/entities/Goal';
import { Doday, SerializedDoday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';

const css = require('./_builder.module.scss');

interface DodayBuilderProps {
  loading: boolean;
  isUrlParsing: boolean;
  parsedMetadata?: any;
  goals: Goal[];
  activityType: Activity;
  createAndTakeDoday: (doday: SerializedDoday) => CreateAndTakeDodayAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedMetadataActionCreator: () => ClearParsedMetadataAction;
}

interface DodayBuilderState {
  selectedGoal?: Doday;
  dodayName: string;
  selectedTags?: Tag[];
  parsingFinished?: string;
  date: Date;
}

export class DodayBuilder extends React.Component<
  DodayBuilderProps,
  DodayBuilderState
> {
  constructor(props: DodayBuilderProps) {
    super(props);

    this.state = {
      dodayName: '',
      date: new Date(),
    };
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

  render() {
    const {
      loading,
      activityType,
      clearParsedMetadataActionCreator,
      isUrlParsing,
      goals,
      parsedMetadata,
    } = this.props;

    return (
      <>
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
          onPressEnter={this.handleCreateDoday}
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
            <EditableDatePicker
              minDate={new Date()}
              selected={this.state.date}
              onChange={this.handleChangeDate}
              className={css.datePickerInput}
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
      </>
    );
  }
}
