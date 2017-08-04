import React from 'react';

const navtabs = [
    { 'href':'#about', 'name':'О нас', 'active':'active' },
    { 'href':'#training', 'name':'Обучение', 'active':''},
    { 'href':'#benefits', 'name':'Бенефиты', 'active':''},
    { 'href':'#students', 'name':'Для студентов', 'active':''},
    { 'href':'#pros', 'name':'Наши преимущества', 'active':''},
    { 'href':'#vacancies', 'name':'Вакансии', 'active':''},
    { 'href':'#contacts', 'name':'Контакты', 'active':''},
];

function TabItem(props) {
    return  <li className="nav-item nav-tab-item">
        <a className={`nav-link ${props.active}`} data-toggle="tab" href={props.href} role="tab">{props.name}</a>
    </li>
}

function TabsList(props) {
    const tabs = props.tabs;
    return (
        <ul className="nav nav-tabs" role="tablist">
            {tabs.map((tab, index) =>
                <TabItem key={index}
                         href={tab.href}
                         name={tab.name}
                         active={tab.active}
                />
            )}
        </ul>
    );
}

export default class Tabs extends React.Component {
    render() {
        return(
            <div>
                <TabsList tabs={navtabs}/>
                <div className="tab-content">
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
        )
    }
}