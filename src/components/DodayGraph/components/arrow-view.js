import React from "react"
import { observer } from "mobx-react"

const ArrowView = ({ arrow }) => {
    const { from, to } = arrow
    if (!from || !to) return null
    const [x1, y1, x2, y2] = [from.x + from.width / 2, from.y + 30, to.x + to.width / 2, to.y + 30]
    return <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: 'black', strokeWidth: 2 }} />
}

export default observer(ArrowView)
