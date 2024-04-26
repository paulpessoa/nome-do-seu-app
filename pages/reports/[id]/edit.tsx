import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToggleButton, ToggleButtonGroup, Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Text from '@tiptap/extension-text';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DOMPurify from 'dompurify'; // Importando dompurify


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const EditReportPage = ({ report }) => {
  const router = useRouter();
  const [editedReport, setEditedReport] = useState(report);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Text,
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      Blockquote,
    ],
    content: editedReport ? editedReport.content : '',
  });

  useEffect(() => {
    if (report) {
      setEditedReport(report);
    }
  }, [report]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReport({ ...editedReport, [name]: value });
  };

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/reports/${editedReport.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedReport),
      });
      if (!response.ok) {
        throw new Error('Failed to update report');
      }
      router.push(`/reports/${editedReport.id}`);
    } catch (error) {
      console.error('Error updating report:', error.message);
    }
  };

  const handleVoltar = () => {
    router.back();
  };

  return (
    <Container maxWidth="md">
      <Stack flexDirection="row" justifyContent="space-between" p={2}>
        <Typography fontSize={20} gutterBottom>
          Editar Relatório
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={editedReport ? editedReport.title : ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags"
          name="tags"
          value={editedReport ? editedReport.tags : ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <ToggleButtonGroup value={[]} onChange={() => { }} aria-label="text formatting" sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
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

          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ border: '1px solid #ccc', my: 2, minHeight: 300, borderRadius: '4px', }}>
          <EditorContent editor={editor} />
        </Box>
        <Stack flexDirection="row" justifyContent="space-between" my={2}>
          <Button variant="contained" color="error" onClick={handleVoltar}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await fetch(`${apiUrl}/reports/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch report');
    }
    const report = await response.json();
    return {
      props: {
        report,
      },
    };
  } catch (error) {
    console.error('Error fetching report:', error.message);
    return {
      props: {
        report: null,
      },
    };
  }
}

export default EditReportPage;
