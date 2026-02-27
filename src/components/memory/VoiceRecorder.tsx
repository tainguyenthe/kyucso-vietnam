import { Mic, Square, Trash2, Play } from 'lucide-react'
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder'
import { cn } from '@/lib/utils'

interface VoiceRecorderProps {
  onRecorded: (blob: Blob) => void
  className?: string
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function VoiceRecorder({ onRecorded, className }: VoiceRecorderProps) {
  const { isRecording, audioBlob, audioUrl, duration, startRecording, stopRecording, resetRecording } = useVoiceRecorder()

  const handleStop = () => {
    stopRecording()
    // onRecorded will be called after we get the blob
  }

  const handleUse = () => {
    if (audioBlob) onRecorded(audioBlob)
  }

  return (
    <div className={cn('p-4 bg-maroon-50 rounded-xl border border-maroon-200', className)}>
      <p className="text-sm font-medium text-maroon-700 mb-3">Ghi âm lời kể</p>

      {!audioUrl ? (
        <div className="flex items-center gap-3">
          {isRecording ? (
            <>
              <button
                onClick={handleStop}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                <Square className="w-4 h-4" />
                Dừng
              </button>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-maroon-600 font-mono">{formatDuration(duration)}</span>
              </div>
            </>
          ) : (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-4 py-2 bg-maroon-700 text-white rounded-lg hover:bg-maroon-600 transition-colors"
            >
              <Mic className="w-4 h-4" />
              Bắt đầu ghi âm
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <audio controls className="w-full" src={audioUrl}>
            Trình duyệt không hỗ trợ audio.
          </audio>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUse}
              className="flex items-center gap-2 px-3 py-1.5 bg-maroon-700 text-white rounded-lg text-sm hover:bg-maroon-600 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              Sử dụng bản ghi
            </button>
            <button
              onClick={resetRecording}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-maroon-300 text-maroon-600 rounded-lg text-sm hover:bg-maroon-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Ghi lại
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
