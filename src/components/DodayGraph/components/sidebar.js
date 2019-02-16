import React, { Component } from "react";
import { observer } from "mobx-react";

const styles = require('./_sidebar.module.scss');

class Sidebar extends Component {
    render() {
        const { selection } = this.props.store
        return selection ? (
            <div className={`${styles.sidebar} ${styles.sidebarOpen}`}>
                <small>(control click the canvas to create new boxes)</small>
                <hr />
                Caption:
                <input onChange={this.onChange} value={selection.name} />
            </div>
        ) : (
            <div className={styles.sidebar} />
        )
    }

    onChange = e => {
        this.props.store.selection.setName(e.target.value)
    }
}

export default observer(Sidebar)
