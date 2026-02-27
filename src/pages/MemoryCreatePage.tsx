import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { RichTextEditor } from '@/components/memory/RichTextEditor'
import { VoiceRecorder } from '@/components/memory/VoiceRecorder'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { createStory } from '@/services/storyService'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { ERAS } from '@/lib/constants'
import toast from 'react-hot-toast'

export function MemoryCreatePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [era, setEra] = useState('')
  const [location, setLocation] = useState('')
  const [characters, setCharacters] = useState('')
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setCoverImage(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const handleSubmit = async (status: 'draft' | 'pending_review') => {
    if (!title.trim() || !content.trim()) {
      toast.error('Vui lòng nhập tiêu đề và nội dung')
      return
    }
    if (!user) return

    setSubmitting(true)
    try {
      let cover_image_url: string | null = null
      let audio_url: string | null = null

      if (coverImage) {
        const ext = coverImage.name.split('.').pop()
        const path = `stories/${user.id}/${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('uploads').upload(path, coverImage)
        if (!error) {
          const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(path)
          cover_image_url = urlData.publicUrl
        }
      }

      if (audioBlob) {
        const path = `audio/${user.id}/${Date.now()}.webm`
        const { error } = await supabase.storage.from('uploads').upload(path, audioBlob)
        if (!error) {
          const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(path)
          audio_url = urlData.publicUrl
        }
      }

      const charList = characters
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)

      const excerpt = content.replace(/<[^>]+>/g, '').slice(0, 200)

      await createStory({
        title: title.trim(),
        content,
        excerpt,
        cover_image_url,
        audio_url,
        author_id: user.id,
        era: era || null,
        location: location || null,
        characters: charList.length > 0 ? charList : null,
        entities: null,
        status,
      })

      toast.success(status === 'draft' ? 'Đã lưu bản nháp' : 'Đã gửi ký ức để duyệt')
      navigate('/chia-se-ky-uc')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi khi tạo ký ức')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-serif text-3xl font-bold text-maroon-800 mb-6">Tạo ký ức mới</h1>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Tiêu đề *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 text-maroon-900 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none"
              placeholder="Tiêu đề ký ức..."
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Ảnh bìa</label>
            {coverPreview ? (
              <div className="relative rounded-xl overflow-hidden">
                <img src={coverPreview} alt="Cover" className="w-full aspect-video object-cover" />
                <button
                  onClick={() => { setCoverImage(null); setCoverPreview(null) }}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-gold-400 bg-gold-50' : 'border-maroon-300 hover:border-maroon-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 text-maroon-400 mx-auto mb-2" />
                <p className="text-sm text-maroon-500">Kéo thả hoặc click để tải ảnh</p>
                <p className="text-xs text-maroon-400 mt-1">JPG, PNG, WebP - Tối đa 5MB</p>
              </div>
            )}
          </div>

          {/* Voice Recorder */}
          <VoiceRecorder onRecorded={setAudioBlob} />

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Nội dung *</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-maroon-700 mb-1">Thời kỳ</label>
              <select
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 text-maroon-900 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none bg-white"
              >
                <option value="">Chọn thời kỳ</option>
                {ERAS.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-maroon-700 mb-1">Địa điểm</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 text-maroon-900 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none"
                placeholder="Nơi xảy ra sự kiện..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">
              Nhân vật liên quan (cách nhau bởi dấu phẩy)
            </label>
            <input
              type="text"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 text-maroon-900 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none"
              placeholder="Nguyễn Văn A, Trần Văn B..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-maroon-200">
            <button
              onClick={() => handleSubmit('pending_review')}
              disabled={submitting}
              className="px-6 py-2.5 bg-maroon-700 text-white rounded-lg font-medium hover:bg-maroon-600 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Đang gửi...' : 'Gửi duyệt'}
            </button>
            <button
              onClick={() => handleSubmit('draft')}
              disabled={submitting}
              className="px-6 py-2.5 bg-white border border-maroon-300 text-maroon-600 rounded-lg font-medium hover:bg-maroon-50 transition-colors disabled:opacity-50"
            >
              Lưu bản nháp
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
