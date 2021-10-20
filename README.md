# JSSTE

![npm](https://img.shields.io/npm/v/jsste)
![NPM](https://img.shields.io/npm/l/jsste)
[![Downloads](https://img.shields.io/npm/dm/jsste)](https://www.npmjs.com/package/jsste)

[![NPM](https://nodei.co/npm/jsste.png)](https://www.npmjs.com/package/jsste)

## Desciption

JSSTE is a NodeJS-Module for rendering data in static HTML

## Usage

### Installation

You can jsste install using [npm](https://www.npmjs.com/package/jsste) or [yarn](https://yarnpkg.com/package/jsste).

```sh
npm install jsste
```

```sh
yarn add jsste
```

#### including in your project

```javascript
const jsste = require("jsste");
```

### Rendering

```javascript
jsste.render(pagecode, tempaltecode);
```

#### Example


```javascript
const templatecode = `
<html>
  <head>
    <title>JSSTE Example</title>
  </head>
  <body>
    <h1><[VARNAME1]></h1>
    <p><[VARNAME2]></p>
  </body>
</html>
`;

const pagecode = {"VARNAME1":"Hello World", "VARNAME2":"This is a test"};

let result = Jsste.render(pagecode, templatecode);

// result
// <html>
//   <head>
//     <title>JSSTE Example</title>
//   </head>
//   <body>
//     <h1>Hello World</h1>
//     <p>This is a test</p>
//   </body>
// </html>

```

### Special Variables

- `_TEMPLATE_` -> Defines the path to the temp file
- `_STYLES_` -> Defines a list of CSS files that will be implemented


#### Example


```javascript
const templatecode = `
<html>
  <head>
    <title>JSSTE Example</title>
  </head>
  <body>
    <h1><[VARNAME1]></h1>
    <p><[VARNAME2]></p>
  </body>
</html>
`;

const pagecode = {"_STYLES_":["./main","./othercss"] "VARNAME1":"Hello World", "VARNAME2":"This is a test"};

let result = Jsste.render(pagecode, templatecode);

// result
// <html>
//   <head>
//     <title>JSSTE Example</title>
//     <link rel="stylesheet" href="./main.css">
//     <link rel="stylesheet" href="./othercss.css">
//   </head>
//   <body>
//     <h1>Hello World</h1>
//     <p>This is a test</p>
//   </body>
// </html>


```
