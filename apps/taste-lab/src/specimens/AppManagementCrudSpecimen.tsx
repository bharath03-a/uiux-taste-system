import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  Clock,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Play,
  Plug,
  Plus,
  RefreshCw,
  Server,
  Trash2,
  Webhook,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function AppManagementCrudSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'resource-directory-provision':
      return <ResourceDirectoryProvision ctx={ctx} />;
    case 'workspace-settings-dirty-bar':
      return <WorkspaceSettingsDirtyBar ctx={ctx} />;
    case 'feature-flags-rollout-matrix':
      return <FeatureFlagsRolloutMatrix ctx={ctx} />;
    case 'env-vars-secrets-vault':
      return <EnvVarsSecretsVault ctx={ctx} />;
    case 'api-keys-token-manager':
      return <ApiKeysTokenManager ctx={ctx} />;
    case 'webhooks-delivery-trace':
      return <WebhooksDeliveryTrace ctx={ctx} />;
    case 'integrations-connected-apps':
      return <IntegrationsConnectedApps ctx={ctx} />;
    case 'plan-usage-quotas-metering':
      return <PlanUsageQuotasMetering ctx={ctx} />;
    case 'danger-zone-typed-confirm':
      return <DangerZoneTypedConfirm ctx={ctx} />;
    case 'scheduled-jobs-cron-manager':
      return <ScheduledJobsCronManager ctx={ctx} />;
    default:
      return null;
  }
}

