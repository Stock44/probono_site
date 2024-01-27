import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div>
      
      <div
        style={{
          width: `${clampedProgress}%`,
          height: '30px',
          backgroundColor: '#77DD77',
          transition: 'width 0.5s ease-in-out',
        }}
      />
      <p className='text-stone-400 text-sm mb-4'>{`${clampedProgress}% Completo`}</p>
    </div>
  );
};

export default ProgressBar;
