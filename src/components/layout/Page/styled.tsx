import styled from "styled-components";

export const Section = styled.section`
  max-width: calc(100vw);

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 36.25rem;
  }
`;

export const PageHeader = styled.header`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
`;

export const PageContent = styled.section`
  img {
    margin-bottom: 2.5rem;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5rem;
    margin-bottom: 1.4375rem;
  }
`;

export const PageFooter = styled.footer`
  position: relative;
  border-top: 1px solid #eaeaea;
  padding-top: 1.0625rem;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  padding-left: 1.5625rem;
  color: ${props => props.theme.colors.secondary};
  margin: 3.125rem 0;

  svg {
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    color: ${props => props.theme.colors.secondary};
    top: 1.21rem;
    left: 0.5rem;
  }
`;