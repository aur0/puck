import React from 'react';

export default function LoaderIoVerification() {
  React.useEffect(() => {
    const element = document.createElement('a');
    const file = new Blob(['loaderio-da3e10cd752910db7a66bb903e1d5abf'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'loaderio-verification.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, []);

  return (
    <div>loaderio-da3e10cd752910db7a66bb903e1d5abf</div>
  );
}