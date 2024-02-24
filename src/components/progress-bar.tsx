import React from 'react';
import {useMeter} from 'react-aria';


type ProgressBarProps = {
	readonly progress: number;
};

//TODO react aria 
// https://react-spectrum.adobe.com/react-aria/useMeter.html

export default function ProgressBar(props: ProgressBarProps) {
	return (
		<div>
			<div
				style={{
					width: `${props.progress}%`,
					height: '15px',
					backgroundColor: '#77DD77',
					transition: 'width 0.5s ease-in-out',
				}}
			/>
			<div className=' w '></div>
			<p className='text-stone-400 text-sm mb-4'>{`${props.progress}% Completo`}</p>
		</div>
	);
}
/*
function Meter(props) {
  let {
    label,
    showValueLabel = !!label,
    value,
    minValue = 0,
    maxValue = 100
  } = props;
  let {
    meterProps,
    labelProps
  } = useMeter(props);

  // Calculate the width of the progress bar as a percentage
  let percentage = (value - minValue) / (maxValue - minValue);
  let barWidth = `${Math.round(percentage * 100)}%`;

  return (
    <div {...meterProps} style={{ width: 200 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {label &&
          (
            <span {...labelProps}>
              {label}
            </span>
          )}
        {showValueLabel &&
          (
            <span>
              {meterProps['aria-valuetext']}
            </span>
          )}
      </div>
      <div style={{ height: 10, background: 'lightgray' }}>
        <div style={{ width: barWidth, height: 10, background: 'green' }} />
      </div>
    </div>
  );
}

<Meter
  label="Storage space"
  value={25}
/>*/