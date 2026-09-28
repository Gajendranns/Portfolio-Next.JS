'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Play, Cpu, Layers, ExternalLink, Code2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenLab: (demoType?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenLab }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'code'>('architecture');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Image with measured scrim */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-black/30" />

            {/* Close button with high contrast */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-slate-300 hover:text-white border border-white/20 transition-colors cursor-pointer"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Overlaid Title Area */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">
                {project.category === 'web3' ? 'Web3 & Financial Technology' : 'Enterprise Web & Mobile'}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Tab bar */}
          <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Architecture &amp; Features
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Engineering Highlights
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenLab(project.liveDemoType);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 rounded-lg transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
              <span>Launch Interactive Demo</span>
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm">
            {activeTab === 'architecture' ? (
              <>
                {/* Proof Metrics Banner */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center sm:text-left">
                        <div className="text-[11px] text-slate-400">{m.label}</div>
                        <div className="font-mono text-sm sm:text-base font-bold text-indigo-300 mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Core Functionality &amp; Business Logic
                  </h4>
                  <ul className="space-y-2.5">
                    {project.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deep Architectural Breakdown */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Technical Architecture &amp; State Management
                  </h4>
                  <ul className="space-y-2.5">
                    {project.architectureDetails.map((arch, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                        <Cpu className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-xs text-slate-400">
                  Detailed implementation patterns extracted from production codebase:
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>
                    {project.id === 'zenx-exchange'
                      ? `// Zenx Exchange: P2P & De-Swap WebSocket State Store
export const ExchangeStore = signalStore(
  { providedIn: 'root' },
  withState({
    activePair: 'ETH/USDT',
    orderBookBids: [] as OrderBookEntry[],
    orderBookAsks: [] as OrderBookEntry[],
    isWalletConnected: false,
    walletAddress: null as string | null,
    slippageTolerance: 0.5,
  }),
  withMethods((store, ws = inject(WebSocketService)) => ({
    connectWallet: rxMethod<void>(pipe(
      switchMap(() => from(window.ethereum.request({ method: 'eth_requestAccounts' }))),
      tap(([address]) => patchState(store, { isWalletConnected: true, walletAddress: address }))
    )),
    subscribeDepthUpdates(pair: string) {
      ws.listenToDepth(pair).subscribe(delta => {
        patchState(store, (state) => ({ ...state, ...applyOrderDelta(state, delta) }));
      });
    }
  }))
);`
                      : project.id === 'elearning-platform'
                      ? `// Modern E-Learning: Angular 21+ Signal Forms Course Creator
@Component({
  standalone: true,
  selector: 'app-course-curriculum-editor',
  template: \`
    <form [formGroup]="courseSignalForm">
      <input [formControl]="titleControl" placeholder="Course Title" />
      @if (titleControl.invalid && titleControl.touched) {
        <span class="error">Title must exceed 5 characters</span>
      }
      <button [disabled]="courseSignalForm.invalid">Publish Course</button>
    </form>
  \`
})
export class CurriculumEditorComponent {
  // Fine-grained Signal Forms without Zone.js digest loop overhead
  readonly titleControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  readonly courseSignalForm = new FormGroup({ title: this.titleControl });
}`
                      : `// Become a Skiller: Automatic JWT Refresh Interceptor Flow
@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    const authReq = token ? req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }) : req;

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => err);
      })
    );
  }
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* Stack Tags */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-2">Technologies Used:</div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-300 font-mono">
                {project.technologies.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    <span className="text-indigo-300">{tech}</span>
                    {idx < project.technologies.length - 1 && (
                      <span aria-hidden="true" className="text-slate-600">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:px-6 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close Window
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenLab(project.liveDemoType);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Test Live in Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
