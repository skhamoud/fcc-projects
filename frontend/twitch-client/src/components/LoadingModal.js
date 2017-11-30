import React from "react";
/**
 * LoadingModal for Ajax calls and such operations - 
 * Uses bulma.css
 */
export default () =>
  <div className="modal is-active">
    <div className="modal-background" />
    <div className="modal-content has-text-centered">
      <div className="button   is-loading is-large" />
      <style>
        {`.is-loading {
          background:none;
          border:none;
          height:5em;
        }
        .is-loading.button::after{
          width: 2em;
          height:2em;
          border:3px solid #68c9c0; 
          border-right-color:transparent;
          border-bottom-color:transparent;
          animation: spinAround 900ms infinite linear;
        }`}
      </style>
    </div>
    <button className="modal-close" />
  </div>;
