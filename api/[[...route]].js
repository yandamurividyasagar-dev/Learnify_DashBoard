export const config = {
  runtime: 'nodejs20.x',
};

export default async function handler(req, res) {
  try {
    const serverModule = await import('../dist/server/server.js');
    const server = serverModule.default;
    
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${protocol}://${host}${req.url}`;
    
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }
    
    const request = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers),
      body: body ? body.toString() : undefined,
    });
    
    const response = await server.fetch(request);
    
    res.status(response.status);
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    
    const responseBody = await response.text();
    res.send(responseBody);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: error.message });
  }
}
