import { Box } from '@mui/system'
import { useState, useRef, useEffect} from 'react'
import {
    Typography, 
    TextField, 
    List, 
    ListItemButton,
    ListItemText,
    Collapse,
    ListItem,
    ListItemIcon,
    Checkbox,
    Button,
    IconButton, 
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grow,
    Snackbar,
    Alert 
} from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

export const ScrollBar = () => {

    // useState for get Name, Email input
    const [formData, setFormData] = useState({name: '', email: ''});

    // useState for name, email validation errors
    const [errors, setErrors] = useState({name: '', email: '',});

    // useState for inputFields are touched or not
    const [touched, setTouched] = useState({ name: false, email: false });

    // for checkbox list
    const [openArea, setOpenArea] = useState(false);

    
    // for delete saved details 
    const [deleteIndex, setDeleteIndex] = useState(null);
    
    // contain register details
    const [finalData, setFinalData] = useState([]);

    // contain register details indexes
    const [visibleIndexes, setVisibleIndexes] = useState([]);

    // for alert message - for submit data
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // for alert message - for delete data
    const [snackbarDelete, setSnackbarDelete] = useState(false);

    const [animatedProgress, setAnimatedProgress] = useState([]);

    const [editIndex, setEditIndex] = useState(null);

    // for open list item
    const openList = () => {
        setOpenArea(!openArea);
    };

    const validateField = (fieldName, value) => {
        let error = '';

        if (fieldName === 'name') {
            if (!value) error = 'Name is required';
            else if (!/^[A-Za-z\s]+$/.test(value)) error = 'Name must contain only letters';
            else if (value.length < 3) error = 'Name should be at least 3 characters';
        }

        if (fieldName === 'email') {
          // console.log(value);
          
            if (!value) error = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        }

        setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }

    // Call from onFocus() event
    const handleFocus = (e) => {
        const { name, value} = e.target;
        // console.log(name, value);
        
        // updates touched useState
        setTouched((prev) => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    // Call from onChange event
    const handleChange = (e) => {
        const {name, value} = e.target;
        // console.log(name, value);
        
        // updates formData useState
        setFormData((prev) =>({...prev, [name]:value}))
        if (touched[name]) {
          // console.log(touched[name]);
          validateField(name, value); 
          // console.log(name, value);
          
        }
    }

    const [languages, setLanguages] = useState([
        { name: 'Tamil', checked: false, rating: ''},
        { name: 'English', checked: false, rating: ''},
        { name: 'Hindi', checked: false, rating: ''}
    ]);

    // Create refs for each TextField
    //---------- ------------ -----------
    const inputRefs = useRef([]);
    // console.log("inputRefs : ",inputRefs);
    
    // Checkbox change handler
    const handleCheckboxChange = (index) => {
      // console.log("index : ",index);
      const updatedLanguages = [...languages];
      updatedLanguages[index].checked = !updatedLanguages[index].checked;
      // console.log(updatedLanguages[index].checked = !updatedLanguages[index].checked);
      setLanguages(updatedLanguages);

      setTimeout(() => {
      inputRefs.current[index] ?. focus();
      // console.log(inputRefs.current[index].focus()); // undefined
      // console.log(index); // current index
      
      }, 0);

    };

    // Rating handler
    const handleRatingChange = (index, value) => {
      if (/^\d{0,3}$/.test(value)) {  // allow only 0-3 digit Nums
        const num = Number(value);
        // console.log("value : ", value);
        // console.log("num : ", num);
        
        if (/*value === '' ||*/ num >= 0 && num <= 100) {
          const updated = [...languages];
          updated[index].rating = value;
          setLanguages(updated);
        }
      };
    } 
            
  const isFormValid = () => {
    // Check Name
  if (!formData.name || errors.name) return false; /*console.log("!formData.name: ",!formData.name)*/;

  // Check Email
  if (!formData.email || errors.email) return false;

  // Check if at least one language is checked
  const checkedLanguages = languages.filter(lang => lang.checked);
  if (checkedLanguages.length === 0) return false;

  // Check Ratings of checked languages
  for (let lang of checkedLanguages) {
    const rating = Number(lang.rating);
    if (lang.rating === '' || isNaN(rating) || rating < 0 || rating > 100) {
      return false;
    }
  }

  // All validations passed
  return true;
    };

    const handleReset = () => {
  // Reset Name & Email
  setFormData({
    name: '',
    email: ''
  });

  // Reset Languages (uncheck and clear ratings)
  const resetLanguages = languages.map(lang => ({
    ...lang,
    checked: false,
    rating: ''
  }));
  setLanguages(resetLanguages);

  // Reset Errors
  setErrors({
    name: '',
    email: ''
  });

  // Reset Touched State (optional)
  setTouched({
    name: false,
    email: false
  });
};

  const handleSubmit = (e) => {
  e.preventDefault();

  // Filter selected languages with ratings
  const selectedLanguages = languages
    .filter(lang => lang.checked /*console.log(lang.checked)*/)
    .map(lang => ({
      name: lang.name,
      rating: lang.rating
    }));

  // Combine Name, Email, and selected languages
  const formDataObject = {
    name: formData.name,
    email: formData.email,
    languages: selectedLanguages
  };
  // console.log('Final Form Data:', formDataObject);

  if (editIndex !== null) {
    // UPDATE existing record
    const updatedData = [...finalData];
    // console.log("updatedData: ",updatedData);
    updatedData[editIndex] = formDataObject;
    setFinalData(updatedData);

    // reset edit mode
    setEditIndex(null);
    setSnackbarMessage('Form updated successfully!');
  } else {
    // ADD new record
    // store in an array
    setFinalData(prev => [...prev, formDataObject]);
    // console.log(finalData);

    // store finalData index
    setVisibleIndexes(prev => [...prev, finalData.length]);
    // console.log(finalData.length); 
    // console.log(visibleIndexes);
    setSnackbarMessage('Form submitted successfully!');
  }

  // store finalData index
  setVisibleIndexes(prev => [...prev, finalData.length]);
  // console.log(finalData.length); 
  // console.log(visibleIndexes);
  
  // Show alert message
  setSnackbarOpen(true);

  handleReset();  // Reset the filled form
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

  const handleDelete = (index) => {
    const updated = [...finalData];
    updated.splice(index, 1);
    setFinalData(updated);
    setSnackbarDelete(true);
  };

  // 
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarDelete = () => {
    setSnackbarDelete(false);
  };

  useEffect(() => {
  // console.log(finalData);
  const allProgress = finalData.map(entry =>
    // console.log(entry)
    
    entry.languages.map(() => 0)
    // console.log(entry.languages.map(()=>0))
  );
  // console.log('allProgress', allProgress);   ----> [0, 0, 0]

  setAnimatedProgress(allProgress); // initialize with 0s
  // console.log(animatedProgress);
  
  finalData.forEach((entry, entryIndex) => {
    entry.languages.forEach((lang, langIndex) => {
      let current = 0;
      const target = Number(lang.rating);
      // console.log(target);

      //------------------ -------------------- -----------------
      const interval = setInterval(() => {
        // console.log('interval: ',interval);
        if (current >= target) {
          clearInterval(interval);
          return;
        }

        current += 5;

        setAnimatedProgress(prev => {
          const newProgress = [...prev];
          //  console.log(newProgress);
          // console.log(!newProgress[entryIndex]);
          if (!newProgress[entryIndex]) return prev;
          newProgress[entryIndex] = [...newProgress[entryIndex]];
          newProgress[entryIndex][langIndex] = current;
          return newProgress;
        });
      }, 10);
    });
  });
}, [finalData]);

const handleEdit = (index) => {
  const entry = finalData[index]; 
  // console.log("entry",entry); // current index values
  setFormData({
    name: entry.name,
    email: entry.email
  });

  setLanguages((prevLanguages) =>
    prevLanguages.map((lang) => {
      // console.log(prevLanguages);
      // console.log(lang); // evry list item in current index
      const match = entry.languages.find((l) => 
        // console.log((l.name === lang.name)),
        (l.name === lang.name)
        /*console.log("l.name ", l.name, "lang.name ",lang.name)*/);
        // console.log(match);
        
      return match
        ? { ...lang, checked: true, rating: match.rating }
        : { ...lang, checked: false, rating: '' };
    })
  );

  setEditIndex(index);
};

  return (

    // ---------------Global Container-------------------
    <Box sx={{
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'row'
    }}>

    {/*---------------Data view container---------------*/}
  <Box sx={{
    width: '65vw',
    height: '100vh',
    overflowY: 'scroll',
    bgcolor: '#F2F2F2'
  }}>
  {finalData.length === 0 ? (
    <Typography variant="body1" sx={{padding: '10px'}}>No submissions yet.</Typography>
  ) : (
    finalData.map((entry, index) => (
      <Grow in={visibleIndexes.includes(index)} timeout={1000} key={index}>
      <Box 
        key={index} 
        sx={{ 
          mt: 2,  
          mb: 2,  
          p: 1,  
          border: '1px solid #ddd', 
          borderRadius: '8px',
          position: 'relative',
          backgroundColor: '#fafafa',
          maxWidth: 700,
          width: '100%',
          mx: 'auto',
          px: 2
        }}>
        {/* ---------------- data delete button ---------------- */}
        <IconButton
          onClick={() => setDeleteIndex(index)} // Null ---> 0, 1, ....
          size="small"
          sx={{position: 'absolute', top: 8, right: 8}}
        >
          <CloseIcon fontSize='small'/>
        </IconButton>

        {/* --------------- data edit button ------------------ */}
        <IconButton
          onClick={() => handleEdit(index)} 
          size="small"
          sx={{ position: 'absolute', top: 8, right: 50 }}
        >
          <EditIcon fontSize='small'/>
        </IconButton>
        <Typography><strong>Name:</strong> {entry.name}</Typography>
        <Typography><strong>Email:</strong> {entry.email}</Typography>
        <Typography><strong>Languages:</strong></Typography>
        {entry.languages.map((lang, i) => (
          <Box key={i} sx={{ my: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{lang.name}</Typography>
              <LinearProgress
                variant="determinate"
                // ------------- ----------------- -------------
                value={animatedProgress[index]?.[i] ?? 0}
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
        ))}
      </Box>
    </Grow>
    ))
  )}
</Box>

        {/*---------------Form container------------------*/}
        <Box sx={{
            width:'35vw',
            height: '100vh',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            gap: 2,
            bgcolor: '#F2F2F2'
        }}>
            <Box 
                sx={{
                    display:'flex',
                    flexDirection: 'column',
                    padding: '15px',
                    gap: 2,
                }}>
                <Typography variant="h6" sx={{textAlign: 'center'}}>
                    Register Form
                </Typography>

                {/* -------------Name Input-------------- */}
                <TextField 
                    label="Name" 
                    variant="outlined"
                    name='name'
                    value={formData.name}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                />
    
                {/* -------------Email Input------------- */}
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />

                {/* --------List for languages check box-------- */}
                <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }} >
                    <ListItemButton onClick={openList}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Select the languages you know" />
                        {openArea ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={openArea} timeout="auto">
                      <List>
                        {languages.map((lang, index) => (
                          <ListItem key={lang.name}>
                            <ListItemButton>
                              <Checkbox
                                checked={lang.checked}  //false --> true
                                onChange={() => handleCheckboxChange(index)} 
                              /> 
                                <ListItemText 
                                  primary={lang.name} 
                                  sx={{textAlign: 'center'}} 
                                /> 
                                <TextField 
                                  size='small' 
                                  placeholder='Rating' 
                                  value={lang.rating} // empty string ---> input value
                                  onChange={(e) => handleRatingChange(index, e.target.value)}
                                  disabled={!lang.checked}  // true ---> false
                                  //------------- ------------ ------------
                                  inputRef={
                                    (el) => (inputRefs.current[index] = el
                                    /*console.log(inputRefs.current[index])*/
                                  )}
                                  slotProps={{ 
                                    input: { 
                                      style: { 
                                        height: 30,
                                          width: 75,
                                          padding: 0
                                      }
                                    }
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                    </Collapse>
                </List>
            </Box>
            
            {/* ------------Button Container------------- */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>

              <Button 
                variant='contained' 
                color='primary' 
                type='submit' 
                disabled={!isFormValid()}
                onClick={handleSubmit} 
              >{editIndex !== null ? 'Update' : 'Submit'}</Button>

              <Button 
                variant='contained' 
                color='primary' 
                type='button' 
                disabled={!isFormValid()}
                onClick={handleReset}
              >Cancel</Button>
            </Box>

        </Box>

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
        
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar 
        open={snackbarDelete} 
        autoHideDuration={3000} 
        onClose={handleSnackbarDelete}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarDelete} severity="success" sx={{ width: '100%' }}>
          Details deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}