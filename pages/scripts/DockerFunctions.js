const { json, response } = require("express");

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault()

    const containerName = document.getElementById('containerName').value;
    try {
        const res = await fetch('/stop-container', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                json.stringify({ containerName })
        });
        if (response.ok) {
            console.log('Successfully stopped container');
        } else {
            console.log('Failed to stop container');
        }
    }
    catch (error) {
        console.error(error);
    }
});