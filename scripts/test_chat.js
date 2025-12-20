async function testChat() {
    const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: [
                { role: 'user', content: 'What is the purpose of the Federal Acquisition Regulation (FAR)?' }
            ]
        }),
    })

    if (!response.ok) {
        const error = await response.text()
        console.error('API Error:', error)
        return
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    console.log('--- Chat Response ---')
    if (reader) {
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            process.stdout.write(decoder.decode(value))
        }
    }
    console.log('\n--- End of Response ---')
}

testChat()
