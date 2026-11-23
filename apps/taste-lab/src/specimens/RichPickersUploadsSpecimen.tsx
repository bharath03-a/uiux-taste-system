import { useState } from 'react';
import {
  Calendar,
  Check,
  Copy,
  FileText,
  ImagePlus,
  Link2,
  Minus,
  Plus,
  Star,
  UploadCloud,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const DEFAULT_TAGS = ['Design', 'Frontend', 'Billing', 'Mobile', 'Analytics'];

export function RichPickersUploadsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [files, setFiles] = useState([
    { id: 'u1', name: 'brand-assets.zip', size: '4.2 MB', pct: 100 },
    { id: 'u2', name: 'q4-forecast.csv', size: '820 KB', pct: 68 },
  ]);
  const [avatarIdx, setAvatarIdx] = useState(0);
  const [rangeStart, setRangeStart] = useState(6);
  const [rangeEnd, setRangeEnd] = useState(12);
  const [selectedDay, setSelectedDay] = useState('Thu 14');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [tags, setTags] = useState<string[]>(['Design', 'Frontend']);
  const [tagInput, setTagInput] = useState('');
  const [budget, setBudget] = useState(1200);
  const [qty, setQty] = useState(2);
  const [rating, setRating] = useState(4);
  const [shareRole, setShareRole] = useState('Can view');
  const [copiedLink, setCopiedLink] = useState(false);
  const [sizePick, setSizePick] = useState('M');

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. Tactile Dropzone + Live Progress
  if (variantId === 'drag-drop-file-uploader') {
    const addSampleFile = () => {
      const id = `u${Date.now()}`;
      setFiles((prev) => [{ id, name: `invoice-${prev.length + 1}.pdf`, size: '1.1 MB', pct: 100 }, ...prev].slice(0, 3));
    };
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <button
          type="button"
          onClick={addSampleFile}
          className="craft-pressable flex flex-col items-center justify-center gap-1.5 px-3 py-4 text-center"
          style={{
            background: 'var(--surface-0)',
            border: '1.5px dashed var(--border-strong)',
            borderRadius: `${innerR}px`,
          }}
        >
          <UploadCloud className="h-4 w-4" style={{ color: 'var(--ink-2)' }} />
          <div className="text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
            Drop files here or click to simulate upload
          </div>
          <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            PDF, CSV, ZIP up to 25 MB
          </div>
        </button>

        <div className="flex flex-col gap-1.5">
          {files.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between gap-2 px-2.5 py-2"
              style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px` }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 text-[11.5px]">
                  <span className="flex min-w-0 items-center gap-1.5 font-medium" style={{ color: 'var(--ink-1)' }}>
                    <FileText className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{breakUi ? `enterprise_quarterly_export_${f.name}` : f.name}</span>
                  </span>
                  <span className="tabular-nums-auto shrink-0 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                    {f.size}
                  </span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
                  <div className="h-full" style={{ width: `${f.pct}%`, background: 'var(--accent)' }} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                style={{ color: 'var(--ink-3)' }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 02. Avatar / Cover Image Picker
  if (variantId === 'avatar-media-uploader') {
    const initials = ['BV', 'AC', 'ST'];
    return (
      <div className="flex items-center justify-between gap-3 p-4" style={cardStyle}>
        <div className="flex items-center gap-3">
          <div
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold"
            style={{
              background: avatarIdx === -1 ? 'var(--surface-0)' : 'var(--accent)',
              color: avatarIdx === -1 ? 'var(--ink-3)' : 'var(--accent-ink)',
              border: '1px solid var(--border-strong)',
            }}
          >
            {avatarIdx === -1 ? <ImagePlus className="h-4 w-4" /> : initials[avatarIdx]}
          </div>
          <div>
            <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Workspace Avatar</div>
            <div className="text-[11px]" style={{ color: 'var(--ink-3)' }}>PNG or JPG · 512×512 recommended</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAvatarIdx((i) => (i + 1) % initials.length)}
            className="craft-pressable h-7 px-2.5 text-[11.5px] font-medium"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
          >
            Replace
          </button>
          <button
            type="button"
            onClick={() => setAvatarIdx(-1)}
            className="craft-pressable h-7 px-2 text-[11.5px]"
            style={{ color: 'var(--danger)' }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  // 03. Date Range Calendar + Presets
  if (variantId === 'date-range-calendar') {
    const days = Array.from({ length: 14 }, (_, i) => i + 1);
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            <Calendar className="h-3.5 w-3.5 opacity-75" />
            Nov {rangeStart} – Nov {rangeEnd}
          </span>
          <div className="flex items-center gap-1">
            {[
              { label: '7d', s: 6, e: 12 },
              { label: '14d', s: 1, e: 14 },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setRangeStart(p.s);
                  setRangeEnd(p.e);
                }}
                className="craft-pressable px-2 py-0.5 text-[10.5px] font-medium"
                style={{
                  background: rangeStart === p.s && rangeEnd === p.e ? 'var(--accent)' : 'var(--surface-0)',
                  color: rangeStart === p.s && rangeEnd === p.e ? 'var(--accent-ink)' : 'var(--ink-2)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: `${Math.max(4, innerR - 2)}px`,
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const isEdge = d === rangeStart || d === rangeEnd;
            const inRange = d > rangeStart && d < rangeEnd;
            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  if (d < rangeStart) setRangeStart(d);
                  else setRangeEnd(d);
                }}
                className="tabular-nums-auto h-7 text-[11px] font-medium"
                style={{
                  borderRadius: `${Math.max(4, innerR - 2)}px`,
                  background: isEdge ? 'var(--accent)' : inRange ? 'var(--accent-soft)' : 'var(--surface-0)',
                  color: isEdge ? 'var(--accent-ink)' : 'var(--ink-1)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 04. Day + Time-Slot Booking Picker
  if (variantId === 'time-slot-scheduler') {
    const days = ['Thu 14', 'Fri 15', 'Mon 18'];
    const slots = ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5">
            {days.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDay(d)}
                className="craft-pressable px-2.5 py-1 text-[11px] font-medium"
                style={{
                  borderRadius: `${innerR}px`,
                  background: selectedDay === d ? 'var(--accent)' : 'var(--surface-0)',
                  color: selectedDay === d ? 'var(--accent-ink)' : 'var(--ink-2)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {d}
              </button>
            ))}
          </div>
          <span className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            America/Los_Angeles
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {slots.map((s) => {
            const act = selectedSlot === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSlot(s)}
                className="craft-pressable tabular-nums-auto py-1.5 text-[11.5px] font-medium"
                style={{
                  borderRadius: `${innerR}px`,
                  background: act ? 'var(--accent-soft)' : 'var(--surface-0)',
                  border: act ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                  color: 'var(--ink-1)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 05. Multi-Select Tag Combobox (+ Create)
  if (variantId === 'multi-tag-combobox') {
    const addTag = (val: string) => {
      const t = val.trim();
      if (!t || tags.includes(t)) return;
      setTags((prev) => [...prev, t]);
      setTagInput('');
    };
    const suggestions = DEFAULT_TAGS.filter(
      (t) => !tags.includes(t) && t.toLowerCase().includes(tagInput.trim().toLowerCase())
    );
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div
          className="flex flex-wrap items-center gap-1.5 p-2"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px` }}
        >
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium"
              style={{ background: 'var(--surface-2)', color: 'var(--ink-1)', borderRadius: `${Math.max(4, innerR - 2)}px` }}
            >
              {t}
              <button type="button" onClick={() => setTags((p) => p.filter((x) => x !== t))}>
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag(tagInput);
              }
            }}
            placeholder="Add or create tag…"
            className="min-w-[90px] flex-1 bg-transparent text-[12px] outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className="craft-pressable px-2 py-0.5 text-[11px]"
              style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px`, color: 'var(--ink-2)' }}
            >
              + {s}
            </button>
          ))}
          {tagInput.trim() && !tags.includes(tagInput.trim()) && (
            <button
              type="button"
              onClick={() => addTag(tagInput)}
              className="craft-pressable px-2 py-0.5 text-[11px] font-semibold"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: `${innerR}px` }}
            >
              Create “{tagInput.trim()}”
            </button>
          )}
        </div>
      </div>
    );
  }

  // 06. Synced Range Slider + Numeric Box
  if (variantId === 'dual-range-slider-input') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Monthly Budget Cap</span>
          <div
            className="flex items-center gap-1 px-2 py-1"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px` }}
          >
            <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>$</span>
            <input
              type="number"
              min={100}
              max={5000}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Math.min(5000, Math.max(100, Number(e.target.value) || 100)))}
              className="tabular-nums-auto w-14 bg-transparent text-right text-[12px] font-semibold outline-none"
              style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
            />
          </div>
        </div>
        <input
          type="range"
          min={100}
          max={5000}
          step={50}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <div className="flex justify-between text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          <span>$100</span>
          <span>$5,000</span>
        </div>
      </div>
    );
  }

  // 07. Precision Quantity Stepper (- N +)
  if (variantId === 'quantity-stepper-control') {
    return (
      <div className="flex items-center justify-between gap-3 p-4" style={cardStyle}>
        <div>
          <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Team Seats</div>
          <div className="text-[11px]" style={{ color: 'var(--ink-3)' }}>Min 1 · Max 10 per workspace</div>
        </div>
        <div
          className="inline-flex items-center overflow-hidden"
          style={{ border: '1px solid var(--border-strong)', borderRadius: `${innerR}px`, background: 'var(--surface-0)' }}
        >
          <button
            type="button"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="craft-pressable inline-flex h-8 w-8 items-center justify-center disabled:opacity-35"
            style={{ color: 'var(--ink-1)' }}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span
            className="tabular-nums-auto inline-flex h-8 min-w-10 items-center justify-center text-[13px] font-semibold"
            style={{
              borderLeft: '1px solid var(--border-subtle)',
              borderRight: '1px solid var(--border-subtle)',
              color: 'var(--ink-1)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {qty}
          </span>
          <button
            type="button"
            disabled={qty >= 10}
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="craft-pressable inline-flex h-8 w-8 items-center justify-center disabled:opacity-35"
            style={{ color: 'var(--ink-1)' }}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // 08. Compact Rating + Optional Note
  if (variantId === 'rating-feedback-control') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Rate your checkout experience</span>
          <span className="tabular-nums-auto text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            {rating} / 5
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className="craft-pressable inline-flex h-8 w-8 items-center justify-center"
              style={{
                borderRadius: `${innerR}px`,
                background: n <= rating ? 'var(--accent-soft)' : 'var(--surface-0)',
                border: n <= rating ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                color: n <= rating ? 'var(--ink-1)' : 'var(--ink-3)',
              }}
            >
              <Star className="h-3.5 w-3.5" fill={n <= rating ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
        <input
          placeholder="Optional: tell us what felt smooth or slow…"
          className="craft-focus px-2.5 py-1.5 text-[12px] outline-none"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
        />
      </div>
    );
  }

  // 09. Share Link + Permission Selector
  if (variantId === 'share-link-invite-box') {
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            <Link2 className="h-3.5 w-3.5 opacity-75" />
            Share Project
          </span>
          <select
            value={shareRole}
            onChange={(e) => setShareRole(e.target.value)}
            className="rounded px-2 py-0.5 text-[11px] font-medium outline-none"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', color: 'var(--ink-2)' }}
          >
            <option>Can view</option>
            <option>Can edit</option>
            <option>Private only</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="min-w-0 flex-1 truncate px-2.5 py-1.5 text-[11.5px]"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px`, color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
          >
            https://app.studio/p/northstar-q4
          </div>
          <button
            type="button"
            onClick={() => {
              setCopiedLink(true);
              window.setTimeout(() => setCopiedLink(false), 1200);
            }}
            className="craft-pressable inline-flex h-8 shrink-0 items-center gap-1 px-3 text-[11.5px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: `${innerR}px` }}
          >
            {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedLink ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    );
  }

  // 10. Tactile Variant / Size Tile Picker
  const sizes = [
    { id: 'S', stock: true },
    { id: 'M', stock: true },
    { id: 'L', stock: true },
    { id: 'XL', stock: false },
  ];
  return (
    <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>Select Size</span>
        <span className="text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          Picked: {sizePick}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((s) => {
          const act = sizePick === s.id;
          return (
            <button
              key={s.id}
              type="button"
              disabled={!s.stock}
              onClick={() => setSizePick(s.id)}
              className="craft-pressable h-9 text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                borderRadius: `${innerR}px`,
                background: act ? 'var(--accent)' : 'var(--surface-0)',
                color: act ? 'var(--accent-ink)' : 'var(--ink-1)',
                border: act ? '1px solid transparent' : '1px solid var(--border-strong)',
                textDecoration: !s.stock ? 'line-through' : 'none',
              }}
            >
              {s.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
