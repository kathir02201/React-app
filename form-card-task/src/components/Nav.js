import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import Box from '@mui/material/Box';

const StyledToolbar = styled(Toolbar)({
  display:'flex',
  justifyContent:'space-between'
})

export const Nav = () => {
  return (
    <AppBar position='sticky'>
        <StyledToolbar>
            <Typography variant='h5'>Tours</Typography>
            <Box sx={{display:'flex', alignItems:'center', gap:'30px'}}>
              <Badge badgeContent={4} color="secondary">
                <MailIcon color="action" />
              </Badge>
              <Avatar alt="Remy Sharp"/>
            </Box>
        </StyledToolbar>
    </AppBar>
  )
}