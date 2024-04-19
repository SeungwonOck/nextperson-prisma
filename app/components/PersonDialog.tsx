//'use client'

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Person } from '../lib/person';

interface PersonDialogProps {
  open: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const PersonDialog: React.FC<PersonDialogProps> = ({ open, handleClose, currentPerson, setCurrentPerson, handleSubmit }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{currentPerson ? 'Edit Person' : 'Add Person'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="First Name"
        fullWidth
        value={currentPerson?.firstname || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, firstname: e.target.value }))}
      />
      <TextField
        margin="dense"
        label="Last Name"
        fullWidth
        value={currentPerson?.lastname || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, lastname: e.target.value }))}
      />
      <TextField
        margin="dense"
        label="Phone"
        fullWidth
        value={currentPerson?.phone || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, phone: e.target.value }))}
      />
      <TextField
        margin="dense"
        label="Date Of Birth"
        fullWidth
        type="date" // Set the type to "date" to enable the date picker
        value={currentPerson?.dateOfBirth ? new Date(currentPerson.dateOfBirth).toISOString().slice(0, 10) : ''} // Convert dateOfBirth to ISO format (YYYY-MM-DD) for the input value
        onChange={e => setCurrentPerson(prev => ({ ...prev!, dateOfBirth: e.target.value }))}
        InputLabelProps={{
            shrink: true, // This ensures the label doesn't overlap the input value
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        {currentPerson ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default PersonDialog;
