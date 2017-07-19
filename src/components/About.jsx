import React from 'react';

export default class About extends React.Component {
    render() {
        return (
            <main className="d-flex flex-row justify-content-start">
                <div className="d-flex flex-column sidebar hidden-sm-down">
                    <a className="sidebar-nav" href="new_survey.html">Новый опрос</a>
                    <a className="sidebar-nav" href="surveys.html">Мои опросы</a>
                    <a className="sidebar-nav" href="templates.html">Шаблоны опросов</a>
                    <a className="sidebar-nav" href="users.html">Пользователи</a>
                </div>
                <div className="main-content d-flex flex-column">
                    <div className="page-head about-page-head d-flex justify-content-start align-items-center">
                        <h1>iTechArt</h1>
                        <img src="img/placeholder.jpg" alt="splaceholder" height="200" width="500" />
                    </div>
                    <div className="tab-content-panel d-flex flex-column">
                        <div className="tab-content">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item nav-tab-item">
                                    <a className="nav-link active" data-toggle="tab" href="#about" role="tab">О нас</a>
                                </li>
                                <li className="nav-item nav-tab-item">
                                    <a className="nav-link" data-toggle="tab" href="#training" role="tab">Обучение</a>
                                </li>
                                <li className="nav-item nav-tab-item">
                                    <a className="nav-link" data-toggle="tab" href="#benefits" role="tab">Бенефиты</a>
                                </li>
                                <li className="nav-item nav-tab-item">
                                    <a className="nav-link" data-toggle="tab" href="#students" role="tab">Для студентов</a>
                                </li>
                                <li className="nav-item nav-tab-item">
                                    <a className="nav-link" data-toggle="tab" href="#pros" role="tab">Наши преимущества</a>
                                </li>
                                <li className="nav-item nav-tab-item">
                                    <a className="nav-link" data-toggle="tab" href="#vacancies" role="tab">Вакансии</a>
                                </li>
                                <li className="nav-item nav-tab-item">
                                    <a className="nav-link" data-toggle="tab" href="#contacts" role="tab">Контакты</a>
                                </li>
                            </ul>
                            <div className="tab-pane active" id="about" role="tabpanel">
                                <img src="img/placeholder_2.png" alt="placeholder" height="200" />
                                    <p>
                                        Page 1.<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                        elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                        Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius. Nam nec
                                        fringilla diam. Phasellus ac nibh sit amet nisl viverra posuere. Nulla vehicula commodo eros
                                        eu posuere. Fusce finibus ligula pharetra, fringilla elit et, vestibulum mauris. Interdum et
                                        malesuada fames ac ante ipsum primis in faucibus.
                                    </p>
                            </div>
                            <div className="tab-pane" id="training" role="tabpanel">
                                <img src="img/placeholder_2.png" alt="placeholder" height="200" />
                                    <p>
                                        Page 2.<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                        elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                        Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius. Nam nec
                                        fringilla diam. Phasellus ac nibh sit amet nisl viverra posuere. Nulla vehicula commodo eros
                                        eu posuere. Fusce finibus ligula pharetra, fringilla elit et, vestibulum mauris. Interdum et
                                        malesuada fames ac ante ipsum primis in faucibus.
                                    </p>
                            </div>
                            <div className="tab-pane" id="benefits" role="tabpanel">
                                <img src="img/placeholder_2.png" alt="placeholder" height="200" />
                                    <p>
                                        Page 3.<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                        elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                        Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius. Nam nec
                                        fringilla diam. Phasellus ac nibh sit amet nisl viverra posuere. Nulla vehicula commodo eros
                                        eu posuere. Fusce finibus ligula pharetra, fringilla elit et, vestibulum mauris. Interdum et
                                        malesuada fames ac ante ipsum primis in faucibus.
                                    </p>
                            </div>
                            <div className="tab-pane" id="students" role="tabpanel">
                                <img src="img/placeholder_2.png" alt="placeholder" height="200" />
                                    <p>
                                        Page 4.<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                        elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                        Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius. Nam nec
                                        fringilla diam. Phasellus ac nibh sit amet nisl viverra posuere. Nulla vehicula commodo eros
                                        eu posuere. Fusce finibus ligula pharetra, fringilla elit et, vestibulum mauris. Interdum et
                                        malesuada fames ac ante ipsum primis in faucibus.
                                    </p>
                            </div>
                            <div className="tab-pane" id="pros" role="tabpanel">
                                <img src="img/placeholder_2.png" alt="placeholder" height="200" />
                                    <p>
                                        Page 5.<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                        elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                        Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius. Nam nec
                                        fringilla diam. Phasellus ac nibh sit amet nisl viverra posuere. Nulla vehicula commodo eros
                                        eu posuere. Fusce finibus ligula pharetra, fringilla elit et, vestibulum mauris. Interdum et
                                        malesuada fames ac ante ipsum primis in faucibus.
                                    </p>
                            </div>
                            <div className="tab-pane" id="vacancies" role="tabpanel">
                                <img src="img/placeholder_2.png" alt="placeholder" height="200" />
                                    <p>
                                        Page 6.<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                        elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                        Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius. Nam nec
                                        fringilla diam. Phasellus ac nibh sit amet nisl viverra posuere. Nulla vehicula commodo eros
                                        eu posuere. Fusce finibus ligula pharetra, fringilla elit et, vestibulum mauris. Interdum et
                                        malesuada fames ac ante ipsum primis in faucibus.
                                    </p>
                            </div>
                            <div className="tab-pane" id="contacts" role="tabpanel">
                                <img src="img/placeholder_2.png" alt="placeholder" height="200" />
                                    <p>
                                        Page 7.<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                        elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                        Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius. Nam nec
                                        fringilla diam. Phasellus ac nibh sit amet nisl viverra posuere. Nulla vehicula commodo eros
                                        eu posuere. Fusce finibus ligula pharetra, fringilla elit et, vestibulum mauris. Interdum et
                                        malesuada fames ac ante ipsum primis in faucibus.
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
