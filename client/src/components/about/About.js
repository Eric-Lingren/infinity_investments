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
                'https://www.uscurrency.gov/sites/default/files/styles/bill_version/public/denominations/10_2006-present-front-v2.1-jpg.jpg?itok=--p2X6sP',
                'https://render.fineartamerica.com/images/rendered/default/wood-print/16.000/6.875/break/images-medium-5/punk-20-dollar-bill-robert-g-kernodle.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2016/11/50-american-dollars-banknote-obverse-1.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2016/11/5-euros-banknote-second-series-obverse-1.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2016/11/10-euros-banknote-first-series-obverse-1.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2017/03/20-euros-banknote-second-series-obverse-1.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2016/11/50-euros-banknote-first-series-reverse-1.jpg',
                'https://assets.catawiki.nl/assets/2018/3/30/f/8/8/f881b5e1-e69e-4906-8685-85f56aa8c86a.jpg',
                'https://lecana.si/cache/lecana2/438-500_eur_lecana_serviete_napkins_20_pcs-9f7d3eb32ebad66f.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/1000_yen_banknote_2004.jpg/1200px-1000_yen_banknote_2004.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/7/76/P103-2000Yen-%282000%29_front.jpg',
                'http://currencyguide.eu/jpy-en/5000yen_front.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2015/11/10000-japanese-yen-banknote-yukichi-fukuzawa.jpg',
                'http://currencyguide.eu/aud-en/5-fronta.jpg',
                'https://museum.rba.gov.au/assets/img/displays/polymer-banknotes/article/banjo_10_dollar_note_front_big.jpg',
                'https://www.aboutaustralia.com/wp-content/uploads/2014/10/Australia-20-Dollar-Bill.jpg',
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
                'https://www.banknotenews.com/files/switzerland_snb_10_francs_2016.00.00_b355a_p75_16_d_7596989_r.jpg',
                'https://www.banknotenews.com/files/switzerland_snb_20_francs_2015.00.00_b356a_p76_15_q_0056837_f.jpg',
                'http://www.stevenbron.nl/images/2016-04/zwitserland-50francs-achter_copy1.jpg',
                'https://www.banknotenews.com/files/switzerland_snb_100_francs_2010.00.00_p72i_10_f_1449721_r.jpg',
            ],
            shuffledImages: []
        }
    }

    componentDidMount(){
        this.setState({
            shuffledImages: Lodash(this.state.imageGallery)
        })
        TweenLite.to( document.getElementById('section1'), 2, {opacity: 1})
        TweenLite.from( document.getElementById('section1'), 1, {x: -1000})
        TweenLite.to( document.getElementById('section2'), 2, {opacity: 1, delay: 0.3})
        TweenLite.from( document.getElementById('section2'), 1, {x: 1000, delay: 0.3})
        TweenLite.to( document.getElementById('section3'), 2, {opacity: 1, delay: 0.6})
        TweenLite.from( document.getElementById('section3'), 1, {x: -1000, delay: 0.6})
        TweenLite.to( document.getElementById('section4'), 2, {opacity: 1, delay: 0.9})
        TweenLite.from( document.getElementById('section4'), 1, {x: 1000, delay: 0.9})
    }

    showImage = (id) => {
        // e.target.className = ''
        // e.target.className = 'show-money-image'
        TweenLite.to( document.getElementById(id), 0.7, {opacity: 1, scale: 1.05})
    }

    hideImage = (id) => {
        // e.target.className = ''
        // e.target.className = 'hide-money-image'
        TweenLite.to( document.getElementById(id), 2.5, {opacity: 0, scale: 1, delay: .25})
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className='content-container'>
                    
                    <div className='text-section-left' id='section1'>
                        <h2 className='page-subheader'>What We Trade:</h2>
                        <p className='page-paragraph'>Our robots trade a varitey of currency pairs to provide diversification and reduce exposure to the global finance markets. We only trade majors and minors.  Our robots have been proven to be ineffective or ineffecent on JPY or exotics. Crosses it will trade may be comprised of USD, GBP, CAD, AUD, CHF, or NZD.  </p>
                    </div>
                    <div className='text-section-right' id='section2'>
                        <h2 className='page-subheader'>What We Trade:</h2>
                        <p className='page-paragraph'>Our robots trade a varitey of currency pairs to provide diversification and reduce exposure to the global finance markets. We only trade majors and minors.  Our robots have been proven to be ineffective or ineffecent on JPY or exotics. Crosses it will trade may be comprised of USD, GBP, CAD, AUD, CHF, or NZD.  </p>
                    </div>
                    <div className='text-section-left' id='section3'>
                        <h2 className='page-subheader'>What We Trade:</h2>
                        <p className='page-paragraph'>Our robots trade a varitey of currency pairs to provide diversification and reduce exposure to the global finance markets. We only trade majors and minors.  Our robots have been proven to be ineffective or ineffecent on JPY or exotics. Crosses it will trade may be comprised of USD, GBP, CAD, AUD, CHF, or NZD.  </p>
                    </div>
                    <div className='text-section-right' id='section4'>
                        <h2 className='page-subheader'>What We Trade:</h2>
                        <p className='page-paragraph'>Our robots trade a varitey of currency pairs to provide diversification and reduce exposure to the global finance markets. We only trade majors and minors.  Our robots have been proven to be ineffective or ineffecent on JPY or exotics. Crosses it will trade may be comprised of USD, GBP, CAD, AUD, CHF, or NZD.  </p>
                    </div>

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