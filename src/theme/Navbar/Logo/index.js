import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NavbarLogo() {
  return (
    <Link to={useBaseUrl('/')} className="navbar__brand eel-brand">
      <span className="eel-logo">
        <span className="eel-logo__bracket">&lt;</span> eelDev{' '}
        <span className="eel-logo__bracket">/&gt;</span>
      </span>
      <span className="eel-brand__divider" aria-hidden="true" />
      <span className="eel-brand__title">Documentation</span>
    </Link>
  );
}
