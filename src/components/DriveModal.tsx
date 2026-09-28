import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  HardDrive,
  FileText,
  Folder,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FolderPlus,
  LogOut,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutDrive,
  listDriveFiles,
  uploadTextFileToDrive,
  createDriveFolder,
  deleteDriveFile,
  initAuth,
  DriveFileItem,
} from '../services/driveService';
import { PERSONAL_DETAILS, EXPERIENCES, PROJECTS, SKILL_CATEGORIES, EDUCATION } from '../data/portfolioData';

interface DriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriveModal: React.FC<DriveModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Destructive delete confirmation dialog state
  const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // New folder prompt dialog state
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('Portfolio Dossier - Gajendran');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // Resume export state
  const [isExportingResume, setIsExportingResume] = useState(false);

  // Listen to auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch files when user is authenticated and modal opens
  useEffect(() => {
    if (isOpen && accessToken) {
      loadFiles();
    }
  }, [isOpen, accessToken]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !confirmDeleteTarget && !showFolderModal) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, confirmDeleteTarget, showFolderModal, onClose]);

  const loadFiles = async (query = searchQuery) => {
    setLoadingFiles(true);
    setErrorMsg(null);
    try {
      const data = await listDriveFiles(query);
      setFiles(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to load files from Google Drive.');
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        setSuccessMsg('Successfully connected to Google Drive!');
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google sign-in was cancelled or failed.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutDrive();
    setUser(null);
    setAccessToken(null);
    setFiles([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadFiles(searchQuery);
  };

  // Export Resume to Drive
  const handleExportResume = async () => {
    setIsExportingResume(true);
    setErrorMsg(null);
    try {
      const markdownResume = `# GAJENDRAN N.S
Frontend Developer | Angular 21+ | React | Web3
Email: ${PERSONAL_DETAILS.email}
Phone: ${PERSONAL_DETAILS.phone}
GitHub: ${PERSONAL_DETAILS.github}
LinkedIn: ${PERSONAL_DETAILS.linkedin}
Location: ${PERSONAL_DETAILS.fullAddress}

## PROFESSIONAL SUMMARY
${PERSONAL_DETAILS.tagline}

## EXPERIENCE
${EXPERIENCES.map(
  (e) => `### ${e.role} — ${e.company} (${e.period})
Location: ${e.location}
${e.highlights.map((h) => `- ${h}`).join('\n')}
`
).join('\n')}

## FEATURED PROJECTS
${PROJECTS.map(
  (p) => `### ${p.title}
${p.subtitle}
Technologies: ${p.technologies.join(', ')}
${p.keyFeatures.map((f) => `- ${f}`).join('\n')}
`
).join('\n')}

## EDUCATION
${EDUCATION.degree} — ${EDUCATION.institution} (${EDUCATION.duration})
Score: ${EDUCATION.grade}
`;

      const newFile = await uploadTextFileToDrive(
        'Gajendran_NS_Resume_2026.md',
        markdownResume,
        'text/markdown'
      );
      setSuccessMsg(`Resume successfully saved to your Google Drive!`);
      setTimeout(() => setSuccessMsg(null), 4000);
      loadFiles();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to export resume to Google Drive.');
    } finally {
      setIsExportingResume(false);
    }
  };

  // Create Folder
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    setIsCreatingFolder(true);
    try {
      await createDriveFolder(folderName);
      setShowFolderModal(false);
      setFolderName('Portfolio Dossier - Gajendran');
      setSuccessMsg(`Folder created in Google Drive!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      loadFiles();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create folder.');
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // Destructive Delete with Mandatory Explicit User Confirmation
  const executeDelete = async () => {
    if (!confirmDeleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(confirmDeleteTarget.id);
      setSuccessMsg(`Removed "${confirmDeleteTarget.name}" from Drive.`);
      setTimeout(() => setSuccessMsg(null), 3000);
      setConfirmDeleteTarget(null);
      loadFiles();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete file.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '';
    const b = parseInt(bytes, 10);
    if (isNaN(b)) return '';
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-4 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-950/70 border border-indigo-800 text-indigo-400">
                <HardDrive className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <span>Google Drive Cloud Hub</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Workspace API
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Save Gajendran's resume, inspect portfolio documents, or manage files in your Drive.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Feedback Notices */}
          {errorMsg && (
            <div className="px-6 py-2.5 bg-rose-950/70 border-b border-rose-800 text-xs text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="px-6 py-2.5 bg-emerald-950/70 border-b border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Main Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
            {!accessToken ? (
              /* Signed Out State: Official Google Sign-In Button */
              <div className="py-10 text-center space-y-5 max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950/60 border border-indigo-800 flex items-center justify-center text-indigo-400">
                  <HardDrive className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    Connect Google Drive
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Authenticate securely with your Google account to save Gajendran's complete CV &amp; project dossier directly into your Google Drive, or browse your files.
                  </p>
                </div>

                {/* Official Google Sign-In Material Button */}
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleSignIn}
                    disabled={isSigningIn}
                    className="cursor-pointer inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-medium text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-60"
                  >
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-4 h-4 shrink-0"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                    </svg>
                    <span>
                      {isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              /* Signed In State: Actions & File Explorer */
              <div className="space-y-5">
                {/* Account & Quick Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Google Account'}
                        className="w-9 h-9 rounded-full border border-slate-700 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {user?.displayName || 'Connected Account'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportResume}
                      disabled={isExportingResume}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                      title="Save Gajendran's Markdown Resume into your Drive"
                    >
                      {isExportingResume ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Save CV to Drive</span>
                    </button>

                    <button
                      onClick={() => setShowFolderModal(true)}
                      className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      title="Create New Folder in Drive"
                    >
                      <FolderPlus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleLogout}
                      className="p-2 text-slate-400 hover:text-rose-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      title="Sign Out of Drive"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search files in your Google Drive..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    Filter
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      loadFiles('');
                    }}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                    title="Refresh List"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingFiles ? 'animate-spin' : ''}`} />
                  </button>
                </form>

                {/* File Explorer Listing */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Drive Contents ({files.length} items)</span>
                    <span className="font-mono text-slate-500 text-[10px]">drive.googleapis.com/v3</span>
                  </div>

                  {loadingFiles ? (
                    <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                      <span>Fetching files from Google Drive...</span>
                    </div>
                  ) : files.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-500 bg-slate-950/60 rounded-xl border border-slate-800">
                      No files found matching the search criteria. Click "Save CV to Drive" to upload Gajendran's CV!
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                      {files.map((file) => {
                        const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                        return (
                          <div
                            key={file.id}
                            className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800/80 transition-colors flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isFolder ? (
                                <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                              ) : (
                                <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                              )}
                              <div className="truncate">
                                <span className="font-medium text-slate-200 truncate block">
                                  {file.name}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {formatFileSize(file.size)}
                                  {file.modifiedTime &&
                                    ` · Modified ${new Date(file.modifiedTime).toLocaleDateString()}`}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                                  title="Open in Google Drive"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => setConfirmDeleteTarget(file)}
                                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                                title="Delete from Drive"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Powered by official Google Drive API v3</span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg text-slate-300 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>

        {/* Destructive Delete Confirmation Modal (MANDATORY per guidelines) */}
        <AnimatePresence>
          {confirmDeleteTarget && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfirmDeleteTarget(null)}
                className="fixed inset-0 bg-black/80"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-slate-900 border border-rose-900/60 rounded-2xl p-6 shadow-2xl z-10 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-white">
                      Confirm File Deletion
                    </h4>
                    <p className="text-xs text-slate-400">
                      Google Drive Destructive Action
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  Are you sure you want to delete <strong className="text-white">"{confirmDeleteTarget.name}"</strong> from your Google Drive? This action cannot be undone.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setConfirmDeleteTarget(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors cursor-pointer shadow-lg shadow-rose-600/30 flex items-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Confirm Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* New Folder Modal */}
        <AnimatePresence>
          {showFolderModal && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFolderModal(false)}
                className="fixed inset-0 bg-black/80"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-400">
                    <FolderPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-white">
                      Create Drive Folder
                    </h4>
                    <p className="text-xs text-slate-400">
                      Add a dedicated directory to organize files
                    </p>
                  </div>
                </div>

                <form onSubmit={handleCreateFolder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Folder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowFolderModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreatingFolder}
                      className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors cursor-pointer shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                    >
                      {isCreatingFolder ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Creating...</span>
                        </>
                      ) : (
                        <span>Create Folder</span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
