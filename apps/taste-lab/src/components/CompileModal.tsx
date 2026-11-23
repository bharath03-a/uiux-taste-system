import { useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Check, Copy, FileCode2, Save, X } from 'lucide-react';
import type { TasteProfile } from '../types/taste';

interface CompileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  markdown: string;
  profile: TasteProfile;
  onWriteMarkdown: () => Promise<boolean>;
}

export function CompileModal({
  open,
  onOpenChange,
  markdown,
  profile,
  onWriteMarkdown,
}: CompileModalProps) {
  const [tab, setTab] = useState<'md' | 'json'>('md');
  const [copied, setCopied] = useState(false);
  const [written, setWritten] = useState(false);

  const content = tab === 'md' ? markdown : JSON.stringify(profile, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const handleWrite = async () => {
    const ok = await onWriteMarkdown();
    if (ok) {
      setWritten(true);
      window.setTimeout(() => setWritten(false), 2000);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className="fixed inset-0 z-40 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
        />
        <Dialog.Popup
          className="fixed top-1/2 left-1/2 z-50 flex max-h-[84vh] w-[min(780px,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl"
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            className="flex items-center justify-between gap-3 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--border-subtle)' }}
          >
            <div className="flex items-center gap-2.5">
              <FileCode2 className="h-4 w-4" style={{ color: 'var(--ink-2)' }} />
              <Dialog.Title className="text-[14px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                Compiled Color-Agnostic Taste Spec
              </Dialog.Title>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex rounded-md p-0.5 text-[11.5px]"
                style={{
                  background: 'var(--surface-recessed)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setTab('md')}
                  className="rounded px-2.5 py-1 font-medium"
                  style={{
                    background: tab === 'md' ? 'var(--surface-1)' : 'transparent',
                    color: tab === 'md' ? 'var(--ink-1)' : 'var(--ink-3)',
                  }}
                >
                  TASTE.md
                </button>
                <button
                  type="button"
                  onClick={() => setTab('json')}
                  className="rounded px-2.5 py-1 font-medium"
                  style={{
                    background: tab === 'json' ? 'var(--surface-1)' : 'transparent',
                    color: tab === 'json' ? 'var(--ink-1)' : 'var(--ink-3)',
                  }}
                >
                  taste.json
                </button>
              </div>
              <Dialog.Close
                className="craft-pressable craft-focus inline-flex h-7 w-7 items-center justify-center rounded-md"
                style={{ color: 'var(--ink-2)', background: 'var(--surface-0)' }}
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
          </div>

          <pre
            className="flex-1 overflow-auto p-5 text-[12px] leading-relaxed"
            style={{
              margin: 0,
              background: 'var(--surface-0)',
              color: 'var(--ink-1)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {content}
          </pre>

          <div
            className="flex flex-wrap items-center justify-between gap-2 px-5 py-3"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <span className="text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
              Saves directly to <code style={{ fontFamily: 'var(--dial-font-mono)' }}>taste/TASTE.md</code> in this repo
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] font-medium"
                style={{
                  background: 'var(--surface-0)',
                  color: 'var(--ink-1)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={handleWrite}
                className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 rounded-lg px-3.5 text-[12px] font-medium"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-ink)',
                }}
              >
                {written ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                {written ? 'Written to taste/TASTE.md' : 'Write taste/TASTE.md'}
              </button>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
