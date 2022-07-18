const url = 'https://gorest.co.in/public/v2/users'
function createUserOb(object) {
    return cy.task('token.getToken', null, { log: false }).then((token) => {
        cy.request({
            method: 'POST',
            failOnStatusCode: false,
            url: url,
            headers: {
                Authorization: token,
            },
            body: object
        }).as('response')
    })
}

function getUserId(userId) {
    return cy.task('token.getToken', null, { log: false }).then((token) => {
        cy.request({
            method: 'GET',
            failOnStatusCode: false,
            url: url + `${userId}`,
            headers: {
                accept: '*/*',
                Authorization: token,
                'Content-Type': 'application/json',
            }
        }).as('response')
    })
}


function createMessage(object, queryParam = []) {
    return cy.task('token.getToken', null, { log: false }).then((token) => {

        cy.request({
            method: 'POST',
            failOnStatusCode: false,
            url: `${url}/${queryParam.join('')}/posts`,
            headers: {
                accept: '*/*',
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: object
        }).as('response')
    })
}

function getAllUser() {
    return cy.task('token.getToken', null, { log: false }).then((token) => {
        cy.request({
            method: 'GET',
            failOnStatusCode: false,
            url: url + '?page=1',
            headers: {
                accept: '*/*',
                Authorization: token,
                'X-Pagination-Limit': "20",
                'Content-Type': 'application/json',
            }
        }).as('response')
    })
}

module.exports = { createMessage, getUserId, createUserOb, getAllUser }