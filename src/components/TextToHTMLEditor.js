// components/SunTextEditor.jsx
'use client'

import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css'

// Disable SSR for this component
const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false })

export default function SunTextEditor() {
  const handleChange = (content) => {
    console.log('Content:', content)
  }

  return (
    <SunEditor
      defaultValue="Start writing..."
      onChange={handleChange}
      setOptions={{
        height: 200,
        buttonList: [
          ['undo', 'redo'],
          ['bold', 'underline', 'italic'],
          ['list', 'link', 'image'],
        ],
      }}
    />
  )
}
