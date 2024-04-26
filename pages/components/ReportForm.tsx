import React, { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Text from '@tiptap/extension-text';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
// import Blockquote from '@tiptap/extension-blockquote';
// import BulletList from '@tiptap/extension-bullet-list';
// import Code from '@tiptap/extension-code';
// import CodeBlock from '@tiptap/extension-code-block';
// import Dropcursor from '@tiptap/extension-dropcursor';
// import Gapcursor from '@tiptap/extension-gapcursor';
// import HardBreak from '@tiptap/extension-hard-break';
// import Heading from '@tiptap/extension-heading';
// import HorizontalRule from '@tiptap/extension-horizontal-rule';
// import ListItem from '@tiptap/extension-list-item';
// import OrderedList from '@tiptap/extension-ordered-list';
// import Paragraph from '@tiptap/extension-paragraph';
// import Strike from '@tiptap/extension-strike';
import { ToggleButton, ToggleButtonGroup, Button, TextField, Stack } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useRouter } from 'next/router';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';

const ReportForm = () => {
    const router = useRouter();
    const handleVoltar = () => {
        router.push('/');
    };


    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Bold,
            Italic,
            Text,
            Underline, // Adicione a extensão de sublinhado
            BulletList, // Adicione a extensão de lista com marcadores
            OrderedList, // Adicione a extensão de lista numerada
            Blockquote, // Adicione a extensão de citação
            // Blockquote,
            // BulletList,
            // Code,
            // CodeBlock,
            // Dropcursor,
            // Gapcursor,
            // HardBreak,
            // Heading,
            // HorizontalRule,
            // ListItem,
            // OrderedList,
            // Paragraph,
            // Strike,
        ],
        content: '<p>Escreva aqui ...</p>',
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

    const toggleUnderline = () => { // Defina a função para alternar o sublinhado
        editor.chain().focus().toggleUnderline().run();
    };

    const handleSubmit = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const content = editor.getHTML(); // Obtém o conteúdo HTML do editor
        try {
            const response = await fetch(`${apiUrl}/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, tags }),
            });
            console.log("O QUE TEM AQUI", response);
            if (response.ok) {
                const report = await response.json();
                console.log('Report criado:', report);
                router.push(`/reports/${report.id}`);
            } else {
                console.error('Erro ao criar report:', response);
            }
        } catch (error) {
            console.error('Erro ao enviar conteúdo do report:', error);
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
            <ToggleButtonGroup value={[]} onChange={() => { }} aria-label="text formatting" sx={{ mt: 1, display: "flex", justifyContent: "center" }}>

                <ToggleButton value="bold" aria-label="bold">
                    <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                    <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underline" aria-label="underline" onClick={toggleUnderline}>
                    <FormatUnderlinedIcon />
                </ToggleButton>
                <ToggleButton value="bulletList" aria-label="bullet list">
                    <FormatListBulletedIcon />
                </ToggleButton>
                <ToggleButton value="numberedList" aria-label="numbered list">
                    <FormatListNumberedIcon />
                </ToggleButton>
                <ToggleButton value="quote" aria-label="quote">
                    <FormatQuoteIcon />
                </ToggleButton>

                <ToggleButton value="bold" aria-label="bold" onClick={toggleBold}>
                    <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic" onClick={toggleItalic}>
                    <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton
                    component="label"
                    value="insertImage"
                    lang='asd'
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
                <ToggleButton value="insertChart">
                    <CandlestickChartIcon />
                </ToggleButton>
            </ToggleButtonGroup>
            <EditorContent
                editor={editor}
                style={{
                    border: '1px solid #ccc',
                    marginTop: '16px',
                    minHeight: '200px', // Definindo altura mínima
                    borderRadius: '4px',
                }}
            />
            <Stack flexDirection="row" justifyContent="space-between" my={2}>
                <Button variant="contained" color="error" size="small" onClick={handleVoltar}> Cancelar </Button>
                <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
            </Stack>
        </div>
    );
};

export default ReportForm;