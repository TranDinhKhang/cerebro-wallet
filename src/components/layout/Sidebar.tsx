import styled from 'styled-components';

const Sidebar = styled.aside`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    background: ${props => props.theme.colors.blockBackground};
  }

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    width: 25.625rem;
  }
`;

export default Sidebar;