import * as React from 'react';
import classnames from 'classnames';
import { Icons } from '@root/components';

const styles = require('./_input.module.scss');

interface InputProps {
  isLoading?: boolean;
  autofocus?: boolean;
}

export class Input extends React.Component<InputProps & React.InputHTMLAttributes<HTMLInputElement>> {
  input: HTMLInputElement | null;

  constructor(props) {
    super(props);

    this.input = null;
  }

  componentDidMount() {
    if (this.props.autofocus && this.input) {
      setTimeout(
        () => this.input!.focus(),
        100
      );
    }
  }

  render() {
    const { value, onChange, autofocus, isLoading = false, ...props } = this.props;
    const classNames = classnames({
      [styles.input]: true,
      [styles.loading]: isLoading,
    });

    return (
      <div className={styles.inputContainer}>
        <input
          className={classNames}
          ref={(node) => this.input = node}
          value={value}
          onChange={onChange}
          {...props}
        />
        {isLoading ? <Icons.InlineLoader className={styles.loader} /> : null}
      </div>
    );
  }
}