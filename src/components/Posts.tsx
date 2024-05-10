import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import PostDetails from './PostDetails';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // add page and limit for pagination
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handlePostClick = (postId: number) => {
    setSelectedPost(postId);
  };

  const handleBackButtonClick = useCallback(() => {
    setSelectedPost(null); 
  }, []);

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prevPage => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return prevPage + 1
    });
  };

  const computeDetails = useMemo(() => {
    return (post: Post) => {
      console.log(`Computing details for post with ID ${post.id}...`);
      const startTime = performance.now();
      const bodyCharacterCount = post.body.length;
      const endTime = performance.now();
      console.log(`Time taken for computation: ${endTime - startTime} milliseconds`);
      return bodyCharacterCount;
    };
  }, []);

  return (
    <div>
      <Typography variant="h1">Posts</Typography>
      
      <>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {posts.map((post) => (
              <ListItem key={post.id} onClick={() => handlePostClick(post.id)} button>
                <ListItemText
                  primary={`ID: ${post.id}`}
                  secondary={
                    <>
                      <Typography variant="h4">{post.title}</Typography>
                      <Typography>{post.body}</Typography>
                      <Typography variant="h6">Body Character Count: {computeDetails(post)}</Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        <Button onClick={handlePrevPage} disabled={page === 1}>Previous</Button>
        <Button onClick={handleNextPage}>Next</Button>
      </>
      
      {selectedPost && <PostDetails postId={selectedPost} onBackButtonClick={handleBackButtonClick} />}
    </div>
  );
};

export default Posts;
