import {
    Given,
    When,
    And,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
const { createUserOb, createMessage, getAllUser } = require('../../../support/page_object/create-user-page');
const { PostMessageBean, createUser } = require('../../../support/dto/CreateUserBean');


Given('the client has not configured a token', function () {
    const token = "";
    cy.task('token.setToken', token, { log: false });
})




And('the client tries to create a new user', function async(table) {
    const data = table.rowsHash();
    const { name, gender, email, status } = data
    const newUser = new createUser()
        .setName(name || this.name)
        .setGender(gender || this.gender)
        .setStatus(status || this.status)
    if (email === 'random') {
        newUser.setEmail(this.email);
    } else {
        newUser.setEmail(email);
    }

    createUserOb.call(this, newUser);
})

Then('the request is rejected as unauthorized', function async() {
    cy.get('@response', { log: false }).then((response) => {
        const body = response.body;
        expect(body.message).to.be.eq("Authentication failed");
        expect(response.status, 'statusCode').to.eq(401);

    })
});


When('the client has a valid token', function () {
    const token = "Bearer c785cebc140253bc7cc635aabc26e55afb7f99c2151e017e131be716295fc66d";
    cy.task('token.setToken', token, { log: false });
})


Then('the user posts a new message', function (table) {
    const data = table.rowsHash();
    const { title, body } = data
    const queryParam = [];
    cy.wrap(title, { log: false }).as('titleResponse');
    cy.wrap(body, { log: false }).as('bodyResponse');


    cy.get('@response', { log: false }).then((response) => {
        const userId = response.body.id
        cy.wrap(userId, { log: false }).as('userId');

        if (userId) {
            queryParam.push(`${userId}`);
        }

        const newMessage = new PostMessageBean()
            .setTitle(this.title || title)
            .setBody(this.body || body)

        if (title === 'true') {
            newMessage.setTitle(this.title);
        } else {
            newMessage.setTitle(title);
        }

        if (body === 'true') {
            newMessage.setBody(this.body);
        } else {
            newMessage.setBody(body);
        }

        createMessage.call(this, newMessage, queryParam);
    })
})


Then('the message is created', function (table) {
    const { message } = table.rowsHash();
    cy.get('@response', { log: false }).then((response) => {

        const msg = response.body.title
        const bodyMsg = response.body.body
        const userIdMsg = response.body.user_id
        if (msg) {
            if (message === 'true')
                expect(msg, 'title').to.be.eq(this.titleResponse);
            expect(bodyMsg, 'bodyMsg').to.be.eq(this.bodyResponse);
            expect(userIdMsg, 'userIdMsg').to.be.eq(this.userId);
            expect(response.status, 'statusCode').to.eq(201);

        }

    })
});


Given('the client requests all users', function () {

    getAllUser.call();

})

Then('a paged response is returned', function (table) {
    const data = table.rowsHash();
    const { currentPage, pageSize } = data
    cy.get('@response', { log: false }).then((response) => {
        const pageLimit = response.headers['x-pagination-limit']
        const pagePagination = response.headers['x-pagination-page']

        expect(pageLimit, 'title').to.be.eq(pageSize);
        expect(pagePagination, 'title').to.be.eq(currentPage);

    })
})


Given('the current page has at most {string} items', function (totalItems) {
    cy.get('@response', { log: false }).then((response) => {
        expect(response.status, 'statusCode').to.eq(200);

        const msg = response.body
        if (msg) {
            expect(response.body.length, 'title').to.be.eq((parseInt(totalItems, 10)))
        }

    })
})
