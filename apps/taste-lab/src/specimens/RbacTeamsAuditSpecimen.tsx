import { useState } from 'react';
import {
  Building2,
  Check,
  FileDown,
  KeyRound,
  Laptop,
  Lock,
  Shield,
  ShieldCheck,
  UserCheck,
  UserPlus,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function RbacTeamsAuditSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'members-invites-directory':
      return <MembersInvitesDirectory ctx={ctx} />;
    case 'rbac-permission-matrix':
      return <RbacPermissionMatrix ctx={ctx} />;
    case 'immutable-audit-trail':
      return <ImmutableAuditTrail ctx={ctx} />;
    case 'jit-access-approval-queue':
      return <JitAccessApprovalQueue ctx={ctx} />;
    case 'org-tenant-switcher-guard':
      return <OrgTenantSwitcherGuard ctx={ctx} />;
    case 'service-accounts-console':
      return <ServiceAccountsConsole ctx={ctx} />;
    case 'sso-saml-scim-setup':
      return <SsoSamlScimSetup ctx={ctx} />;
    case 'active-sessions-security':
      return <ActiveSessionsSecurity ctx={ctx} />;
    case 'conditional-access-policy':
      return <ConditionalAccessPolicy ctx={ctx} />;
    case 'compliance-evidence-center':
      return <ComplianceEvidenceCenter ctx={ctx} />;
    default:
      return null;
  }
}

