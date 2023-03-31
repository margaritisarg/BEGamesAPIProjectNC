
exports.getEndPoint = (req, res, next) => {
    const endpoints = {
        "GET /api": {
          "description": "serves up a json representation of all the available endpoints of the api"
        },
        "GET /api/users": {
          "description": "gets all users",
          "queries": [],
          "exampleResponse": {
            "users": [
                {
                    "username": "jessjelly",
                    "name": "Jess Jelly",
                    "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141"
                }
            ]
          }
        },
        "GET /api/reviews": {
          "description": "An array of all reviews with a comment count",
          "queries": [],
          "exampleResponse": {
            "reviews": [
              {
                "title": "One Night Ultimate Werewolf",
                "designer": "Akihisa Okui",
                "owner": "happyamy2016",
                "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "category": "hidden-roles",
                "created_at": 1610964101251,
                "votes": 5
              },
              {
                "etc": "...."
              }
            ]
          }
        },
        "GET /api/categories": {
            "description": "An array of all categories, can filter with queries.",
            "queries": ["category", "sort_by", "order"],
            "exmaple querie": "/api/categories?sort_by=title&order=desc",
            "exmaple querie2": "/api/categories?category=dexterity&order=desc",
            "exampleResponse": {
              "reviews": [
                {
                  "title": "One Night Ultimate Werewolf",
                  "designer": "Akihisa Okui",
                  "owner": "happyamy2016",
                  "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                  "category": "hidden-roles",
                  "created_at": 1610964101251,
                  "votes": 5
                },
                {
                  "etc": "...."
                }
              ]
            }
          },
        "GET /api/reviews/:review_id": {
            "description": "An array of with a single review picked by ID with comment count",
            "queries": [],
            "exampleResponse": {
              "reviews": [
                {
                  "comment_count": 2,
                  "title": "One Night Ultimate Werewolf",
                  "designer": "Akihisa Okui",
                  "owner": "happyamy2016",
                  "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                  "category": "hidden-roles",
                  "created_at": 1610964101251,
                  "votes": 5
                }
              ]
            }
          },
          "GET /api/reviews/:review_id/comments": {
            "description": "An array of comments with a matching review ID",
            "queries": [],
            "exampleResponse": {
                "commentsByReviewID": [
                    {
                        "comment_id": 10,
                        "body": "Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim.",
                        "review_id": 2,
                        "author": "grumpy19",
                        "votes": 9,
                        "created_at": "2021-03-27T14:15:31.110Z"
                    },
                    {
                        "etc": "..."
                    }
              ]
            }
          },
          "PATCH: /api/reviews/:review_id":{
            "description": "update votes by review id",
            "queries": [],
            "object example": {"votes": 5},
            "object example2": {"votes": -5},
            "example response":{
                "review": {
                    "review_id": 8,
                    "title": "Scythe; you're gonna need a bigger table!",
                    "category": "engine-building",
                    "designer": "Jamey Stegmaier",
                    "owner": "grumpy19",
                    "review_body": "Spend 30 minutes just setting up all of the boards (!) meeple and decks, just to forget how to play. Scythe can be a lengthy game but really packs a punch if you put the time in. With beautiful artwork, countless scenarios and clever game mechanics, this board game is a must for any board game fanatic; just make sure you explain ALL the rules before you start playing with first timers or you may find they bring it up again and again.",
                    "review_img_url": "https://images.pexels.com/photos/4200740/pexels-photo-4200740.jpeg?w=700&h=700",
                    "created_at": "2021-01-22T10:37:04.839Z",
                    "votes": 105
                }
            }
          },
          "POST /api/reviews/:review_id/comments": {
            "description": "adds a comment based on review id and an existing username",
            "queries": [],
            "object example": {"username": "tickle122", "body": "random comment here"},
            "example response": {
                "status": "Inserted successfully",
                "rowCount": 1,
                "comment": {
                    "username": "tickle122",
                    "body": "random comment here"
                }
            }
          },
        "DELETE /api/comments/:comment_id" : {
            "description": "returns a comment by its ID",
            "queries": [],
            "exampleResponse": 204 
            }
        }
      
      
    res.status(200).send({endpoints});
}