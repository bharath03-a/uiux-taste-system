import { useState } from 'react';
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  Laptop,
  Lock,
  Mail,
  Shield,
  ShieldAlert,
  Smartphone,
  Trash2,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function AuthSecuritySpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'minimal-signin-card':
      return <MinimalSignInCard ctx={ctx} />;
    case 'magic-link-passkey':
      return <MagicLinkPasskey ctx={ctx} />;
    case 'otp-six-digit':
      return <OtpSixDigit ctx={ctx} />;
    case 'password-strength-meter':
      return <PasswordStrengthMeter ctx={ctx} />;
    case 'api-key-vault':
      return <ApiKeyVault ctx={ctx} />;
    case 'active-sessions-list':
      return <ActiveSessionsList ctx={ctx} />;
    case 'rbac-permission-matrix':
      return <RbacPermissionMatrix ctx={ctx} />;
    case 'sso-enterprise-gate':
      return <SsoEnterpriseGate ctx={ctx} />;
    case 'cookie-consent-compact':
      return <CookieConsentCompact ctx={ctx} />;
    case 'danger-zone-confirm':
      return <DangerZoneConfirm ctx={ctx} />;
    default:
      return null;
  }
}

function MinimalSignInCard({ ctx }: { ctx: SpecimenContext }) {
  const [email, setEmail] = useState(
    ctx.breakUi ? 'very.long.enterprise.workspace.admin@global-corp.example.com' : 'alex@studio.dev',
  );
  const [showPw, setShowPw] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div
      className="flex flex-col gap-3 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          Sign in to workspace
        </span>
        <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
          SSO ready
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {['Continue with Google', 'Continue with GitHub'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setSignedIn(true)}
            className="craft-pressable craft-focus truncate rounded-md px-2.5 py-1.5 text-[11.5px] font-medium"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-1)',
              border: '1px solid var(--border-strong)',
            }}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
        <span className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
        <span>or email</span>
        <span className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setSignedIn(false);
        }}
        className="craft-focus w-full rounded-md px-2.5 py-1.5 text-[12px] outline-none"
        style={{
          background: 'var(--surface-0)',
          color: 'var(--ink-1)',
          border: '1px solid var(--border-subtle)',
        }}
      />
      <div
        className="flex items-center rounded-md px-2.5"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <input
          type={showPw ? 'text' : 'password'}
          defaultValue="correct-horse-battery"
          className="w-full bg-transparent py-1.5 text-[12px] outline-none"
          style={{ color: 'var(--ink-1)' }}
        />
        <button
          type="button"
          onClick={() => setShowPw((v) => !v)}
          style={{ color: 'var(--ink-3)' }}
          aria-label="Toggle password visibility"
        >
          {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
      </div>
      <button
        type="button"
        onClick={() => setSignedIn(true)}
        className="craft-pressable craft-focus rounded-md py-2 text-[12px] font-semibold"
        style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
      >
        {signedIn ? 'Signed in ✓' : 'Sign in'}
      </button>
    </div>
  );
}

