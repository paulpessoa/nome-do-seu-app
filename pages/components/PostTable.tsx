// components/PostTable.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Função para buscar todos os posts e atualizar o estado
    const fetchPosts = async () => {
      try {
        // Realizar a requisição para obter todos os posts
        const response = await fetch(`${apiUrl}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    // Navegar para a página do post quando uma linha da tabela é clicada
    router.push(`/posts/${postId}`);
  };





  const handleEdit = (postId) => {
    router.push(`/posts/${postId}/edit`);
  };


  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>{post.title}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(post.id)}>
                    EDITAR
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PostTable;
