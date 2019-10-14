const api_key = 'ovFpGxvJSObmaTCgyOyZNjER97O6AWrIdxzOW5tY';


function getPark(area,max_shown) {
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${area}&limit=${max_shown}&api_key=${api_key}`;
  fetch(url)
  .then(response => response.json())
  .then(responseJson => displayResult(responseJson,max_shown))
  .catch(error => alert(error.message));
}

function displayResult(responseJson,max_shown) {
  let max_availbale = responseJson.total;
  // 这里的responseJson.total是个string，下面得用parseInt()
  if (parseInt(max_availbale) < max_shown) {
    max_shown = max_availbale;
  }
  for (let i=0; i<max_shown; i++) {
    $('.result ul').append(
      `
      <li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>
      `
    )
  }
  $('.result').removeClass('hidden');
}

function watchForm() {
  $('form').submit('button',function(event) {
    event.preventDefault();
    $('.loading').removeClass('hidden');
    let area = $('#search-area').val();
    let max_shown = $('#search-num').val();
    // 这两个variable必须写在这里，不能写在submit上面
    $('.result ul').empty();
    getPark(area,max_shown);
  })
}

$(watchForm);
