import * as React from "react";

import "./index.scss";

import bannerImage from '../../styles/i/full-bg.png'
import bgImage from '../../styles/i/bg.png'
import girl from '../../styles/i/girl-open-eye.png'
import girlCloseEye from '../../styles/i/girl-close-eye.png'
import girlClosingEye from '../../styles/i/girl-closing-eye.png'
import girlOpeningEye from '../../styles/i/girl-opening-eye.png'
import land from '../../styles/i/land.png'
import ground from '../../styles/i/ground.png'
import littleGirl from '../../styles/i/littlegirl.png'
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
  
  renderCanvas = (ratio : number) => {
    if (ratio < 0 && this.state.images.bg) {
      let c = { ...config.bg }
      c.blur = c.blur + ratio * c.blur
      this.draw(this.state.images.bg, c, this.state.canvasList.bg)
    }

    if (this.state.images.girl) {
      let c = config.girl
      c.blur = Math.abs(ratio * 10)
      c.sx = 150 - ratio * 10
      this.draw(this.state.images.girl, c, this.state.canvasList.girl)
    }

    if (this.state.images.land) {
      let c = { ...config.land }
      c.blur = Math.abs(c.blur - ratio * 4)
      c.sx = (c.sx || 0) - ratio * 30
      this.draw(this.state.images.land, c, this.state.canvasList.land)
    }

    if (this.state.images.ground) {
      let c = { ...config.ground }
      c.blur = Math.abs(c.blur - ratio * 8)
      c.sx = (c.sx || 0) - ratio * 40
      this.draw(this.state.images.ground, c, this.state.canvasList.ground)
    }

    if (this.state.images.littleGirl) {
      let c = { ...config.littleGirl }
      c.blur = Math.abs(c.blur - ratio * 8)
      c.sx = (c.sx || 0) - ratio * 90
      this.draw(this.state.images.littleGirl, c, this.state.canvasList.littleGirl)
    }

    if (this.state.images.grass) {
      let c = { ...config.grass }
      c.blur = Math.abs(c.blur - ratio * 6)
      c.sx = (c.sx || 0) - ratio * 110
      this.draw(this.state.images.grass, c, this.state.canvasList.grass)
    }
  }
  tick = (ratio : number, gap : number) => {
    if (gap * ratio < 0) {
      ratio = ratio + gap
      this.renderCanvas(ratio)
      requestAnimationFrame(() => this.tick(ratio,gap))
    } else {
      if(this.state.images.bg) {
        this.draw(this.state.images.bg, config.bg,this.state.canvasList.bg)
      }

      if(this.state.images.girl) {
        config.girl.blur = 0
        config.girl.sx = 150
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
    }
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

    window.addEventListener('resize', () => {
      this.resize()
      this.state.images.bg && this.draw(this.state.images.bg, config.bg,this.state.canvasList.bg)
      this.state.images.girl && this.draw(this.state.images.girl, config.girl,this.state.canvasList.girl)
      this.state.images.land && this.draw(this.state.images.land, config.land,this.state.canvasList.land)
      this.state.images.ground && this.draw(this.state.images.ground, config.ground,this.state.canvasList.ground)
      this.state.images.littleGirl && this.draw(this.state.images.littleGirl, config.littleGirl,this.state.canvasList.littleGirl)
      this.state.images.grass && this.draw(this.state.images.grass, config.grass,this.state.canvasList.grass)
    })
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

    let enterPoint = {}
    this.fullBox.current.addEventListener('mouseenter', (e: { clientX: number; }) => {
      const { width } = this.fullBox.current.getBoundingClientRect()
      enterPoint.x = e.clientX
      enterPoint.w = width
    })
    this.fullBox.current.addEventListener('mousemove', (e: { clientX: number; }) => {
      const v = e.clientX - enterPoint.x
      const ratio = v / enterPoint.w
      requestAnimationFrame(() => this.renderCanvas(ratio))
    })
    this.fullBox.current.addEventListener('mouseout', (e: { clientX: number; }) => {
      const v = e.clientX - enterPoint.x
      let ratio = v / enterPoint.w
      const gap = 0.08 * (ratio < 0 ? 1 : -1)
  
      requestAnimationFrame(() => this.tick(ratio,gap))
    })
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
