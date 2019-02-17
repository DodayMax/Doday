import * as React from "react";
import { observer } from "mobx-react";
import { DraggableCore } from "react-draggable";
import { observable } from "mobx";

const styles = require('./_box.module.scss');

interface BoxViewProps {
  box: any;
  store: any;
}

class BoxView extends React.Component<BoxViewProps> {
  render() {
    const { box } = this.props;
    return (
      <DraggableCore onDrag={this.handleDrag}>
        <g onClick={this.handleClick}>
          <rect x={box.x} y={box.y} width={box.width} height={box.height} style={{ fill: '#fff' }} />
          <foreignObject transform={`translate(${box.x + 20}, ${box.y + 12})`} width={box.width - 40} height={box.height - 24}>
            <div style={{ color: 'black', textAlign: 'center', lineHeight: '20px' }}>{box.name}</div>
          </foreignObject>
        </g>
      </DraggableCore>
    )
  }

  handleClick = e => {
    this.props.store.setSelection(this.props.box.id);
    e.stopPropagation();
  }

  handleDrag = (e, dragInfo) => {
    this.props.box.move(dragInfo.deltaX, dragInfo.deltaY);
  }
}

export default observer(BoxView);
