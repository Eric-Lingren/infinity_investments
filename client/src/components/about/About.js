import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import './about.css';
import TweenLite from 'gsap';
import Lodash from 'lodash.shuffle'


class About extends Component {
    constructor(){
        super()
        this.state = {
            imageGallery: [
                'https://images.pexels.com/photos/259258/pexels-photo-259258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                'https://foreignpolicyi.org/wp-content/uploads/2018/07/Do-you-know-why-Alexander-Hamilton-is-on-10-dollar-bill.jpg',
                'https://render.fineartamerica.com/images/rendered/default/wood-print/16.000/6.875/break/images-medium-5/punk-20-dollar-bill-robert-g-kernodle.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2016/11/50-american-dollars-banknote-obverse-1.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg',
                'https://i.colnect.net/f/1769/108/5-Euro.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2016/11/10-euros-banknote-first-series-obverse-1.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2017/03/20-euros-banknote-second-series-obverse-1.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2016/11/50-euros-banknote-first-series-reverse-1.jpg',
                'https://assets.catawiki.nl/assets/2018/3/30/f/8/8/f881b5e1-e69e-4906-8685-85f56aa8c86a.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/1970/01/500-euros-banknote-first-series-obverse.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/1000_yen_banknote_2004.jpg/1200px-1000_yen_banknote_2004.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/7/76/P103-2000Yen-%282000%29_front.jpg',
                'http://currencyguide.eu/jpy-en/5000yen_front.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2015/11/10000-japanese-yen-banknote-yukichi-fukuzawa.jpg',
                'http://currencyguide.eu/aud-en/5-fronta.jpg',
                'http://currencyguide.eu/aud-en/aud10front.jpg',
                'http://currencyguide.eu/aud-en/aud20back.jpg',
                'http://currencyguide.eu/aud-en/aud50front.jpg',
                'http://currencyguide.eu/aud-en/aud100back.jpg',
                'http://www.ra2d.com/images/worldsmoney/New-Zealand-Dollar-NZD-Definition/nzd-5-new-zealand-dollars-2.jpg',
                'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/NZ_Dollar_Ten.png/374px-NZ_Dollar_Ten.png',
                'https://upload.wikimedia.org/wikipedia/en/e/e0/NewZealandTwentyDollarNote1.png',
                'https://ii.mypivots.com/banknotes/nzd-50-new-zealand-dollars-2.jpg',
                'http://www.polymernotes.com/nz$100-p189f.jpg',
                'https://ii.mypivots.com/banknotes/gbp-10-british-pounds-2.jpg',
                'https://wizzywow15.files.wordpress.com/2009/08/twenty-pound-note-280.jpg',
                'http://currencyguide.eu/gbp-en/british_old-banknote-50-pounds-sterling-obverse.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2018/08/100000-indonesian-rupiah-banknote-soekarno-and-hatta-obverse.jpg',
                'https://i1.wp.com/banknoteworld.com/blog/wp-content/uploads/2016/08/VietnamPNew-500000Dong-2003-donatedoy_f.jpg?resize=850%2C372&ssl=1',
            ],
            shuffledImages: []
        }
    }

    componentDidMount(){
        this.setState({
            shuffledImages: Lodash(this.state.imageGallery)
        })
    }

    showImage = (id) => {
        // e.target.className = ''
        // e.target.className = 'show-money-image'
        TweenLite.to( document.getElementById(id), 0.7, {opacity: 1, scale: 1.05})
    }

    hideImage = (id) => {
        // e.target.className = ''
        // e.target.className = 'hide-money-image'
        TweenLite.to( document.getElementById(id), 2, {opacity: 0, scale: 1, delay: .25})
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className='content-container'>
                <h1 className='page-header'>Content here</h1>
                    <div className='grid-container'>
                        {this.state.shuffledImages.map((picture,index) => <div 
                                                        className={`money-image ${index % 2 === 1 ? "odd-image" : "even-image"}`} 
                                                        key={index}

                                                        style={{  backgroundImage: "url(" + picture + ")",
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',}}
                                                        id = {"imageId" + index}
                                                        onMouseOver={() => this.showImage("imageId" + index)}
                                                        onMouseOut={() => this.hideImage("imageId" + index)}
                                                        >
                                                        </div>
                                                    )}
                    </div>
                </div>
            </div>
        )
    }

}

export default About