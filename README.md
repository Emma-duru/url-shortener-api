# URL Shortener API

A URL Shortener API made with Node.js and Express.

## Home Route

Accepts JSON data containing the url that wants to be shortened.

### URL

`/`

### Method

`POST`

### URL Params

None

### Data Params

- `url`: This is required and is the url you want to be shortened.
  - It should contain:
    - protocol (`http` or `https`)
    - domain name with extension (e.g `www.google.com`)

### Sample Call

```javascript
fetch("/", {
  method: "POST",
  body: JSON.stringify({
    url: "https://www.google.com",
  }),
  headers: { "Content-Type": "application/json" },
});
```

### Success Response

- **Code:** `200`  
  **Content:**
  ```javascript
  {
    "message": "Valid URL",
    "status": "success",
    "data": {
        "url": "https://www.google.com",
        "short_url": "localhost:3000/9vEnf",
        "date_created": "Jan 30, 2021",
        "no_of_visitors": 0
    }
  }
  ```

### Error Response

- **Code:** 400  
  **Content:**
  ```javascript
  {
    "message": "Invalid URL: 'url must start with the protocol, the domain name must end with an extension' ",
    "status": "error",
    "data": null
  }
  ```

---

## Shortened URL Route

Redirects to the url that was shortened

### URL

`/:route`

### Method

`GET`

### URL Params

- `route`: This is the shortened url.

### Data Params

None

### Sample Call

```javascript
fetch("/:route")
  .then((response) => response.json())
  .catch((err) => console.log("Request Failed", err));
```

### Success Response

Redirects to the shortened url

### Error Response

- **Code:** 404
  **Content:**
  ```javascript
  {
    "message": "Route does not exist",
    "status": "error",
    "data": null
  }
  ```

---

## Packages Used

- [node.js](nodejs.org)
- [express](expressjs.com)
- [mongoose](https://mongoosejs.com/)
- [cors](https://www.npmjs.com/package/cors)
- [body-parser](https://www.npmjs.com/package/body-parser)

## How to Run

- To clone the repository to your local computer, run
  `git clone https://github.com/Emma-duru/url-shortener-api.git`
  on your terminal

- To install the necessary packages, run `npm install`

- To run the project, run `npm start`
