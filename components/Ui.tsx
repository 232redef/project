import Link from "next/link";
import { ReactNode } from "react";

export function PageTitle({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      {text && <p className="mt-2 text-slate-600">{text}</p>}
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      ⚠️ {message}
    </div>
  );
}

export function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition">
      {children}
    </Link>
  );
}

export function PrimaryButton({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, disabled }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition disabled:opacity-50"
    >
      {children}
    </button>
  );
}
