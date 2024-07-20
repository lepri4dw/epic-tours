import {Box, Container, Typography} from "@mui/material";
import React from "react";
import FeedbackForm from "../../features/notifications/components/FeedbackForm";

const Contact = () => {
  return (
    <Box>
      <Box sx={{
        padding: '90px 0', background: `#000`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Container>
          <Typography variant="h3" sx={{color: '#fff'}}>Contact</Typography>
        </Container>
      </Box>
      <Container sx={{mt: '60px'}}>
        <FeedbackForm/>
      </Container>
    </Box>
  )
};

export default Contact;