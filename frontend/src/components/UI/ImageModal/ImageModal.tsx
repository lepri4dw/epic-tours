import React from 'react';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  image: string;
  hasTitle?: boolean;
}

const ImageModal: React.FC<Props> = ({ open, handleClose, title, image, hasTitle }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      {hasTitle && <DialogTitle sx={{textAlign: 'center', fontWeight: 'bold'}}>{title}</DialogTitle>}
      <DialogContent sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
        <img src={image} alt={title} style={{ height: 'auto', width: '80%' }} />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;