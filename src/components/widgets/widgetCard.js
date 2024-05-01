import React from 'react'
import "./widgetCard.css"

export default function WidgetCard({title}) {
  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
    </div>
  )
}
