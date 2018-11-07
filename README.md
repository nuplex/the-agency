# The Agency
This is a simple application that gives the commission results of sales for agents in an agency. It is built on raw ES6
javascript with a Node.js/Express backend.

## Get Started
1. Ensure you have the latest version of Node.js and npm installed.
2. Clone this repo
3. In the root directory, do `npm run start`
4. The application is now running at `localhost:8080`!

## Testing
To run the unit tests, do `npm run test`

You will find unit tests directly testing the below scenarios in `src/Agency/Agency.test.js` under 
`it('can execute a sale and return correct commissions for XXX/XX/XX')`.

Scenarios:
- Sale 1: Policy Face Amount: $100000; Agent Hierarchy: H1; Commission Plan: A
- Sale 2: Policy Face Amount: $100000; Agent Hierarchy: H2; Commission Plan: B

To test other combinations, either add unit tests, or directly and easily test them using the frontend's custom sale input. 
You will need to add any new Agents, Plans, or Hierarchies that aren't defined already to `app/data/fakeData.js` if 
testing via the frontend.

Unit Tests are written with [Jest](https://jestjs.io/).

## Technical Details
### Overview
Aside from the use of a single `Agency`, the application does not hardcode the results of a sale anywhere in the 
application. Results are dynamically calculated using an Object-Oriented design that is black-boxed behind some buttons 
and inputs on the front, and via `executeSale()` in `Agency.js` in the back. This can easily be tested using the
custom sale input on the front.

### Backend
While I could have done everything statically, without API routes and calls, and without Node.js or Express, or really 
any sort of differentiation at all between 'front' and 'back', I wanted to demonstrate good application design and 
implement it with these. The backend is what holds the logic for calculating commission, held in the route 
`/api/getCommissionResults` which is called via a util function on the frontend. This route was created with Express and 
is hosted by the node server.

More technically, getting `node` (and `jest`) to play well with `ES6` required the inclusion of some packages to help
build the application and make it serve-able via the node server. `babel` is used to compile the ES6 into a `node` and 
`jest` friendly format, and `browserify` is used to bundle all non-route scripts for the frontend.

#### Structure
The logic of the application is held within `src`. Each 'class' is implemented in a factory pattern, as this is more
flexible than using the `class` construct introduced in ES6. Object-Oriented principles are followed: `Agency` is the 
controller of the application, it has `Agent`'s and `Hierarchy`'s and `CommissionPlan`'s. Each of these hold values 
relevant to later calculations. For example and an `Agent` has a `commissionPercent` and a `Hierarchy` has a property 
(`agentsInOrder`) communicating what order the agents are in for their... hierarchy.

### Frontend
I decided to keep the frontend simple and un-bloated since this project is much more focused on functionality. No 
framework is in use, just raw ES6 JavaScript, HTML, and CSS. I was tempted to use jQuery (or even React, Angular, etc.), 
however I felt the app was simple enough to not warrant such a large dependency. There are utility functions present in 
`public/scripts`, that generate the visual app, as well one file `apiUtils.js` to make API calls.

#### Structure
The visuals are quite simple and just display information. You press `Do Sale!` and the results are calculated and
shown below in a straightforward format. The inclusion of a custom sale is just to ensure that everything is being
calculated correctly, in an easy way that doesn't involve writing more unit tests.

### Caveats
Due to the focus on functionality and programmatic design, there is less emphasis on "fine-tuning". There is no way to
easily add Agents, Hierarchies, or Plans on the frontend, since there is no need too. The `Agency` 'class' has no remove 
functions, and technically, the add functions are closer to addOrModify. There is enough validation in the app to throw
errors, but not specific errors, and in some cases assumptions are made due to the requirements of the project (that is, 
to have it produce results for pre-defined scenarios (albeit dynamically) hence why there is no remove 
functionality).

Also, the app does not support IE at all, due to the use of `fetch` which is unsupported by the browser. Edge is
supported however.