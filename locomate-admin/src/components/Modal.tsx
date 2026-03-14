import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
        overflowY: 'auto', display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center', padding: '24px 16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: '520px', borderRadius: '16px',
          background: '#1a1d2e', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)', marginTop: '0',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#fff' }}>{title}</h2>
          <button onClick={onClose} style={{
            width: '32px', height: '32px', borderRadius: '8px', border: 'none',
            background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <X size={16} />
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: '20px 24px' }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
