import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TextField, Button, List, ListItemButton, ListItemText, Collapse, ListItem, Checkbox, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { useState } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Alert, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

 const MyAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-start',
  ...theme.mixins.toolbar,
}));

export default function PersistentDrawerRight() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    
    // ---------------CheckBox Validation----------------------
    const [openArea, setOpenArea] = React.useState(false);
    const handleClick = () => {
        setOpenArea(!openArea);
    };

    const initialLanguages = [
      { name: 'Tamil', checked: false, rating: '' },
      { name: 'English', checked: false, rating: '' },
      { name: 'Hindi', checked: false, rating: '' }
    ];

    const [languages, setLanguages] = useState([
      { name: 'Tamil', checked: false, rating: '' },
      { name: 'English', checked: false, rating: '' },
      { name: 'Hindi', checked: false, rating: '' }
    ]);

    const isAnyLanguageSelected = languages.some(lang => lang.checked);

    const areSelectedRatingsValid = languages
    .filter(lang => lang.checked)
    .every(lang => lang.rating !== '' && Number(lang.rating) >= 0 && Number(lang.rating) <= 100);

  const handleCheckboxChange = (index) => {
    const updated = [...languages];
    updated[index].checked = !updated[index].checked;
    if (!updated[index].checked) {
      updated[index].rating = ''; 
    }
    setLanguages(updated);
  };
    
  const handleRatingChange = (index, value) => {
    if (/^\d{0,3}$/.test(value)) {
      const num = Number(value);
      if (value === '' || (num >= 0 && num <= 100)) {
        const updated = [...languages];
        updated[index].rating = value;
        setLanguages(updated);
      }
    }
  };

  // ------------------Name & Email Validation--------------------
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (!/^[A-Za-z\s]+$/.test(name)) return 'Only letters allowed';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const isFormValid = 
    !errors.name && 
    !errors.email && 
    formData.name && 
    formData.email && 
    isAnyLanguageSelected &&
    areSelectedRatingsValid;

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  let [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {

      submittedData = {
      name: formData.name,
      email: formData.email,
      languages: languages
        .filter(lang => lang.checked)
        .map(lang => ({
          name: lang.name,
          rating: lang.rating,
        }))
      }
    } 
    setSubmittedData(prev => [...prev, submittedData]);

    setSuccessAlertOpen(true);

    setFormData({ name: '', email: '' });
    setErrors({ name: '', email: '' });
    setLanguages(initialLanguages);
  };

  const handleCancel = () => {
    if (isFormValid) {
      setFormData({ name: '', email: '' });
      setErrors({ name: '', email: '' });

      setLanguages([
        { name: 'Tamil', checked: false, rating: '' },
        { name: 'English', checked: false, rating: '' },
        { name: 'Hindi', checked: false, rating: '' }
      ]);
    }
  };

  const handleDelete = (index) => {
    const updated = [...submittedData];
    updated.splice(index, 1);
    setSubmittedData(updated);
  };
  
  const getColorForLanguage = (languages) => {
    if (!languages) return '#292828ff';
    
  switch (languages.toLowerCase()) {
    case 'hindi': return '#f44336';       
    case 'english': return '#ff9800';     
    case 'tamil': return '#4caf50';             
    default: return '#9c27b0';           
  }
};

