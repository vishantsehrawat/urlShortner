# urlShortner

## Installation

### To install this project, follow these steps:

- #### Clone this repository to your local machine move to backend folder
- #### Install the required dependencies by running npm install.

#### Start the server by running `npm run server`.

## API Documentation

POST `/url/shorten`
Shortens a long URL and returns the shortened URL.

Request Body

```json
{
  "longUrl": "string"
}
```

Response

```json
{
  "shortUrl": "string"
}
```

GET `/url/:shortenedPath`
Redirects to the original url when, original url is provided
Request Body

```json
{
  "shortUrl": "string"
}
```

Response

```
redirected to the original url
```

POST `/url/customShorten`
Shortens a long URL and returns the custom shortened URL.

Request Body

```json
{
  "longUrl": "string"
}
```

Response

```json
{
  "shortUrl": "string"
}
```
# Screenshots:

![image](https://github.com/vishantsehrawat/urlShortner/assets/51756111/4e2d9cd2-7fd8-4372-bb5b-55a229618632)
![image](https://github.com/vishantsehrawat/urlShortner/assets/51756111/041a4823-33ca-46ac-a659-a1e18b0fcf86)
![image](https://github.com/vishantsehrawat/urlShortner/assets/51756111/87d33aa9-0c4b-453c-bf9b-f9baa471f22e)


