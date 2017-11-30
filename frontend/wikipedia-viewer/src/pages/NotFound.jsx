import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Sorry Page Not Found!</h2>
      <Link to="/" >Home</Link>
    </div>
  );
}