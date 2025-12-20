export type UserRole = 'guest' | 'user' | 'admin';

export interface UserProfile {
    id: string;
    email: string | null;
    role: UserRole;
    created_at: string;
    last_sign_in_at?: string;
}

export interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    role: UserRole;
}
