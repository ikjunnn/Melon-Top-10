
import React from 'react';

const PreviousIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.75 5.653c0-1.426-1.529-2.33-2.779-1.643l-7.58 4.347-1.448-2.316a.75.75 0 00-1.302.75l2.25 3.6a.75.75 0 000 .868l-2.25 3.6a.75.75 0 101.302.75l1.448-2.316 7.58 4.347c1.25.717 2.779-.217 2.779-1.643V5.653z" />
    <path d="M6 5.25a.75.75 0 00-.75.75v12a.75.75 0 001.5 0V6A.75.75 0 006 5.25z" />
  </svg>
);

export default PreviousIcon;
