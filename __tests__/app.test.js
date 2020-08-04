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
  });
});
