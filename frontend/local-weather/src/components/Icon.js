import React from 'react';

function Icon(props) {
  const iconClassName = (props.weatherCode) ? `wi wi-owm-${props.weatherCode}` : `wi ${props.className}`;
  return <i className={iconClassName} title={props.title}></i>;
}

export default Icon;