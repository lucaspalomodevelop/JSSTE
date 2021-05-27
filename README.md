
# JSTE

JSTE is a NodeJS-Module for rendering data in static HTML


## Example Page (JSON)

```json
{
    "_STYLES_":["Example1","Example2"],
    "_TEMPLATE_":"firstexample",
    "TITLE": "app2",
    "LINK":"http://www.example.de"
}
```

## Example Template (HTML)

```html 
    <!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><[TITLE]></title>
</head>

<body>
    <div id="app">
        <a id="googlelink" href="<[LINK]>"><[LINK]></a>
    </div>
</body>

</html>
```

## Result (HTML)

``` html

   <!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>app2</title>

    <link href="Example1.css" rel="stylesheet"></link>
    <link href="Example2.css" rel="stylesheet"></link>
</head>

<body>
    <div id="app">
        <a id="googlelink" href="http://www.example.de">http://www.example.de</a>
    </div>
</body>

</html>

```

## special constants:
-   ```_TEMPLATE_``` -> Defines the path to the temp file 
-   ```_STYLES_```   -> Defines a list of CSS files that will be implemented