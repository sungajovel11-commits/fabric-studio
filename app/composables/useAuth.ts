export interface GoogleUserProfile {
  name: string
  firstName?: string
  surname?: string
  email: string
  picture: string
  sub: string
  provider?: 'google' | 'local'
}

interface StoredAccount {
  name: string
  firstName?: string
  surname?: string
  email: string
  password: string
  picture?: string
}

export const useAuth = () => {
  const user = useState<GoogleUserProfile | null>('auth_user', () => null)
  const SESSION_KEY = 'snc_exam_google_user'
  const USERS_DB_KEY = 'snc_exam_registered_users'

  const decodeJwt = (token: string): GoogleUserProfile | null => {
    try {
      const base64Url = token.split('.')[1]
      if (!base64Url) return null
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      const data = JSON.parse(jsonPayload)
      const fullName = data.name || 'Google User'
      const parts = fullName.trim().split(' ')
      const firstName = data.given_name || parts[0] || ''
      const surname = data.family_name || parts.slice(1).join(' ') || ''

      return {
        name: fullName,
        firstName,
        surname,
        email: data.email || '',
        picture: data.picture || '',
        sub: data.sub || '',
        provider: 'google',
      }
    } catch {
      return null
    }
  }

  const initAuth = () => {
    if (import.meta.client && !user.value) {
      const saved = localStorage.getItem(SESSION_KEY)
      if (saved) {
        try {
          user.value = JSON.parse(saved)
        } catch {
          localStorage.removeItem(SESSION_KEY)
        }
      }
    }
  }

  const registerAccount = (
    name: string,
    email: string,
    password: string
  ): { ok: boolean; message: string } => {
    if (!import.meta.client) {
      return { ok: false, message: 'Client environment required.' }
    }

    const cleanEmail = email.trim().toLowerCase()
    const raw = localStorage.getItem(USERS_DB_KEY)
    const accounts: StoredAccount[] = raw ? JSON.parse(raw) : []

    if (accounts.some((acc) => acc.email === cleanEmail)) {
      return {
        ok: false,
        message: 'This email is already registered. Please log in instead.',
      }
    }

    const parts = name.trim().split(' ')
    const firstName = parts[0] || name.trim()
    const surname = parts.slice(1).join(' ') || ''

    accounts.push({
      name: name.trim(),
      firstName,
      surname,
      email: cleanEmail,
      password,
      picture: '',
    })

    localStorage.setItem(USERS_DB_KEY, JSON.stringify(accounts))
    return {
      ok: true,
      message: 'Account created successfully! You can now log in.',
    }
  }

  const loginWithEmail = (
    email: string,
    password: string
  ): { ok: boolean; message: string } => {
    if (!import.meta.client) {
      return { ok: false, message: 'Client environment required.' }
    }

    const cleanEmail = email.trim().toLowerCase()
    const raw = localStorage.getItem(USERS_DB_KEY)
    const accounts: StoredAccount[] = raw ? JSON.parse(raw) : []

    const found = accounts.find((acc) => acc.email === cleanEmail)
    if (!found) {
      return {
        ok: false,
        message:
          'Account not found. Please create an account first or sign in with Google.',
      }
    }

    if (found.password !== password) {
      return { ok: false, message: 'Incorrect password. Please try again.' }
    }

    const parts = found.name.trim().split(' ')
    const sessionProfile: GoogleUserProfile = {
      name: found.name,
      firstName: found.firstName ?? parts[0] ?? '',
      surname: found.surname ?? parts.slice(1).join(' ') ?? '',
      email: found.email,
      picture: found.picture || '',
      sub: `local-${Date.now()}`,
      provider: 'local',
    }

    user.value = sessionProfile
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionProfile))
    return { ok: true, message: 'Login successful!' }
  }

  const updateProfile = (payload: {
    firstName: string
    surname: string
    email: string
    picture?: string
    newPassword?: string
  }): { ok: boolean; message: string; oldEmail?: string; newEmail?: string } => {
    if (!import.meta.client || !user.value) {
      return { ok: false, message: 'No active session found.' }
    }

    const cleanFirst = payload.firstName.trim()
    const cleanSurname = payload.surname.trim()
    const fullName = `${cleanFirst} ${cleanSurname}`.trim()
    const oldEmail = user.value.email.trim().toLowerCase()
    const newEmail = payload.email.trim().toLowerCase()
    const updatedPicture =
      payload.picture !== undefined ? payload.picture : user.value.picture

    if (!cleanFirst || !newEmail) {
      return { ok: false, message: 'First name and email are required.' }
    }

    if (payload.newPassword && payload.newPassword.length < 4) {
      return { ok: false, message: 'New password must be at least 4 characters.' }
    }

    const raw = localStorage.getItem(USERS_DB_KEY)
    const accounts: StoredAccount[] = raw ? JSON.parse(raw) : []

    if (
      newEmail !== oldEmail &&
      accounts.some((acc) => acc.email === newEmail)
    ) {
      return {
        ok: false,
        message: 'That email address is already used by another account.',
      }
    }

    const existingIndex = accounts.findIndex((acc) => acc.email === oldEmail)
    if (existingIndex >= 0) {
      const existingAcc = accounts[existingIndex]!
      accounts[existingIndex] = {
        name: fullName,
        firstName: cleanFirst,
        surname: cleanSurname,
        email: newEmail,
        picture: updatedPicture,
        password: payload.newPassword ? payload.newPassword : existingAcc.password,
      }
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(accounts))
    } else if (payload.newPassword) {
      accounts.push({
        name: fullName,
        firstName: cleanFirst,
        surname: cleanSurname,
        email: newEmail,
        picture: updatedPicture,
        password: payload.newPassword,
      })
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(accounts))
    }

    const updatedUser: GoogleUserProfile = {
      ...user.value,
      name: fullName,
      firstName: cleanFirst,
      surname: cleanSurname,
      email: newEmail,
      picture: updatedPicture,
    }

    user.value = updatedUser
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser))

    return {
      ok: true,
      message: 'Profile updated successfully!',
      oldEmail,
      newEmail,
    }
  }

  const loginWithCredential = (credential: string): boolean => {
    const decoded = decodeJwt(credential)
    if (!decoded) return false
    user.value = decoded
    if (import.meta.client) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(decoded))
    }
    return true
  }

  const logout = () => {
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem(SESSION_KEY)
      const g = (window as any).google
      if (g?.accounts?.id) {
        g.accounts.id.disableAutoSelect()
      }
    }
    navigateTo('/login')
  }

  return {
    user,
    initAuth,
    registerAccount,
    loginWithEmail,
    updateProfile,
    loginWithCredential,
    logout,
  }
}