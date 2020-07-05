// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(array) {
  return array.map(element => element.director);
  // Clean array
  // .filter((item, index) => {
  //   return array.indexOf(item) === index;
  // });
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(array) {
  return array.filter(
    element =>
      element.director === 'Steven Spielberg' &&
      element.genre.some(genre => genre === 'Drama')
  ).length;
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(array) {
  if (array.length === 0) {
    return 0;
  } else {
    return (
      Math.round(
        (array
          .map(element => element.rate)
          .reduce((sum, value) => {
            return value ? sum + value : sum;
          }, 0) /
          array.length) *
          100
      ) / 100
    );
  }
}

// Iteration 4: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(array) {
  const dramaMovies = array.filter(element =>
    element.genre.some(genre => genre === 'Drama')
  );
  return ratesAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(array) {
  return array.slice().sort((a, b) => {
    if (a.year === b.year) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
    }
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(array) {
  const sortedTitles = array.slice().sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  const arrayOfTitles = sortedTitles.map(element => element.title);
  const limitedTo20 = arrayOfTitles.slice(0, 20);
  return limitedTo20;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(array) {
  return array.map(element => {
    let newElement = { ...element };
    const timeArray = newElement.duration.split(' ');
    if (timeArray.length > 1) {
      const timesAndMinutes = timeArray.map(element => {
        return parseInt(element.replace(/[^0-9]/g, ''));
      });
      const hour = timesAndMinutes[0];
      const minutes = timesAndMinutes[1];
      newElement.duration = hour * 60 + minutes;
    } else {
      const time = timeArray[0];
      if (time.includes('h')) {
        const hour = parseInt(time.replace(/[^0-9]/g, ''));
        newElement.duration = hour * 60;
      } else if (time.includes('min')) {
        const minutes = parseInt(time.replace(/[^0-9]/g, ''));
        newElement.duration = minutes;
      }
    }
    return newElement;
  });
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

function bestYearAvg(array) {
  if (array.length === 0) {
    return null;
  }
  const yearsArray = [];
  array.forEach(movie => {
    if (!yearsArray.some(e => e.year === movie.year)) {
      const yearObject = {
        year: movie.year,
        ratings: [movie.rate]
      };
      yearsArray.push(yearObject);
    } else {
      const yearObject = yearsArray.find(yearObj => {
        return yearObj.year === movie.year;
      });
      yearObject.ratings.push(movie.rate);
    }
  });
  yearsArray.forEach(year => {
    const yearAverage =
      Math.round(
        (year.ratings.reduce((average, rating) => {
          return average + rating;
        }, 0) /
          year.ratings.length) *
          100
      ) / 100;
    year.average = yearAverage;
  });
  const bestYear = yearsArray.reduce((prev, current) => {
    return prev.average > current.average ? prev : current;
  });
  return `The best year was ${bestYear.year} with an average rate of ${bestYear.average}`;

  // Have not checked solution: note to self to try a different method without forEach
}
