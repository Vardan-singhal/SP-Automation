import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import api from '../api/axios';

const ToolbarButton = ({ onClick, active, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-2.5 py-1.5 rounded text-sm border ${
      active ? 'bg-red-600 text-white border-red-600' : 'bg-white hover:bg-gray-100 border-gray-300'
    }`}
  >
    {children}
  </button>
);

const RichTextEditor = ({ value, onChange, placeholder = 'Write your blog content...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline' } }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  });

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await api.post('/admin/blogs/uploads/blog-image', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      alert('Image upload failed');
    } finally {
      e.target.value = '';
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 border-b">
        <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <i className="bi bi-type-bold" />
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i className="bi bi-type-italic" />
        </ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <i className="bi bi-type-underline" />
        </ToolbarButton>
        <ToolbarButton title="Strike" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <i className="bi bi-type-strikethrough" />
        </ToolbarButton>

        <span className="w-px bg-gray-300 mx-1" />

        <ToolbarButton title="H2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolbarButton>
        <ToolbarButton title="H3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolbarButton>
        <ToolbarButton title="Paragraph" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>
          P
        </ToolbarButton>

        <span className="w-px bg-gray-300 mx-1" />

        <ToolbarButton title="Bullet List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <i className="bi bi-list-ul" />
        </ToolbarButton>
        <ToolbarButton title="Numbered List" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <i className="bi bi-list-ol" />
        </ToolbarButton>
        <ToolbarButton title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <i className="bi bi-quote" />
        </ToolbarButton>

        <span className="w-px bg-gray-300 mx-1" />

        <ToolbarButton title="Align Left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          <i className="bi bi-text-left" />
        </ToolbarButton>
        <ToolbarButton title="Align Center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          <i className="bi bi-text-center" />
        </ToolbarButton>
        <ToolbarButton title="Align Right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          <i className="bi bi-text-right" />
        </ToolbarButton>

        <span className="w-px bg-gray-300 mx-1" />

        <ToolbarButton title="Link" active={editor.isActive('link')} onClick={setLink}>
          <i className="bi bi-link-45deg" />
        </ToolbarButton>

        <label className="px-2.5 py-1.5 rounded text-sm border bg-white hover:bg-gray-100 border-gray-300 cursor-pointer">
          <i className="bi bi-image" />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>

        <span className="w-px bg-gray-300 mx-1" />

        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <i className="bi bi-arrow-counterclockwise" />
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <i className="bi bi-arrow-clockwise" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;