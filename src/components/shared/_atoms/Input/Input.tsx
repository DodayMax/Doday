import * as React from 'react';

interface InputProps {
  autofocus: boolean;
}

export class Input extends React.Component<InputProps & React.InputHTMLAttributes<HTMLInputElement>> {
  input: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  componentDidMount() {
    if (this.props.autofocus && this.input && this.input.current) {
      setTimeout(
        () => this.input.current!.focus(),
        100
      );
    }
  }

  render() {
    const { value, onChange, autofocus, ...props } = this.props;

    return (
      <input
        className="input"
        ref={this.input}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }
}