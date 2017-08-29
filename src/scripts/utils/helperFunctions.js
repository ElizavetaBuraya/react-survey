export const getCurrentDate = () => {
    let dateChanged = new Date();
    let day = dateChanged.getDate();
    let month = dateChanged.getMonth()+1;
    let year = dateChanged.getFullYear();

    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    dateChanged = day + '.' + month + '.' + year;

    return dateChanged;
};

export async function getSurvey(pathId) {
    const response = await fetch('http://localhost:3000/surveys?link=survey/' + pathId[pathId.length-1], {});
    const json = await response.json();

    return json;
}

export async function getSurveyStats(pathId) {
    const response = await fetch('http://localhost:3000/surveys?link=survey/' + pathId[pathId.length-2], {});
    const json = await response.json();

    return json;
}

export async function getUserResults() {
    const response = await fetch('http://localhost:3000/users/', {});
    const json = await response.json();

    return json;
}