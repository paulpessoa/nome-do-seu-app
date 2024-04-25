import React, { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import { ToggleButton, ToggleButtonGroup, Button, TextField } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Blockquote,
            Bold,
            BulletList,
            Code,
            CodeBlock,
            Dropcursor,
            Gapcursor,
            HardBreak,
            Heading,
            HorizontalRule,
            Italic,
            ListItem,
            OrderedList,
            Paragraph,
            Strike,
            Text,
        ],
        content: '<p>Hello World! 🌎️</p>',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const insertImageFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.onload = () => {
                    const maxWidth = 500; // Defina a largura máxima desejada
                    const maxHeight = 500; // Defina a altura máxima desejada
                    let width = img.width;
                    let height = img.height;
                    if (width > maxWidth || height > maxHeight) {
                        const aspectRatio = width / height;
                        if (width > height) {
                            width = maxWidth;
                            height = width / aspectRatio;
                        } else {
                            height = maxHeight;
                            width = height * aspectRatio;
                        }
                    }
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                        const resizedImageUrl = canvas.toDataURL('image/jpeg');
                        editor.chain().focus().setImage({ src: resizedImageUrl }).run();
                    }
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleBold = () => {
        editor.chain().focus().toggleBold().run();
    };

    const toggleItalic = () => {
        editor.chain().focus().toggleItalic().run();
    };

    const toggleUnderline = () => {
        editor.chain().focus().toggleUnderline().run();
    };

    const handleSubmit = async () => {
        const content = editor.getHTML(); // Obtém o conteúdo HTML do editor
        try {
            const response = await fetch('http://localhost:3004/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, tags }),
            });
            if (response.ok) {
                console.log('Conteúdo do post enviado com sucesso!');
            } else {
                console.error('Erro ao enviar conteúdo do post.');
            }
        } catch (error) {
            console.error('Erro ao enviar conteúdo do post:', error);
        }
    };

    return (
        <div>
            <TextField
                label="Título"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Tags"
                variant="outlined"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                fullWidth
                margin="normal"
            />
            <ToggleButtonGroup value={[]} onChange={() => { }} aria-label="text formatting">
                <ToggleButton value="bold" aria-label="bold" onClick={toggleBold}>
                    <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic" onClick={toggleItalic}>
                    <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined" onClick={toggleUnderline}>
                    <FormatUnderlinedIcon />
                </ToggleButton>
                <ToggleButton
                    component="label"
                    value="insertImage"
                    aria-label="inserir imagem"
                >
                    <InsertPhotoIcon />
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={insertImageFromFile}
                    />
                </ToggleButton>
            </ToggleButtonGroup>
            <EditorContent
                editor={editor}
                style={{
                    border: '1px solid #ccc',
                    marginTop: '10px',
                    padding: '10px', // Adicionando padding interno
                    minHeight: '200px', // Definindo altura mínima
                }}
            />
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleSubmit}>Salvar Post</Button>

        </div>
    );
};

export default PostForm;
