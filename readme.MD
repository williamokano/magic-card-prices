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

```:card_name``` should be urlencoded (and spaced replaced by a + sign instead of %20)
```
Blood+Moon
```

E.g. ~~(This link doesn't really exists, just for explanation :) )~~
```
http://159.203.88.225:3000/ligamagic/card/Blood+Moon
```

The output will be something like that:
```
{
    status: "ok",
    data: {
        card: "Lua Sangrenta",
        currencies: [
            "USD"
        ],
        sets: [
            "mma",
            "9e",
            "8e",
            "ch",
            "dk"
        ],
        prices: {
            mma: {
                USD: [
                    "219.00",
                    "264.18",
                    "294.54"
                ]
            },
            9e: {
                USD: [
                    "187.90",
                    "256.10",
                    "269.99"
                ]
            },
            8e: {
                USD: [
                    "269.99",
                    "274.62",
                    "316.26"
                ]
            },
            ch: {
                USD: [
                    "189.90",
                    "209.47",
                    "304.66"
                ]
            },
            dk: {
                USD: [
                    "185.90",
                    "186.90",
                    "187.90"
                ]
            }
        },
        url: "http://ligamagic.com.br/?view=cards%2Fsearch&card=Blood+Moon"
    }
}
```

~~Notice that the price still not being fetched.... yet!~~

## How to run
To run this project is pretty simple:
- npm install
- node index.js
