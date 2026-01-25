export default async function handler(req, res) {
    // Basic CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    try {
        const { url } = req.body || {}
        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'Missing or invalid url' })
        }

        // Extract file id and key
        let fileId, fileKey
        if (url.includes('/file/')) {
            const match = url.match(/\/file\/([A-Za-z0-9_-]+)#([A-Za-z0-9_-]+)/)
            if (match) {
                fileId = match[1]
                fileKey = match[2]
            }
        } else if (url.includes('#!')) {
            const match = url.match(/#!([A-Za-z0-9_-]+)!([A-Za-z0-9_-]+)/)
            if (match) {
                fileId = match[1]
                fileKey = match[2]
            }
        }

        if (!fileId || !fileKey) {
            return res.status(400).json({ error: 'Invalid Mega public file URL' })
        }

        // Call Mega API server-side to get a temporary direct link
        const apiUrl = 'https://api.mega.nz/cs'
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([{ a: 'g', p: fileId }])
        })

        if (!response.ok) {
            return res.status(502).json({ error: 'Upstream error from Mega API' })
        }

        const data = await response.json()
        const item = data && data[0]

        if (!item || !item.g) {
            return res.status(500).json({ error: 'Invalid response from Mega API' })
        }

        // Build a response with direct link and basic info
        const directLink = item.g
        const name = item.at ? Buffer.from(item.at, 'base64').toString('utf8').split(':')[1] : 'unknown'
        const size = item.s || 0

        return res.status(200).json({
            directLink,
            fileInfo: {
                name,
                size
            }
        })
    } catch (err) {
        console.error('mega-direct-link error:', err)
        return res.status(500).json({ error: 'Server error' })
    }
}
