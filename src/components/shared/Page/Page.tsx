import React from 'react';

import './Page.scss';

interface Props {
  headerText: string;
  children: React.ReactNode;
  FooterIcon: React.ComponentType<any>;
  footerText: string;
}

const Page: React.FC<Props> = ({ headerText, children, FooterIcon, footerText }) => {
  return (
    <section className="page">
      <header className="page__header">{headerText}</header>
      <section className="page__content">
        {children}
      </section>
      <footer className="page__footer">
        <FooterIcon className="page__footer-icon" />
        {footerText}
      </footer>
    </section>
  )
};

export default Page;
