const request = require("supertest");
const app = require("../app");
const knex = require("../db/connection");

describe("app", () => {
  afterAll(() => {
    return knex.destroy();
  });
});

describe("app", () => {
  beforeEach(() => {
    return knex.seed.run();
  });
});
