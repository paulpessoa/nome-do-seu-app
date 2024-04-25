import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
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
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const EditPostPage = ({ post }) => {
  const router = useRouter();
  const [editedPost, setEditedPost] = useState(post);
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
    content: editedPost ? editedPost.content : '', // Adicionando verificação para editedPost
  });

  useEffect(() => {
    if (post) {
      setEditedPost(post);
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/posts/${editedPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPost),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      router.push(`/posts/${editedPost.id}`);
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

    const handleVoltar = () => {
        router.back();
    };

  return (
    <Container maxWidth="md">
       <Stack flexDirection="row" justifyContent="space-between" p={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Relatório
        </Typography>
        <Button variant="contained" color="primary" onClick={handleVoltar}>
          Voltar
        </Button>
      </Stack>


      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={editedPost ? editedPost.title : ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags"
          name="tags"
          value={editedPost ? editedPost.tags : ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <div style={{ border: '1px solid #ccc', marginBottom: '1rem' }}>
          <EditorContent editor={editor} />
        </div>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await fetch(`${apiUrl}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    const post = await response.json();
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error.message);
    return {
      props: {
        post: null,
      },
    };
  }
}

export default EditPostPage;
