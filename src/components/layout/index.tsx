import React from "react";
import Container from "react-bootstrap/Container";

import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <Header />

      <Container>{children}</Container>
    </React.Fragment>
  );
};

export default Layout;
