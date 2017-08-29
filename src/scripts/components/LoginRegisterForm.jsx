import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required,
    checkPassword,
    noSpecialChars,
    minLength2,
    minLength6,
    maxLength20,
    email,
    rememberPassword } from '../utils/validate.js'

function forgotPassword () {
    prompt('Введите ваш email и мы пришлем вам ссылку для сброса пароля');
}

const renderField = ({ input, placeholder, type, auto, meta: { touched, error } }) => (
    <div>
        <input {...input} className='form-control' placeholder={placeholder} type={type} autoFocus={auto}/>
        {touched && (error && <span className="error">{error}</span>)}
    </div>
);

let Form = props => {
    const { handleSubmit, handleRegisteredClick, isRegistered } = props;
    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h2 className='login-form-heading'>{isRegistered ? 'Вход' : 'Регистрация'}</h2>
            {isRegistered &&
                <div>
                    <Field component={renderField}
                           name='login'
                           type='text'
                           placeholder='Логин'
                           validate={[ required ]}
                           auto={true}
                    />
                    <Field component={renderField}
                           name='password'
                           type='password'
                           placeholder='******'
                           validate={[ required ]}
                    />
                    <div className='login-links d-flex justify-content-between'>
                        <a className='signup' href='#' onClick={handleRegisteredClick}>Регистрация</a>
                        <a className='getpassword' href='#'
                           onClick={forgotPassword}>
                           Забыли пароль?
                        </a>
                    </div>
                    <button className='login-form-btn' type='submit'>
                        Войти
                    </button>
                </div>
            }
            {!isRegistered &&
                <div>
                    <Field component={renderField}
                           name='name'
                           type='text'
                           placeholder='Имя'
                           validate={[ required, noSpecialChars, minLength2,  maxLength20 ]}
                           auto={true}
                    />
                    <Field component={renderField}
                           name='email'
                           type='text'
                           placeholder='Логин (e-mail)'
                           validate={[ required, email ]}
                    />
                    <Field component={renderField}
                           type='password'
                           name='password'
                           placeholder='Пароль'
                           validate={[ required, minLength6, maxLength20, rememberPassword ]}
                    />
                    <Field component={renderField}
                           type='password'
                           name='repeat_password'
                           placeholder='Повторить пароль'
                           validate={[ required, checkPassword ]}
                    />
                    <button className='login-form-btn' type='submit'>
                        Создать аккаунт
                    </button>
                </div>
            }
        </form>
    )
};

Form = reduxForm({
    form: 'login_register'
})(Form);

export default Form;