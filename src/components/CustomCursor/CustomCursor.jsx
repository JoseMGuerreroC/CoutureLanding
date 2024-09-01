import { useEffect, useState } from 'react';
import './CustomCursor.css'

const CustomCursor = () => {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [delayedCursor, setDelayedCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const delayedCursor = document.querySelector('.custom-cursor--delayed');
    const links = document.querySelectorAll('a, .goUpCont, button, input');

    links.forEach((link) => {
      link.addEventListener('mouseover', () => {
        setIsLinkHovered(true);
      });
      link.addEventListener('mouseout', () => {
        setIsLinkHovered(false);
      });
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });
      if (!cursorVisible) {
        setCursorVisible(true);
        gsap.to(cursor, 0.5, { opacity: 1 });
      }

      setDelayedCursor({ x: clientX, y: clientY });
    };

    const handleTouchMove = (e) => {
      const { clientX, clientY } = e.touches[0];
      setCursorPosition({ x: clientX, y: clientY });
      if (!cursorVisible) {
        setCursorVisible(true);
        gsap.to(cursor, 0.3, { opacity: 1 });
      }
      setTimeout(() => {
        setDelayedCursor({ x: clientX, y: clientY });
      }, 100);
    };

    const handleMouseOut = () => {
      setCursorVisible(false);
      gsap.to(cursor, 0.3, { opacity: 0 });
    };

    const handleTouchStart = () => {
      setCursorVisible(true);
      gsap.to(cursor, 0.3, { opacity: 1 });
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        setCursorVisible(false);
        gsap.to(cursor, 0.3, { opacity: 0 });
      }, 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (isLinkHovered) {
      gsap.to('.custom-cursor', { width: '5px', height: '5px', duration: .1 });
    } else {
      gsap.to('.custom-cursor', { width: '15px', height: '15px', duration: .1 });
    }
  }, [isLinkHovered]);

  return (
    <>
      <div
        className={`custom-cursor`}
        style={{
          top: cursorPosition.y + 'px',
          left: cursorPosition.x + 'px',
        }}
      />
      <div
        className={`custom-cursor--delayed ${isLinkHovered ? 'custom-cursor--delayed-link' : ''} `}
        style={{
          top: delayedCursor.y + 'px',
          left: delayedCursor.x + 'px',
          opacity: cursorVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;