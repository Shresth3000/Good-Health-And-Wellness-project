
    const apiKey = 'AIzaSyDscn9OoRVqAAiTwnO16CshOwKHi-9JO8I'; 
    async function callGeminiAPI(prompt) {
      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

      const body = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      // Extract generated text from the response structure
      return data.candidates && data.candidates[0].content.parts[0].text;
    }

    document.getElementById('generateBtn').addEventListener('click', async () => {
      const prompt = document.getElementById('input').value;
      const outputDiv = document.getElementById('output');
      outputDiv.textContent = 'Loading...';

      try {
        const result = await callGeminiAPI(prompt);
        outputDiv.textContent = result;
      } catch (error) {
        outputDiv.textContent = `Failed to generate content: ${error.message}`;
      }
    });
