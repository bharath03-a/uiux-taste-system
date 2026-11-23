import { useState } from 'react';
import {
  Check,
  CheckCircle2,
  CreditCard,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Star,
  Tag,
  Truck,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function CommerceCheckoutSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'product-card-quick-add':
      return <ProductCardQuickAdd ctx={ctx} />;
    case 'cart-line-items':
      return <CartLineItems ctx={ctx} />;
    case 'promo-order-summary':
      return <PromoOrderSummary ctx={ctx} />;
    case 'shipping-speed-selector':
      return <ShippingSpeedSelector ctx={ctx} />;
    case 'payment-method-tabs':
      return <PaymentMethodTabs ctx={ctx} />;
    case 'order-tracking-stepper':
      return <OrderTrackingStepper ctx={ctx} />;
    case 'inventory-stock-indicator':
      return <InventoryStockIndicator ctx={ctx} />;
    case 'review-histogram-summary':
      return <ReviewHistogramSummary ctx={ctx} />;
    case 'variant-swatch-selector':
      return <VariantSwatchSelector ctx={ctx} />;
    case 'order-confirmed-receipt':
      return <OrderConfirmedReceipt ctx={ctx} />;
    default:
      return null;
  }
}

function ProductCardQuickAdd({ ctx }: { ctx: SpecimenContext }) {
  const [added, setAdded] = useState(false);
  return (
    <div
      className="flex flex-col gap-2.5 p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="flex h-20 items-center justify-center rounded-md"
        style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}
      >
        <ShoppingBag className="h-6 w-6" style={{ color: 'var(--ink-3)' }} />
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {ctx.breakUi ? 'Precision Anodized Aluminum Desk Dock (Gen 4)' : 'Aluminum Desk Dock'}
          </div>
          <div className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
            In stock · Free returns
          </div>
        </div>
        <span
          className="tabular-nums-auto shrink-0 text-[13px] font-semibold"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          $89.00
        </span>
      </div>
      <button
        type="button"
        onClick={() => setAdded((v) => !v)}
        className="craft-pressable rounded-md py-1.5 text-[12px] font-semibold"
        style={{
          background: added ? 'var(--surface-2)' : 'var(--accent)',
          color: added ? 'var(--ink-1)' : 'var(--accent-ink)',
        }}
      >
        {added ? 'Added to Bag ✓' : 'Quick Add'}
      </button>
    </div>
  );
}