// 01 · Members & Pending Invites Directory
function MembersInvitesDirectory({ ctx }: { ctx: SpecimenContext }) {
  const [members, setMembers] = useState([
    { id: 'm1', name: 'A. Chen', email: 'achen@acme.io', role: 'Admin', status: 'Active' },
    { id: 'm2', name: 'R. Patel', email: 'rpatel@acme.io', role: 'Editor', status: 'Active' },
    { id: 'm3', name: 'L. Gomez', email: 'lgomez@acme.io', role: 'Viewer', status: 'Invited' },
  ]);

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>Team Members ({members.length})</span>
        <span className="inline-flex items-center gap-1 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          <UserPlus className="h-3 w-3" /> 1 pending
        </span>
      </div>
      {members.map((m) => (
        <div key={m.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[12px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="min-w-0">
            <div className="font-medium" style={{ color: 'var(--ink-1)' }}>{m.name}</div>
            <div className="truncate text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              {ctx.breakUi ? `enterprise.${m.email}` : m.email} · {m.status}
            </div>
          </div>
          <select
            value={m.role}
            onChange={(e) => setMembers((prev) => prev.map((x) => (x.id === m.id ? { ...x, role: e.target.value } : x)))}
            className="rounded-md px-2 py-1 text-[11px]"
            style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
          >
            <option>Admin</option>
            <option>Editor</option>
            <option>Auditor</option>
            <option>Viewer</option>
          </select>
        </div>
      ))}
    </div>
  );
}

// 02 · RBAC Role & Granular Permission Matrix
function RbacPermissionMatrix({ ctx }: { ctx: SpecimenContext }) {
  const [role, setRole] = useState<'Admin' | 'Operator' | 'Auditor'>('Operator');
  const [perms, setPerms] = useState<Record<string, boolean>>({
    'apps:read': true,
    'apps:write': true,
    'apps:delete': false,
    'secrets:read': false,
    'secrets:write': false,
    'secrets:delete': false,
    'audit:read': true,
    'audit:write': false,
    'audit:delete': false,
  });

  const resources = [
    { id: 'apps', label: ctx.breakUi ? 'Applications & Deployments' : 'Applications' },
    { id: 'secrets', label: 'Secrets Vault' },
    { id: 'audit', label: 'Audit Logs' },
  ];

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Shield className="h-3.5 w-3.5" /> Role Matrix
        </span>
        <div className="flex gap-1">
          {(['Admin', 'Operator', 'Auditor'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className="rounded px-2 py-0.5 text-[10.5px] font-medium"
              style={{ background: role === r ? 'var(--accent)' : 'var(--surface-0)', color: role === r ? 'var(--accent-ink)' : 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full border-collapse text-left text-[11.5px]">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            <th className="px-3 py-1.5 text-[10px] uppercase">Resource</th>
            <th className="px-2 py-1.5 text-center text-[10px] uppercase">Read</th>
            <th className="px-2 py-1.5 text-center text-[10px] uppercase">Write</th>
            <th className="px-2 py-1.5 text-center text-[10px] uppercase">Delete</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td className="px-3 py-2 font-medium" style={{ color: 'var(--ink-1)' }}>{res.label}</td>
              {(['read', 'write', 'delete'] as const).map((act) => {
                const key = `${res.id}:${act}`;
                const checked = role === 'Admin' ? true : role === 'Auditor' ? act === 'read' : Boolean(perms[key]);
                return (
                  <td key={act} className="px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => setPerms((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className="inline-flex h-5 w-5 items-center justify-center rounded"
                      style={{
                        background: checked ? 'var(--accent)' : 'var(--surface-1)',
                        color: checked ? 'var(--accent-ink)' : 'var(--ink-3)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {checked ? <Check className="h-3 w-3" /> : null}
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

// 03 · Immutable Audit Trail Explorer with State Diff
function ImmutableAuditTrail({ ctx }: { ctx: SpecimenContext }) {
  const [openId, setOpenId] = useState<string>('ev-1');
  const events = [
    { id: 'ev-1', actor: 'achen@acme.io', action: 'role.updated', target: 'rpatel@acme.io', ip: '198.51.100.14', before: '{"role":"Viewer"}', after: '{"role":"Editor"}' },
    { id: 'ev-2', actor: 'ci-bot', action: 'secret.rotated', target: 'STRIPE_WEBHOOK_SECRET', ip: '10.0.4.22', before: '{"ver":3}', after: '{"ver":4}' },
  ];

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      {events.map((ev) => {
        const expanded = openId === ev.id;
        return (
          <div key={ev.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={() => setOpenId(expanded ? '' : ev.id)}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[11.5px]"
              style={{ background: expanded ? 'var(--surface-1)' : 'transparent' }}
            >
              <div className="min-w-0">
                <span className="font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{ev.action}</span>
                <span className="ml-1.5" style={{ color: 'var(--ink-2)' }}>{ev.actor} → {ctx.breakUi ? `${ev.target} (org_prod)` : ev.target}</span>
              </div>
              <span className="shrink-0 text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{ev.ip}</span>
            </button>
            {expanded && (
              <div className="grid grid-cols-2 gap-2 px-3 pb-2.5 text-[10.5px]" style={{ background: 'var(--surface-1)', fontFamily: 'var(--dial-font-mono)' }}>
                <div className="rounded p-2" style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}>- {ev.before}</div>
                <div className="rounded p-2" style={{ background: 'var(--success-soft)', color: 'var(--success)' }}>+ {ev.after}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// 04 · JIT Access Approval Queue
function JitAccessApprovalQueue({ ctx }: { ctx: SpecimenContext }) {
  const [reqs, setReqs] = useState([
    { id: 'req-1', user: 'K. Okafor', scope: 'Prod Read-Only DB', ttl: '2 hours', reason: 'Investigating ticket INC-402', state: 'pending' as 'pending' | 'approved' | 'denied' },
    { id: 'req-2', user: 'M. Silva', scope: 'Billing Admin', ttl: '4 hours', reason: 'Q4 invoice reconciliation', state: 'pending' as 'pending' | 'approved' | 'denied' },
  ]);

  const decide = (id: string, state: 'approved' | 'denied') => {
    setReqs((prev) => prev.map((r) => (r.id === id ? { ...r, state } : r)));
  };

  return (
    <div className="flex flex-col gap-2">
      {reqs.map((r) => (
        <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              <UserCheck className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
              <span>{r.user} · {r.scope}</span>
              <span className="rounded px-1.5 py-0.5 text-[9.5px]" style={{ background: 'var(--surface-2)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>{r.ttl}</span>
            </div>
            <div className="text-[11px]" style={{ color: 'var(--ink-3)' }}>{ctx.breakUi ? `${r.reason} — approved by on-call lead` : r.reason}</div>
          </div>
          {r.state === 'pending' ? (
            <div className="flex gap-1.5">
              <button type="button" onClick={() => decide(r.id, 'denied')} className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10.5px]" style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}>
                <X className="h-3 w-3" /> Deny
              </button>
              <button type="button" onClick={() => decide(r.id, 'approved')} className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10.5px] font-medium" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
                <Check className="h-3 w-3" /> Approve
              </button>
            </div>
          ) : (
            <span className="rounded px-2 py-0.5 text-[10.5px] font-semibold uppercase" style={{ background: r.state === 'approved' ? 'var(--success-soft)' : 'var(--danger-soft)', color: r.state === 'approved' ? 'var(--success)' : 'var(--danger)', fontFamily: 'var(--dial-font-mono)' }}>
              {r.state}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// 05 · Organization & Tenant Switcher with Prod Safety Guard
function OrgTenantSwitcherGuard({ ctx }: { ctx: SpecimenContext }) {
  const [tenant, setTenant] = useState('prod-acme');
  const tenants = [
    { id: 'prod-acme', name: 'Acme Health (Prod)', role: 'Owner', prod: true },
    { id: 'stg-acme', name: 'Acme Health (Staging)', role: 'Admin', prod: false },
    { id: 'sand-dev', name: 'Developer Sandbox', role: 'Member', prod: false },
  ];
  const current = tenants.find((t) => t.id === tenant) ?? tenants[0];

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: `1px solid ${current.prod ? 'var(--danger)' : 'var(--border-subtle)'}` }}>
      <div className="flex items-center justify-between text-[10.5px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color: current.prod ? 'var(--danger)' : 'var(--ink-3)' }}>
          <Building2 className="h-3.5 w-3.5" /> {current.prod ? 'PRODUCTION TENANT ACTIVE' : 'NON-PROD WORKSPACE'}
        </span>
        <span style={{ color: 'var(--ink-3)' }}>{current.role}</span>
      </div>
      <div className={`grid gap-1.5 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {tenants.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTenant(t.id)}
            className="rounded-lg p-2 text-left text-[11.5px]"
            style={{
              background: tenant === t.id ? 'var(--surface-2)' : 'var(--surface-1)',
              border: `1px solid ${tenant === t.id ? 'var(--accent)' : 'var(--border-subtle)'}`,
              color: 'var(--ink-1)',
            }}
          >
            <div className="truncate font-medium">{t.name}</div>
            <div className="text-[10px]" style={{ color: 'var(--ink-3)' }}>{t.role}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// 06 · Service Accounts & Machine Identity Console
function ServiceAccountsConsole({ ctx }: { ctx: SpecimenContext }) {
  const [rotated, setRotated] = useState<string | null>(null);
  const accounts = [
    { id: 'sa-1', name: 'terraform-provisioner@svc', age: '14d', scopes: 'infra:write' },
    { id: 'sa-2', name: 'snowflake-etl-reader@svc', age: '88d', scopes: 'warehouse:read' },
  ];

  return (
    <div className="flex flex-col gap-2">
      {accounts.map((a) => (
        <div key={a.id} className="flex items-center justify-between gap-2 rounded-lg p-2.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
              <KeyRound className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{ctx.breakUi ? `${a.name}.internal.local` : a.name}</span>
            </div>
            <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              Key age: {rotated === a.id ? '0d (rotated)' : a.age} · {a.scopes}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRotated(a.id)}
            className="shrink-0 rounded px-2 py-1 text-[10.5px] font-medium"
            style={{ background: 'var(--surface-2)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
          >
            {rotated === a.id ? 'Rotated' : 'Rotate Key'}
          </button>
        </div>
      ))}
    </div>
  );
}

// 07 · SSO / SAML & SCIM Provisioning Setup
function SsoSamlScimSetup({ ctx }: { ctx: SpecimenContext }) {
  const [idp, setIdp] = useState<'Okta' | 'Entra ID' | 'Google'>('Okta');
  const [tested, setTested] = useState(false);

  return (
    <div className="flex flex-col gap-2.5 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          {(['Okta', 'Entra ID', 'Google'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setIdp(p);
                setTested(false);
              }}
              className="rounded-md px-2 py-1 text-[11px] font-medium"
              style={{ background: idp === p ? 'var(--accent)' : 'var(--surface-1)', color: idp === p ? 'var(--accent-ink)' : 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setTested(true)}
          className="rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{ background: tested ? 'var(--success-soft)' : 'var(--surface-2)', color: tested ? 'var(--success)' : 'var(--ink-1)' }}
        >
          {tested ? '✓ SAML Handshake OK' : 'Test Connection'}
        </button>
      </div>
      <div className="rounded-md p-2 text-[10.5px]" style={{ background: 'var(--surface-1)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
        ACS URL: {ctx.breakUi ? 'https://auth.enterprise-platform.example.com/saml/v2/acs/acme' : 'https://auth.acme.io/saml/acs'} · SCIM 2.0 Sync: Active
      </div>
    </div>
  );
}

// 08 · Active Sessions & Device Security Table
function ActiveSessionsSecurity({ ctx }: { ctx: SpecimenContext }) {
  const [sessions, setSessions] = useState([
    { id: 's1', device: 'MacBook Pro · Chrome', loc: 'San Francisco, US', current: true },
    { id: 's2', device: 'iPhone 16 · Mobile Web', loc: 'San Francisco, US', current: false },
    { id: 's3', device: 'Linux CLI · API Session', loc: 'Ashburn, US', current: false },
  ]);

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <span className="text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Active Sessions ({sessions.length})</span>
        <button
          type="button"
          onClick={() => setSessions((prev) => prev.filter((s) => s.current))}
          className="text-[10.5px] font-medium"
          style={{ color: 'var(--danger)' }}
        >
          Sign out others
        </button>
      </div>
      {sessions.map((s) => (
        <div key={s.id} className="flex items-center justify-between gap-2 px-3 py-2 text-[11.5px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-2">
            <Laptop className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
            <div>
              <div className="font-medium" style={{ color: 'var(--ink-1)' }}>{ctx.breakUi ? `${s.device} (v131)` : s.device}</div>
              <div className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>{s.loc}</div>
            </div>
          </div>
          {s.current ? (
            <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--success-soft)', color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>Current</span>
          ) : (
            <button type="button" onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))} className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
              Revoke
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// 09 · Conditional Access Policy Rules
function ConditionalAccessPolicy({ ctx }: { ctx: SpecimenContext }) {
  const [mfa, setMfa] = useState(true);
  const [ipLock, setIpLock] = useState(true);
  const [timeoutHrs, setTimeoutHrs] = useState(8);

  return (
    <div className="flex flex-col gap-2.5 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      {[
        { label: ctx.breakUi ? 'Enforce Phishing-Resistant MFA (WebAuthn / Passkey)' : 'Enforce MFA for all admins', val: mfa, set: setMfa },
        { label: 'Restrict Prod API to corporate CIDR allowlist', val: ipLock, set: setIpLock },
      ].map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-2 text-[11.5px]">
          <span className="flex items-center gap-1.5" style={{ color: 'var(--ink-1)' }}>
            <Lock className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
            {row.label}
          </span>
          <button
            type="button"
            onClick={() => row.set(!row.val)}
            className="rounded px-2 py-0.5 text-[10.5px] font-semibold"
            style={{ background: row.val ? 'var(--accent)' : 'var(--surface-2)', color: row.val ? 'var(--accent-ink)' : 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            {row.val ? 'Enforced' : 'Off'}
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1 text-[11px]" style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--ink-2)' }}>
        <span>Idle Session Timeout</span>
        <div className="flex items-center gap-2">
          <input type="range" min={1} max={24} value={timeoutHrs} onChange={(e) => setTimeoutHrs(Number(e.target.value))} />
          <span className="tabular-nums-auto w-8 text-right font-semibold" style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-1)' }}>{timeoutHrs}h</span>
        </div>
      </div>
    </div>
  );
}

// 10 · Compliance & Evidence Export Center
function ComplianceEvidenceCenter({ ctx }: { ctx: SpecimenContext }) {
  const [exported, setExported] = useState(false);
  const controls = [
    { id: 'CC6.1', label: 'Logical Access Controls & RBAC', ok: true },
    { id: 'CC7.2', label: 'Immutable Audit Trail Retention (7y)', ok: true },
    { id: 'CC8.1', label: 'Quarterly Access Review Sign-off', ok: !ctx.breakUi },
  ];

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <ShieldCheck className="h-4 w-4" style={{ color: 'var(--success)' }} /> SOC 2 / HIPAA Evidence
        </span>
        <button
          type="button"
          onClick={() => setExported(true)}
          className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          <FileDown className="h-3 w-3" /> {exported ? 'Packet Ready (.zip)' : 'Export Packet'}
        </button>
      </div>
      {controls.map((c) => (
        <div key={c.id} className="flex items-center justify-between rounded px-2.5 py-1.5 text-[11.5px]" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ color: 'var(--ink-1)' }}>
            <strong style={{ fontFamily: 'var(--dial-font-mono)' }}>{c.id}</strong> · {c.label}
          </span>
          <span className="text-[10.5px] font-semibold" style={{ color: c.ok ? 'var(--success)' : 'var(--danger)', fontFamily: 'var(--dial-font-mono)' }}>
            {c.ok ? 'PASS' : 'DUE'}
          </span>
        </div>
      ))}
    </div>
  );
}
