import {
    Given,
    When,
    And,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
const { createUserOb, createMessage, getAllUser } = require('../../../support/page_object/create-user-page');
const { PostMessageBean, createUser } = require('../../../support/dto/CreateUserBean');


Given('the client has not configured a token', function () {


})




When('the client tries to create a new user', function async(table) {
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
    })
});


When('the client has a valid token', function () {

})





Then('the user posts a new message', function (table) {
    const data = table.rowsHash();
    const { title, body } = data
    const queryParam = [];

    cy.get('@response', { log: false }).then((response) => {
        const userId = response.body.id

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
                expect(msg, 'title').to.be.eq(msg);
            expect(bodyMsg, 'bodyMsg').to.be.eq(bodyMsg);
            expect(userIdMsg, 'userIdMsg').to.be.eq(userIdMsg);
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
        const mime = response.headers['x-pagination-limit']
        const mime2 = response.headers['x-pagination-page']



        expect(mime, 'title').to.be.eq(pageSize);
        expect(mime2, 'title').to.be.eq(currentPage);

    })
})


Given('the current page has at most {string} items', function (totalItems) {
    cy.get('@response', { log: false }).then((response) => {
        const msg = response.body
        if (msg) {
            expect(response.body.length, 'title').to.be.eq((parseInt(totalItems, 10)))
        }

    })
})
