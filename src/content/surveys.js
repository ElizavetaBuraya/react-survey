let surveys = [
    { id: 0, name: "JavaScript lecture feedback", changed: "01.01.2017", answers: 10, link: '/survey/1', results: '/survey/1/results'},
    { id: 1, name: "HTML lecture feedback", changed: "02.01.2017", answers: 11, link: '/survey/2', results: '/survey/2/results'},
    { id: 2, name: "CSS lecture feedback", changed: "03.01.2017", answers: 10, link: '/survey/3', results: '/survey/3/results'},
    { id: 3, name: "Ruby lecture feedback", changed: "04.01.2017", answers: 12, link: '/survey/4', results: '/survey/4/results'},
    { id: 4, name: "Python lecture feedback", changed: "05.01.2017", answers: 9, link: '/survey/5', results: '/survey/5/results'},
    { id: 5, name: "JS async lecture feedback", changed: "06.01.2017", answers: 15, link: '/survey/6', results: '/survey/6/results'},
    { id: 6, name: "React lecture feedback", changed: "07.01.2017", answers: 11, link: '/survey/7', results: '/survey/7/results'},
    { id: 7, name: "Redux lecture feedback", changed: "08.01.2017", answers: 9, link: '/survey/8', results: '/survey/8/results'},
    { id: 8, name: "Angular.js lecture feedback", changed: "09.01.2017", answers: 7, link: '/survey/9', results: '/survey/9/results'},
    { id: 9, name: "HTTP lecture feedback", changed: "10.01.2017", answers: 3, link: '/survey/10', results: '/survey/10/results'},
    { id: 10, name: "ES6 lecture feedback", changed: "11.01.2017", answers: 10, link: '/survey/11', results: '/survey/11/results'},
];

if (!localStorage.getItem('surveys')) {
    localStorage.setItem('surveys', JSON.stringify(surveys));
}
