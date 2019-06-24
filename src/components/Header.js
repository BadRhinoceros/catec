import React, { Component } from 'react'; // подключение react
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import $ from 'jquery';

class Header extends Component {
  render() {
    const { authorized } = this.props
    return(
      <header>
        <div className="container header-container">
          <div className="logo">
          </div>
          <div className="textInfo">
            <div className="topName">
              <p>Гос. Лицензия AA № 0102009</p>
              <p>Диплом государственного образца</p>
              <p>Государственная аттестация Министерства образования и науки РК</p>
            </div>
            <div className="bottomName">
              <h3>«ЦентральноАзиатский Технико-Экономический Колледж»</h3>
            </div>
          </div>
          <div className="info-block">
            <div className="socNet">
              <div className="socBlock insta"></div>
              <div className="socBlock vk"></div>
              <div className="socBlock twtr"></div>
              <div className="socBlock facebook"></div>
            </div>
            <div className="phone-block">
              <p className="label">Телефон приемной комиссии</p>
              <p className="phone">+7 (727) 264-02-16</p>
            </div>
            <div className="lang">
              <div className="langBlock ru"></div>
              <div className="langBlock en"></div>
              <div className="langBlock kz"></div>
            </div>
          </div>
        </div>
        <div className="container nav-container">
          <nav className="nav-menu-block">
            <ul id="menu" className="nav-menu">
              <li>
                <a href="#">Главная</a>
                <ul className="submenu">
                  <li>
                    <a href="#">Миссия,видение и стратегия</a>
                  </li>
                  <li>
                    <a href="#">Аккредитациия</a>
                  </li>
                  <li>
                    <a href="#">Нормативные документы</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#">Новости</a>
              </li>

              <li>
                <a href="#">Колледж</a>
                <ul className="submenu">
                  <li>
                    <a href="#">Государственные услуги</a>
                  </li>
                  <li>
                    <a href="#">История колледжа</a>
                  </li>
                  <li>
                    <a href="#">Специальности</a>
                  </li>
                  <li>
                    <a href="#">Воспитательная работа</a>
                  </li>
                  <li>
                    <a href="#">Учебно-производственная работа</a>
                  </li>
                  <li>
                    <a href="#">Методическая работа</a>
                  </li>
                  <li>
                    <a href="#">Администрация колледжа</a>
                  </li>
                  <li>
                    <a href="#">Преподаватели</a>
                  </li>
                  <li>
                    <a href="#">Библиотека</a>
                  </li>
                  <li>
                    <a href="#">3D тур колледжа</a>
                  </li>
                  <li>
                    <a href="#">Учебный центр</a>
                  </li>
                  <li>
                    <a href="#">Конкурсы</a>
                  </li>
                  <li>
                    <a href="#">Онлайн тестирование</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#">Абитуриенту</a>
                <ul className="submenu">
                  <li>
                    <a href="#">Условия приема</a>
                  </li>
                  <li>
                    <a href="#">Подготовительные курсы</a>
                  </li>
                  <li>
                    <a href="#">Видео студентов</a>
                  </li>
                  <li>
                    <a href="#">О колледже</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#">Студенту</a>
                <ul className="submenu">
                  {
                    authorized && <li><Link to="/statement">Ведомость</Link></li>
                  }
                  <li>
                    <a href="#">УМКД по дисциплинам</a>
                  </li>
                  <li>
                    <a href="#">Расписание занятий</a>
                  </li>
                  <li>
                    <a href="#">Расписание недель</a>
                  </li>
                  <li>
                    <a href="#">Выпускникам</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" id="prb">Заочное отделение</a>
                <ul className="submenu">
                  <li>
                    <a href="#">График проведения сесси</a>
                  </li>
                  <li>
                    <a href="#">Список дисциплин по курсам</a>
                  </li>
                  <li>
                    <a href="#">Шифры учащихся</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#">Выпускникам</a>
              </li>

              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container bottom-nav-container">
          <div className="newsBlock">
            <h2>Последние новости:</h2>
            <p><a href="#">ГРАНТЫ! ГРАНТЫ! ГРАНТЫ!</a></p>
            <p><a href="#">Международный турнир WorldSkills2019 JuniorSkills 2018</a></p>
            <p><a href="#">XI Международный конкурс выпускных квалификационных работ</a></p>
            <p><a href="#">Конкурс «Программирование для OS Apple»</a></p>
          </div>
          <div className="specialtyBlock">
            <ul className="specialtyList">
              <li className="specialItem">
                <div className="specImg prog"></div>
                <a href="#">1304000 Вычислитель- ная техника и программное обеспечение</a>
              </li>
              <li className="specialItem">
                <div className="specImg rad"></div>
                <a href="#">1306000 Радио- электроника и связь</a>
              </li>
              <li className="specialItem">
                <div className="specImg is"></div>
                <a href="#">1305000 Информа- ционные системы</a>
              </li>
              <li className="specialItem">
                <div className="specImg audit"></div>
                <a href="#">0518000 Учет и аудит</a>
              </li>
              <li className="specialItem">
                <div className="specImg pribst"></div>
                <a href="#">1229000 Приборо- строение</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export { Header };
