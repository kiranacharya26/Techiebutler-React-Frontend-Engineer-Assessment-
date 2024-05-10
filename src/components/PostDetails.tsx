
import React, { useState, useEffect } from 'react';
import CreateModal from './CreateModal';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Props {
  postId: number;
  onBackButtonClick: () => void;
}

const PostDetails: React.FC<Props> = ({ postId,onBackButtonClick }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(true);

//  effect to check changes render

  useEffect(() => {
    console.log('Details re-renders due to changes in props.');
  }, [postId, onBackButtonClick]);

  useEffect(() => {
    const fetchPostDetails = async () => {
        
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) {
          throw new Error('failed');
        }
        const data: Post = await response.json();
        setPostDetails(data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleCloseModal = () => {
    setOpenModal(false);
    onBackButtonClick(); 
  };

  return (
    <div>
      <CreateModal open={openModal} onClose={handleCloseModal} postDetails={postDetails} />
    </div>  
  );
};

export default PostDetails;
