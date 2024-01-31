import React from 'react';

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <div>
      <div
        style={{
          width: `${props.progress}%`,
          height: '30px',
          backgroundColor: '#77DD77',
          transition: 'width 0.5s ease-in-out',
        }}
      />
      <p className='text-stone-400 text-sm mb-4'>{`${props.progress}% Completo`}</p>
    </div>
  );
}
