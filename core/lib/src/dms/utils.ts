import { config } from './config';
import { createStyles } from '@material-ui/core';

// -------------------- Utils -------------------- //

export const utils = {
  layoutUtils: createStyles({
    childFlex: {
      '& > *': {
        flex: 1,
      },
    },
    absolute: {
      position: 'absolute',
    },
    relative: {
      position: 'relative',
    },
    flexCenter: {
      justifyContent: 'center',
    },
    vflexCenter: {
      alignItems: 'center',
    },
    flexStart: {
      justifyContent: 'flex-start',
    },
    vflexStart: {
      alignItems: 'flex-start',
    },
    flexEnd: {
      justifyContent: 'flex-end',
    },
    vflexEnd: {
      alignItems: 'flex-end',
    },
    alignSelfCenter: {
      alignSelf: 'center',
      justifySelf: 'center',
    },
    alignSelfStart: {
      alignSelf: 'flex-start',
      justifySelf: 'flex-start',
    },
    alignSelfEnd: {
      alignSelf: 'flex-end',
      justifySelf: 'flex-end',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    spaceAround: {
      justifyContent: 'space-around',
    },
    fullHeight: {
      height: '100%',
    },
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    wrap: {
      flexWrap: 'wrap',
    },
    insideElementsMargin: {
      '& > *': {
        marginRight: '1rem',
      },
      '& > *:last-child': {
        marginRight: 0,
      },
    },
  }),
  paddingTop: (value: number) => ({
    paddingTop: `${value}px`,
  }),
  paddingBottom: (value: number) => ({
    paddingBottom: `${value}px`,
  }),
  paddingLeft: (value: number) => ({
    paddingLeft: `${value}px`,
  }),
  paddingRight: (value: number) => ({
    paddingRight: `${value}px`,
  }),
};

// -------------------- Paddings -------------------- //

export const paddings = createStyles({
  /** Above */
  paddingZeroAbove: {
    paddingTop: 0,
  },
  paddingXXSAbove: {
    paddingTop: `${config.spacing.spaceXXS}px`,
  },
  paddingXSAbove: {
    paddingTop: `${config.spacing.spaceXS}px`,
  },
  paddingSAbove: {
    paddingTop: `${config.spacing.spaceS}px`,
  },
  paddingMAbove: {
    paddingTop: `${config.spacing.spaceM}px`,
  },
  paddingLAbove: {
    paddingTop: `${config.spacing.spaceL}px`,
  },
  paddingXLAbove: {
    paddingTop: `${config.spacing.spaceXL}px`,
  },
  paddingXXLAbove: {
    paddingTop: `${config.spacing.spaceXXL}px`,
  },
  /** Below */
  paddingZeroBelow: {
    paddingBottom: 0,
  },
  paddingXXSBelow: {
    paddingBottom: `${config.spacing.spaceXXS}px`,
  },
  paddingXSBelow: {
    paddingBottom: `${config.spacing.spaceXS}px`,
  },
  paddingSBelow: {
    paddingBottom: `${config.spacing.spaceS}px`,
  },
  paddingMBelow: {
    paddingBottom: `${config.spacing.spaceM}px`,
  },
  paddingLBelow: {
    paddingBottom: `${config.spacing.spaceL}px`,
  },
  paddingXLBelow: {
    paddingBottom: `${config.spacing.spaceXL}px`,
  },
  paddingXXLBelow: {
    paddingBottom: `${config.spacing.spaceXXL}px`,
  },
  /** Left */
  paddingZeroLeft: {
    paddingLeft: 0,
  },
  paddingXXSLeft: {
    paddingLeft: `${config.spacing.spaceXXS}px`,
  },
  paddingXSLeft: {
    paddingLeft: `${config.spacing.spaceXS}px`,
  },
  paddingSLeft: {
    paddingLeft: `${config.spacing.spaceS}px`,
  },
  paddingMLeft: {
    paddingLeft: `${config.spacing.spaceM}px`,
  },
  paddingLLeft: {
    paddingLeft: `${config.spacing.spaceL}px`,
  },
  paddingXLLeft: {
    paddingLeft: `${config.spacing.spaceXL}px`,
  },
  paddingXXLLeft: {
    paddingLeft: `${config.spacing.spaceXXL}px`,
  },
  /** Right */
  paddingZeroRight: {
    paddingRight: 0,
  },
  paddingXXSRight: {
    paddingRight: `${config.spacing.spaceXXS}px`,
  },
  paddingXSRight: {
    paddingRight: `${config.spacing.spaceXS}px`,
  },
  paddingSRight: {
    paddingRight: `${config.spacing.spaceS}px`,
  },
  paddingMRight: {
    paddingRight: `${config.spacing.spaceM}px`,
  },
  paddingLRight: {
    paddingRight: `${config.spacing.spaceL}px`,
  },
  paddingXLRight: {
    paddingRight: `${config.spacing.spaceXL}px`,
  },
  paddingXXLRight: {
    paddingRight: `${config.spacing.spaceXXL}px`,
  },
});

export const margins = createStyles({
  /** Above */
  marginZeroAbove: {
    marginTop: 0,
  },
  marginXXSAbove: {
    marginTop: `${config.spacing.spaceXXS}px`,
  },
  marginXSAbove: {
    marginTop: `${config.spacing.spaceXS}px`,
  },
  marginSAbove: {
    marginTop: `${config.spacing.spaceS}px`,
  },
  marginMAbove: {
    marginTop: `${config.spacing.spaceM}px`,
  },
  marginLAbove: {
    marginTop: `${config.spacing.spaceL}px`,
  },
  marginXLAbove: {
    marginTop: `${config.spacing.spaceXL}px`,
  },
  marginXXLAbove: {
    marginTop: `${config.spacing.spaceXXL}px`,
  },
  /** Below */
  marginZeroBelow: {
    marginBottom: 0,
  },
  marginXXSBelow: {
    marginBottom: `${config.spacing.spaceXXS}px`,
  },
  marginXSBelow: {
    marginBottom: `${config.spacing.spaceXS}px`,
  },
  marginSBelow: {
    marginBottom: `${config.spacing.spaceS}px`,
  },
  marginMBelow: {
    marginBottom: `${config.spacing.spaceM}px`,
  },
  marginLBelow: {
    marginBottom: `${config.spacing.spaceL}px`,
  },
  marginXLBelow: {
    marginBottom: `${config.spacing.spaceXL}px`,
  },
  marginXXLBelow: {
    marginBottom: `${config.spacing.spaceXXL}px`,
  },
  /** Left */
  marginZeroLeft: {
    marginLeft: 0,
  },
  marginXXSLeft: {
    marginLeft: `${config.spacing.spaceXXS}px`,
  },
  marginXSLeft: {
    marginLeft: `${config.spacing.spaceXS}px`,
  },
  marginSLeft: {
    marginLeft: `${config.spacing.spaceS}px`,
  },
  marginMLeft: {
    marginLeft: `${config.spacing.spaceM}px`,
  },
  marginLLeft: {
    marginLeft: `${config.spacing.spaceL}px`,
  },
  marginXLLeft: {
    marginLeft: `${config.spacing.spaceXL}px`,
  },
  marginXXLLeft: {
    marginLeft: `${config.spacing.spaceXXL}px`,
  },
  /** Right */
  marginZeroRight: {
    marginRight: 0,
  },
  marginXXSRight: {
    marginRight: `${config.spacing.spaceXXS}px`,
  },
  marginXSRight: {
    marginRight: `${config.spacing.spaceXS}px`,
  },
  marginSRight: {
    marginRight: `${config.spacing.spaceS}px`,
  },
  marginMRight: {
    marginRight: `${config.spacing.spaceM}px`,
  },
  marginLRight: {
    marginRight: `${config.spacing.spaceL}px`,
  },
  marginXLRight: {
    marginRight: `${config.spacing.spaceXL}px`,
  },
  marginXXLRight: {
    marginRight: `${config.spacing.spaceXXL}px`,
  },
});
