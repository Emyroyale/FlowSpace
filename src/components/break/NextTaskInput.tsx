'use client'

interface NextTaskInputProps {
  value: string
  onChange: (value: string) => void
}

export default function NextTaskInput({ value, onChange }: NextTaskInputProps) {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What will you focus on next?"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center font-geist text-base text-white placeholder-white/30 outline-none transition-all focus:border-[var(--vibe-accent)] focus:ring-1 focus:ring-[var(--vibe-accent)]"
      />
    </div>
  )
}
