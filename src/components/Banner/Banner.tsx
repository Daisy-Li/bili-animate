import * as React from "react";

import "./index.scss";

import bannerImage from '../../styles/i/full-bg.png'
import bgImage from '../../styles/i/bg.png'
import girl from '../../styles/i/22-open-eye.png'
import girlCloseEye from '../../styles/i/22-close-eye.png'
import girlClosingEye from '../../styles/i/22-closing-eye.png'
import girlOpeningEye from '../../styles/i/22-opening-eye.png'
import land from '../../styles/i/land.png'
import ground from '../../styles/i/ground.png'
import littleGirl from '../../styles/i/33.png'
import grass from '../../styles/i/grass.png'

const config = {
  bg: { sx: 100, sw: 3000 * 0.9, sh: 250, blur: 4 },
  girl: { sx: 150, sy: 25, sw: 3000 * 0.9, sh: 275 * 0.9, blur: 0 },
  land: { sx: 155, sy: -5, sw: 3000 * 0.9, sh: 250, blur: 1 },
  ground: { sx: 150, sw: 3000 * 0.9, sh: 250, blur: 4 },
  littleGirl: { sx: 150, sy: 25, sw: 3000 * 0.9, sh: 275 * 0.9, blur: 5 },
  grass: { sx: 165, sy: 25, sw: 3000 * 0.88, sh: 275* 0.9, blur: 6 },
}
class Banner extends React.PureComponent<any,any> {
  private fullBox: any;
  constructor(props: any) {
    super(props);
    this.state = {
      images: {
        bg: null,
        girl: null,
        girlCloseEye: null,
        girlClosingEye: null,
        girlOpeningEye: null,
        land: null,
        ground: null,
        littleGirl: null,
        grass: null,
      },
      canvasList: {
        bg: React.createRef(),
        girl: React.createRef(),
        land: React.createRef(),
        ground: React.createRef(),
        littleGirl: React.createRef(),
        grass: React.createRef(),
      },
    };
    this.fullBox = React.createRef();
  }

  buildImage = (src: string) => {
    return new Promise((resolve) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.src = src
    })
  }
  resize = () => {
    const { width, height } = this.fullBox.current.getBoundingClientRect();
    console.log(this.state.canvasList)
    for (const canvas of Object.values(this.state.canvasList)) {
      canvas.current.width = width
      canvas.current.height = height
    }
  }
  draw =(image: any, config: any, canvas: any) => {
    const { sx = 0, sy = 0, sw, sh, blur: b } = config || {}
    const ctx = canvas.current.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.filter = `blur(${b}px)`
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.current.width, canvas.current.height)
  }
  wink = async() => {
    await new Promise((r) => setTimeout(r, 50))
    this.state.images.girlClosingEye &&
      this.draw(this.state.images.girlClosingEye, config.girl,this.state.canvasList.girl)
    await new Promise((r) => setTimeout(r, 50))
    this.state.images.girlCloseEye &&
      this.draw(this.state.images.girlCloseEye, config.girl,this.state.canvasList.girl)
    await new Promise((r) => setTimeout(r, 50))
    this.state.images.girlOpeningEye &&
    this.draw(this.state.images.girlOpeningEye, config.girl,this.state.canvasList.girl)
    await new Promise((r) => setTimeout(r, 50))
    this.state.images.girl && this.draw(this.state.images.girl, config.girl,this.state.canvasList.girl)
    setTimeout(this.wink, 4800)
  }
  componentWillMount() {
    let imagesSrc = {
      bg: bgImage,
      girl: girl,
      girlCloseEye: girlCloseEye,
      girlClosingEye: girlClosingEye,
      girlOpeningEye: girlOpeningEye,
      land: land,
      ground: ground,
      littleGirl: littleGirl,
      grass: grass,
    }
    Object.entries(imagesSrc).map(([key,value]) => {
      this.buildImage(value).then((img) => {
        imagesSrc[key] = img
        this.setState({
          images : imagesSrc
        })
      })
    })
  }
  componentDidMount() {
    // 不延时获取宽高不准确
    setTimeout(() => {
      this.resize()
      if(this.state.images.bg) {
        this.draw(this.state.images.bg, config.bg,this.state.canvasList.bg)
      }
      if(this.state.images.girl) {
        this.draw(this.state.images.girl, config.girl,this.state.canvasList.girl)
      }
      if(this.state.images.land) {
        this.draw(this.state.images.land, config.land,this.state.canvasList.land)
      }
      if(this.state.images.ground) {
        this.draw(this.state.images.ground, config.ground,this.state.canvasList.ground)
      }
      if(this.state.images.littleGirl) {
        this.draw(this.state.images.littleGirl, config.littleGirl,this.state.canvasList.littleGirl)
      }
      if(this.state.images.grass) {
        this.draw(this.state.images.grass, config.grass,this.state.canvasList.grass)
      }
    }, 100);
    setTimeout(this.wink, 4800)
    
  }

  public render() {
    return (
      <div className="banner-wrap" ref={this.fullBox}>
        <img src={bannerImage} alt="" className="img-tuodi"/>
        <canvas ref={this.state.canvasList.bg} className="banner-bg canvas-bd"></canvas>
        <canvas ref={this.state.canvasList.girl} className="banner-girl canvas-bd"></canvas>
        <canvas ref={this.state.canvasList.land} className="banner-land canvas-bd"></canvas>
        <canvas ref={this.state.canvasList.ground} className="banner-ground canvas-bd"></canvas>
        <canvas ref={this.state.canvasList.littleGirl} className="banner-littleGirl canvas-bd"></canvas>
        <canvas ref={this.state.canvasList.grass} className="banner-grass canvas-bd"></canvas>
      </div>
    );
  }
};

export default Banner;
