import React from 'react';

const FixedFooter = ({children, footer}) => (
  <div style={{minHeight: "100vh"}} className="clearfix flex flex-column p0 sm-p1">
    <div className="mb4" style={{flex: 1}}>
      {children}
    </div>
    {footer}
  </div>
)

export default FixedFooter
