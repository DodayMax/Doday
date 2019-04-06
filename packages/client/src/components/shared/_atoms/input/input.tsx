import * as React from 'react';
import classnames from 'classnames';
import { Icons } from '@root/components';
import { StandartSizes } from '@root/lib/common-interfaces';

const styles = require('./_input.module.scss');

interface InputProps {
  size?: StandartSizes;
  isLoading?: boolean;
  autofocus?: boolean;
  setRef?: (node: HTMLInputElement | null) => void;
}

export class Input extends React.Component<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> {
  input: HTMLInputElement | null;

  constructor(props) {
    super(props);

    this.input = null;
  }

  componentDidMount() {
    if (this.props.setRef) {
      this.props.setRef(this.input);
    }
    if (this.props.autofocus && this.input) {
      setTimeout(() => this.input!.focus(), 100);
    }
  }

  render() {
    const {
      value,
      onChange,
      autofocus,
      isLoading = false,
      size = StandartSizes.medium,
      ...props
    } = this.props;
    const classNames = classnames(
      {
        [styles.input]: true,
        [styles.loading]: isLoading,
      },
      styles[StandartSizes[size]]
    );

    return (
      <div className={styles.inputContainer}>
        <input
          className={classNames}
          ref={node => (this.input = node)}
          value={value}
          onChange={onChange}
          {...props}
        />
        {isLoading ? <Icons.InlineLoader className={styles.loader} /> : null}
      </div>
    );
  }
}
