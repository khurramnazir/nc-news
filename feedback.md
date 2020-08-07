# Feedback

GET `/api/articles` - be careful with using `%` and the `if` logic is very confusing
GET `/api/articles` - similarly confusing conditional logic - consider the power of PSQL and let it do some of the hard work for you
POST `/api/articles/:article_id/comments` - take advantage of PSQL errors

## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### GET `/api/articles?topic=not-a-topic`

Assertion: expected 200 to equal 404

Hints:

- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists

### GET `/api/articles?author=not-an-author`

Assertion: expected 200 to equal 404

Hints:

- use a 404 status code, when provided a non-existent author
- use a separate model to check whether the author exists

error: select "articles".\*, count("comments"."article_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" where "articles"."author" like $1 and "articles"."topic" like $2 group by "articles"."article_id" order by "not-a-column" desc - column "not-a-column" does not exist

### GET `/api/articles?sort_by=not-a-column`

Assertion: expected 500 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

**MANY OF THESE ERRORS WILL BE FIXED WITH SOME EASY FORMATTING**

### GET `/api/articles/1`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the article to the client in an object, with a key of `article`: `{ article: {} }`
- return the single article in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names

### GET `/api/articles/2`

Assertion: expected undefined to equal 0

Hints:

- default the vote column to `0` in the migration
- article with article_id 2 has no comments, you may need to check your join

### GET `/api/articles/1`

Assertion: expected undefined to equal '13'

Hints:

- ensure you have calculated a comment_count for the article

### PATCH `/api/articles/1`

Assertion: expected 201 to equal 200

Hints:

- use a 200: OK status code for successful `patch` requests

### PATCH `/api/articles/1`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the updated article with a key of `article`

### PATCH `/api/articles/1`

Assertion: expected undefined to equal 101

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/articles/1`

Assertion: expected 201 to equal 200

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- **provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1**

### GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments
- use a separate model to check whether the article exists

error: select \* from "comments" where "article_id" = \$1 order by "not-a-valid-column" desc - column "not-a-valid-column" does not exist

### GET `/api/articles/1/comments?sort_by=not-a-valid-column`

Assertion: expected 500 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### POST `/api/articles/1/comments`

Assertion: expected [ Array(1) ] to contain keys 'comment_id', 'author', 'body', 'votes', and 'created_at'

Hints:

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README

### POST `/api/articles/1/comments`

Assertion: expected undefined to equal 0

Hints:

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations

### POST `/api/articles/1/comments`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys (like a missing username)
- use `notNullable` in migrations for required columns

### PATCH `/api/comments/1`

Assertion: expected 201 to equal 200

Hints:

- use a 200: OK status code for successful `patch` requests

### PATCH `/api/comments/1`

Assertion: expected undefined to equal 1

Hints:

- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }` - NOT in an array

### PATCH `/api/comments/1`

Assertion: expected undefined to equal 17

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**
- same as above

### PATCH `/api/comments/1`

Assertion: expected 201 to equal 200

Hints:

- just change the error code and you'll be fine here

### GET `/api/users/butter_bridge`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the user to the client in an object, with a key of `user`: `{ user: {} }`
- return the single user in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names

# BE Northcoders News Check List

## Readme

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `knexfile.js`
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)

## Migrations

- [✓] Use `notNullable` on required fields
- [✓] Default `created_at` in articles and comments tables to the current date:`.defaultTo(knex.fn.now());`

## Seeding

- [✓] Make sure util functions do not mutate data
- [✓] Make util functions easy to follow with well named functions and variables
- [✓] Test util functions
- [✓] Migrate rollback and migrate latest in seed function

## Tests

- [ ] Cover all endpoints and errors
- [ ] Ensure all tests are passing

## Routing

- [✓] Split into api, topics, users, comments and articles routers
- [✓] Use `.route` for endpoints that share the same path
- [✓] Use `.all` for 405 errors

## Controllers

- [✓] Name functions and variables well
- [✓] Add catch blocks to all model invocations
  **BUT don't mix use of`.catch(next);` and `.catch(err => next(err))`**

## Models

- [✓] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ] No unnecessary use of `.modify()` (i.e. only for author and topic queries)
- [✓] Use `leftJoin` for comment counts

## Errors

- [✓] Use error handling middleware functions in app and extracted to separate directory/file
- [✓] Consistently use `Promise.reject` in either models _**OR**_ controllers
