import React from 'react';

export default function Button(props: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={props.onClick}
      className="bg-blue-200 hover:bg-blue-300 text-black font-bold py-2 px-4 rounded transition-colors duration-200"
    >
      {props.children}
    </button>
  );
}
