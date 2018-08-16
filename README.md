Simple RESTful API for book storage with persistence in local json file

**Assumptions**

1) I mostly focused on back-end project structure, front-end is implemented in pure js+jquery
2) No React
3) There is not so many details on filtering functionality in specification, so I assumed that
the filtering is a simple search by substring
4) I did not need regex for filtering in that case
5) As it comes to testing I fully covered BookController.js, UtilController.js is basically
singleton so I did not come up with any meaningful test cases
6) I know pretty well how to work with Jquery so I tried to implement as much functionality
on front-end using pure html, I though it is more interesting. In any case front-end should
be rewritten in React/Angular and preferable be isomorphic with back-end

**How to run**

You just need node.js and that is all

1) `cd` to <path_to_repo>/books-directory/books-directory
2) npm install
3) node app.js
4) Go to localhost:3000
5) Press 'Load storage from file'
6) ...
7) PROFIT

**Ways to improve application in the long term**

1) Use React/Redux
2) Make application isomorphic
3) More security
4) More validations and security tests
5) Use some library for validations
6) Use database like Redis or Mongo instead of local file
7) I don't really like MVC patter in node/express, I would rather prefer free 
style modular structure
8) express-handlebars package is pretty limited, I think it is better to use different
package or not to use template engine at all and use isomorphic React