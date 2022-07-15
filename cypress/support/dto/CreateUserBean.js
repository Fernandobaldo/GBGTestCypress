class PostMessageBean {
    constructor(
        title,
        body
    ) {
        this.title = title;
        this.body = body;
    }

    setTitle(title) {
        if (title) this.title = title;
        return this;
    }

    setBody(body) {
        if (body) this.body = body;
        return this;
    }
}

const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()


class createUser {
    constructor(
        name,
        gender,
        email = id + 'random@random.com',
        status

    ) {
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.status = status;
    }

    setName(name) {
        if (name) this.name = name;
        return this;
    }

    setGender(gender) {
        if (gender) this.gender = gender;
        return this;
    }

    setEmail(email) {
        if (email) this.email = email;
        return this;
    }

    setStatus(status) {
        if (status) this.status = status;
        return this;
    }
}
 module.exports = {PostMessageBean, createUser}  