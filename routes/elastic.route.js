// const express = require("express");
// const BookController = require("../controllers//book.controller");
// const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");
// const router = express.Router();
// const Book = require("../models/book.model");





// const elasticsearch = require('elasticsearch');
// const client = new elasticsearch.Client({
//     hosts: [ 'http://172.105.86.151:9900']
//  });



// router.get("/:query", function (req, res,next){
  
//     // declare the query object to search elastic search and return only 200 results from the first result found. 
//     // also match any data where the name is like the query string sent in
//     console.log(req.params.query,"hhhhhhhh")
//     let body = {
//       size: 5,
//       from: 0, 
//       "query": {
//   "bool": {
//     "must": {
//          multi_match: {
//             query: req.params.query,
//             fields: ['category','title','author','publishers','publicationCountry','reviewer','comments','subject','subCategory','file','papers','parts','edition','publicationCity','publicationDate','type','coverImage'],
//             "fuzziness": 2,
//               "operator": "or"
//           }
//     }
//   }
// }


//       // query: {
//       //     multi_match: {
//       //       query: req.params.query,
//       //       fields: ['category','title','author','publishers','publicationCountry','reviewer','comments','subject','subCategory','file','papers','parts','edition','publicationCity','publicationDate','type','coverImage']
//       //     }
//       //   }
//     }
//    // 
       
      
//     // perform the actual search passing in the index, the search query and the type
//     client.search({index:'books',body:body , type:'_doc'}).then(results => {
//       console.log(body,"aaaaaaa")
//         console.log(results)
//       res.status(201).json({
//           message:"search successfully",
//           searchedBooks:results.hits.hits
//       })
//     }) .catch(error =>{
//       console.log(error)
//         res.status(500).json({
//           message:"searching books failed*********"
//         })
//       })
  
//   })

//   router.get("/same/:value", function (req, res,next){
//     console.log(req.params.value)
//     var category = req.params.value.split('*')[0]
//     var type = req.params.value.split('*')[1]
//     // console.log(ahmed)
//     // console.log(ali)
//     // declare the query object to search elastic search and return only 200 results from the first result found. 
//     // also match any data where the name is like the query string sent in
//     let body = {
//       size: 5,
//       from: 0, 

//           "query": {
//       "bool": {
//         "must": {
//           "match": {
//             "category": {
//               "query": category,
//               "fuzziness": 2,
//               "operator": "or"
//             }
//           }
//         },
//         "filter": {
//           "terms": { "type": ['كتاب'] }
//         }
//       }
//     }








//       // query: {
//       //     multi_match: {
//       //       query: ahmed,
//       //       fields: ['category']
//       //     }
//       //   }
//     }
//     // // perform the actual search passing in the index, the search query and the type
//     client.search({index:'books',body:body , type:'_doc'}).then(results => {
//         console.log(results)
//       res.status(201).json({
//           message:"search successfully+++",
//           searchedBooks:results.hits.hits
//       })
//     }) .catch(error =>{
//         res.status(500).json({
//           message:"searching books failed"
//         })
//       })
  
//   })


//   router.get("/manuscript/:value", function (req, res,next){
//     console.log(req.params.value)
//     var category = req.params.value.split('*')[0]
//     var type = req.params.value.split('*')[1]
//     // console.log(ahmed)
//     // console.log(ali)
//     // declare the query object to search elastic search and return only 200 results from the first result found. 
//     // also match any data where the name is like the query string sent in
//     let body = {
//       size: 5,
//       from: 0, 

//           "query": {
//       "bool": {
//         "must": {
//           "match": {
//             "category": {
//               "query": category,
//               "fuzziness": 2,
//               "operator": "or"
//             }
//           }
//         },
//         "filter": {
//           "terms": { "type": ['مخطوطه'] }
//         }
//       }
//     }








//       // query: {
//       //     multi_match: {
//       //       query: ahmed,
//       //       fields: ['category']
//       //     }
//       //   }
//     }
//     // // perform the actual search passing in the index, the search query and the type
//     client.search({index:'books',body:body , type:'_doc'}).then(results => {
//         console.log(results)
//       res.status(201).json({
//           message:"search successfully+++",
//           searchedBooks:results.hits.hits
//       })
//     }) .catch(error =>{
//         res.status(500).json({
//           message:"searching books failed"
//         })
//       })
  
//   })

