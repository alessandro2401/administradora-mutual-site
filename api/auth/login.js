import crypto from 'crypto';
import cookie from 'cookie';

const ADMIN_EMAIL = process.env.AUTH_ADMIN_EMAIL || 'diretoria@administradoramutual.com.br';
const ADMIN_PASSWORD_HASH = process.env.AUTH_ADMIN_PASSWORD_HASH || '74cff14ef7564827dbdeced3a8c0dfaa7a3c4ea3d37e35e6f3b6501655cf49d7';
const SESSION_SECRET = process.env.AUTH_SESSION_SECRET || 'mutual-secure-secret-2026';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'E-mail e senha são obrigatórios.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const targetEmail = String(ADMIN_EMAIL).trim().toLowerCase();

    if (normalizedEmail !== targetEmail) {
      return res.status(401).json({ success: false, error: 'E-mail ou senha inválidos.' });
    }

    const passwordHash = crypto.createHash('sha256').update(password.trim()).digest('hex');
    const hashBufferA = Buffer.from(passwordHash, 'hex');
    const hashBufferB = Buffer.from(ADMIN_PASSWORD_HASH, 'hex');

    let isValid = false;
    if (hashBufferA.length === hashBufferB.length) {
      isValid = crypto.timingSafeEqual(hashBufferA, hashBufferB);
    }

    if (!isValid) {
      return res.status(401).json({ success: false, error: 'E-mail ou senha inválidos.' });
    }

    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const payload = JSON.stringify({ email: targetEmail, exp: expiresAt });
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    const sessionToken = Buffer.from(`${payload}.${signature}`).toString('base64');

    res.setHeader('Set-Cookie', cookie.serialize('mutual_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
      path: '/'
    }));

    return res.status(200).json({ success: true, email: targetEmail });
  } catch (err) {
    console.error('Auth login error:', err);
    return res.status(500).json({ success: false, error: 'Erro interno ao processar autenticação.' });
  }
}
