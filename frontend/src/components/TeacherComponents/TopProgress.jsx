import React from 'react';
import { LinearProgress } from '@mui/material';

const TopProgress = () => {
  return (
    <div className="top-progress">
      <LinearProgress color="success" sx={{ height: '10px' }} />
    </div>
  );
};

export default TopProgress;
