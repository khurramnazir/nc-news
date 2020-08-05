const request = require("supertest");
const app = require("../app");
const knex = require("../db/connection");

describe("app", () => {
  afterAll(() => {
    return knex.destroy();
  });
  beforeEach(() => {
    return knex.seed.run();
  });

  describe("/api", () => {
    describe.only("/topics", () => {
      test("GET: 200 - responds with an array of topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then((res) => {
            res.body.topics.forEach((topic) => {
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              });
            });
          });
      });
      test("INVALID METHODS: 405 - responds with an error when an invalid method is attempted", () => {
        const invalidMethods = ["put", "post", "delete", "patch"];
        const promises = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/topics")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toBe("method not allowed");
            });
        });
        return Promise.all(promises);
      });
    });
  });
  describe.only("/api", () => {
    describe("/users", () => {
      describe("/:username", () => {
        test("GET: 200 - responds with a user object", () => {
          return request(app)
            .get("/api/users/lurker")
            .expect(200)
            .then((res) => {
              expect(res.body.user).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    username: "lurker",
                    avatar_url:
                      "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    name: "do_nothing",
                  }),
                ])
              );
            });
        });
        test("GET: 404 - responds with an appropriate error message when provided with a username that doesn't exist", () => {
          return request(app)
            .get("/api/users/nonexistant")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("Invalid id");
            });
        });
      });
    });
  });
  describe.only("/api", () => {
    describe("/articles", () => {
      describe("/:article_id", () => {
        test("GET: 200 - responds with an article object", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((res) => {
              expect(res.body.article).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String), //expect( res.body.article[0].created_at instanceof Date).toBe(true),
                    votes: expect.any(Number),
                    comment_count: expect.any(String),
                  }),
                ])
              );
            });
        });
        test("GET: 404 - responds with an appropriate error message when provided with an article id that doesn't exist", () => {
          return request(app)
            .get("/api/articles/999999")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("Invalid id");
            });
        });
        test("PATCH: 201 - responds with the updated article object", () => {
          // const newVotes = { inc_votes: 10 };
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 10 })
            .expect(201)
            .then((res) => {
              expect(res.body.article).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: 110,
                    comment_count: expect.any(String),
                  }),
                ])
              );
            });
        });
        describe("/comments", () => {
          test("POST: 201 - responds with the updated article object", () => {
            // const newVotes = { inc_votes: 10 };
            return request(app)
              .patch("/api/articles/1/comments")
              .send({ username: "bob", body: "great article" })
              .expect(201)
              .then((res) => {
                expect(res.body.article).toEqual(
                  expect.arrayContaining([
                    expect.objectContaining({
                      comment_id: expect.any(Number),
                      author: "bob",
                      article_id: 1,
                      votes: expect.any(Number),
                      topic: expect.any(String),
                      created_at: expect.any(String),
                      body: expect.any(String),
                    }),
                  ])
                );
              });
          });
        });
      });
    });
  });
});
