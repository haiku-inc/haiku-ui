import { Typography } from '@mui/material';
import { useState } from 'react';

import GreenButton from '../GreenButton';
import './styles.scss';

const banner = [
  {
    title: 'Need help?',
    description: 'Get access to our cybersecurity community of enthusiast and professionals.',
    url: 'https://discord.gg/haiku',
    caption: 'Join Discord',
  },
];

const BottomSection = () => {
  const [index] = useState(Math.floor(Math.random() * banner.length));

  return (
    <div className="bottom-section">
      <div className="trapezoid">
        <div />
      </div>

      <Typography variant="h5" className="challenge">
        {banner[index].title}
      </Typography>
      <div className="challenge-descr">{banner[index].description}</div>
      <div className="btn-panel">
        <GreenButton
          isTrulyGreen
          onClick={() => {
            window.location.href = banner[index].url;
          }}
        >
          {banner[index].caption}
        </GreenButton>
      </div>
    </div>
  );
};

export default BottomSection;
