import React from 'react';
import Content from '@theme-original/DocItem/Content';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';

export default function ContentWrapper(props) {
  const category = (useSidebarBreadcrumbs() ?? [])
    .filter((item) => item.type === 'category')
    .pop();
  return (
    <>
      {category && <div className="eel-eyebrow">{category.label}</div>}
      <Content {...props} />
    </>
  );
}