//   router.get("/search/:value", function (req, res,next){
//     // console.log(req.params,"aaaaaaaa")
//     // declare the query object to search elastic search and return only 200 results from the first result found. 
//     // also match any data where the name is like the query string sent in
//     let body = {
//       size: 5,
//       from: 0, 
//       query: {
//           multi_match: {
//             query: req.params.value,
//             fields: ['title','category']
//           }
//         }
//     }
//     // // perform the actual search passing in the index, the search query and the type
//     client.search({index:'books',body:body , type:'_doc'}).then(results => {
//         console.log(results)
//       res.status(201).json({
//           message:"search successfully!!!!!",
//           searchedBooks:results.hits.hits
//       })
//     }) .catch(error =>{
//         res.status(500).json({
//           message:"searching books failed"
//         })
//       })
  
//   })



//   router.get("/category/:category", function (req, res,next){
//     // console.log(req.params.category)
//     // // declare the query object to search elastic search and return only 200 results from the first result found. 
//     // // also match any data where the name is like the query string sent in
//     let body = {
//       size: 20,
//       from: 0, 
//       query: {
//           multi_match: {
//             query: req.params.category,
//             fields: ['category']
//           }
//         }
//     }
//     // // perform the actual search passing in the index, the search query and the type
//     client.search({index:'books',body:body , type:'_doc'}).then(results => {
//         // console.log(results)
//       res.status(201).json({
//           message:" category search successfully+++",
//           searchedBooks:results.hits.hits
//       })
//     }) .catch(error =>{
//         res.status(500).json({
//           message:"category searching books failed"
//         })
//       })
  
//   })

  


//     // body= {
//     // "query": {
//     // "bool": {
//     // "filter": [
//     // { "term": { "tvSeriesId": 123} },
//     // { "term": { "tvSeriesNumber": 456} }
//     // ]
//     // }
//     // }
//     // }


    
//       // "query": {
//       // "bool": {
//       // "must": [
//       // {
//       // "match": {
//       // "name": "qbox"
//       // }
//       // },
//       // {
//       // "prefix": {
//       // "nickname": "qbo"
//       // }
//       // },
//       // {
//       // "match": {
//       // "email": "me#qbox.io"
//       // }
//       // }
//       // ]
//       // }
//       // }
      

//       // {
//       //   "query": {
//       //     "bool": {
//       //       "filter": [
//       //         { "term": { "field1": "foo" } },
//       //         { "term": { "field2": "bar" } }
//       //       ]
//       //     }
//       //   }
//       // }
    


//       // body: {  
//       //   query: {
//       //     bool: {
//       //       must: [
//       //         { match: { 'action': 'government' } },
//       //         { range : {
//       //               'signature_count' : {
//       //                   'gte' : 10000
//       //               }
//       //           }
//       //         }
//       //       ]
//       //     }
//       //   }
//       // }



//       // {
//       //   "query": {
//       //      "bool": {
//       //        "must": [
//       //          {
//       //            "bool": {
//       //              "must": [
//       //                {
//       //                  "query_string": {
//       //                    "query": searchText
//       //                  }
//       //                }
//       //              ]
//       //            }
//       //          }        
//       //        ],
//       //        "filter": {
//       //            "bool": {
//       //                "must": [
//       //                    {
//       //                      "terms": {
//       //                          "loadingPort":loadingPortArray
//       //                      }
//       //                    },
//       //                    {
//       //                      "terms": {
//       //                          "unloadingPort":loadingPortArray
//       //                      }
//       //                    }
//       //                ]
//       //            }
//       //        }
//       //      }
//       //    }
//       //  }



   



//     //   body: {
//     //     query: {
//     //         bool: {
//     //             must:[
//     //                 {
//     //                     match: {
//     //                         issue_state: 'Closed'
//     //                     }
//     //                 },
//     //                 {
//     //                     match: {
//     //                         is_maintenance: 'no'
//     //                     }
//     //                 }
//     //             ]
//     //         }
//     //     },
//     //     size: 1000
//     // }
// module.exports = router;


// // {
// //   bool: {
// //     must: [
// //       {
// //         query_string: {
// //           query: '(authors.firstname:term1 OR authors.lastname:term2) AND (title:term3)'
// //         }
// //       }
// //     ],
// //     should: [
// //       {
// //         match: {
// //           body: {
// //             query: 'search phrase goes here',
// //             type: 'phrase'
// //           }
// //         }
// //       }
// //     ],
// //     must_not: [
// //       {
// //         range: {
// //           year: {
// //             gte: 2011,
// //             lte: 2013
// //           }
// //         }
// //       }
// //     ]
// //   }






// // "query": {
// //   "bool": {
// //     "must": {
// //       "match": {
// //         "title": {
// //           "query": req.params.query,
// //           "fuzziness": 2,
// //           "operator": "or"
// //         }
// //       }
// //     },
// //     "filter": {
// //       "terms": { "type": ['كتاب','مخطوطه'] }
// //     }
// //   }
// // }








