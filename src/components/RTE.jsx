import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200' > {label}</label >
            }
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                        initialValue={defaultValue}
                        init={{
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family: Inter, system-ui, -apple-system, sans-serif; font-size:16px; line-height:1.7; color:#18181b; }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
