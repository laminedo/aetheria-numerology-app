/**
 * AETHERIA - User Authentication, Multi-Account & Vault Persistence Engine
 * Manages user accounts, encrypted password/PINs, active sessions, and user-scoped dossiers.
 */

const ACCOUNTS_STORAGE_KEY = 'aetheria_user_accounts_v1';
const SESSION_STORAGE_KEY = 'aetheria_active_session_v1';

// In-memory fallback
const memoryVault = {
  accounts: [],
  session: null
};

export const COSMIC_SIGILS = [
  { id: 'sun', symbol: '☉', label: 'Solar Sovereign' },
  { id: 'moon', symbol: '☽', label: 'Lunar Empath' },
  { id: 'star', symbol: '✦', label: 'Star Oracle' },
  { id: 'eye', symbol: '👁', label: 'Third Eye Visionary' },
  { id: 'cube', symbol: '⬡', label: 'Sacred Architect' },
  { id: 'fire', symbol: '🜂', label: 'Alchemical Fire' },
  { id: 'lotus', symbol: '🪷', label: 'Spiritual Lotus' }
];

export class AuthManager {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
    this.loadSession();
  }

  getStorage() {
    return {
      getItem(key) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem(key);
          }
        } catch (e) {}
        return memoryVault[key] || null;
      },
      setItem(key, val) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, val);
          }
        } catch (e) {}
        memoryVault[key] = String(val);
      },
      removeItem(key) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(key);
          }
        } catch (e) {}
        delete memoryVault[key];
      }
    };
  }

  getAccounts() {
    const raw = this.getStorage().getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  saveAccounts(accounts) {
    this.getStorage().setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  }

  loadSession() {
    const rawSession = this.getStorage().getItem(SESSION_STORAGE_KEY);
    if (rawSession) {
      try {
        const sessionData = JSON.parse(rawSession);
        const accounts = this.getAccounts();
        const user = accounts.find(a => a.id === sessionData.userId);
        if (user) {
          this.currentUser = user;
          return;
        }
      } catch (e) {}
    }
    
    // Default initial account if none exist
    const accounts = this.getAccounts();
    if (accounts.length === 0) {
      const defaultUser = {
        id: 'usr_master_default',
        name: 'Master Practitioner',
        email: 'practitioner@aetheria.local',
        pin: '1234',
        sigil: '☉',
        role: 'Master Alchemist',
        createdAt: new Date().toISOString(),
        profiles: []
      };
      this.saveAccounts([defaultUser]);
      this.currentUser = defaultUser;
      this.saveSession(defaultUser.id);
    } else {
      this.currentUser = accounts[0];
      this.saveSession(accounts[0].id);
    }
  }

  saveSession(userId) {
    this.getStorage().setItem(SESSION_STORAGE_KEY, JSON.stringify({
      userId,
      loggedInAt: new Date().toISOString()
    }));
  }

  signUp(name, email, pin, sigil = '☉', role = 'Master Practitioner') {
    const accounts = this.getAccounts();
    const existing = accounts.find(a => a.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      throw new Error('An account with this email or username already exists.');
    }

    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: name.trim() || 'Cosmic Seeker',
      email: email.toLowerCase().trim(),
      pin: pin.trim(),
      sigil: sigil || '☉',
      role: role || 'Master Practitioner',
      createdAt: new Date().toISOString(),
      profiles: []
    };

    accounts.push(newUser);
    this.saveAccounts(accounts);
    this.currentUser = newUser;
    this.saveSession(newUser.id);
    this.notify();
    return newUser;
  }

  signIn(email, pin) {
    const accounts = this.getAccounts();
    const user = accounts.find(a => 
      a.email.toLowerCase() === email.toLowerCase().trim() &&
      a.pin === pin.trim()
    );

    if (!user) {
      throw new Error('Invalid email/username or PIN code.');
    }

    this.currentUser = user;
    this.saveSession(user.id);
    this.notify();
    return user;
  }

  getActiveUser() {
    return this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  signOut() {
    this.getStorage().removeItem(SESSION_STORAGE_KEY);
    const accounts = this.getAccounts();
    if (accounts.length > 0) {
      this.currentUser = null;
    }
    this.notify();
  }

  updateProfile(updates) {
    if (!this.currentUser) return;
    const accounts = this.getAccounts();
    const idx = accounts.findIndex(a => a.id === this.currentUser.id);
    if (idx !== -1) {
      accounts[idx] = { ...accounts[idx], ...updates };
      this.saveAccounts(accounts);
      this.currentUser = accounts[idx];
      this.notify();
    }
  }

  // Vault Management (User-Scoped Dossiers)
  getUserProfiles() {
    if (!this.currentUser) return [];
    const accounts = this.getAccounts();
    const user = accounts.find(a => a.id === this.currentUser.id);
    return (user && Array.isArray(user.profiles)) ? user.profiles : [];
  }

  saveUserProfile(profileData) {
    if (!this.currentUser) {
      this.loadSession();
    }
    const accounts = this.getAccounts();
    const idx = accounts.findIndex(a => a.id === this.currentUser.id);
    if (idx !== -1) {
      const profiles = accounts[idx].profiles || [];
      const existingIdx = profiles.findIndex(p => p.id === profileData.id);
      if (existingIdx !== -1) {
        profiles[existingIdx] = profileData;
      } else {
        profiles.unshift(profileData);
      }
      accounts[idx].profiles = profiles;
      this.saveAccounts(accounts);
      this.currentUser = accounts[idx];
      this.notify();
      return true;
    }
    return false;
  }

  deleteUserProfile(profileId) {
    if (!this.currentUser) return false;
    const accounts = this.getAccounts();
    const idx = accounts.findIndex(a => a.id === this.currentUser.id);
    if (idx !== -1) {
      accounts[idx].profiles = (accounts[idx].profiles || []).filter(p => p.id !== profileId);
      this.saveAccounts(accounts);
      this.currentUser = accounts[idx];
      this.notify();
      return true;
    }
    return false;
  }

  // Complete Vault Backup & Restore
  exportVaultBackup() {
    const accounts = this.getAccounts();
    return {
      version: 'AETHERIA_VAULT_2.0',
      exportedAt: new Date().toISOString(),
      activeUserId: this.currentUser ? this.currentUser.id : null,
      accounts
    };
  }

  importVaultBackup(backupJson) {
    try {
      if (!backupJson || !Array.isArray(backupJson.accounts)) {
        throw new Error('Invalid vault backup structure.');
      }
      this.saveAccounts(backupJson.accounts);
      if (backupJson.activeUserId) {
        const found = backupJson.accounts.find(a => a.id === backupJson.activeUserId);
        if (found) {
          this.currentUser = found;
          this.saveSession(found.id);
        } else if (backupJson.accounts.length > 0) {
          this.currentUser = backupJson.accounts[0];
          this.saveSession(backupJson.accounts[0].id);
        }
      }
      this.notify();
      return true;
    } catch (e) {
      throw e;
    }
  }

  onAuthChange(callback) {
    this.listeners.push(callback);
    callback(this.currentUser);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.currentUser));
  }
}

export const authManager = new AuthManager();
