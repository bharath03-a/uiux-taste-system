import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { SPECIMENS } from '../data/specimens';
import type { SpecimenId } from '../types/taste';

interface QuickJumpModalProps {
  open: boolean;
  onClose: () => void;
  onJump: (specimenId: SpecimenId, variantId?: string) => void;
}

interface SearchHit {
  key: string;
  type: 'category' | 'variant';
  specimenId: SpecimenId;
  variantId?: string;
  batch: number;
  title: string;
  subtitle: string;
  categoryTitle: string;
}

export function QuickJumpModal({ open, onClose, onJump }: QuickJumpModalProps) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      window.setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const allEntries = useMemo<SearchHit[]>(() => {
    const out: SearchHit[] = [];
    for (const spec of SPECIMENS) {
      out.push({
        key: `cat:${spec.id}`,
        type: 'category',
        specimenId: spec.id,
        batch: spec.batch,
        title: spec.title,
        subtitle: spec.subtitle,
        categoryTitle: `Batch ${spec.batch}`,
      });
      for (const v of spec.variants) {
        out.push({
          key: `var:${spec.id}:${v.id}`,
          type: 'variant',
          specimenId: spec.id,
          variantId: v.id,
          batch: spec.batch,
          title: v.name,
          subtitle: v.archetype,
          categoryTitle: spec.title,
        });
      }
    }
    return out;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return allEntries.filter((e) => e.type === 'category').reverse();
    }
    const tokens = q.split(/\s+/).filter(Boolean);
    return allEntries
      .filter((entry) => {
        const hay = `${entry.title} ${entry.subtitle} ${entry.categoryTitle} b${entry.batch} batch ${entry.batch}`.toLowerCase();
        return tokens.every((t) => hay.includes(t));
      })
      .slice(0, 18);
  }, [query, allEntries]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  if (!open) return null;

  const commit = (hit?: SearchHit) => {
    const target = hit ?? results[cursor];
    if (!target) return;
    onJump(target.specimenId, target.variantId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24"
      style={{ background: 'rgba(9, 9, 11, 0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[600px] flex-col overflow-hidden rounded-2xl"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <Search className="h-4 w-4 shrink-0" style={{ color: 'var(--ink-3)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setCursor((c) => Math.min(results.length - 1, c + 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setCursor((c) => Math.max(0, c - 1));
              }
              if (e.key === 'Enter') {
                e.preventDefault();
                commit();
              }
            }}
            placeholder="Jump to any of 35 categories or 320+ prototypes (e.g. Saved Views, RBAC, Kanban, Secrets, TOC)…"
            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
          <button type="button" onClick={onClose} className="rounded p-1" style={{ color: 'var(--ink-3)' }} aria-label="Close search">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-10 text-center text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
              No matching categories or prototypes for “{query}”.
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {results.map((hit, idx) => {
                const active = idx === cursor;
                return (
                  <button
                    key={hit.key}
                    type="button"
                    onMouseEnter={() => setCursor(idx)}
                    onClick={() => commit(hit)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors"
                    style={{
                      background: active ? 'var(--surface-2)' : 'transparent',
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="shrink-0 rounded px-1.5 py-0.5 text-[9.5px] font-semibold uppercase"
                          style={{
                            background: hit.type === 'category' ? 'var(--accent-soft)' : 'var(--surface-0)',
                            color: hit.type === 'category' ? 'var(--ink-1)' : 'var(--ink-3)',
                            border: '1px solid var(--border-subtle)',
                            fontFamily: 'var(--dial-font-mono)',
                          }}
                        >
                          B{hit.batch} · {hit.type === 'category' ? 'Category' : 'Prototype'}
                        </span>
                        <span className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                          {hit.title}
                        </span>
                      </div>
                      <div className="mt-0.5 truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                        {hit.type === 'variant' ? `${hit.categoryTitle} · ${hit.subtitle}` : hit.subtitle}
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: active ? 'var(--accent)' : 'var(--ink-3)' }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-between px-4 py-2 text-[10.5px]"
          style={{ background: 'var(--surface-0)', borderTop: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
        >
          <span>↑↓ Navigate · ↵ Jump directly to prototype</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}
