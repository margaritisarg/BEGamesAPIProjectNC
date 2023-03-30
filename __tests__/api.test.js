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

describe("POST API - insert a comment row using review_id and author FK", () => {
    test("201: sucessfully insert a new comment in the comments table", () => {
        const dummyData = {
            "username": "bainesface",
            "body": "This is some body text, hi2"
        }      
        return request(app)
            .post("/api/reviews/2/comments")
            .send(dummyData)
            .expect(201)
            .then(({body}) => {
                const expected = {
                    "status": "Inserted successfully",
                    "rowCount": 1,
                    "comment": {
                        "username": "bainesface",
                        "body": "This is some body text, hi2"
                    }
                };
                expect(body).toEqual(expected);
            });
    });
    test("400: invalid extra properties", () => {
        const dummyData = {
            "FAKEusername": "bainesface",
            "body": "This is some body text, hi2",
            "extra": "extra"
        }      
        return request(app)
            .post("/api/reviews/2/comments")
            .send(dummyData)
            .expect(400)
            .then(({body})=>{
                expect(body).toEqual({msg: "400 - Bad input"})
            })  
    })
    test("400: invalid props - fake username", () => {
        const dummyData = {
            "FAKEusername": "bainesface",
            "body": "This is some body text, hi2"
        }        
        return request(app)
            .post("/api/reviews/2/comments")
            .send(dummyData)
            .expect(400)
            .then(({body})=>{
                expect(body).toEqual({msg: "400 - Bad input"})
            })
    })
    test("400: invalid props - fake body", () => {
        const dummyData = {
            "username": "bainesface",
            "FAKEbody": "This is some body text, hi2"
        }       
        return request(app)
            .post("/api/reviews/2/comments")
            .send(dummyData)
            .expect(400)
            .then(({body})=>{
                expect(body).toEqual({msg: "400 - Bad input"})
            })
    })
    test("400: valid data to post but review_id in post string incorrect data type", () => {
        const dummyData = {
            "username": "bainesface",
            "body": "Nothing..."
        }
        return request(app)
            .post("/api/reviews/notANumber/comments")
            .send(dummyData)
            .expect(400)
            .then((body)=>{
                expect(body.body).toEqual({errorCode: "22P02", msg: "invalid syntax type"})
            })
    })
    test("404: Invalid data to post - incorrect author key", () => {
        const dummyData = {
            "username": "FAKE_bainesface_FAKE",
            "body": "Nothing..."
        }
        return request(app)
            .post("/api/reviews/2/comments")
            .send(dummyData)
            .expect(404)
            .then(({body})=>{
                expect(body).toEqual({status: 404, msg: "FAKE_bainesface_FAKE not found"})
            })
    })
    test("404: Invalid data to post - incorrect review_id key", () => {
        const dummyData = {
            "username": "bainesface",
            "body": "Nothing..."
        }
        return request(app)
            .post("/api/reviews/2222/comments")
            .send(dummyData)
            .expect(404)
            .then(({body})=>{
                expect(body).toEqual({status: 404, msg: "2222 not found"})
            })
    })
})

// describe("PATCH APT - update reviews table, column votes by input", () => {
//     const dummyData = {"votes": 5}
//     test("200: update votes from an object inputted", () => {
//         return request(app)
//             .get("/api/reviews/2")
//             .send(dummyData)
//             .expect(200)
//             .then((body) => {
//                 console.log(body)
//             })
//     })
// })

describe("GET API - get all comments by review ID", () => {
    test("200: get all comments from a single review ID", () => {
        return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then(({body}) => {
                const commentsByReviewID = body.commentsByReviewID;
                expect(commentsByReviewID).toHaveLength(3)
                commentsByReviewID.forEach(entry => {
                    expect(entry).toMatchObject({
                        comment_id: expect.any(Number),
                        body: expect.any(String),
                        review_id: expect.any(Number),
                        author: expect.any(String),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                    })
                })
            })
    })
    test("204: no comments found from this review ID", () => {
        return request(app)
            .get("/api/reviews/22323/comments")
            .expect(204)
            .then(({res}) => {
                expect(res.statusMessage).toBe("No Content")
            })
    })
    test("400: no comments found from an invalid input", () => {
        return request(app)
            .get("/api/reviews/asasa/comments")
            .expect(400)
            .then(({text}) => {
                const result = JSON.parse(text)
                expect(result).toEqual({msg: "400 - Bad input"})
            })
    })
    test("400: no comments found from an invalid input", () => {
        return request(app)
            .get("/api/reviews/12121asasa/comments")
            .expect(400)
            .then(({text}) => {
                const result = JSON.parse(text)
                expect(result).toEqual({msg: "400 - Bad input"})
            })
    })
    test("400: no comments found from an invalid input", () => {
        return request(app)
            .get("/api/reviews/12++/comments")
            .expect(400)
            .then(({text}) => {
                const result = JSON.parse(text)
                expect(result).toEqual({msg: "400 - Bad input"})
            })
    })
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