let users = [
        { id: 0, name: "Админ", role: "Администратор", registered: '01.01.2017', surveys: 12},
        { id: 1, name: "Юзер1", role: "Пользователь", registered: '02.01.2017', surveys: 0},
        { id: 2, name: "Юзер2", role: "Пользователь", registered: '03.01.2017', surveys: 0},
        { id: 3, name: "Юзер3", role: "Пользователь", registered: '04.01.2017', surveys: 0},
        { id: 4, name: "Юзер4", role: "Пользователь", registered: '05.01.2017', surveys: 0},
        { id: 5, name: "Юзер5", role: "Пользователь", registered: '06.01.2017', surveys: 0},
        { id: 6, name: "Юзер6", role: "Пользователь", registered: '07.01.2017', surveys: 0},
        { id: 7, name: "Юзер7", role: "Пользователь", registered: '08.01.2017', surveys: 0},
        { id: 8, name: "Юзер8", role: "Пользователь", registered: '09.01.2017', surveys: 0},
        { id: 9, name: "Юзер9", role: "Пользователь", registered: '10.01.2017', surveys: 0},
        { id: 10, name: "Юзер10", role: "Пользователь", registered: '11.01.2017', surveys: 0}
    ];

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
}

