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
http://45.55.213.219:8080/ligamagic/card/Blood+Moon
```

The output will be something like that:
```
{
  status: "ok",
  data: {
    card: "Lua Sangrenta",
    set: {
      mma: [
        "199.99",
        "239.93",
        "300.55"
      ],
      9e: [
        "172.50",
        "227.78",
        "344.23"
      ],
      8e: [
        "172.50",
        "215.71",
        "281.78"
      ],
      ch: [
        "189.90",
        "211.77",
        "337.11"
      ],
      dk: [
        "183.90",
        "184.90",
        "185.90"
      ]
    },
    url: "http://ligamagic.com.br/?view=cards%2Fsearch&card=Blood+Moon"
  }
}
```

Notice that the price still not being fetched.... yet!

## How to run
To run this project is pretty simple:
- npm install
- node index.js
