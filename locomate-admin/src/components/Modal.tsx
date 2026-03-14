import { X } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, onClose, children }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div className="min-h-full flex items-start justify-center p-6">
        <div
          className="w-full max-w-lg rounded-2xl shadow-2xl fade-in"
          style={{ background: '#1a1d2e', border: '1px solid rgba(255,255,255,0.1)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 sticky top-0 rounded-t-2xl"
            style={{ background: '#1a1d2e', borderBottom: '1px solid rgba(255,255,255,0.07)', zIndex: 1 }}>
            <h2 className="text-base font-semibold text-white">{title}</h2>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <X size={16} />
            </button>
          </div>
          {/* Body */}
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
