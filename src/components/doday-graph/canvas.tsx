import * as React from "react";
import { values } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import storeInstance from './stores/store';

import BoxView from "./components/box-view";
import ArrowView from "./components/arrow-view";
import Sidebar from "./components/sidebar";
import FunStuff from "./components/fun-stuff";

const styles = require('./_canvas.module.scss');

interface CanvasProps {
  store: any;
}

class Canvas extends React.Component<CanvasProps> {
  render() {
    const { store } = this.props
    return (
      <div className={styles.canvasContainer}>
        <div className={styles.canvas} onClick={this.onCanvasClick}>
          <svg>
            {store.arrows.map(arrow => <ArrowView arrow={arrow} key={arrow.id} />)}
            {values(store.boxes).map(box => (
              <BoxView box={box} store={store} key={box.id} />
            ))}
          </svg>
        </div>
        <Sidebar store={store} />
        <FunStuff />
        <DevTools />
      </div>
    )
  }

  onCanvasClick = e => {
    const { store } = this.props
    if (e.ctrlKey === false) {
      store.setSelection(null)
    } else {
      store.createBox("Hi.", e.clientX - 50, e.clientY - 20, store.selection)
    }
  }
}

export default observer(() => <Canvas store={storeInstance.get()} />);
