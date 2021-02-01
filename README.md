# Biden Works...

... Trump golfs.

This is a simple and poorly written Twitter bot that tweets a shoddily estimated
reminder of how much money Trump spent going on golf trips.

## Methodology

All of the data used here is from trumpgolfcount.com, which was created by
Sophie Germain. The per-trip costs tweeted are a simple division of the total
estimated taxpayer cost of all of Trump's golf trips across the total trips as
counted by trumpgolfcount.com.

There are clear shortcomings to this approach, including:

* The total estimated cost of Trump's golf trips bears scrutiny. In the end,
  it's impossible to know the actual value because too much of the President's
  activities and costs within the administration are hidden. I used the estimate
  from trumpgolftrips.com, which seems reasonably defended by the evidence we
  have.
  
* Each trip is not an equal cost. Trips to Florida, or abroad, are much more
  expensive than trips to New Jersey. To achieve the illustrative purposes of
  this bot, making that distinction would add too much complexity. Over four
  years, the accumulated estimate will reach Trump's total and that's what
  matters.
  
* Trump didn't always golf, and sometimes spent days at golf courses. As
  described on trumpgolftrips.com, we count every day that Trump spent at least
  half a day at a golf course as a golf trip. He may not have golfed. He may
  have been there from the day before. He may have "done work." We still tack on
  another big bill. I believe that for the most part, it averages out.
  
## Usage

Place a `config.js` in the root of the application:

```.javascript
module.exports = {
  consumer_key: '<your consumer/API key>',
  consumer_secret: '<your consumer/API key secret>',
  access_token: '<your access token>',
  access_token_secret: '<your access token secret>',
  timeout_ms: 60*1000,
  strictSSL: true
}
```

Then you can run the bot script with Node:

```.javascript
$ node index.js
```

Run this script no more than once a day. If the current date was a day on which
Trump golfed four years ago, it will tweet the running total.

## License, warranty

This script is under no warranty whatsoever, and is probably some of the worst
code ever written. There is no expressed or implied fitness for any purpose, and
to run it is to literally take your life in your hands. The author of this
script takes no responsibility for anything that happens as a result of using
this script, or even knowing that it exists. Delete your browser history.

This script is released under the WTFPL Version 2.

```
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004
 
Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.
 
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
```
