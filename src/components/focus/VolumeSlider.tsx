'use client'

interface VolumeSliderProps {
  volume: number
  onChange: (volume: number) => void
}

export default function VolumeSlider({ volume, onChange }: VolumeSliderProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-white/40">
        {volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => onChange(Number(e.target.value))}
        className="volume-slider h-1 w-24 cursor-pointer appearance-none rounded-full bg-white/10 outline-none"
        style={{
          background: `linear-gradient(to right, var(--vibe-accent) ${volume}%, rgba(255,255,255,0.1) ${volume}%)`,
        }}
      />
    </div>
  )
}
