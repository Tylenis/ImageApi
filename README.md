# Image Processing API

This API allows to place images into frontend with the size and image format (jpg, png, webp) set via URL parameters. The second use case is as a library to serve properly scaled versions of images to the front end to reduce page load size.

## Installation

Use Node package manager [npm](https://nodejs.org/en/) to install Image Processing API.

```
npm install
```

## Usage

### Transpile and run

To transpile code from Typescript to JavaScript run:

```
npm run build
```

It will create "build" folder. To start server run:

```
node ./build/index.js
```

Or you can simply run:

```
npm run buildrun
```
It will transpile code and start server.

### Endpoints

Server works on localhost and listens on port 3000. Get unmodified image from "images" folder by typing "/api/images?filename={imagename}" in a browser:

Example:
```
http://localhost:3000/api/images?filename=fjord
```
Get resized image by typing url with additional "height" and "width" query parameters. Both "height" and "width" paramameters are required to resize image.
Server will respond with  an error message if one of them is missing or isn't a valid number;
 
```
http://localhost:3000/api/images?filename={imagename}&height={number}&width={number}
```
Example:
```
http://localhost:3000/api/images?filename=fjord&height=600&width=800
```

Get image converted to a different file format with "format" parameter. API converts from jpg to png, webp file formats.

Example:
```
http://localhost:3000/api/images?filename=fjord&format=png
```
Get resized and converted image with "height", "width" and "format" parameters.

Example:
```
http://localhost:3000/api/images?filename=fjord&height=600&width=800&format=png
```


## Development tools

### Code formatting and linting

This project uses Prettier and Eslint for code formatting and linting.
Run Prettier with:
```
npm run prettier
```
Run Eslint with:

```
npm run eslint
```

### Tests

Run tests with:
```
npm run test
```

### Nodemon
You can run server with nodemon. It automatically restarts server when any changes  are detected.
Run server with nodemon:
```
npm run start
```