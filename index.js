console.log('Biden is going to work...');

var Twit = require('twit');
var Twitter = new Twit(require('./config.js'));
var GolfSource = require('./data/golf.json');
var NumberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function getToday() {
  let today = new Date();
  today.setHours(0,0,0,0);

  return today;
}

function ordinalOf(i) {
  let j = i % 10,
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
  let out = [];
  for (const golfDate of golfDates) {
    let newDate = new Date(golfDate[0]);
    newDate.setFullYear(newDate.getFullYear() + 4);
    out.push({ date: newDate,
               location: golfDate[5] });
  }

  return out;
}

function dateDiffInDays(date1, date2) {
  return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
}

function countDates(golfDates, today) {
  var totalTrips = 0;
  var totalCost = 0;
  var todayTripP = false;
  var todayTrip = {};
  var daysSinceLastTrip = 0;
  var prevDate = 0;

  for (const golfDate of golfDates) {
    if (today > golfDate['date']) {
      totalTrips++;
    }

    if (wholeDatesEqual(today, golfDate['date'])) {
      totalTrips++; // Today is never included above.
      todayTrip = golfDate;
      todayTripP = true;
      daysSinceLastTrip = dateDiffInDays(prevDate['date'], golfDate['date']);
    }

    prevDate = golfDate;
  }

  return { total: totalTrips,
           cost: totalTrips * 483221.47651,
           today: todayTripP,
           daysSinceLastTrip,
           location: todayTrip['location'] }
}

var result = countDates(translateGolfDates(GolfSource), getToday());

if (result.today) {
  var cost = NumberFormatter.format(result.cost);

  var tweet = 'So far, I\'ve saved Americans ' + cost +
      ' by working instead of golfing.\n\n' +
      'Today was Trump\'s ' + ordinalOf(result.total) + ' golf trip, to ' +
      result.location + '.\n\n' +
      'It has been ' + result.daysSinceLastTrip + (result.daysSinceLastTrip > 1 ? ' days' : ' day') +
      ' since his last stay at a golf club.';

  console.log(tweet);
  Twitter.post('statuses/update',
               { status: tweet },
               function(err, data, response) {
                 console.log(data);
                 console.log(err);
               });
}
