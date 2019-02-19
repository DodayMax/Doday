import * as React from "react";
import { observer } from "mobx-react";

const styles = require('./_sidebar.module.scss');

interface SidebarProps {
    store: any;
}

class Sidebar extends React.Component<SidebarProps> {
    render() {
        const { selection } = this.props.store;
        return selection ? (
            <div className={`${styles.sidebar} ${styles.sidebarOpen}`}>
                <small>(control click the canvas to create new boxes)</small>
                <hr />
                Caption:
                <input onChange={this.onChange} value={selection.name} />
            </div>
        ) : (
            <div className={styles.sidebar} />
        );
    }

    onChange = e => {
        this.props.store.selection.setName(e.target.value);
    }
}

export default observer(Sidebar)
