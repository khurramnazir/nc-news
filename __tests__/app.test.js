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

  describe("/", () => {
    test("GET: 404 - responds with an appropriate error message when provided with a path that doesn't exist", () => {
      return request(app)
        .get("/ttryfyuff")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Path does not exist");
        });
    });
  });
  describe("/api", () => {
    test("GET: 200 - responds with a JSON of all endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
        });
    });
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
              expect(res.body.msg).toBe("Invalid username");
            });
        });
        test("INVALID METHODS: 405 - responds with an error when an invalid method is attempted", () => {
          const invalidMethods = ["put", "post", "delete", "patch"];
          const promises = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/users/:username")
              .expect(405)
              .then((res) => {
                expect(res.body.msg).toBe("method not allowed");
              });
          });
          return Promise.all(promises);
        });
      });
    });
  });
  describe("/api", () => {
    describe("/articles", () => {
      test("GET: 200 - responds with an array containing all article objects", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            res.body.articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  body: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.any(String),
                })
              );
            });
          });
      });
      test("GET: 200 - responds with an array of all articles sorted by date (default) in descending order (default)", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            expect(res.body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });
      test("GET: 200 - responds with an array of all articles sorted by author in ascending order", () => {
        return request(app)
          .get("/api/articles?sort_by=author&order=asc")
          .expect(200)
          .then((res) => {
            expect(res.body.articles).toBeSortedBy("author", {
              descending: false,
            });
          });
      });
      test("GET: 200 - responds with an array of all articles sorted by comment count in ascending order", () => {
        return request(app)
          .get("/api/articles?sort_by=comment_count&order=asc")
          .expect(200)
          .then((res) => {
            expect(res.body.articles).toBeSortedBy("comment_count", {
              descending: false,
              coerce: true,
            });
          });
      });
      test("GET: 200 - responds with an array of all articles filtered by username", () => {
        return request(app)
          .get("/api/articles?author=icellusedkars")
          .expect(200)
          .then((res) => {
            expect(res.body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
            res.body.articles.forEach((article) => {
              expect(article.author).toBe("icellusedkars");
            });
          });
      });
      test("GET: 200 - responds with an array of all articles filtered by topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then((res) => {
            expect(res.body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
            res.body.articles.forEach((article) => {
              expect(article.topic).toBe("mitch");
            });
          });
      });
      test("GET: 200 - responds with an array of all articles filtered by topic and author", () => {
        return request(app)
          .get("/api/articles?topic=mitch&author=icellusedkars")
          .expect(200)
          .then((res) => {
            expect(res.body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
            res.body.articles.forEach((article) => {
              expect(article.topic).toBe("mitch");
              expect(article.author).toBe("icellusedkars");
            });
          });
      });
      test("GET: 404 - responds with an appropriate error message when provided with a topic that doesn't exist", () => {
        return request(app)
          .get("/api/articles?topic=doesnotexist")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("topic does not exist");
          });
      });
      test("GET: 404 - responds with an appropriate error message when provided with an author that doesn't exist", () => {
        return request(app)
          .get("/api/articles?topic=mitch&author=doesnotexist")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("author does not exist");
          });
      });
      test("GET: 404 - responds with an appropriate error message when provided with a topic that doesn't exist but an author that does", () => {
        return request(app)
          .get("/api/articles?topic=doesnotexist&author=icellusedkars")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("topic does not exist");
          });
      });
      test("GET: 404 - responds with an appropriate error message when provided with an author that doesn't exist but a topic that does", () => {
        return request(app)
          .get("/api/articles?topic=mitch&author=doesntnotexist")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("author does not exist");
          });
      });
      test("INVALID METHODS: 405 - responds with an error when an invalid method is attempted", () => {
        const invalidMethods = ["put", "post", "delete", "patch"];
        const promises = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/articles")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toBe("method not allowed");
            });
        });
        return Promise.all(promises);
      });

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
                    created_at: expect.any(String),
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
              expect(res.body.msg).toBe("Article id not found");
            });
        });
        test("GET: 400 - responds with an appropriate error message when provided with an article id that is not a number", () => {
          return request(app)
            .get("/api/articles/onetwothree")
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("Invalid id");
            });
        });
        test("PATCH: 201 - updates vote count and responds with the updated article object", () => {
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
        test("INVALID METHODS: 405 - responds with an error when an invalid method is attempted", () => {
          const invalidMethods = ["put", "post", "delete"];
          const promises = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/articles/:article_id")
              .expect(405)
              .then((res) => {
                expect(res.body.msg).toBe("method not allowed");
              });
          });
          return Promise.all(promises);
        });
        describe("/comments", () => {
          test("POST: 201 - sends comment and responds with the sent comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "lurker", body: "great article" })
              .expect(201)
              .then((res) => {
                expect(res.body.comment).toEqual(
                  expect.arrayContaining([
                    expect.objectContaining({
                      comment_id: 19,
                      author: "lurker",
                      article_id: 1,
                      votes: 0,
                      created_at: expect.any(String),
                      body: "great article",
                    }),
                  ])
                );
              });
          });
          test("POST: 400 - responds with an appropriate error message when provided with an article id that is not a number", () => {
            return request(app)
              .post("/api/articles/onetwothree/comments")
              .send({ username: "lurker", body: "great article" })
              .expect(400)
              .then((res) => {
                expect(res.body.msg).toBe("Invalid id");
              });
          });
          test("POST: 404 - responds with an appropriate error message when provided with an article id that doesn't exist", () => {
            return request(app)
              .post("/api/articles/9999999/comments")
              .send({ username: "lurker", body: "great article" })
              .expect(404)
              .then((res) => {
                expect(res.body.msg).toBe("article id does not exist");
              });
          });
          test("POST: 404 - responds with an appropriate error message when provided with a username that doesn't exist", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "ljerughreu", body: "great article" })
              .expect(404)
              .then((res) => {
                expect(res.body.msg).toBe("username does not exist");
              });
          });
          test("GET: 400 - responds with an appropriate error message when provided with an article id that is not a number", () => {
            return request(app)
              .get("/api/articles/onetwothree/comments")
              .expect(400)
              .then((res) => {
                expect(res.body.msg).toBe("Invalid id");
              });
          });
          test("GET: 404 - responds with an appropriate error message when provided with an article id that doesn't exist", () => {
            return request(app)
              .get("/api/articles/999999/comments")
              .expect(404)
              .then((res) => {
                expect(res.body.msg).toBe("Article id not found");
              });
          });
          test("GET: 200 - responds with an array of comments for specified article id", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then((res) => {
                res.body.comments.forEach((comment) => {
                  expect(comment).toEqual(
                    expect.objectContaining({
                      comment_id: expect.any(Number),
                      author: expect.any(String),
                      article_id: expect.any(Number),
                      votes: expect.any(Number),
                      created_at: expect.any(String),
                      body: expect.any(String),
                    })
                  );
                });
              });
          });
          test("GET: 200 - responds with an array of comments for specified article id sorted by created_at (default sort) in descending order (default order)", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=created_at")
              .expect(200)
              .then((res) => {
                expect(res.body.comments).toBeSortedBy("created_at", {
                  descending: true,
                });
              });
          });
          test("GET: 200 - responds with an array of comments for specified article id sorted by comment_id in ascending order", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=comment_id&order=asc")
              .expect(200)
              .then((res) => {
                expect(res.body.comments).toBeSortedBy("comment_id", {
                  descending: false,
                });
              });
          });
          test("GET: 200 - responds with an array of comments for specified article id sorted by votes in ascending order", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes&order=asc")
              .expect(200)
              .then((res) => {
                expect(res.body.comments).toBeSortedBy("votes", {
                  descending: false,
                });
              });
          });
          test("GET: 200 - responds with an array of comments for specified article id sorted by author in ascending order", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=author&order=asc")
              .expect(200)
              .then((res) => {
                expect(res.body.comments).toBeSortedBy("author", {
                  descending: false,
                });
              });
          });
          test("INVALID METHODS: 405 - responds with an error when an invalid method is attempted", () => {
            const invalidMethods = ["put", "delete", "patch"];
            const promises = invalidMethods.map((method) => {
              return request(app)
                [method]("/api/articles/1/comments")
                .expect(405)
                .then((res) => {
                  expect(res.body.msg).toBe("method not allowed");
                });
            });
            return Promise.all(promises);
          });
        });
      });
    });
  });
  describe("/api", () => {
    describe("/comments", () => {
      test("GET: 200 - responds with an array of all comment objects", () => {
        return request(app)
          .get("/api/comments")
          .expect(200)
          .then((res) => {
            res.body.comments.forEach((comment) => {
              expect.objectContaining({
                comment_id: expect.any(Number),
                author: expect.any(String),
                article_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                body: expect.any(String),
              });
            });
          });
      });
      test("INVALID METHODS: 405 - responds with an error when an invalid method is attempted", () => {
        const invalidMethods = ["put", "delete", "patch", "post"];
        const promises = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/comments")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toBe("method not allowed");
            });
        });
        return Promise.all(promises);
      });
      describe("/:comment_id", () => {
        test("PATCH: 201 - updates votes on comment and responds with the updated comment object", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 10 })
            .expect(201)
            .then((res) => {
              expect(res.body.comment).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    comment_id: 1,
                    author: expect.any(String),
                    article_id: expect.any(Number),
                    votes: 26,
                    created_at: expect.any(String),
                    body: expect.any(String),
                  }),
                ])
              );
            });
        });
        test("DELETE: 204 - delete comment by id", () => {
          return request(app)
            .del("/api/comments/1")
            .expect(204)
            .then(() => {
              return request(app)
                .get("/api/comments")
                .then(({ body: { comments } }) => {
                  expect(
                    comments.every((comment) => comment.comment_id !== 1)
                  ).toBe(true);
                });
            });
        });
        test("PATCH: 400 - responds with an appropriate error message when provided with an comment id that is not a number", () => {
          return request(app)
            .patch("/api/comments/onetwothree")
            .send({ inc_votes: 10 })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("Invalid id");
            });
        });
        test("PATCH: 404 - responds with an appropriate error message when provided with an article id that doesn't exist", () => {
          return request(app)
            .patch("/api/comments/999999")
            .expect(404)
            .send({ inc_votes: 10 })
            .then((res) => {
              expect(res.body.msg).toBe("comment id not found");
            });
        });
        test("DELETE: 400 - responds with an appropriate error message when provided with an comment id that is not a number", () => {
          return request(app)
            .del("/api/comments/onetwothree")
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("Invalid id");
            });
        });
        test("DELETE: 404 - responds with an appropriate error message when provided with an article id that doesn't exist", () => {
          return request(app)
            .del("/api/comments/999999")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("Invalid id");
            });
        });
        test("INVALID METHODS: 405 - responds with an error when an invalid method is attempted", () => {
          const invalidMethods = ["put", "post", "get"];
          const promises = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/comments/:comment_id")
              .expect(405)
              .then((res) => {
                expect(res.body.msg).toBe("method not allowed");
              });
          });
          return Promise.all(promises);
        });
      });
    });
  });
});
