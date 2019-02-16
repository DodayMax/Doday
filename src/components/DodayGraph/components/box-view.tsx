import * as React from "react";
import { observer } from "mobx-react";
import { DraggableCore } from "react-draggable";

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
                    <rect x={box.x} y={box.y} width={box.width} height={50} style={{ fill: '#fff' }} />
                    <text x={box.x + 10} y={box.y + 10} style={{ fill: 'black' }}>{box.name}</text>
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
