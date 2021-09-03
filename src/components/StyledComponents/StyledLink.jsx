import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";


const SNavLink = styled(NavLink)`
  color: ${({color}) => color || 'white'};
  text-decoration: ${({decoration}) => decoration || 'none'};
  font-size: ${({fSize}) => fSize || '1em'};
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '100%'};
  padding: ${({padding}) => padding || '0'};
  margin: ${({margin}) => margin || '0'};
  text-align: ${({textAlign}) => textAlign || 'start'};
  cursor: ${({cursor}) => cursor || ''};
  display: ${({display}) => display || 'inline'};
  text-decoration: ${({tDecoration}) => tDecoration || 'none'};
  background-color: ${({bColor}) => bColor || 'violet'};
  border-radius: ${({radius}) => radius || '0px'};
  border: ${({border}) => border || ''};
  &.active {
    background-color: blueviolet;
  }
`


const StyledNavLink = (props) => {
    return (
        <SNavLink to={props.link} {...props}>{props.name}</SNavLink>

    );
};

export default StyledNavLink;