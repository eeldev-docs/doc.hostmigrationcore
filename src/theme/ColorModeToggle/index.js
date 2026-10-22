import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';

function ColorModeToggle({className, value, onChange}) {
  const isBrowser = useIsBrowser();
  const next = value === 'dark' ? 'light' : 'dark';
  return (
    <div className={className}>
      <button
        type="button"
        className={clsx('clean-btn', 'eel-mode-toggle')}
        onClick={() => onChange(next)}
        disabled={!isBrowser}
        aria-label={`Switch to ${next} mode`}>
        {next === 'light' ? 'Light mode' : 'Dark mode'}
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
