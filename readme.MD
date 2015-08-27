# Magic the gathering pricer
## Description
Simple API that can look for MTG card prices through some websites.

Some sites are scrapped, others are fetched by their API.

Suggestions, fixes, issues or feature requests, feel free to fork and make a pull request or create an issue on this repository issue tracker.

## API documentation
Still in development

You can check for a card as
```
ENDPOINT/:from_where/card/:card_name
```

```:from_where``` can be
```
ligamagic
```
In the future I pretend to add some new websites.

```:card_name``` should be urlencoded (and spaced replaced by a + sign)
```
Blood+Moon
```

E.g. (This link doesn't really exists, just for explanation :) )
```
http://10.11.232.33/ligamagic/card/Blood+Moon
```

The output will be something like that:
```
{
  status: "ok",
  data: {
      card: "Lua Sangrenta",
      set: {
        mma: [ ],
        9e: [ ],
        8e: [ ],
        ch: [ ],
        dk: [ ]
      }
    }
}
```

Notice that the price still not being fetched.... yet!

## How to run
To run this project is pretty simple:
- npm install
- node index.js
