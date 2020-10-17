## Prerequisites

- Node v12.16.1

## Enviroment variables

- PORT , an integer determining the port on which the service will run

```
PORT=4000
```

- MAX_LENGTH_SHORT_URL, an integer to set the length of the path of the short url

```
MAX_LENGTH_SHORT_URL=6
```

- SHORT_URL_DOMAIN, the domain and protocol from where the url will be generated

```
SHORT_URL_DOMAIN=http://fake.url
```

## How to run

- Create an .env file in root directory
- Set values in .env file for

```
PORT=<integer>
MAX_LENGTH_SHORT_URL=<integer>
SHORT_URL_DOMAIN=<string>
```

- Clone the repository in your desired directory
- From your cli change into the repo directory
- Run command npm install in the root directory
- Run command npm test , to check everything is running properly, 11 test total have to pass.
- Run npm start to run your local enviroment, you should see something like this in your cli

```
Server running on port 3000
```

## Endpoints

All endpoints require the header

```
Content-Type: application/json
```

### GET - /api/v1/short_urls

- Redirects to the long version of the matching short url
- For this endpoint the query param url has to be provided in order to get the long version of an url

#### Request/reponse examples

Request

```
http://localhost:4000/api/v1/short_urls?url=http://fake.url/U8m7X6
```

Response
Status: 301, redirect to the long version of the short url

---

Request

```
http://localhost:4000/api/v1/short_urls?url=http://fake
```

Response

Status: 422
Body:

```
{error: "ValidationError"}
```

---

Request

```
http://localhost:4000/api/v1/short_urls?url=http://fake.url/U8m7X9
```

Response
Status: 404
Body :

```
{shortUrl: null}
```

---

### POST - /api/v1/short_urls

- Creates a single URL shortening by providing an url within the body

Request

```
http://localhost:4000/api/v1/short_urls


Body:


{"url": "https://facebook.com"}
```

Response
Status: 201
Body:

```
{"shortUrl": "http://fake.url/a1v1f5"}
```

---

Request

```
http://localhost:4000/api/v1/short_urls

Body: {"url": "https://facebook"}
```

Response
Status: 422
Body:

```
 {"error": "ValidationError"}
```

---

### POST - /api/v1/short_urls/bulk

- Creates short urls by providing an array of urls

Request

```
http://localhost:4000/api/v1/short_urls

Body: {"urls": ["https://facebook.com", "https://facebookla.com"]}
```

Response
Status: 201
Body:

```
[
    {
        "shortUrl": "http://fake.url/k4Y3s1",
        "url": "https://facebook.com"
    },
    {
        "shortUrl": "http://fake.url/Y3N5I0",
        "url": "https://facebookla.com"
    }
]
```

Request

```
http://localhost:4000/api/v1/short_urls

Body: {"urls": ["https://facebook", "https://facebookla.com"]}
```

Response
Status: 422
Body:

```
{
    "error": "ValidationError"
}
```
