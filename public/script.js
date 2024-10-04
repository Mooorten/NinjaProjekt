document.getElementById('postForm').addEventListener('submit', async function(event) { // Ændret id til 'postForm'
    event.preventDefault(); // Forhindrer formularen i at reloade siden

    const content = document.getElementById('content').value; // Hent tekstindholdet

    try {
        const response = await fetch('/write-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }), // Send indholdet som JSON
        });

        const responseData = await response.text();
        document.getElementById('response').textContent = responseData; // Vis serverens svar
    } catch (error) {
        console.error('Fejl ved afsendelse:', error);
        document.getElementById('response').textContent = 'Noget gik galt!';
    }
});
