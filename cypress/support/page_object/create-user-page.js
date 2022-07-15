const url = 'https://gorest.co.in/public/v2/users'
const token = 'Bearer c785cebc140253bc7cc635aabc26e55afb7f99c2151e017e131be716295fc66d'
function createUserOb(object) {
    cy.request({
        method: 'POST',
        failOnStatusCode: false,
        url: url,
        headers: {
            Authorization: token,
        },
        body: object
    }).as('response').then((response) => {
        let userId = response.body.id
        cy.wrap(userId = response.body.id)
    })
}

function getUserId(userId) {
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
}


function createMessage(object, queryParam = []) {
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
}

function getAllUser() {
    
    cy.request({
        method: 'GET',
        failOnStatusCode: false,
        url: url+'?page=1',
        headers: {
            accept: '*/*',
            Authorization: token,
            'X-Pagination-Limit': "20",
            'Content-Type': 'application/json',
        }
    }).as('response')
}

module.exports = { createMessage, getUserId, createUserOb, getAllUser }