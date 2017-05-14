import React from 'react';

import appslabLogoSvg from '../public/logo_red.svg'

const Footer = () => (
  <div className="col col-12 flex justify-center items-center">

    <a href="http://theappslab.com" target="_blank" className="pr2">
      <img className="" width="50" height="50" alt="appslab Logo" src={appslabLogoSvg} />
    </a>

    <div>
      <a className="red text-decoration-none" href="https://twitter.com/theappslab" target="_blank">@theappslab</a>
      <br/>
      <span className="gray">Powered by The AppsLab</span>
    </div>

  </div>
)

export default Footer
