const users = [{
    id: 1,
    name: 'Andrew',
    schoolId: 101
}, {
    id: 2,
    name: 'Jessica',
    schoolId: 99
}];
const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 99,
    grade: 100
}, {
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = id => {
    return new Promise((resolve, reject) => {
        const user = users.find(element => element.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = schoolId => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === schoolId));
    });
};

const getStatus = userId => {
    return getUser(userId)
        .then(user => getGrades(user.schoolId)
            .then(notes => {
                let average;
                if (notes.length > 0) {
                    average = notes.map(grade => grade.grade).reduce((a, b) => a + b) / notes.length;
                }
                return `${user.name} has a ${average} in the class`;

            }));
};

// async await

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average;
    if (grades.length > 0) {
        average = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average} in the class`;
};

module.exports = { getUser, getGrades, getStatus, getStatusAlt };