function MagicLinkPasskey({ ctx }: { ctx: SpecimenContext }) {
  const [mode, setMode] = useState<'passkey' | 'magic'>('passkey');
  const [sent, setSent] = useState(false);

  return (
    <div
      className="flex flex-col gap-3 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="grid grid-cols-2 gap-1 rounded-lg p-0.5"
        style={{ background: 'var(--surface-recessed)' }}
      >
        {(
          [
            ['passkey', 'Passkey'],
            ['magic', 'Magic Link'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setMode(id);
              setSent(false);
            }}
            className="rounded-md py-1 text-[11.5px] font-medium"
            style={{
              background: mode === id ? 'var(--surface-1)' : 'transparent',
              color: mode === id ? 'var(--ink-1)' : 'var(--ink-3)',
              boxShadow: mode === id ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'passkey' ? (
        <div className="flex flex-col items-center gap-2.5 py-2 text-center">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}
          >
            <Fingerprint className="h-5 w-5" />
          </span>
          <div className="text-[12px]" style={{ color: 'var(--ink-2)' }}>
            {ctx.breakUi
              ? 'Authenticate with Touch ID, Face ID, or hardware YubiKey across all synced org realms.'
              : 'Sign in instantly with Touch ID or hardware key.'}
          </div>
          <button
            type="button"
            onClick={() => setSent(true)}
            className="craft-pressable craft-focus w-full rounded-md py-2 text-[12px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {sent ? 'Verified via Passkey ✓' : 'Use Passkey'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
            <Mail className="h-3.5 w-3.5" />
            <span>We&apos;ll email a 1-time sign-in link (expires in 10m).</span>
          </div>
          <button
            type="button"
            onClick={() => setSent(true)}
            className="craft-pressable craft-focus rounded-md py-2 text-[12px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {sent ? 'Magic link sent — check inbox ✓' : 'Send Magic Link'}
          </button>
        </div>
      )}
    </div>
  );
}

function OtpSixDigit({ ctx }: { ctx: SpecimenContext }) {
  const [digits, setDigits] = useState(['4', '8', '2', '', '', '']);
  const filled = digits.every((d) => d.length === 1);

  return (
    <div
      className="flex flex-col gap-3 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div>
        <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          Two-factor verification
        </div>
        <div className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
          {ctx.breakUi
            ? 'Enter the 6-digit TOTP authenticator code (or paste full code directly).'
            : 'Enter the 6-digit code from your authenticator app.'}
        </div>
      </div>
      <div className="flex items-center justify-between gap-1.5">
        {digits.map((val, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(-1);
              setDigits((prev) => prev.map((d, i) => (i === idx ? v : d)));
            }}
            className="craft-focus tabular-nums-auto h-10 w-full max-w-[44px] rounded-md text-center text-[15px] font-semibold outline-none"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-1)',
              border: `1px solid ${val ? 'var(--accent)' : 'var(--border-strong)'}`,
              fontFamily: 'var(--dial-font-mono)',
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setDigits(['4', '8', '2', '9', '1', '0'])}
          className="text-[11px] font-medium underline-offset-2 hover:underline"
          style={{ color: 'var(--ink-2)' }}
        >
          Auto-fill demo code
        </button>
        <span
          className="text-[11px] font-medium"
          style={{ color: filled ? 'var(--success)' : 'var(--ink-3)' }}
        >
          {filled ? 'Code verified ✓' : `${digits.filter(Boolean).length}/6 digits`}
        </span>
      </div>
    </div>
  );
}

function PasswordStrengthMeter({ ctx }: { ctx: SpecimenContext }) {
  const [pw, setPw] = useState(ctx.breakUi ? 'Sup3r!Long#Passphrase_2026' : 'design-craft9');
  const checks = [
    { label: '12+ chars', ok: pw.length >= 12 },
    { label: 'Number', ok: /\d/.test(pw) },
    { label: 'Symbol', ok: /[^a-zA-Z0-9]/.test(pw) },
    { label: 'Mixed case', ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw) },
  ];
  const score = checks.filter((c) => c.ok).length;

  return (
    <div
      className="flex flex-col gap-2.5 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
          New password
        </span>
        <span
          className="text-[11px] font-medium"
          style={{
            color: score >= 3 ? 'var(--success)' : 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          {score <= 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong'}
        </span>
      </div>
      <input
        type="text"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="craft-focus w-full rounded-md px-2.5 py-1.5 text-[12px] outline-none"
        style={{
          background: 'var(--surface-0)',
          color: 'var(--ink-1)',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      />
      <div className="grid grid-cols-4 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-colors"
            style={{
              background:
                i < score ? (score >= 3 ? 'var(--success)' : 'var(--accent)') : 'var(--surface-2)',
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 pt-0.5">
        {checks.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1 text-[10.5px]"
            style={{ color: c.ok ? 'var(--ink-1)' : 'var(--ink-3)' }}
          >
            <Check className="h-3 w-3" style={{ opacity: c.ok ? 1 : 0.3 }} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ApiKeyVault({ ctx }: { ctx: SpecimenContext }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const rawKey = ctx.breakUi
    ? 'sk_live_prod_us_east_2_9f8a7c6d5e4f3a2b1c0d9e8f'
    : 'sk_live_9f8a7c6d5e4f3a2b';

  return (
    <div
      className="flex flex-col gap-2.5 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <KeyRound className="h-3.5 w-3.5" />
          Production Secret Key
        </span>
        <span
          className="rounded px-1.5 py-0.5 text-[10px]"
          style={{
            background: 'var(--surface-2)',
            color: 'var(--ink-2)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          read:write
        </span>
      </div>
      <div
        className="flex items-center justify-between gap-2 rounded-md px-2.5 py-2"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <code
          className="min-w-0 flex-1 truncate text-[11.5px]"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          {revealed ? rawKey : `${rawKey.slice(0, 10)}••••••••••••${rawKey.slice(-4)}`}
        </code>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className="craft-pressable rounded p-1"
            style={{ color: 'var(--ink-2)' }}
            aria-label="Reveal key"
          >
            {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="craft-pressable inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium"
            style={{
              background: 'var(--surface-1)',
              color: 'var(--ink-1)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ActiveSessionsList({ ctx }: { ctx: SpecimenContext }) {
  const [sessions, setSessions] = useState([
    { id: 'mac', device: 'MacBook Pro · Chrome', loc: 'San Francisco, US', current: true },
    { id: 'ios', device: 'iPhone 16 Pro · Safari', loc: 'Austin, US · 2h ago', current: false },
  ]);

  return (
    <div
      className="flex flex-col divide-y overflow-hidden"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {sessions.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between gap-2 px-3.5 py-2.5"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            {s.current ? (
              <Laptop className="h-4 w-4 shrink-0" style={{ color: 'var(--ink-2)' }} />
            ) : (
              <Smartphone className="h-4 w-4 shrink-0" style={{ color: 'var(--ink-3)' }} />
            )}
            <div className="min-w-0">
              <div className="truncate text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
                {ctx.breakUi && s.current ? `${s.device} (Corporate MDM Managed)` : s.device}
              </div>
              <div className="truncate text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
                {s.loc}
              </div>
            </div>
          </div>
          {s.current ? (
            <span
              className="shrink-0 rounded px-1.5 py-0.5 text-[10.5px] font-medium"
              style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}
            >
              Current
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setSessions((prev) => prev.filter((item) => item.id !== s.id))}
              className="craft-pressable shrink-0 rounded px-2 py-1 text-[11px] font-medium"
              style={{
                background: 'var(--danger-soft)',
                color: 'var(--danger)',
              }}
            >
              Revoke
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function RbacPermissionMatrix({ ctx }: { ctx: SpecimenContext }) {
  const [perms, setPerms] = useState<Record<string, boolean>>({
    'deploy:editor': true,
    'billing:editor': false,
    'deploy:viewer': false,
    'billing:viewer': false,
  });

  const toggle = (k: string) => setPerms((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div
      className="overflow-hidden"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <table className="w-full text-left text-[11.5px]">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)' }}>
            <th className="px-3 py-2 font-medium">{ctx.breakUi ? 'Workspace Capability' : 'Scope'}</th>
            <th className="px-3 py-2 text-center font-medium">Editor</th>
            <th className="px-3 py-2 text-center font-medium">Viewer</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 'deploy', label: 'Deploy Releases' },
            { id: 'billing', label: 'Manage Billing' },
          ].map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td className="px-3 py-2 font-medium" style={{ color: 'var(--ink-1)' }}>
                {row.label}
              </td>
              {['editor', 'viewer'].map((role) => {
                const key = `${row.id}:${role}`;
                const on = perms[key];
                return (
                  <td key={role} className="px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      className="craft-pressable inline-flex h-5 w-5 items-center justify-center rounded"
                      style={{
                        background: on ? 'var(--accent)' : 'var(--surface-0)',
                        color: on ? 'var(--accent-ink)' : 'var(--ink-3)',
                        border: `1px solid ${on ? 'transparent' : 'var(--border-strong)'}`,
                      }}
                    >
                      {on && <Check className="h-3 w-3" />}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SsoEnterpriseGate({ ctx }: { ctx: SpecimenContext }) {
  const [domain, setDomain] = useState(ctx.breakUi ? 'corp-global-holdings.co.uk' : 'acme.com');
  const [matched, setMatched] = useState(true);

  return (
    <div
      className="flex flex-col gap-2.5 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-2 text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
        <Shield className="h-4 w-4" />
        Enterprise SAML / OIDC SSO
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value);
            setMatched(e.target.value.includes('.'));
          }}
          placeholder="company.com"
          className="craft-focus min-w-0 flex-1 rounded-md px-2.5 py-1.5 text-[12px] outline-none"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        />
        <button
          type="button"
          className="craft-pressable shrink-0 rounded-md px-3 py-1.5 text-[12px] font-semibold"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          Continue
        </button>
      </div>
      <div className="text-[11px]" style={{ color: matched ? 'var(--success)' : 'var(--ink-3)' }}>
        {matched ? `Okta SAML detected for @${domain}` : 'Enter your work email domain to locate your IdP.'}
      </div>
    </div>
  );
}

function CookieConsentCompact({ ctx }: { ctx: SpecimenContext }) {
  const [choice, setChoice] = useState<'none' | 'essential' | 'all'>('none');

  return (
    <div
      className="flex flex-col gap-3 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="flex items-start gap-2.5">
        <Lock className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--ink-2)' }} />
        <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
          {ctx.breakUi
            ? 'We use strictly necessary session cookies and optional privacy-first analytics (no cross-site ad tracking).'
            : 'We use essential cookies and optional anonymous product analytics.'}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        {choice !== 'none' ? (
          <span className="text-[11.5px] font-medium" style={{ color: 'var(--success)' }}>
            Saved: {choice === 'all' ? 'All cookies' : 'Essential only'} ✓
          </span>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setChoice('essential')}
              className="craft-pressable rounded-md px-2.5 py-1 text-[11.5px] font-medium"
              style={{
                background: 'var(--surface-0)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-strong)',
              }}
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => setChoice('all')}
              className="craft-pressable rounded-md px-2.5 py-1 text-[11.5px] font-semibold"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              Accept All
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function DangerZoneConfirm({ ctx }: { ctx: SpecimenContext }) {
  const target = ctx.breakUi ? 'prod-analytics-primary' : 'acme-prod';
  const [typed, setTyped] = useState('');
  const [deleted, setDeleted] = useState(false);
  const ready = typed.trim() === target;

  return (
    <div
      className="flex flex-col gap-2.5 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--danger)',
      }}
    >
      <div className="flex items-center gap-2 text-[12px] font-semibold" style={{ color: 'var(--danger)' }}>
        <ShieldAlert className="h-4 w-4" />
        Delete workspace permanently
      </div>
      <p className="text-[11px]" style={{ color: 'var(--ink-2)' }}>
        Type <code style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-1)' }}>{target}</code> to confirm.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={typed}
          onChange={(e) => {
            setTyped(e.target.value);
            setDeleted(false);
          }}
          placeholder={target}
          className="craft-focus min-w-0 flex-1 rounded-md px-2.5 py-1.5 text-[11.5px] outline-none"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        />
        <button
          type="button"
          disabled={!ready}
          onClick={() => setDeleted(true)}
          className="craft-pressable inline-flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-[11.5px] font-semibold disabled:cursor-not-allowed disabled:opacity-45"
          style={{ background: 'var(--danger)', color: 'var(--danger-ink)' }}
        >
          <Trash2 className="h-3 w-3" />
          {deleted ? 'Deleted' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