function CartLineItems({ ctx }: { ctx: SpecimenContext }) {
  const [qty, setQty] = useState(1);
  const price = 64;
  return (
    <div
      className="flex items-center justify-between gap-3 p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="min-w-0">
        <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          {ctx.breakUi ? 'Mechanical Keycap Set — Monochrome PBT' : 'PBT Keycap Set'}
        </div>
        <div
          className="tabular-nums-auto text-[11.5px]"
          style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
        >
          ${(qty * price).toFixed(2)}
        </div>
      </div>
      <div
        className="inline-flex shrink-0 items-center rounded-md"
        style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)' }}
      >
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-2 py-1"
          style={{ color: 'var(--ink-1)' }}
          aria-label="Decrease"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span
          className="tabular-nums-auto px-2 text-[11.5px] font-semibold"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="px-2 py-1"
          style={{ color: 'var(--ink-1)' }}
          aria-label="Increase"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function PromoOrderSummary({ ctx }: { ctx: SpecimenContext }) {
  const [code, setCode] = useState('CRAFT20');
  const [applied, setApplied] = useState(true);
  const subtotal = ctx.breakUi ? 12480 : 128;
  const discount = applied ? subtotal * 0.2 : 0;

  return (
    <div
      className="flex flex-col gap-2.5 p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex gap-1.5">
        <div
          className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md px-2"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}
        >
          <Tag className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-w-0 flex-1 bg-transparent py-1 text-[11.5px] outline-none"
            style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
          />
        </div>
        <button
          type="button"
          onClick={() => setApplied((v) => !v)}
          className="craft-pressable rounded-md px-2.5 py-1 text-[11.5px] font-medium"
          style={{ background: 'var(--surface-2)', color: 'var(--ink-1)' }}
        >
          {applied ? 'Remove' : 'Apply'}
        </button>
      </div>
      <div className="flex flex-col gap-1 text-[11.5px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
        <div className="flex justify-between" style={{ color: 'var(--ink-2)' }}>
          <span>Subtotal</span>
          <span className="tabular-nums-auto">${subtotal.toFixed(2)}</span>
        </div>
        {applied && (
          <div className="flex justify-between" style={{ color: 'var(--success)' }}>
            <span>Promo ({code})</span>
            <span className="tabular-nums-auto">−${discount.toFixed(2)}</span>
          </div>
        )}
        <div
          className="mt-1 flex justify-between pt-1.5 font-semibold"
          style={{ color: 'var(--ink-1)', borderTop: '1px solid var(--border-subtle)' }}
        >
          <span>Total</span>
          <span className="tabular-nums-auto">${(subtotal - discount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function ShippingSpeedSelector({ ctx }: { ctx: SpecimenContext }) {
  const [speed, setSpeed] = useState<'std' | 'exp'>('std');
  const opts = [
    { id: 'std' as const, label: 'Standard (3–5 days)', price: 'Free' },
    { id: 'exp' as const, label: ctx.breakUi ? 'Next-Day Priority Air Courier' : 'Express (Next day)', price: '$14.00' },
  ];
  return (
    <div className="flex flex-col gap-2">
      {opts.map((o) => {
        const active = speed === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setSpeed(o.id)}
            className="craft-pressable flex items-center justify-between gap-2 px-3 py-2.5 text-left"
            style={{
              background: 'var(--surface-1)',
              borderRadius: 'var(--dial-radius)',
              border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
            }}
          >
            <span className="inline-flex min-w-0 items-center gap-2">
              <Truck className="h-3.5 w-3.5 shrink-0" style={{ color: active ? 'var(--ink-1)' : 'var(--ink-3)' }} />
              <span className="truncate text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
                {o.label}
              </span>
            </span>
            <span
              className="tabular-nums-auto shrink-0 text-[11.5px] font-semibold"
              style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {o.price}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PaymentMethodTabs({ ctx }: { ctx: SpecimenContext }) {
  const [method, setMethod] = useState<'card' | 'apple' | 'invoice'>('card');
  return (
    <div
      className="flex flex-col gap-2.5 p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="grid grid-cols-3 gap-1 rounded-md p-0.5" style={{ background: 'var(--surface-recessed)' }}>
        {(
          [
            ['card', 'Card'],
            ['apple', 'Wallet'],
            ['invoice', 'Invoice'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMethod(id)}
            className="rounded py-1 text-[11.5px] font-medium"
            style={{
              background: method === id ? 'var(--surface-1)' : 'transparent',
              color: method === id ? 'var(--ink-1)' : 'var(--ink-3)',
              boxShadow: method === id ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
        <CreditCard className="h-3.5 w-3.5" />
        <span>
          {method === 'card'
            ? ctx.breakUi
              ? 'Visa •••• 4242 · 3DSecure Verified'
              : 'Visa ending in 4242'
            : method === 'apple'
              ? '1-tap Express Apple Pay / Google Pay'
              : 'Net-30 corporate purchase order'}
        </span>
      </div>
    </div>
  );
}

function OrderTrackingStepper({ ctx }: { ctx: SpecimenContext }) {
  const [step, setStep] = useState(2);
  const steps = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];
  return (
    <div
      className="flex flex-col gap-3 p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Package className="h-3.5 w-3.5" />
          {ctx.breakUi ? 'Order #ORD-2026-9941820' : 'Order #9941'}
        </span>
        <button
          type="button"
          onClick={() => setStep((s) => (s + 1) % steps.length)}
          className="text-[11px] font-medium"
          style={{ color: 'var(--ink-2)' }}
        >
          Advance →
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {steps.map((label, idx) => (
          <div key={label} className="flex flex-col gap-1">
            <span
              className="h-1.5 rounded-full"
              style={{ background: idx <= step ? 'var(--accent)' : 'var(--surface-2)' }}
            />
            <span
              className="truncate text-[10.5px] font-medium"
              style={{ color: idx <= step ? 'var(--ink-1)' : 'var(--ink-3)' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryStockIndicator({ ctx }: { ctx: SpecimenContext }) {
  const [stock, setStock] = useState(3);
  return (
    <div
      className="flex items-center justify-between gap-2 px-3.5 py-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: stock === 0 ? 'var(--danger)' : stock <= 3 ? 'var(--accent)' : 'var(--success)' }}
        />
        <span className="text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
          {stock === 0
            ? 'Out of stock — notify me'
            : stock <= 3
              ? ctx.breakUi
                ? `Only ${stock} units left in San Jose warehouse`
                : `Only ${stock} left — ships today`
              : 'In stock — ready to ship'}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setStock((s) => (s === 0 ? 12 : s === 12 ? 3 : 0))}
        className="rounded px-2 py-0.5 text-[11px]"
        style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}
      >
        Cycle
      </button>
    </div>
  );
}

function ReviewHistogramSummary({ ctx }: { ctx: SpecimenContext }) {
  const bars = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];
  return (
    <div
      className="flex items-center gap-4 p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="shrink-0 text-center">
        <div
          className="tabular-nums-auto text-[22px] font-bold leading-none"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          4.8
        </div>
        <div className="mt-1 flex justify-center gap-0.5" style={{ color: 'var(--ink-1)' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3 w-3" fill="currentColor" />
          ))}
        </div>
        <div className="mt-1 text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
          {ctx.breakUi ? '14,820 reviews' : '428 reviews'}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {bars.map((b) => (
          <div key={b.stars} className="flex items-center gap-2 text-[10.5px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
            <span className="w-3 text-right" style={{ color: 'var(--ink-3)' }}>
              {b.stars}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
              <span className="block h-full rounded-full" style={{ width: `${b.pct}%`, background: 'var(--accent)' }} />
            </span>
            <span className="tabular-nums-auto w-7 text-right" style={{ color: 'var(--ink-2)' }}>
              {b.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VariantSwatchSelector({ ctx }: { ctx: SpecimenContext }) {
  const [finish, setFinish] = useState('Matte Slate');
  const finishes = ['Matte Slate', 'Brushed Silver', 'Warm Ceramic'];
  return (
    <div
      className="flex flex-col gap-2 p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11.5px]">
        <span style={{ color: 'var(--ink-3)' }}>Finish</span>
        <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>
          {ctx.breakUi ? `${finish} (Limited Edition)` : finish}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {finishes.map((f) => {
          const active = finish === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFinish(f)}
              className="craft-pressable inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11.5px] font-medium"
              style={{
                background: active ? 'var(--accent)' : 'var(--surface-0)',
                color: active ? 'var(--accent-ink)' : 'var(--ink-1)',
                border: `1px solid ${active ? 'transparent' : 'var(--border-strong)'}`,
              }}
            >
              {active && <Check className="h-3 w-3" />}
              {f}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OrderConfirmedReceipt({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div
      className="flex flex-col gap-2.5 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: 'var(--success)' }}>
        <CheckCircle2 className="h-4 w-4" />
        Order confirmed
      </div>
      <div className="text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
        Receipt sent to alex@studio.dev · Est. delivery Thu, Nov 26.
      </div>
      <div
        className="flex items-center justify-between rounded-md px-3 py-2 text-[11.5px]"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        <span style={{ color: 'var(--ink-3)' }}>{ctx.breakUi ? 'ORD-2026-9941820' : '#ORD-9941'}</span>
        <span className="tabular-nums-auto font-semibold" style={{ color: 'var(--ink-1)' }}>
          $102.40 Paid
        </span>
      </div>
    </div>
  );
}
