export const getSession = async () => {
  try {
    const response = await fetch('/api/auth/session');
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
};

export const signOut = async () => {
  try {
    await fetch('/api/auth/signout', { method: 'POST' });
  } catch (error) {
    console.error('Sign out failed:', error);
  }
};