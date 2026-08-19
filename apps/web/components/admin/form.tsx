'use client'

import { ReactNode } from 'react'

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

export function Field({ label, required, error, hint, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm
        focus:outline-none focus:border-[#e30019] focus:ring-2 focus:ring-red-100 transition-colors
        disabled:bg-neutral-100 disabled:cursor-not-allowed
        ${props.className || ''}`}
    />
  )
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm
        focus:outline-none focus:border-[#e30019] focus:ring-2 focus:ring-red-100 transition-colors
        ${props.className || ''}`}
    />
  )
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white
        focus:outline-none focus:border-[#e30019] focus:ring-2 focus:ring-red-100 transition-colors
        ${props.className || ''}`}
    >
      {props.children}
    </select>
  )
}

export function Button({ variant = 'primary', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }) {
  const variants = {
    primary: 'bg-[#e30019] text-white hover:bg-[#b8001c]',
    secondary: 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
  }
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${variants[variant]} ${props.className || ''}`}
    >
      {children}
    </button>
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm ${className || ''}`}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-neutral-900">{title}</h3>
        {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}