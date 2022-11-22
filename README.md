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

const pagecode = { VARNAME1: "Hello World", VARNAME2: "This is a test" };

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

### Include States

You can include an Callbackfunction that will be called when the state is change

```javascript
jsste.setStateFunction(({ status, statusMSG }) => {
  yourstatus = status;
  yourstatusMSG = statusMSG;
});
```

### States-Codes

| Code | Meaning |
| :--- | :-----: |
| 0    |   OK    |
| 1    |  ERROR  |
| 2    | WARNING |
| 3    |  INFO   |
| 4    |  DEBUG  |

## Commandline

## Installation

```sh
npm install jsste -g
```

or

```sh
yarn install jsste -g
```

## excuting

```sh
jsste <argument>
```

| arguemnt   |               description                | Example |
| :--------- | :--------------------------------------: | :-----: |
| -log       |              show jsste log              |         |
| -Jsconfig= |         set jsste config as json         |         |
| -pageFile= |            set pageFile path             |         |
| -page=     |           set pageFile as json           |         |
| -tempFile= |            set tempFile path             |         |
| -temp=     |           set pageFile as code           |         |
| -info      |             show jsste.info              |         |
| -out       | write rendered code into the commandling |         |

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

#### Examples on [https://github.com/lucaspalomodevelop/JSSTE-Examples](https://github.com/lucaspalomodevelop/JSSTE-Examples)
