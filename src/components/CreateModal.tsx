import React from 'react';
import { Modal, Fade, Button, Typography, CircularProgress, Box } from '@mui/material';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  postDetails: Post | null;
}

const CreateModal: React.FC<Props> = ({ open, onClose, postDetails }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
     
    >
      <Fade in={open}>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 4,
            boxShadow: 24,
            maxWidth: 600,
            margin: 'auto',
            padding: 2,
            outline: 'none', // Remove outline from the modal
            textAlign: 'center', // Center content
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backdropFilter: 'blur(5px)', // Add blur effect to the background
          }}
        >
          {postDetails ? (
            <div>
             
              <Typography>ID: {postDetails.id}</Typography>
              <Typography variant="h5">{postDetails.title}</Typography>
              <Typography>{postDetails.body}</Typography>
              <Button onClick={onClose}>Close</Button>
            </div>
          ) : (
            <div>
              <CircularProgress />
            </div>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateModal;
