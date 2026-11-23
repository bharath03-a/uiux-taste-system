import { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  Download,
  GripVertical,
  Heart,
  LayoutGrid,
  List,
  Send,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function ListsFeedsDetailsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [prefs, setPrefs] = useState({ digest: true, mentions: true, marketing: false });
  const [unreadIds, setUnreadIds] = useState<string[]>(['m1', 'm2']);
  const [comments, setComments] = useState([
    { id: 'c1', author: 'Maya', text: 'Updated the checkout spacing to balanced density.', likes: 3 },
  ]);
  const [reply, setReply] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [orderList, setOrderList] = useState(['Hero Banner', 'Social Proof', 'Pricing Tiers']);
  const [roles, setRoles] = useState<Record<string, string>>({ u1: 'Admin', u2: 'Editor' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. Structured Settings Section Rows
  if (variantId === 'settings-section-rows') {
    return (
      <div className="divide-y overflow-hidden" style={{ ...cardStyle, borderColor: 'var(--border-subtle)' }}>
        {[
          { title: 'Workspace Language', desc: 'Applies to UI labels & dates', value: 'English (US)' },
          { title: 'Session Timeout', desc: 'Auto-lock inactive browsers', value: '30 days' },
        ].map((row) => (
          <div key={row.title} className="flex items-center justify-between gap-3 px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>{row.title}</div>
              <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>{row.desc}</div>
            </div>
            <span
              className="shrink-0 px-2.5 py-1 text-[11.5px] font-medium"
              style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // 02. Live-Apply Preference Switches
  if (variantId === 'toggle-preference-list') {
    const items: Array<{ key: keyof typeof prefs; label: string; help: string }> = [
      { key: 'digest', label: 'Weekly activity digest', help: 'Sent Mondays at 9:00 AM' },
      { key: 'mentions', label: 'Direct @mentions', help: 'Instant push & email alert' },
      { key: 'marketing', label: 'Product changelog notes', help: 'Monthly feature highlights' },
    ];
    return (
      <div className="divide-y overflow-hidden" style={{ ...cardStyle, borderColor: 'var(--border-subtle)' }}>
        {items.map((it) => {
          const on = prefs[it.key];
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => setPrefs((p) => ({ ...p, [it.key]: !p[it.key] }))}
              className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-medium" style={{ color: 'var(--ink-1)' }}>{it.label}</div>
                <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>{it.help}</div>
              </div>
              <span
                className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors"
                style={{ background: on ? 'var(--accent)' : 'var(--surface-2)' }}
              >
                <span
                  className="h-4 w-4 rounded-full transition-transform"
                  style={{
                    background: on ? 'var(--accent-ink)' : 'var(--surface-1)',
                    transform: on ? 'translateX(16px)' : 'translateX(0px)',
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // 03. Scannable Notification / Inbox List
  if (variantId === 'inbox-message-list') {
    const msgs = [
      { id: 'm1', from: 'Alex Rivera', snippet: 'Left 2 notes on the mobile checkout layout', time: '3m' },
      { id: 'm2', from: 'Billing System', snippet: 'Receipt #4091 is ready for download', time: '1h' },
      { id: 'm3', from: 'Sara Chen', snippet: 'Approved Q4 roadmap milestones', time: '4h' },
    ];
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div className="flex items-center justify-between px-3.5 py-2 text-[11px]" style={{ background: 'var(--surface-0)', borderBottom: '1px solid var(--border-subtle)' }}>
          <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>Inbox ({unreadIds.length} unread)</span>
          <button type="button" onClick={() => setUnreadIds([])} style={{ color: 'var(--ink-3)' }}>
            Mark all read
          </button>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {msgs.map((m) => {
            const unread = unreadIds.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setUnreadIds((p) => p.filter((x) => x !== m.id))}
                className="flex w-full items-start justify-between gap-2 px-3.5 py-2.5 text-left transition-colors hover:bg-[var(--surface-2)]"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex min-w-0 items-start gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: unread ? 'var(--accent)' : 'transparent' }}
                  />
                  <div className="min-w-0">
                    <div className={`truncate text-[12px] ${unread ? 'font-semibold' : 'font-medium'}`} style={{ color: unread ? 'var(--ink-1)' : 'var(--ink-2)' }}>
                      {m.from}
                    </div>
                    <div className="truncate text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
                      {breakUi ? `${m.snippet} — follow-up thread across enterprise workspaces` : m.snippet}
                    </div>
                  </div>
                </div>
                <span className="tabular-nums-auto shrink-0 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                  {m.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 04. Compact Comment Thread + Composer
  if (variantId === 'comment-thread-composer') {
    const post = () => {
      if (!reply.trim()) return;
      setComments((prev) => [...prev, { id: `c${Date.now()}`, author: 'You', text: reply.trim(), likes: 0 }]);
      setReply('');
    };
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="flex flex-col gap-2">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start justify-between gap-2 text-[12px]">
              <div className="min-w-0">
                <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>{c.author}</span>{' '}
                <span style={{ color: 'var(--ink-2)' }}>{c.text}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setComments((prev) => prev.map((x) => (x.id === c.id ? { ...x, likes: x.likes + 1 } : x)))
                }
                className="inline-flex shrink-0 items-center gap-1 text-[10.5px]"
                style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
              >
                <Heart className="h-3 w-3" /> {c.likes}
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 pt-1" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && post()}
            placeholder="Write a reply…"
            className="min-w-0 flex-1 bg-transparent py-1 text-[12px] outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
          <button
            type="button"
            onClick={post}
            className="craft-pressable inline-flex h-7 items-center gap-1 px-2.5 text-[11px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: `${innerR}px` }}
          >
            <Send className="h-3 w-3" /> Send
          </button>
        </div>
      </div>
    );
  }

  // 05. Structured Key-Value Spec Sheet
  if (variantId === 'key-value-detail-grid') {
    const pairs = [
      { k: 'Order ID', v: 'ord_94812a', copyable: true },
      { k: 'Region', v: 'US West (Oregon)', copyable: false },
      { k: 'Customer', v: 'northstar@acme.co', copyable: true },
      { k: 'Status', v: 'Fulfilled', copyable: false },
    ];
    return (
      <div className="grid grid-cols-2 gap-2.5 p-4" style={cardStyle}>
        {pairs.map((p) => (
          <div key={p.k} className="min-w-0">
            <div className="text-[10.5px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              {p.k}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="truncate text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>{p.v}</span>
              {p.copyable && (
                <button
                  type="button"
                  onClick={() => {
                    setCopiedKey(p.k);
                    window.setTimeout(() => setCopiedKey(null), 1000);
                  }}
                  style={{ color: copiedKey === p.k ? 'var(--success)' : 'var(--ink-3)' }}
                >
                  {copiedKey === p.k ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 06. Tactile Reorderable Priority List
  if (variantId === 'sortable-reorder-list') {
    const move = (idx: number, dir: -1 | 1) => {
      const next = [...orderList];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return;
      [next[idx], next[target]] = [next[target], next[idx]];
      setOrderList(next);
    };
    return (
      <div className="flex flex-col gap-1.5 p-3.5" style={cardStyle}>
        {orderList.map((label, idx) => (
          <div
            key={label}
            className="flex items-center justify-between gap-2 px-2.5 py-2 text-[12px]"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px` }}
          >
            <span className="flex items-center gap-2 font-medium" style={{ color: 'var(--ink-1)' }}>
              <GripVertical className="h-3.5 w-3.5 opacity-50" />
              <span className="tabular-nums-auto text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                0{idx + 1}
              </span>
              {label}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" disabled={idx === 0} onClick={() => move(idx, -1)} className="p-1 disabled:opacity-30" style={{ color: 'var(--ink-2)' }}>
                <ArrowUp className="h-3 w-3" />
              </button>
              <button type="button" disabled={idx === orderList.length - 1} onClick={() => move(idx, 1)} className="p-1 disabled:opacity-30" style={{ color: 'var(--ink-2)' }}>
                <ArrowDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 07. Team Roster + Inline Role Picker
  if (variantId === 'avatar-team-directory') {
    const members = [
      { id: 'u1', name: 'Maya Patel', email: 'maya@acme.co' },
      { id: 'u2', name: 'Devon Brooks', email: 'devon@acme.co' },
    ];
    return (
      <div className="divide-y overflow-hidden" style={{ ...cardStyle, borderColor: 'var(--border-subtle)' }}>
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-2 px-3.5 py-2.5" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>{m.name}</div>
              <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>{m.email}</div>
            </div>
            <select
              value={roles[m.id]}
              onChange={(e) => setRoles((r) => ({ ...r, [m.id]: e.target.value }))}
              className="rounded px-2 py-1 text-[11.5px] font-medium outline-none"
              style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', color: 'var(--ink-1)' }}
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
        ))}
      </div>
    );
  }

  // 08. Billing Summary + Invoice Rows
  if (variantId === 'billing-invoice-history') {
    const invoices = [
      { id: 'INV-2026-11', date: 'Nov 01', amount: '$240.00' },
      { id: 'INV-2026-10', date: 'Oct 01', amount: '$240.00' },
    ];
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div className="flex items-center justify-between px-3.5 py-2 text-[11px]" style={{ background: 'var(--surface-0)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-2)' }}>
          <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>Visa •••• 4242</span>
          <span>Auto-pay active</span>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-[12px]" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="font-medium" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{inv.id}</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>{inv.date}</span>
                <span className="tabular-nums-auto font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{inv.amount}</span>
                <Download className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 09. App-Wide Search Results List
  if (variantId === 'search-results-list') {
    const results = [
      { title: 'Checkout Flow Specification', kind: 'Doc', path: 'Product / Payments' },
      { title: 'Checkout Conversion Report', kind: 'Dashboard', path: 'Analytics / Funnel' },
    ];
    return (
      <div className="divide-y overflow-hidden" style={{ ...cardStyle, borderColor: 'var(--border-subtle)' }}>
        {results.map((r) => (
          <div key={r.title} className="flex items-start justify-between gap-2 px-3.5 py-2.5" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                <mark className="rounded px-0.5" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}>Checkout</mark>
                {r.title.replace('Checkout', '')}
              </div>
              <div className="mt-0.5 text-[11px]" style={{ color: 'var(--ink-3)' }}>{r.path}</div>
            </div>
            <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
              {r.kind}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // 10. Grid / List View Switcher Collection
  const items = ['Brand Deck', 'Q4 Metrics', 'User Research', 'Launch Plan'];
  return (
    <div className="flex flex-col gap-3 p-3.5" style={cardStyle}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>Saved Library</span>
        <div className="inline-flex p-0.5" style={{ background: 'var(--surface-recessed)', borderRadius: `${innerR}px` }}>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className="inline-flex h-6 w-6 items-center justify-center"
            style={{ borderRadius: `${Math.max(3, innerR - 2)}px`, background: viewMode === 'grid' ? 'var(--surface-1)' : 'transparent', color: 'var(--ink-1)' }}
          >
            <LayoutGrid className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="inline-flex h-6 w-6 items-center justify-center"
            style={{ borderRadius: `${Math.max(3, innerR - 2)}px`, background: viewMode === 'list' ? 'var(--surface-1)' : 'transparent', color: 'var(--ink-1)' }}
          >
            <List className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-1.5'}>
        {items.map((it) => (
          <div
            key={it}
            className="flex items-center justify-between px-2.5 py-2 text-[12px] font-medium"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
          >
            <span className="truncate">{it}</span>
            <span className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>PDF</span>
          </div>
        ))}
      </div>
    </div>
  );
}
