import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export const RouteTransition = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const nodeRef = useRef(null); // 修复findDOMNode错误的关键

  // 路径深度比较判断前进/后退
  const prevDepth = useRef(1);
  const isBack = useRef(false);

  useEffect(() => {
    const currentDepth = location.pathname.split('/').length;
    isBack.current = currentDepth < prevDepth.current;
    prevDepth.current = currentDepth;
  }, [location]);

  // 根据导航类型判断方向
  const direction = navigationType === 'POP' ? 'back' : 'forward';

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        nodeRef={nodeRef}
        classNames={direction}
        timeout={400}
        unmountOnExit
      >
        <div ref={nodeRef} className="route-container">
          <Outlet />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};
