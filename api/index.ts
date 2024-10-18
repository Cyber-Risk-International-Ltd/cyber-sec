import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`  
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Have I Been Hacked?</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          #results {
            margin-top: 20px;
          }
        </style>
        <script>
          async function checkBreaches() {
            const email = document.getElementById("email").value;
            const apiUrl =
              "https://cyber-sec-six.vercel.app/api/data?email=" + encodeURIComponent(email);
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "Checking...";
            try {
              const response = await fetch(apiUrl, { method: "GET" });
              if (response.status === 200) {
                const data = await response.json();
                resultsDiv.innerHTML = \`
                  <p>Your email has been found in \${data.length} breaches. Please take action to secure your accounts!</p>
                \`;
              } else if (response.status === 404) {
                resultsDiv.innerHTML = \`
                  <p>No breaches found for this email. Good news!</p>
                \`;
              } else {
                resultsDiv.innerHTML = \`
                  <p>Error: Unable to check the email at this time.</p>
                \`;
              }
            } catch (error) {
              resultsDiv.innerHTML = \`<p>There was an error: \${error.message}</p>\`;
            }
          }
        </script>
      </head>
      <body>
        <h1>Check if your email has been in a data breach</h1>
        <label for="email">Enter your email:</label>
        <input type="email" id="email" required />
        <button onclick="checkBreaches()">Check for Breaches</button>
        
        <div id="results"></div>
      </body>
    </html>
  `);
}
