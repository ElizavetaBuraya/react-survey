let password = '';

export const required = value => value ? undefined : 'Обязательное поле';

export const checkPassword = value => (value === password) ? undefined : 'Пароли не совпадают';

export const noSpecialChars = value => value && !/[a-zA-ZА-яА-Я0-9]$/i.test(value) ? 'Только буквы и цифры' : undefined;

export const maxLength = max => value =>
    value && value.length > max ? `Не более ${max} символов` : undefined;

export const maxLength20 = maxLength(20);

export const minLength = min => value =>
    value && value.length < min ? `Не менее ${min} символов` : undefined;

export const minLength2 = minLength(2);

export const minLength6 = minLength(6);

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Неверный формат email: name@example.com' : undefined;

export const rememberPassword = value => { password = value; return undefined; };