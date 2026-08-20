import crypto from 'crypto';
import cookie from 'cookie';

const SESSION_SECRET = process.env.AUTH_SESSION_SECRET || 'mutual-secure-secret-2026';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const sessionToken = cookies.mutual_session;

    if (!sessionToken) {
      return res.status(401).json({ authenticated: false });
    }

    const decoded = Buffer.from(sessionToken, 'base64').toString('utf8');
    const lastDot = decoded.lastIndexOf('.');
    if (lastDot === -1) {
      return res.status(401).json({ authenticated: false });
    }

    const payloadStr = decoded.substring(0, lastDot);
    const signature = decoded.substring(lastDot + 1);

    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payloadStr).digest('hex');
    const sigA = Buffer.from(signature, 'hex');
    const sigB = Buffer.from(expectedSig, 'hex');

    if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) {
      return res.status(401).json({ authenticated: false });
    }

    const payload = JSON.parse(payloadStr);
    if (payload.exp && Date.now() > payload.exp) {
      return res.status(401).json({ authenticated: false, error: 'Sessão expirada.' });
    }

    return res.status(200).json({ authenticated: true, email: payload.email });
  } catch (err) {
    console.error('Auth me error:', err);
    return res.status(401).json({ authenticated: false });
  }
}
