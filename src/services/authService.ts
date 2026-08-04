import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth'
import { auth } from './firebase'

/**
 * User registration with email and password
 * @param email - User's email
 * @param password - User's password
 * @param displayName - User's display name (optional)
 * @returns Promise<User> - The created user
 */
export const signUp = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    // Update display name if provided
    if (displayName) {
      await updateProfile(user, { displayName })
    }

    return user
  } catch (error) {
    console.error('Sign up error:', error)
    throw error
  }
}

/**
 * User login with email and password
 * @param email - User's email
 * @param password - User's password
 * @returns Promise<User> - The logged-in user
 */
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * User logout
 * @returns Promise<void>
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

/**
 * Get current user
 * @returns The current user or null
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}
