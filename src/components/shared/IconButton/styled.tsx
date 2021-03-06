import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { hexToRGB } from '../../../utils/common';

export const Button = styled.button`
  display: flex;
  align-items: center;
  text-align: left;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0.875rem 1.1875rem;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  border-radius: 2.375rem;
  transition: background 0.15s ease-in;
  width: 100%;

  &:hover,
  &.active {
    background: ${(props) => props.theme.colors.secondaryExtraLight};
  }

  &:focus {
    outline: none;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const SkeletonButtonWrapper = styled.div`
  padding: 0 0.625rem;
`;

export const SkeletonButton = styled(Button)`
  display: block;
  margin-bottom: 0.625rem;
  background: ${(props) =>
    hexToRGB(props.theme.colors.secondaryExtraLight, 0.9)};
  overflow: hidden;

  &:hover,
  &.active {
    background: ${(props) =>
      hexToRGB(props.theme.colors.secondaryExtraLight, 0.9)};
  }
`;

export const SkeletonIcon = styled.i`
  position: relative;
  z-index: 1;
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background: ${(props) => hexToRGB(props.theme.colors.secondaryLight, 0.9)};
`;

export const Text = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 600;
  margin-top: -0.0625rem;
`;

export const Title = styled.span`
  display: inline-block;
  margin-bottom: 0.0625rem;
`;

export const Description = styled.span`
  display: block;
  font-size: 0.75rem;
  line-height: 0.9375rem;
  color: ${(props) => props.theme.colors.secondary};
  font-weight: 400;
`;

export const RouterLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  style: any;
}> = (props) => (
  <Button as={NavLink} {...props}>
    {props.children}
  </Button>
);

const HtmlLink: React.FC = (props) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {props.children}
  </a>
);

export const ExternalLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
  style: any;
}> = (props) => (
  <Button as={HtmlLink} {...props}>
    {props.children}
  </Button>
);

export const Icon = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 0.9375rem;
  line-height: 1;
`;

export const ReadOnlyIcon = styled.div`
  position: absolute;
  top: 60%;
  right: -0.25rem;
  width: 1rem;
  height: 1rem;
  background: ${(props) => props.theme.colors.tertiary};
  border-radius: 100%;
`;

export const EyeIcon = styled.img`
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0.625rem;
  height: 0.625rem;
  margin-right: 0;
`;
