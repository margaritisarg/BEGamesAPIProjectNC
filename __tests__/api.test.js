const request = require("supertest");
const seed = require('../db/seeds/seed.js'); 
const testData = require('../db/data/test-data/index.js');
const app = require("../app.js")

const connection = require('../db/connection.js');

afterAll(() => connection.end());

beforeEach(() => seed(testData))


describe("404: Ensure correct response when 404 occurs", () => {
    test("categories - /api/categoriezz missplet", () => {
    return request(app)
        .get("/api/categoriezz")
        .expect(404)
        .then(({text}) => {
            const result = JSON.parse(text)
            expect(result).toEqual({msg: "Invalid URL"})
            expect(result.msg).toBe("Invalid URL")
        });
    });
});

describe("GET API - categories", () => {
    test("200: get a list of all categories", () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then(({body}) => {
                const arrayOfCategories = body.AllCategories; 
                expect(arrayOfCategories).toHaveLength(testData.categoryData.length);
                arrayOfCategories.forEach(entry => {
                    expect(entry).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    });
                });
            });
    });
});

describe("GET API - all reviews", () => {
    test("200: get all reviews", () => {
        return request(app)
            .get("/api/reviews")
            .expect(200)
            .then(({body}) => {
                const reviewsResult = body.allReviews;
                expect(reviewsResult).toHaveLength(testData.reviewData.length)
                reviewsResult.forEach(entry => {
                    expect(entry).toMatchObject({
                        comment_count: expect.any(Number),
                        title: expect.any(String),
                        owner: expect.any(String),
                        review_id: expect.any(Number),
                        category: expect.any(String),
                        review_img_url: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        designer: expect.any(String),
                    });
                });
            });
    });
});

describe("GET API - reviews by ID", () => {
    test("200: get a single review by ID", () => {
        return request(app)
            .get("/api/reviews/3")
            .expect(200)
            .then(({body}) => {
                const reviewsResult = body.ReviewsByID;
                expect(reviewsResult).toHaveLength(1);
                reviewsResult.forEach(entry => {
                    expect(entry).toMatchObject({
                        review_id: expect.any(Number),
                        title: expect.any(String),
                        category: expect.any(String),
                        designer: expect.any(String),
                        owner: expect.any(String),
                        review_body: expect.any(String),
                        review_img_url: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number)
                    });
                });
            });
    });
    test("404: return error message when an ID that does no exists is inputted", () => {
        return request(app)
            .get("/api/reviews/323232")
            .expect(404)
            .then(({text}) => {
                const result = JSON.parse(text)
                expect(result).toEqual({msg: "404 - No content found"})
            });
    });
    test("400: return error message when an ID is not a number", () => {
        return request(app)
            .get("/api/reviews/hello")
            .expect(400)
            .then(({text}) => {
                const result = JSON.parse(text)
                expect(result).toEqual({msg: "400 - Bad input"})
            });
    });

});