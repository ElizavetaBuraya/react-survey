import React from 'react'
import { Field, reduxForm } from 'redux-form'

function forgotPassword () {
    prompt('Введите ваш email и мы пришлем вам ссылку для сброса пароля');
};

let Form = props => {
    const { handleSubmit, handleRegisteredClick, isRegistered } = props;
    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h2 className='login-form-heading'>{isRegistered ? 'Вход' : 'Регистрация'}</h2>
            {isRegistered &&
                <div>
                    <label htmlFor='inputLogin' className='sr-only'>Логин</label>
                    <Field component='input'
                           type='text'
                           name='login'
                           className='form-control'
                           placeholder='Логин'
                           required
                           autoFocus />
                    <label htmlFor='inputPassword' className='sr-only'>Пароль</label>
                    <Field component='input'
                           type='password'
                           name='password'
                           className='form-control'
                           placeholder='******'
                           required />
                    <div className='d-flex justify-content-between'>
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
                    <label htmlFor='inputName' className='sr-only'>Имя</label>
                    <Field component='input'
                           type='text'
                           name='name'
                           className='form-control'
                           placeholder='Имя'
                           pattern='[a-zA-Z0-9]{4,10}"'
                           title='Только буквы и цифры, от 4 до 10 символов'
                           required
                           autoFocus/>
                    <label htmlFor='inputEmail' className='sr-only'>E-mail</label>
                    <Field component='input'
                           type='email'
                           name='email'
                           className='form-control'
                           placeholder='Логин (e-mail)'
                           required/>
                    <label htmlFor='inputPassword' className='sr-only'>Пароль</label>
                    <Field component='input'
                           type='password'
                           name='password'
                           className='form-control'
                           placeholder='Пароль'
                           pattern='{6,20}"'
                           title='От 6 до 20 символов'
                           required/>
                    <label htmlFor='inputRepeatPassword' className='sr-only'>Повторить пароль</label>
                    <Field component='input'
                           type='password'
                           name='repeat_password'
                           className='form-control'
                           placeholder='Повторить пароль'
                           required/>
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