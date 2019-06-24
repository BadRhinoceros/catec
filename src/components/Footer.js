import React, { Component } from 'react'; // подключение react
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import $ from 'jquery';

class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <div className="footer-top">
          <div className="footer-top-inner">
            <div className="footer-top-block">
              <a href="#" title="наверх">НАВЕРХ</a>
            </div>
          </div>
        </div>

        <div className="footer-mid">
          <div className="footer-mid-inner">
            <div className="footer-line"></div>
            <div className="footer-mid-text">
              <div className="footer-mid-contacts">
                <div className="ru"  style={{display: 'inline'}}>
                  <p>Гос. Лицензия AA № 0102009</p>
                  <p>Сертификат соответствия № 0017006</p>
                  <p>Международного стандарта ISO 9001:2008</p>
                  <p>Государственная аттестация МОН РК</p>
                  <p>Диплом государственного образца</p>
                </div>
              </div>
            </div>
            <div className="footer-mid-banner">
              <a href="http://e-history.kz">
                <img src="/footer/history.jpg"/>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div className="footer-bottom-copyright">
              <p>© 2014 WWW.CATEC.KZ</p>
            </div>
            <div className="footer-bottom-rudik">
              <p>Сайт разработал: ЦАТЭК</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { Footer }
