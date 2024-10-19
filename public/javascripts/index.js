async function checkBreaches() {
  const email = document.getElementById('email').value;
  const apiUrl =
    '/api/data?email=' +
    encodeURIComponent(email);
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Checking...';
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
    });
    if (response.status === 200) {
      const data = await response.json();
      resultsDiv.innerHTML = ` <p>Your email has
    been found in ${data.length} breaches.
    Please take action to secure your
    accounts!</p> `;
    } else if (response.status === 404) {
      resultsDiv.innerHTML = ` <p>No
    breaches found for this email. Good
    news!</p> `;
    } else {
      resultsDiv.innerHTML = ` <p>Error: Unable to check the email at
    this time.</p> `;
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p>There was an
    error: ${error.message}</p>`;
  }
}
