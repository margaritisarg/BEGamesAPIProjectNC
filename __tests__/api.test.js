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

describe("GET API - get all users", () => {
    test("200: get a list of all the users", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then(({body}) => {
                const allUsers = body.users;
                expect(allUsers).toHaveLength(testData.userData.length);
                allUsers.forEach(entry => {
                    expect(entry).toMatchObject({
                        username: expect.any(String),
                        name: expect.any(String),
                        avatar_url: expect.any(String)
                    })
                })

            })
    })
})

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

describe("GET API - reviews with queries", () => {
    test("200: gets data with all 3 inputs", () => {
        return request(app)
            .get("/api/reviews?category=dexterity&sort_by=title&order=desc")
            .expect(200)
            .then(({body}) => {
                const queriedReviews = body.queriedReviews;
                expect(queriedReviews).toHaveLength(1)
                queriedReviews.forEach(entry => {
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
                    })
                    expect(queriedReviews[0].category).toBe("dexterity");
                });
            });      
    })
    test("200: GET all 3 inputs but category key is spelt wrong", () => {
        return request(app)
            .get("/api/reviews?categoryERROR=dexterity&sort_by=title&order=desc")
            .expect(200);     
    })
    test("200: GET all 3 inputs but sort_by key is spelt wrong", () => {
        return request(app)
            .get("/api/reviews?category=dexterity&sort_byERROR=title&order=desc")
            .expect(200);     
    })
    test("200: GET all 3 inputs but order key is spelt wrong", () => {
        return request(app)
            .get("/api/reviews?category=dexterity&sort_byERROR=title&orderERROR=desc")
            .expect(200)   
    })
    test("204: GET all 3 inputs BUT category=FunFunFun, does not exists", () => {
        return request(app)
            .get("/api/reviews?category=FunFunFun&sort_by=title&order=desc")
            .expect(204);
    })
    test("200: GET all 3 from 2 inputs (sort_by & order) BUT sort_by=FunFunFun, does not exists", () => {
        return request(app)
            .get("/api/reviews?sort_by=FunFunFun&sort_by=title&order=desc")
            .expect(200)
    })
    test("200: GET all from 2 inputs (sort_by & order) BUT order=FunFunFun, does not exists", () => {
        return request(app)
            .get("/api/reviews?sort_by=title&order=FunFunFun")
            .expect(200)
    })

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

describe("DELETE API - delete comment by id", () => {
    test("200: ID exists - delete comment by id", () => {
        return request(app)
            .delete("/api/comments/2")
            .expect(204);
    })
    test("204: ID not exists: delete comment by id", () => {
        return request(app)
            .delete("/api/comments/20")
            .expect(204);
    })
    test("400: ID not a an int (symbol): delete comment by id", () => {
        return request(app)
            .delete("/api/comments/20+")
            .expect(400);
    })
    test("400: ID not a an int (char): delete comment by id", () => {
        return request(app)
            .delete("/api/comments/abc")
            .expect(400);
    })
});
describe("PATCH API - update reviews table, column votes by input", () => {
    test("200: update votes from an object inputted", () => {
        const dummyData = {votes: 50};
        return request(app)
            .patch("/api/reviews/2")
            .send(dummyData)
            .expect(200)
            .then(({body}) => {
                const expected = {
                    review_id: 2,
                    title: 'Jenga',
                    category: 'dexterity',
                    designer: 'Leslie Scott',
                    owner: 'philippaclaire9',
                    review_body: 'Fiddly fun for all the family',
                    review_img_url: 'https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700',
                    created_at: '2021-01-18T10:01:41.251Z',
                    votes: 55
                }               
            expect(body.review).toEqual(expected)
            })
    })
    test("404: valid ID but not found in table", () => {
        const dummyData = {votes: 50};
        return request(app)
            .patch("/api/reviews/20")
            .send(dummyData)
            .expect(200)
            .then(({body}) => {
                const expected = {
                    status: 404,
                    msg: "No content found"
                }
                expect(body.review).toEqual(expected)
            })
    })
    test("400: bad input - props value", () => {
        const dummyData = {votes: 'abc'}
        return request(app)
            .patch("/api/reviews/2")
            .send(dummyData)
            .expect(400)
            .then(({body}) => {
                expect(body).toEqual({msg: '400 - Bad input'})
            })
    })
    test("400: bad input - incorrect prop name", () => {
        const dummyData = {votezzz: 10}
        return request(app)
            .patch("/api/reviews/2")
            .send(dummyData)
            .expect(400)
            .then(({body}) => {
                expect(body).toEqual({msg: '400 - Bad input'})
            })
    })
    test("400: bad input - incorrect ID in path symbol", () => {
        const dummyData = {votes: 10}
        return request(app)
            .patch("/api/reviews/2+")
            .send(dummyData)
            .expect(400)
            .then(({body}) => {
                expect(body).toEqual({msg: '400 - Bad input'})
            })
    })

})

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
                        comment_count: expect.any(Number),
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


describe("GET - /api - end point test", () => {
    test("200: get a single review by ID", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({body}) => {
                expect(Object.keys(body).length).toBe(9)
            });
    });
})