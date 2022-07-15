Feature: API test assessment

    Test https://gorest.co.in/public/v2 documented at https://gorest.co.in/ using
    Cypress.

    All the appropriate tests will refer to an existing user named "Investigate Assessment".


    Scenario: Client does not have a token
        Given the client has not configured a token
        When the client tries to create a new user
            | name   | Investigate Assessment |
            | gender | Male                   |
            | email  | svnsl@nlkvc1s.com      |
            | status | active                 |
        Then the request is rejected as unauthorized

    Scenario: Post a new message
        Given the client has a valid token
        When the client tries to create a new user
            | name   | Investigate Assessment |
            | gender | Male                   |
            | email  | random                 |
            | status | active                 |
        When the user posts a new message
            | title | Some title                       |
            | body  | A super interesting message here |
        Then the message is created
            | message | true |

    Scenario: Paging
        Given the client has a valid token
        When the client requests all users
        Then a paged response is returned
            | currentPage | 1  |
            | pageSize    | 10 |
        And the current page has at most "10" items
