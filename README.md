
# JSTE

JSTE is a NodeJS-Module for rendering data in static HTML


## Example Page (JSON)

```json
{
    "_TEMPLATE_":"firstexample",
    "TITLE": "app2",
    "LINK":"http://www.google.de"
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
        <a id="googlelink"><[LINK]></a>
    </div>
    <[[ARRAY]]>
</body>

</html>
```