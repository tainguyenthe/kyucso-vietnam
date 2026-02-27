import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { Bold, Italic, List, ListOrdered, Heading2, Quote, ImageIcon, Undo, Redo } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ content, onChange, placeholder = 'Viết câu chuyện của bạn...', className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: true }),
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML())
    },
  })

  if (!editor) return null

  const toolbarButtons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), title: 'In đậm' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), title: 'In nghiêng' },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), title: 'Tiêu đề' },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), title: 'Danh sách' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), title: 'Danh sách số' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), title: 'Trích dẫn' },
    {
      icon: ImageIcon,
      action: () => {
        const url = window.prompt('URL hình ảnh:')
        if (url) editor.chain().focus().setImage({ src: url }).run()
      },
      active: false,
      title: 'Chèn ảnh',
    },
    { icon: Undo, action: () => editor.chain().focus().undo().run(), active: false, title: 'Hoàn tác' },
    { icon: Redo, action: () => editor.chain().focus().redo().run(), active: false, title: 'Làm lại' },
  ]

  return (
    <div className={cn('border border-maroon-300 rounded-xl overflow-hidden bg-white', className)}>
      <div className="flex flex-wrap gap-0.5 px-2 py-1.5 border-b border-maroon-200 bg-maroon-50">
        {toolbarButtons.map((btn, i) => {
          const Icon = btn.icon
          return (
            <button
              key={i}
              type="button"
              onClick={btn.action}
              title={btn.title}
              className={cn(
                'p-1.5 rounded hover:bg-maroon-200 transition-colors',
                btn.active ? 'bg-maroon-200 text-maroon-800' : 'text-maroon-500'
              )}
            >
              <Icon className="w-4 h-4" />
            </button>
          )
        })}
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-4 py-3 min-h-[200px] focus-within:ring-2 focus-within:ring-gold-400 [&_.tiptap]:outline-none [&_.tiptap_p.is-editor-empty:first-child::before]:text-maroon-300 [&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:h-0 [&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none"
      />
    </div>
  )
}
