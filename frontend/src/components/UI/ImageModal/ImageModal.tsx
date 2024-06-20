import React from 'react';
import {Dialog, DialogContent} from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  image: string;
}

const ImageModal: React.FC<Props> = ({ open, handleClose, title, image }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogContent sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
        <img src={image} alt={title} style={{ height: 'auto', width: '80%' }} />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;