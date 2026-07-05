// Mock authentication layer.
//
// There is no backend in this build. This module is deliberately shaped
// like a thin API client so that swapping in real JWT authentication later
// only requires editing the two functions below:
//
//   login()        -> POST /api/auth/login   { token, admin }
//   getSession()   -> read token from storage, optionally GET /api/auth/me
//
// Nothing outside this file should know how the session is stored.

const SESSION_KEY = 'srm_admin_session';

const MOCK_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export function login(username, password) {
  return new Promise((resolve, reject) => {
    // Simulated network latency so the UI can show a real loading state.
    setTimeout(() => {
      if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
        const session = {
          token: 'mock-jwt-token', // a real backend would return a signed JWT here
          admin: { username, name: 'Office Administrator', role: 'exam-office' },
          issuedAt: Date.now(),
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        resolve(session);
      } else {
        reject(new Error('Incorrect username or password.'));
      }
    }, 500);
  });
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getSession());
}
