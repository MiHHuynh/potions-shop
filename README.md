## Potions Shop

This application is a Magic Potions purchasing order form.

**Technologies used:**
- React v16.13.1 in the front end
- Flask v1.1.2 in the backend

The front end of this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup to Run Locally

**System requirements:**
- Node v14+ (and related CLI helpers like `npm`, `nvm`)
- Python 3.8.6+ (and related CLI helpers like `pip`, `pip3`)

```
git clone git@github.com:MiHHuynh/potions-shop.git
cd potions-shop
npm i
```

#### Running the client-side:

Before running the client-side, please make sure you are using Node v14+. If not, you can download and set it for use as such:

```
nvm install 14.5
nvm use 14.5
```

Then, in the top-level directory, running

`yarn start`

will start the client-side of the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Running the server:

Before running the server, please make sure you have and are using Python v3+. Download and installation of Python 3 can be found [here](https://www.python.org/downloads/).

In another terminal tab, to start up the server:

(Starting from the top-level directory, potions-shop/)

`cd api`

```
pip install -r requirements.txt // If your system is already running Python 3+.

- OR -

pip3 install -r requirements.txt // If your system is still using Python 2+.
```

And finally,

`flask run`

The server will now be running on [http://localhost:5000](http://localhost:5000) and is ready to receive requests from the client.

## Details

#### Describe your data schema and how it relates to the purchasing of magic potions.
At the moment, given that there are no user profiles/authentication and there is only one possible product to purchase with no need for storing the type of product, the schema for this form is a single table called `Order`. As such, all Orders are self-containing, including information on the user who purchased, the address to ship/bill to, the credit card information, quantity, order date, and whether or not it is fulfilled.

#### Describe how this could scale over time.

In a future iteration,

`Orders`

would only contain information about the order itself: what was purchased, who purchased & who to ship to (association to a `User`), what to bill to (association to a `PaymentMethod`), order date, fulfillment date.

The rest could be separated into multiple tables:

`User`

This table would have columns pertaining to user information, such as Name, Email, Phone Number. This User table could be used for both profile-related functionality and for associating with orders. Decoupling user information from order information allows better user profile management along with easier data querying (e.g. how many addresses does a user have, how many orders they have placed even if they're shipping to someone else, how many payment methods do they have, etc.).

`Address`

This table would contain addresses. Addresses could be stored in separate columns for street number, street, zip code, city etc. or as a single field for street number and street name (given that input is normalized via relying on an address lookup) plus street, zip code, city, state, country. It is useful to define what columns are needed depending on whether or not addresses will be international (as opposed to US-based). `Users` will have a join table with `Addresses`.

`PaymentMethod`

A separate table meant for payment methods would be useful for saving to a user's profile along with giving them multiple ways to pay. Credit card information should be obfuscated for security.

`MagicPotion`

If there are plans to expand the types of potion offerings, it makes sense to have a separate table just for potions. Columns for this table could include potion type, color, and price. However, if the shop intends to sell things other than potions, there could be a need for a table called:

`Product`
A Product can contain a SKU number, a price, and a type, which is association to a MagicPotion row (or a MagicSword, AncientScroll, for example). In this case, the type tables (e.g. MagicPotion) would not contain pricing information because that is related to the product and not the item's inherent traits.

`Discounts`

Expanding on the e-commerce theme, there may also be discounts in the future for different products. There can be an association between a Product and how much percentage discount it currently has.

#### Describe your front end architecture and why you chose to create it as you did. Include details about form validation, error handling etc.

#### Validation

I chose to do a simple validation method for each individual field. Instant validation per field is generally considered for optimal UX as it is the least frustrating and most instantly and visually helpful to the user. This gives a quicker feedback loop to users, which prevents abandoning a form and improving click-through rate.

Each input has its own `onChange` and `onBlur` handlers that call a validator. Validation rules are extracted into a `validators` file, and those functions all rely on simple regex matching. I structured it this way thinking it makese sense to have validation be _coupled_ with inputs but not _belonging_ to inputs. This also allows for better reusability on other fields that may need similar validation.

There is a function to check whether or not every field has been touched (by comparing current values to initial values) before setting the section as "ready to submit."

A better option in the future is to use the React-recommended validation library, [Formik](https://formik.org/) which provides handlers that do the same functionality and schema validation using [Yup](https://formik.org/docs/tutorial#schema-validation-with-yup).

#### Error Handling
Errors received from the server are rendered as a message below the form. In an ideal world, there would be a reusable `<Error />` component that would handle server error responses and render a proper user-friendly message.

#### Form Architecture

A form is composed of sections, and not all sections make sense to be put together; for example, the goods being purchased and the user address and payment method do not "belong" together. Thus, it makes sense to break up a form into semantic sections.

Validation and user tracking (if any) most likely will be completely different for those sections. In the future when there are more products and user profiles, each section might do its own fetching for saved products, previous cart, user profile billing info, etc. and it makes sense to split it up according to related fields.

Also, in the future, the `BillingInformation` section may be reused in a User's profile settings, and the `OrderGoods` section may be reused as part of the cart page.

Thus, the form is structured like so:

* OrderForm
    * OrderGoods
    * BillingInformation
    * SubmitOrderButton
    * Response Error/Message

##### Decisions

Should the form host and handle all the validation or should each section handle individual field validation?

At first, it felt logical to keep all the validation in one area where everything is viewable in the OrderForm. Then, all the children sections can be made "dumb," only calling what has been passed down to them as props. This makes it easier to do a final round of validation on the entire form upon submit, as the OrderForm already has access to those functions.

However, does it make sense for the form to be handling and storing functions for things that are much lower, down in the granular level, such as email? If the form needs to be extended somehow, such as adding more fields, does that mean the OrderForm component will grow bigger over time? What if we have other types of forms and want to reuse some of the validation methods?

Thus, this option does not seem very reusable nor future proof.

Another option is to extract all validation methods into some kind of utils/validators file because the validation methods don't necessarily _belong_ to the form. They are universal methods that can be used on any kind of field, and this particular form is picking and choosing which validation methods it needs for its fields. Going this route, it makes sense to write custom hooks (e.g. useFormValidators) that will provide the component with handlers. I believe using Formik will give a similar separation of concerns, allowing you to pick and choose where you need the validation.

**Other considered options for component architecture:**

Have a component variable:

```
const fields = [
  {name, id, value, type, errorMessage, label, isValid(),},
  {},
  {},
  ...
];
```
The OrderForm would map through these fields and render them as a list of elements. A custom `<Input />` component that can be passed values from the fields array in a map would also be useful in this case This definitely makes every field self-contained, with decent reusability.

However, if you want to do special CSS effects on certain fields, integrate billing with stripe, or maybe fetch for data on the email field, this isn't the best because it requires that fields are mostly uniform. You can probably extend the `<Input />` component to handle every possible extra extension to accommodate for that use case.

However, what if some sections or fields are meant to be skipped or condiitonally rendered? Like if you're autofilling information in the future when there are profiles, how do you initialize each field with information you already have? Do we always know off the top what fields are to be included in the form in order to create that `fields` array? If we want to recalculate the fields after render, how would that work?

How would this structure work with accessibility and focusing or data tracking? These are all considerations that led me to move away from this option.

Another option is to have everything in a flat structure in OrderForm, which OrderForm containing and handling everything.

#### Describe the API architecture.

There are few endpoints that are defined in this API.

`POST to /api/magic` + payload

The takes a payload of Order information, which includes user information, the potion quantity, total price, order date, and whether or not the order has been fulfilled. With current specifications of this endpoint, it is assumed that the client e-shop processes orders in a "guest checkout" sort of fashion.

The server makes a check to see if the user's potion orders for the month are within the limit (maximum 3). There is an assumption that users can purchase up to 3 potions (either in 1 order or more) within a calendar month.

There currently isn't a way to create user profiles and to authenticate prior to checkout. As such, the current data model is to grab all the data from the POST body to create a single Order entry in the database. As this grows, I would break those up as specified above in the schema section.

`GET from /api/magic/<uid>`

Upon request, the server will query for the Order by `uid`. If there is no entry, this will 404. If there is, it will return the object in this shape:

```
{
  'firstName': ...
  'lastName': ...
  'email': ...
  'address': {
    'street1': ...
    'street2': ...
    'city': ...
    'state': ...
    'zip': ...
  }
  'phone': ...
  'payment': {
    'ccNum': ...
    'exp': ...
  }
  'quantity': ...
  'total': ...
  'orderDate': ...
  'fulfilled': ...
}
```


`PATCH to /api/magic/<uid>` + payload

Upon request, the server will search for the order by uid and PATCH the change as indicated by the payload.

NOTE: The specfications stated that the PATCH should be implemented for the `/api/magic` route and the payload would contain the `uid` and `fulfilled` fields. I opted to put the PATCH request on this route instead because as I understand it, making a patch to a route with no `uid` path implies that it will be a batch PATCH request, and the payload should include a list of operations or filters to specify which entries to apply it to. If we are making a request to a single entry, it makes sense to have this route (`/api/magic/<uid>`) handle it.

`DELETE from /api/magic/<uid>`

Upon request, the server will search for the order by uid and delete it or error out if the entry was not found.

To make this better, I would redesign the routes to be more descriptive. At the moment, seeing an endpoint of `api/magic` tells me nothing. Am I generating some kind of magic spell? When I GET `magic`, what exactly does that mean? It is hard to deduce without reading the documentation.

##### Proposals:

`GET /api/order`

Returns list of ALL orders, with pagination or an optional query argument to cap off at a number of entries, such as `/api/order?limit=100`

`GET /api/order/<uid>`

Retrieves order of `id=<uid>` or 404

`POST /api/order` + payload

Creates a new order using data from the payload.

`PATCH /api/order/<uid> + payload`

Updates an existing order using data from payload.

`DELETE /api/order/<uid>`

Deletes an existing order of `id=<uid>`

Optionally, to specify these particular routes are part of the "magic" domain, the urls can be structured like `/api/magic/order`.

I would imagine routes specified as `/api/magic/potion` would be to perform CRUD operations on Potions (in the imagined future of having more than one Potion as a purchaseable product).

In an even further extended future, there may be routes such as `/api/magic/sword` or `/api/magic/scroll`, to perfume CRUD operations on those types of resources. All of those could be purchased in an `Order`.

#### With more time or in a different environment, what would you do differently? What would you do to improve or scale the application?

Aside from other points I've already described above, given more time, I would write tests. My testing plan would be as follows:

##### Testing Plan

* Add unit testing for API endpoints
    * `test_valid_post_request`
    * `test_invalid_post_request_no_payload`
    * `test_invalid_post_request_incomplete_payload`
    * `test_invalid_post_invalid_fields`
    * `test_over_limit_order`
    * `test_get_order_success`
    * `test_get_order_failure`
    * `test_delete_order_success`
    * `test_delete_order_not_found`
    * `test_patch_order_success`
    * `test_patch_order_not_found`
- Add testing for validation
    * `testValidTest`
    * `testValidEmail`
    * `testValidPhoneNumber`
    * etc.
- Snapshot testing for user interaction
    * Making sure that the fields are highlighted red when invalid
    * Making sure submit button becomes clickable when all are valid
    * Making sure submit button is not clickable when form is still invalid
    * Making sure error/success message renders upon receipt of response from server

Then, there are some other things that I would consider and expand on:

##### User-facing
- Autoformatting the credit card number to have spaces in between each 4 number chunk
- Autoformatting the credit card expiration date to `mm / yy`
- Integrate payment section with Stripe or other payments handler
- Edit address section to pull from an address lookup to normalize input data

##### Front-End Code
- Refactor inputs into specialized and reusable `<Input />` components which can take props such as value, type, name, placeholder, onChange, onBlur, errorMessages, validators, etc.
- Look into using Formik + Yup for form validation.
- Look into whether using Redux or React's useReducer hook could be useful in handling the state of all the different fields.
- Create an `<Error />` component that would render a more user-friendly error message and/or page for errors that come in from the server.
- Implmenet throttling on the form to prevent multiple/duplicate/spam orders.

##### Back-End Code
- Given restrictions such as X number of orders per month for user, there needs to be a faster way to check whether or not a user can create an order. Once it is determined that a user has made the maximum number of orders for the month, that should be cached on the client-side to prevent further orders until the time frame is up.
- Security measures to prevent CSRF issues

##### Open Questions
- Explore React front end + separated API microservice vs. monolithic client + API in which the backend serves a nearly empty template containing some metadata + JS scripts. What are the SEO implications of each?