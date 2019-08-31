import * as React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { LayoutBlock, Icons } from '@root/components/shared';
import { Space } from '@root/lib/common-interfaces';
import { withRouter, RouteComponentProps } from 'react-router';
import { DodayLike } from '@root/lib/models/entities/common';

const css = (theme: Theme) =>
  createStyles({
    dodayName: {
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '3',
      maxWidth: '200px',
      height: `${14 * 1.5 * 3}px`,
      margin: '0 auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  });

interface MasonryItemProps extends DodayLike {
  style: { [key: string]: string };
}

@(withRouter as any)
export class MasonryItemComponent extends React.PureComponent<
  MasonryItemProps & WithStyles & Partial<RouteComponentProps>
> {
  render() {
    const { did, name, resource, rate, style, classes } = this.props;
    const imageHeight = resource && resource.imageHeight;
    return (
      <Grid item key={did} style={style}>
        <Card
          onClick={() => this.props.history.push(`/dashboard/dodays/${did}`)}
        >
          <CardActionArea>
            {resource && resource.image && (
              <CardMedia
                image={(resource && resource.image) || ''}
                title="Image title"
                // className={classes.cardMedia}
                style={{
                  height: imageHeight
                    ? `${imageHeight}px`
                    : `${DEFAULT_IMAGE_HEIGHT}px`,
                }}
              />
            )}
            <CardContent>
              <Typography
                gutterBottom
                variant="body2"
                component="h2"
                className={classes.dodayName}
              >
                {name}
              </Typography>
              <LayoutBlock
                spaceAbove={Space.XXSmall}
                spaceBelow={Space.XXSmall}
                valign="vflexCenter"
              >
                <Typography
                  variant="body1"
                  // className={classes.paddedLabel}
                >
                  {rate || 0}
                </Typography>
                <Icons.Score color="primary" width={2} height={2} />
              </LayoutBlock>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export const MasonryItem = withStyles(css)(MasonryItemComponent);
