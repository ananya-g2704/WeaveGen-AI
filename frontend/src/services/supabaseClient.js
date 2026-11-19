import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid URL and key are provided (not placeholders)
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-key')
);

// Initialize client only if valid configuration is present
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local Development Storage Key
const DEV_USER_KEY = 'weavegen_dev_authenticated_user';

// Mock Development User Directory for testing
export const DEV_SAMPLE_ACCOUNTS = {
  artisan: {
    email: 'artisan@weavegen.ai',
    password: 'Password123!',
    fullName: 'Ramesh Weaver',
    role: 'artisan',
  },
  designer: {
    email: 'designer@weavegen.ai',
    password: 'Password123!',
    fullName: 'Priya Sharma',
    role: 'designer',
  },
  admin: {
    email: 'admin@weavegen.ai',
    password: 'Password123!',
    fullName: 'Prof. K. Venkatesh',
    role: 'admin',
  },
};

/**
 * Authentication Service Wrapper
 * Automatically switches between Supabase Auth and Development Auth Mode
 */
export const authService = {
  /**
   * Sign In with Email & Password
   */
  async signIn(email, password) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      // Fetch role from user_roles table or metadata
      const role = data.user?.user_metadata?.role || 'designer';
      return {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.user_metadata?.full_name || email.split('@')[0],
        role,
      };
    }

    // Development Mode Fallback
    await new Promise((res) => setTimeout(res, 500)); // Simulate brief network latency

    // Check if it matches any sample accounts or any valid format
    let role = 'designer';
    let fullName = email.split('@')[0];

    const matchedSample = Object.values(DEV_SAMPLE_ACCOUNTS).find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase()
    );

    if (matchedSample) {
      role = matchedSample.role;
      fullName = matchedSample.fullName;
    }

    const devUser = {
      id: `dev-${Date.now()}`,
      email,
      fullName,
      role,
      isDevUser: true,
    };

    localStorage.setItem(DEV_USER_KEY, JSON.stringify(devUser));
    return devUser;
  },

  /**
   * Sign Up with Name, Email, Password, and Role
   */
  async signUp(fullName, email, password, role = 'designer') {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });
      if (error) throw error;

      return {
        id: data.user?.id || `user-${Date.now()}`,
        email: data.user?.email || email,
        fullName,
        role,
      };
    }

    // Development Mode Fallback
    await new Promise((res) => setTimeout(res, 500));

    const devUser = {
      id: `dev-${Date.now()}`,
      email,
      fullName,
      role,
      isDevUser: true,
    };

    localStorage.setItem(DEV_USER_KEY, JSON.stringify(devUser));
    return devUser;
  },

  /**
   * Sign Out
   */
  async signOut() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(DEV_USER_KEY);
  },

  /**
   * Get Current Session User
   */
  async getCurrentUser() {
    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      return {
        id: session.user.id,
        email: session.user.email,
        fullName: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
        role: session.user.user_metadata?.role || 'designer',
      };
    }

    // Development Mode
    const saved = localStorage.getItem(DEV_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  /**
   * Update active user role
   */
  async updateRole(newRole) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.updateUser({
        data: { role: newRole },
      });
      if (error) throw error;
      return newRole;
    }

    // Development Mode
    const saved = localStorage.getItem(DEV_USER_KEY);
    if (saved) {
      const user = JSON.parse(saved);
      user.role = newRole;
      localStorage.setItem(DEV_USER_KEY, JSON.stringify(user));
    }
    return newRole;
  },
};