const [deleteIndex, setDeleteIndex] = useState(null);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* ---------------- Nav bar------------------ */}

      <MyAppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            MUI Registration Details
          </Typography>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MyAppBar>

        {/* -----------------Main Content----------------- */}

      <Main open={open}>
        <DrawerHeader />
        {submittedData.length === 0 ? (
          <Typography>No data submitted yet.</Typography>
          ) : (
          submittedData.map((entry, index) => (
            <Box key={index} sx={{ 
              mb: 2, 
              p: 2, 
              border: '1px solid #ccc', 
              borderRadius: '8px', position:'relative', 
              backgroundColor: '#fafafa',
              maxWidth: 800,
              width: '100%',
              mx: 'auto',
              px: 2
            }}>
            <IconButton
              onClick={() => setDeleteIndex(index)}
              size="small"
              sx={{position: 'absolute', top: 8, right: 8}}
            >
              <CloseIcon fontSize='small'/>
            </IconButton>
            <Typography><strong>Name:</strong> {entry.name}</Typography>
            <Typography><strong>Email:</strong> {entry.email}</Typography>
            <Typography><strong>Languages:</strong></Typography>
            {entry.languages.map((lang, i) => (
              lang.name && lang.rating !== '' ? (
                <Box key={i} sx={{ my: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{lang.name}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={Number(lang.rating)}
                  sx={{
                    height: 10,
                    width: 300,
                    borderRadius: 5,
                    mt: 0.5,
                    backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getColorForLanguage(lang.name),
                      }
                  }}
                />
                </Box>
              ) : null
            ))}
            </Box>
          ))
        )}
      </Main>

        {/* ----------------Drawer----------------------- */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >

        {/* ----------------Drawer Header-------------- */}
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
          <Typography 
            variant="h6"
            sx={{ 
                flexGrow: 1, 
                textAlign: 'center', 
                color: 'blue' 
            }}
        >MUI Registration Form</Typography>
        </DrawerHeader>
        <Divider />

    {/* -------------Drawer Content----------------*/}
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1, 
        width: 399,
        margin: 'auto',
        marginTop: 0,
        padding: 3,
        backgroundColor: '#f5f5f5',

      }}
    >

      {/* --------------Name & Email input------------------ */}
        <TextField 
            label="Name" 
            variant="outlined" 
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            sx={{ mb: 2 }}
            slotProps={{
              input: {
                style: {
                  height: 55,
                }
              }
            }}
        />
        <TextField 
            label="Email" 
            type="email" 
            name='email'
            value={formData.email}
            onChange={handleChange}
            variant="outlined" 
            required
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            sx={{ mb: 2 }}
            slotProps={{
              input: {
                style: {
                  height: 55
                }
              }
            }}
        />

    {/* -----------------Language Input---------------- */}
    <Box>
      <Typography 
        variant="h6" 
          sx={{paddingBottom: '10px',
              color:"blue",
              marginTop:'0px'
          }}
      >Languages Known</Typography>

    <Box>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Select the languages you know" />
          {openArea ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openArea} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {languages.map((lang, index) => (
              <ListItem key={lang.name}>
                <ListItemButton>
                  <Checkbox
                    checked={lang.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <ListItemText primary={lang.name} />
                  <TextField
                    size="small"
                    placeholder="Rating"
                    value={lang.rating}
                    onChange={(e) => handleRatingChange(index, e.target.value)}
                    disabled={!lang.checked}
                    sx={{ ml: 1 }}
                    slotProps={{
                      input: {
                        style: {
                          height: 30,
                          width: 75,
                          padding: 0,
                        },
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      ml: 4,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '5px',
                      border: '1px solid grey',
                      color: 'grey',
                    }}
                  >
                    100
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
    
    {/* --------------Buttons box--------------- */}
    </Box>
      <Box sx={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
      }}>
        <Button variant="contained" color="primary" type="submit" disabled={!isFormValid}>
          Submit
        </Button>
        <Button variant="contained" color="primary" type="button" disabled={!isFormValid}  onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>     
      </Drawer>

    {/* -------------------Submit Alert------------------- */}
    <Snackbar
      open={successAlertOpen}
      autoHideDuration={1500}
      onClose={() => setSuccessAlertOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={() => setSuccessAlertOpen(false)} severity="success" variant="filled">
        Form submitted successfully!
      </Alert>
    </Snackbar>

    {/* --------------------Delete PopUp------------------ */}
    <Dialog
      open={deleteIndex !== null}
      onClose={() => setDeleteIndex(null)}
    >
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this entry?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteIndex(null)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDelete(deleteIndex);
            setDeleteIndex(null);
          }}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>

    </Box>
  );
}
