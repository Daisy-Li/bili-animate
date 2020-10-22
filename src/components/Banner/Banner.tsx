import * as React from "react";

import "./index.scss";

import bannerImage from '../../styles/i/full-bg.png'
import bgImage from '../../styles/i/bg.png'
import twotwo from '../../styles/i/22-open-eye.png'
import twotwoCloseEye from '../../styles/i/22-close-eye.png'
import twotwoClosingEye from '../../styles/i/22-closing-eye.png'
import twotwoOpeningEye from '../../styles/i/22-opening-eye.png'
import land from '../../styles/i/land.png'
import ground from '../../styles/i/ground.png'
import threethree from '../../styles/i/33.png'
import grass from '../../styles/i/grass.png'

class Banner extends React.PureComponent {
  private bg: any;
  constructor(props: any) {
    super(props);
    this.bg = React.createRef();
  }

  componentDidMount() {
    const bg = this.bg.current;
    if(bg.getContext) {
      const ctx = bg.getContext("2d")
      const img = new Image()
      img.src = bgImage;
      setTimeout(() => {
        ctx.drawImage(img,0,0,img.width,img.height,0,0,900,250);
      },1000)
    }
  }

  public render() {
    return (
      <div className="banner-wrap">
        <img src={bannerImage} alt=""/>
        <canvas ref={this.bg} className="banner-bg"></canvas>
      </div>
    );
  }
};

export default Banner;
