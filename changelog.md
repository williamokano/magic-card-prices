#Version 0.0.2
- Added to the json property prices with the prices (old sets property)
- Renamed the sets property to prices property
- Updated the way the prices are returned. Now it's an object with the
card set as key and returns another object with the currencies. In this object
you can access an array of prices (usually minor, average and major price).
- Added the currencies property that holds which currencies are being fetched
USD - US Dolar
BRL - Brazilian Real
You can find a list of abbreviations [here](http://www.xe.com/iso4217.php).


Example:
```javascript
{
    status: "ok",
    data: {
        card: "Lua Sangrenta",
        sets: ["mma"],
        currencies: ["USD"],
        prices: {
            mma: {
                USD: [
                    "219.00",
                    "264.18",
                    "294.54"
                ]
            }
        }
    }
}
```
