import * as React from 'react';
import classnames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core';
import { capitalize } from '@root/lib/utils';

export const css = theme =>
  createStyles({
    /* Styles applied to the root element. */
    root: {
      userSelect: 'none',
      display: 'inline-block',
      fill: 'currentColor',
      flexShrink: 0,
      fontSize: theme.typography.pxToRem(24),
      transition: theme.transitions.create('fill', {
        duration: theme.transitions.duration.shorter,
      }),
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: theme.palette.primary.main,
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: theme.palette.secondary.main,
    },
    /* Styles applied to the root element if `color="action"`. */
    colorAction: {
      color: theme.palette.action.active,
    },
    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      color: theme.palette.error.main,
    },
    /* Styles applied to the root element if `color="disabled"`. */
    colorDisabled: {
      color: theme.palette.action.disabled,
    },
    /* Styles applied to the root element if `fontSize="inherit"`. */
    fontSizeInherit: {
      fontSize: 'inherit',
    },
    /* Styles applied to the root element if `fontSize="small"`. */
    fontSizeSmall: {
      fontSize: theme.typography.pxToRem(20),
    },
    /* Styles applied to the root element if `fontSize="large"`. */
    fontSizeLarge: {
      fontSize: theme.typography.pxToRem(35),
    },
  });

export interface SvgIconProps extends React.HTMLAttributes<HTMLElement> {
  classes?: any;
  className?: string;
  width?: number;
  height?: number;
  color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'error' | 'disabled';
  component?: React.ElementType;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
  htmlColor?: string;
  shapeRendering?: string;
  titleAccess?: string;
  viewBox?: string;
}

const SvgIconComponent = React.forwardRef(function SvgIcon(
  props: SvgIconProps,
  ref: React.RefObject<any>
) {
  const {
    children,
    classes,
    className,
    width = 2,
    height = 2,
    color = 'inherit',
    component: Component = 'svg',
    fontSize = 'default',
    htmlColor,
    titleAccess,
    viewBox = '0 0 24 24',
    ...other
  } = props;

  return (
    <Component
      className={classnames(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
          [classes[`fontSize${capitalize(fontSize)}`]]: fontSize !== 'default',
        },
        className
      )}
      focusable="false"
      viewBox={viewBox}
      color={htmlColor}
      aria-hidden={titleAccess ? 'false' : 'true'}
      role={titleAccess ? 'img' : 'presentation'}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
      }}
      {...other}
    >
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </Component>
  );
});

export const SvgIcon = withStyles(css, { name: 'DodaySvgIcon' })(
  React.memo(SvgIconComponent)
);
