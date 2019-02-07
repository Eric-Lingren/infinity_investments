import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import './about.css';
import TweenLite from 'gsap';
import Lodash from 'lodash.shuffle';
import {Link} from 'react-router-dom'


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
                'https://www.bankofcanada.ca/wp-content/uploads/2015/09/5_front.jpg',
                'https://www.bankofcanada.ca/wp-content/uploads/2015/09/10_front.jpg',
                'https://upload.wikimedia.org/wikipedia/en/6/6d/Canadian_%2450_note_specimen_-_face.png',
                'https://www.bankofcanada.ca/wp-content/uploads/2015/09/100_front.jpg',
                'http://ukzambians.co.uk/home/wp-content/uploads/2016/06/Zim-dollar.png',
                'https://www.leftovercurrency.com/wp-content/uploads/2016/11/1000-thai-baht-banknote-improved-security-features-obverse-1.jpg',
                'https://upload.wikimedia.org/wikipedia/en/7/7a/DKK_100_obverse_%282009%29.jpg',
                'https://i.pinimg.com/originals/61/8a/6a/618a6a2ebd0f8157203b253b64dfff57.jpg',
                'https://vignette.wikia.nocookie.net/currencies/images/e/e3/Banknote_5000_rubles_%281997%29_front.jpg/revision/latest?cb=20110320212128',
                'https://www.leftovercurrency.com/wp-content/uploads/2017/09/1000-russian-rubles-banknote-1997-obverse-1.jpg',
                'https://img.ma-shops.com/numiscollection/pic/591122.jpg',
                'http://www.e-allmoney.com/banknotes/eur/img/bosnia2.jpg',
                'https://www.leftovercurrency.com/wp-content/uploads/2017/12/100-konvertible-marks-banknote-bosnian-croatian-holographic-thread-obverse-1.jpg',
                'https://img.ma-shops.com/abram/pic/7596_singarp_50b-1470.jpg',
                'https://www.numiscollection.com/upload/image/singapore-50-dollars-ey-bin-ishak---arts---diamond-p-image-65923-grande.jpg',
                'https://img.ma-shops.com/steidl/pic/2289_0053-sin-2007-ac.jpg',
                'https://www.banknotenews.com/files/turkey_tcmb_200_turk_lirasi_2009.00.00_b305c_p227_c009_897317_f.jpg',
                'https://theiranproject.com/wp-content/uploads/2018/04/Turkey-lira.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/e/e1/500_Armenian_dram_-_2017_%28obverse%29.png',
                'https://upload.wikimedia.org/wikipedia/commons/1/1f/100_Armenian_dram_-_1998_%28obverse%29.png',
                'https://upload.wikimedia.org/wikipedia/commons/5/57/50_Armenian_dram_-_1998_%28obverse%29.png',
                'http://4.bp.blogspot.com/-961x6rAm7f0/UlU8usfdGRI/AAAAAAAADT0/WTyoDSygQ9M/s1600/rm100+zeti.jpg'
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
        TweenLite.to( document.getElementById('section5'), 2, {opacity: 1, delay: 1.2})
        TweenLite.from( document.getElementById('section5'), 1, {x: -1000, delay: 1.2})
        TweenLite.to( document.getElementById('section6'), 2, {opacity: 1, delay: 1.5})
        TweenLite.from( document.getElementById('section6'), 1, {x: 1000, delay: 1.5})
    }

    showImage = (id) => {
        TweenLite.to( document.getElementById(id), 0.7, {opacity: 1, scale: 1.05})
    }

    hideImage = (id) => {
        TweenLite.to( document.getElementById(id), 2.5, {opacity: 0, scale: 1, delay: .25})
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className='content-container'>
                    <div className='text-section-left' id='section1'>
                        <h2 className='page-subheader'>Who We Are:</h2>
                        <p className='page-paragraph'> Lovers of financial freedom, avid technology enthusiasts, dreamers of great things, and crafts-people who are driven to improve both ourselves as well as our technology.  </p>
                    </div>
                    <div className='text-section-right' id='section2'>
                        <h2 className='page-subheader'>What We Trade:</h2>
                        <p className='page-paragraph'> Our robots trade a variety of currency pairs to provide diversification and reduce exposure to the global financial markets. We only trade majors and minors.  Our robots have been proven to be ineffective or inefficient on JPY and exotics. The crosses it will trade are comprised of USD, GBP, CAD, AUD, CHF, or NZD.   </p>
                    </div>
                    <div className='text-section-left' id='section3'>
                        <h2 className='page-subheader'>Where We Trade:</h2>
                        <p className='page-paragraph'> We don't!  We let the robots do all the work and we have automated checks in place to alert us if anything is broken or behaving unusually.  Our robots are hosted on Amazon Cloud Servers to guarantee 100% uptime and availability to the currency markets. </p>
                    </div>
                    <div className='text-section-right' id='section4'>
                        <h2 className='page-subheader'>When We Trade:</h2>
                        <p className='page-paragraph'> Anytime our robots identify an optimum opportunity they will enter and exit positions.  They are entering or exiting the markets on average 5 times per day and run during all forex market hours. </p>
                    </div>
                    <div className='text-section-left' id='section5'>
                        <h2 className='page-subheader'>Why We Trade:</h2>
                        <p className='page-paragraph'> Same reason everyone does...  For the money. </p>
                    </div>
                    <div className='text-section-right' id='section6'>
                        <h2 className='page-subheader'>How Does It Work & What Is Our Strategy:</h2>
                        <p className='page-paragraph'> Our algorithms enter day or swing positions based on the divergence between price and the RSI on 15-minute charts.  Once a potential trade is identified, they use ADX filters to validate whether the trade is an optimal position to take.  This strategy captures small but frequent reversals in the markets.  Once in a position, they hold the trade as long as is necessary to capture a small predetermined profit. By only entering the markets with very small positions we are able to maintain a trade for longer than the average trader until profit targets are reached. For a more in-depth analysis of our strategy, please go to the <Link className='page-paragraph-link' to="/performance"> performance page</Link> or <Link className='page-paragraph-link' to="/contact"> contact us here. </Link>  </p>
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