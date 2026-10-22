import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function HomeBreadcrumbItem() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <li className="breadcrumbs__item">
      <Link className="breadcrumbs__link" href={useBaseUrl('/')}>
        {siteConfig.customFields.productName}
      </Link>
    </li>
  );
}
