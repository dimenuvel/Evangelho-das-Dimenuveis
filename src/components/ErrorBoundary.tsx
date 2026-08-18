import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled runtime error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090e] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-full text-[#f3e3a2]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-serif font-bold text-[#f3e3a2]">
            Evangelho das Dimenúveis
          </h2>
          <p className="text-xs text-neutral-300 max-w-md leading-relaxed">
            Ocorreu um erro inesperado ao carregar a aplicação. Tente recarregar ou reiniciar a sessão.
          </p>
          {this.state.error && (
            <pre className="text-[10px] font-mono text-neutral-400 bg-neutral-900/90 p-3 rounded border border-neutral-800 max-w-sm w-full overflow-x-auto text-left">
              {this.state.error.toString()}
            </pre>
          )}
          <div className="pt-2 flex flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d4af37] transition-colors"
            >
              Recarregar App
            </button>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 font-bold text-xs uppercase tracking-wider hover:bg-neutral-700 transition-colors"
            >
              Resetar Dados
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
