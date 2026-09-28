import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance safely (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure GoogleAuthProvider with Drive scopes
const provider = new GoogleAuthProvider();
const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
];

DRIVE_SCOPES.forEach((scope) => provider.addScope(scope));

// In-memory token cache (strictly NO localStorage or sessionStorage for accessToken)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
}

// Auth State Listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve access token from Google Auth.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Get in-memory token
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

// Logout
export const logoutDrive = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// =================== GOOGLE DRIVE API CALLS ===================

// 1. List Files
export const listDriveFiles = async (searchTerm = ''): Promise<DriveFileItem[]> => {
  if (!cachedAccessToken) {
    throw new Error('Not authenticated with Google Drive. Please sign in.');
  }

  let query = "trashed = false";
  if (searchTerm.trim()) {
    query += ` and name contains '${searchTerm.replace(/'/g, "\\'")}'`;
  }

  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&pageSize=30&orderBy=modifiedTime desc&fields=files(id,name,mimeType,size,modifiedTime,webViewLink,iconLink,thumbnailLink)`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${cachedAccessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      cachedAccessToken = null;
      throw new Error('Session expired. Please sign in with Google again.');
    }
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to fetch files (${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
};

// 2. Create / Upload Text File (e.g. Save Resume / Portfolio Dossier)
export const uploadTextFileToDrive = async (
  filename: string,
  content: string,
  mimeType = 'text/plain'
): Promise<DriveFileItem> => {
  if (!cachedAccessToken) {
    throw new Error('Not authenticated with Google Drive.');
  }

  const metadata = {
    name: filename,
    mimeType: mimeType,
  };

  const boundary = 'foo_bar_baz_portfolio';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,modifiedTime',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cachedAccessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Failed to upload document to Google Drive');
  }

  return response.json();
};

// 3. Create a Folder
export const createDriveFolder = async (folderName: string): Promise<DriveFileItem> => {
  if (!cachedAccessToken) {
    throw new Error('Not authenticated with Google Drive.');
  }

  const response = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cachedAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Failed to create folder');
  }

  return response.json();
};

// 4. Delete File (MUST only be called after user confirmation dialog)
export const deleteDriveFile = async (fileId: string): Promise<void> => {
  if (!cachedAccessToken) {
    throw new Error('Not authenticated with Google Drive.');
  }

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cachedAccessToken}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Failed to delete file from Google Drive');
  }
};