// 01 · Resource Directory + Quick Provision Inline Form
function ResourceDirectoryProvision({ ctx }: { ctx: SpecimenContext }) {
  const [apps, setApps] = useState([
    { id: 'svc-1', name: 'customer-portal-web', tier: 'Production', region: 'us-east-1', healthy: true },
    { id: 'svc-2', name: 'billing-worker', tier: 'Production', region: 'us-east-1', healthy: true },
    { id: 'svc-3', name: 'staging-preview', tier: 'Staging', region: 'eu-west-1', healthy: false },
  ]);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  const createApp = () => {
    const clean = newName.trim();
    if (!clean) return;
    setApps((prev) => [{ id: `svc-${Date.now()}`, name: clean, tier: 'Staging', region: 'us-east-1', healthy: true }, ...prev]);
    setNewName('');
    setAdding(false);
  };

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Server className="h-3.5 w-3.5" /> Applications ({apps.length})
        </span>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          <Plus className="h-3 w-3" /> New App
        </button>
      </div>

      {adding && (
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: 'var(--accent-soft)', borderBottom: '1px solid var(--border-subtle)' }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createApp()}
            placeholder="e.g. notifications-api"
            className="min-w-0 flex-1 rounded px-2 py-1 text-[11.5px] outline-none"
            style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-strong)' }}
          />
          <button type="button" onClick={createApp} className="rounded px-2.5 py-1 text-[11px] font-medium" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
            Create
          </button>
        </div>
      )}

      <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
        {apps.map((a) => (
          <div key={a.id} className="flex items-center justify-between gap-2 px-3 py-2 text-[12px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="min-w-0">
              <div className="truncate font-medium" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
                {ctx.breakUi ? `${a.name}-cluster-primary-east` : a.name}
              </div>
              <div className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>{a.tier} · {a.region}</div>
            </div>
            <span
              className="rounded px-1.5 py-0.5 text-[10.5px] font-medium"
              style={{
                background: a.healthy ? 'var(--success-soft)' : 'var(--danger-soft)',
                color: a.healthy ? 'var(--success)' : 'var(--danger)',
              }}
            >
              {a.healthy ? 'Online' : 'Degraded'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 02 · Workspace Settings Shell + Floating Unsaved Changes Bar
function WorkspaceSettingsDirtyBar({ ctx }: { ctx: SpecimenContext }) {
  const [savedName, setSavedName] = useState('Acme Health Ops');
  const [name, setName] = useState('Acme Health Ops');
  const [region, setRegion] = useState('US-East (HIPAA)');
  const [savedRegion, setSavedRegion] = useState('US-East (HIPAA)');
  const dirty = name !== savedName || region !== savedRegion;

  return (
    <div className="flex flex-col gap-3 rounded-xl p-3.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className={`grid gap-3 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <label className="flex flex-col gap-1 text-[11px]">
          <span style={{ color: 'var(--ink-2)' }}>Workspace Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md px-2.5 py-1.5 text-[12px] outline-none"
            style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
          />
        </label>
        <label className="flex flex-col gap-1 text-[11px]">
          <span style={{ color: 'var(--ink-2)' }}>Data Residency</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-md px-2.5 py-1.5 text-[12px]"
            style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
          >
            <option>US-East (HIPAA)</option>
            <option>EU-Central (GDPR)</option>
            <option>AP-South (SG)</option>
          </select>
        </label>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2 text-[11.5px] transition-all"
        style={{
          background: dirty ? 'var(--surface-2)' : 'var(--surface-1)',
          border: `1px solid ${dirty ? 'var(--accent)' : 'var(--border-subtle)'}`,
        }}
      >
        <span style={{ color: dirty ? 'var(--ink-1)' : 'var(--ink-3)' }}>
          {dirty ? 'You have unsaved workspace changes.' : 'All settings synced.'}
        </span>
        <div className="flex items-center gap-1.5">
          {dirty && (
            <button
              type="button"
              onClick={() => {
                setName(savedName);
                setRegion(savedRegion);
              }}
              className="rounded px-2 py-1 text-[11px]"
              style={{ color: 'var(--ink-2)' }}
            >
              Reset
            </button>
          )}
          <button
            type="button"
            disabled={!dirty}
            onClick={() => {
              setSavedName(name);
              setSavedRegion(region);
            }}
            className="rounded-md px-2.5 py-1 text-[11px] font-medium disabled:opacity-40"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// 03 · Feature Flags & Gradual Rollout Matrix
function FeatureFlagsRolloutMatrix({ ctx }: { ctx: SpecimenContext }) {
  const [flags, setFlags] = useState([
    { key: 'bulk_csv_v2', label: 'Bulk CSV Importer v2', dev: true, prod: true, rollout: 100 },
    { key: 'ai_auto_triage', label: 'AI Auto-Triage Queue', dev: true, prod: false, rollout: 25 },
    { key: 'strict_audit_export', label: 'Signed Audit Bundles', dev: true, prod: true, rollout: 50 },
  ]);

  const toggleEnv = (key: string, env: 'dev' | 'prod') => {
    setFlags((prev) => prev.map((f) => (f.key === key ? { ...f, [env]: !f[env] } : f)));
  };

  const cycleRollout = (key: string) => {
    const steps = [0, 10, 25, 50, 100];
    setFlags((prev) =>
      prev.map((f) => (f.key === key ? { ...f, rollout: steps[(steps.indexOf(f.rollout) + 1) % steps.length] } : f)),
    );
  };

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="grid grid-cols-[1fr_54px_54px_68px] px-3 py-2 text-[10px] font-semibold uppercase" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
        <span>Flag</span>
        <span className="text-center">Dev</span>
        <span className="text-center">Prod</span>
        <span className="text-right">Rollout</span>
      </div>
      {flags.map((f) => (
        <div key={f.key} className="grid grid-cols-[1fr_54px_54px_68px] items-center px-3 py-2 text-[11.5px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="min-w-0 pr-2">
            <div className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>{ctx.breakUi ? `${f.label} (${f.key})` : f.label}</div>
            <div className="truncate text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{f.key}</div>
          </div>
          {(['dev', 'prod'] as const).map((env) => (
            <div key={env} className="flex justify-center">
              <button
                type="button"
                onClick={() => toggleEnv(f.key, env)}
                className="rounded px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: f[env] ? 'var(--accent)' : 'var(--surface-2)',
                  color: f[env] ? 'var(--accent-ink)' : 'var(--ink-3)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {f[env] ? 'ON' : 'OFF'}
              </button>
            </div>
          ))}
          <div className="text-right">
            <button
              type="button"
              onClick={() => cycleRollout(f.key)}
              className="tabular-nums-auto rounded px-1.5 py-0.5 text-[10.5px] font-medium"
              style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {f.rollout}%
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// 04 · Environment Variables & Secrets Vault
function EnvVarsSecretsVault({ ctx }: { ctx: SpecimenContext }) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const secrets = [
    { key: 'DATABASE_URL', scope: 'Production', val: 'postgres://prod-ro@db.internal:5432/core' },
    { key: 'STRIPE_WEBHOOK_SECRET', scope: 'All Envs', val: 'whsec_9a82f4e1c07b3d91a22' },
    { key: 'OIDC_CLIENT_SECRET', scope: 'Staging', val: 'oidc_sec_7190ab22f98e' },
  ];

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      {secrets.map((s) => {
        const show = Boolean(revealed[s.key]);
        return (
          <div key={s.key} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[11.5px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{s.key}</span>
                <span className="rounded px-1 py-0.5 text-[9.5px]" style={{ background: 'var(--surface-2)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{s.scope}</span>
              </div>
              <div className="mt-0.5 truncate text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                {show ? (ctx.breakUi ? `${s.val}?sslmode=verify-full&pool=40` : s.val) : '••••••••••••••••••••••••'}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setRevealed((prev) => ({ ...prev, [s.key]: !prev[s.key] }))}
                className="rounded p-1.5"
                style={{ background: 'var(--surface-1)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
                aria-label="Toggle reveal"
              >
                {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setCopied(s.key)}
                className="rounded p-1.5"
                style={{ background: 'var(--surface-1)', color: copied === s.key ? 'var(--success)' : 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
                aria-label="Copy secret"
              >
                {copied === s.key ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 05 · API Keys & Personal Access Tokens Manager
function ApiKeysTokenManager({ ctx }: { ctx: SpecimenContext }) {
  const [tokens, setTokens] = useState([
    { id: 't1', name: 'CI Deploy Bot', prefix: 'tk_live_9f2a', scope: 'read:apps, write:deploy', expires: '24d left' },
    { id: 't2', name: 'Read-Only BI Sync', prefix: 'tk_live_3c18', scope: 'read:metrics', expires: '89d left' },
  ]);

  return (
    <div className="flex flex-col gap-2">
      {tokens.map((t) => (
        <div key={t.id} className="flex items-center justify-between gap-2 rounded-lg p-2.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              <KeyRound className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <span className="truncate">{ctx.breakUi ? `${t.name} (Service Principal)` : t.name}</span>
            </div>
            <div className="mt-0.5 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              {t.prefix}•••• · {t.scope} · {t.expires}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTokens((prev) => prev.filter((x) => x.id !== t.id))}
            className="inline-flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[10.5px] font-medium"
            style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}
          >
            <Trash2 className="h-3 w-3" /> Revoke
          </button>
        </div>
      ))}
    </div>
  );
}

// 06 · Webhooks & Event Delivery Trace
function WebhooksDeliveryTrace({ ctx }: { ctx: SpecimenContext }) {
  const [deliveries, setDeliveries] = useState([
    { id: 'evt_81a', event: 'deployment.succeeded', status: 200, ms: 142 },
    { id: 'evt_80f', event: 'member.role_updated', status: 502, ms: 1840 },
  ]);

  const sendPing = () => {
    setDeliveries((prev) => [{ id: `evt_${Math.floor(Math.random() * 900 + 100)}`, event: 'ping.test', status: 200, ms: 88 }, ...prev.slice(0, 3)]);
  };

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between gap-2 px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <span className="flex min-w-0 items-center gap-1.5 truncate text-[11px]" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
          <Webhook className="h-3.5 w-3.5 shrink-0" />
          {ctx.breakUi ? 'https://hooks.enterprise-customer.example.com/v2/events' : 'https://hooks.acme.io/events'}
        </span>
        <button type="button" onClick={sendPing} className="shrink-0 rounded px-2 py-0.5 text-[10.5px] font-medium" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
          Send Ping
        </button>
      </div>
      {deliveries.map((d) => (
        <div key={d.id} className="flex items-center justify-between px-3 py-2 text-[11.5px]" style={{ borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}>
          <span style={{ color: 'var(--ink-1)' }}>{d.event}</span>
          <span className="flex items-center gap-2">
            <span style={{ color: 'var(--ink-3)' }}>{d.ms}ms</span>
            <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold" style={{ background: d.status === 200 ? 'var(--success-soft)' : 'var(--danger-soft)', color: d.status === 200 ? 'var(--success)' : 'var(--danger)' }}>
              HTTP {d.status}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

// 07 · Integrations & Connected Apps Marketplace
function IntegrationsConnectedApps({ ctx }: { ctx: SpecimenContext }) {
  const [connected, setConnected] = useState<Record<string, boolean>>({ github: true, slack: true, datadog: false, pagerduty: false });
  const items = [
    { id: 'github', name: 'GitHub Enterprise', desc: 'PR checks & auto-deploys' },
    { id: 'slack', name: 'Slack Alerts', desc: 'Incident & approval notifications' },
    { id: 'datadog', name: 'Datadog APM', desc: 'Distributed trace ingestion' },
    { id: 'pagerduty', name: 'PagerDuty', desc: 'On-call escalation schedules' },
  ];

  return (
    <div className={`grid gap-2 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {items.map((item) => {
        const on = connected[item.id];
        return (
          <div key={item.id} className="flex items-center justify-between gap-2 rounded-lg p-2.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                <Plug className="h-3.5 w-3.5 shrink-0" style={{ color: on ? 'var(--accent)' : 'var(--ink-3)' }} />
                <span className="truncate">{item.name}</span>
              </div>
              <div className="truncate text-[10.5px]" style={{ color: 'var(--ink-3)' }}>{item.desc}</div>
            </div>
            <button
              type="button"
              onClick={() => setConnected((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              className="shrink-0 rounded-md px-2 py-1 text-[10.5px] font-medium"
              style={{
                background: on ? 'var(--surface-2)' : 'var(--accent)',
                color: on ? 'var(--ink-1)' : 'var(--accent-ink)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {on ? 'Connected' : 'Connect'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// 08 · Plan Usage, Quotas & Seat Metering Panel
function PlanUsageQuotasMetering({ ctx }: { ctx: SpecimenContext }) {
  const meters = [
    { label: 'Active Seats', used: 42, limit: 50, unit: 'seats' },
    { label: 'API Requests (Monthly)', used: ctx.breakUi ? 962000 : 880000, limit: 1000000, unit: 'reqs' },
    { label: 'Audit Storage', used: 184, limit: 500, unit: 'GB' },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-xl p-3.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      {meters.map((m) => {
        const pct = Math.min(100, Math.round((m.used / m.limit) * 100));
        const high = pct >= 85;
        return (
          <div key={m.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="font-medium" style={{ color: 'var(--ink-1)' }}>{m.label}</span>
              <span className="tabular-nums-auto text-[11px]" style={{ color: high ? 'var(--danger)' : 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
                {m.used.toLocaleString()} / {m.limit.toLocaleString()} {m.unit} ({pct}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: high ? 'var(--danger)' : 'var(--accent)' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 09 · Danger Zone & Typed-Confirmation Destructive Card
function DangerZoneTypedConfirm({ ctx }: { ctx: SpecimenContext }) {
  const slug = ctx.breakUi ? 'acme-production-healthcare-core' : 'acme-prod';
  const [typed, setTyped] = useState('');
  const [deleted, setDeleted] = useState(false);
  const ready = typed === slug;

  return (
    <div className="flex flex-col gap-2.5 rounded-xl p-3.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--danger)' }}>
      <div className="flex items-center gap-2 text-[12px] font-semibold" style={{ color: 'var(--danger)' }}>
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>Delete Application Workspace</span>
      </div>
      <p className="text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
        Type <strong style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{slug}</strong> to confirm permanent deletion of all environments and audit logs.
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={typed}
          onChange={(e) => {
            setTyped(e.target.value);
            setDeleted(false);
          }}
          placeholder={slug}
          className="min-w-0 flex-1 rounded-md px-2.5 py-1.5 text-[11.5px] outline-none"
          style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}
        />
        <button
          type="button"
          disabled={!ready}
          onClick={() => setDeleted(true)}
          className="rounded-md px-3 py-1.5 text-[11.5px] font-medium disabled:opacity-35"
          style={{ background: 'var(--danger)', color: 'var(--accent-ink)' }}
        >
          {deleted ? 'Scheduled for Deletion' : 'Delete Workspace'}
        </button>
      </div>
    </div>
  );
}

// 10 · Scheduled Jobs & Cron Pipeline Manager
function ScheduledJobsCronManager({ ctx }: { ctx: SpecimenContext }) {
  const [jobs, setJobs] = useState([
    { id: 'j1', name: 'Nightly Billing Reconciliation', cron: '0 2 * * *', enabled: true, last: 'OK · 12s' },
    { id: 'j2', name: 'Hourly Metrics Rollup', cron: '0 * * * *', enabled: true, last: 'OK · 3s' },
    { id: 'j3', name: 'Weekly Orphan Cleanup', cron: '0 4 * * 0', enabled: false, last: 'Paused' },
  ]);

  const runNow = (id: string) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, last: 'Ran just now · OK' } : j)));
  };

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      {jobs.map((j) => (
        <div key={j.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[11.5px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-medium" style={{ color: 'var(--ink-1)' }}>
              <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
              <span className="truncate">{ctx.breakUi ? `${j.name} (us-east-1)` : j.name}</span>
            </div>
            <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              {j.cron} · {j.last}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setJobs((prev) => prev.map((x) => (x.id === j.id ? { ...x, enabled: !x.enabled } : x)))}
              className="rounded px-2 py-0.5 text-[10.5px] font-medium"
              style={{ background: j.enabled ? 'var(--success-soft)' : 'var(--surface-2)', color: j.enabled ? 'var(--success)' : 'var(--ink-3)' }}
            >
              {j.enabled ? 'Active' : 'Paused'}
            </button>
            <button
              type="button"
              onClick={() => runNow(j.id)}
              className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10.5px] font-medium"
              style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
            >
              <Play className="h-2.5 w-2.5" /> Run
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

void RefreshCw;
