const request = require("supertest");
const app = require("../app");
const knex = require("../db/connection");

describe("app", () => {
  afterAll(() => {
    return knex.destroy();
  });

  describe("app", () => {
    beforeEach(() => {
      return knex.seed.run();
    });

    describe("/api", () => {
      describe("/topics", () => {
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
      });
    });
    describe("/api", () => {
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
    describe("/api", () => {
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
                      created_at: expect(
                        article.created_at instanceof Date
                      ).toBe(true),
                      votes: expect.any(Number),
                      comment_count: expect.any(Number),
                    }),
                  ])
                );
              });
          });
          // test("GET: 404 - responds with an appropriate error message when provided with a username that doesn't exist", () => {
          //   return request(app)
          //     .get("/api/users/nonexistant")
          //     .expect(404)
          //     .then((res) => {
          //       expect(res.body.msg).toBe("Invalid id");
          //     });
          // });
        });
      });
    });
  });
});
