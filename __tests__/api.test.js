const request = require("supertest");
const seed = require('../db/seeds/seed.js'); 
const testData = require('../db/data/test-data/index.js');
const app = require("../app.js")

const connection = require('../db/connection.js');

afterAll(() => connection.end());

beforeEach(() => seed(testData))

describe("GET API - categories", () => {
    test("200: get a list of all categories", () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then(({body}) => {
                expect(body).toHaveLength(testData.categoryData.length);
                body.forEach(entry => {
                    expect(entry).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    });
                });
            });
    });
    test("404: get a list of all categories BUT *categoriezz* is misspelt", () => {
        return request(app)
            .get("/api/categoriezz")
            .expect(404)
            .then(({text}) => {
                expect(text).toBe("Invalid URL")
            });
    });
});