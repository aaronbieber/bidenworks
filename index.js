var Twit = require('twit');
var Twitter = new Twit(require('./config.js'));
var GolfSource = require('./data/golf.json');
var NumberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function getToday() {
  var today = new Date();
  today.setUTCHours(0,0,0,0);

  return today;
}

function ordinalOf(i) {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

function wholeDatesEqual(date1, date2) {
  return (date1.getFullYear() == date2.getFullYear() &&
          date1.getMonth() == date2.getMonth() &&
          date1.getDate() == date2.getDate());
}

function translateGolfDates(golfDates) {
  var out = [];
  for (var i=0; i<golfDates.length; i++) {
    var origgolfDatesalDate = new Date(golfDates[i][0]);
    var newDate = origgolfDatesalDate;
    origgolfDatesalDate.setFullYear(newDate.getFullYear() + 4);
    out[i] = { date: new Date(newDate),
               location: golfDates[i][5] }
  }

  return out;
}

function countDates(golfDates, today) {
  var totalTrips = 0;
  var totalCost = 0;
  var todayTripP = false;
  var todayTrip = {};

  for (var i=0; i<golfDates.length; i++) {
    var golfDate = golfDates[i];
    if (today > golfDate['date']) {
      totalTrips++;
    }

    if (wholeDatesEqual(today, golfDate['date'])) {
      totalTrips++; // Today is never included above.
      todayTrip = golfDate;
      todayTripP = true;
    }
  }

  return { total: totalTrips,
           cost: totalTrips * 483221.47651,
           today: !!Object.keys(todayTrip).length,
           location: todayTrip['location'] }
}

var today = new Date();
today.setHours(0,0,0,0);

var result = countDates(translateGolfDates(GolfSource), today);

if (result.today) {
  var cost = NumberFormatter.format(result.cost);

  var tweet = 'So far, I\'ve saved Americans ' + cost +
      ' by working instead of golfing.\n\n' +
      'Today was Trump\'s ' + ordinalOf(result.total) + ' golf trip, to ' +
      result.location + '.';

  console.log(tweet);
  Twitter.post('statuses/update',
               { status: tweet },
               function(err, data, response) {
                 console.log(data);
                 console.log(err);
               });
}
