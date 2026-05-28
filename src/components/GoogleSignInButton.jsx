/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

/*Provider must wrap the app (see App.jsx).*/
const GoogleSignInButton = ({ onSuccess, onError, text = 'continue_with', disabled = false }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const next = Math.min(400, Math.max(40, Math.floor(el.offsetWidth)));
      setWidth(next);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      {width > 0 && !disabled && (
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          width={width}
          size="large"
          theme="outline"
          shape="rectangular"
          text={text}
        />
      )}
    </div>
  );
};

export default GoogleSignInButton;
