import React from "react";
import Tooltip, { TooltipProps } from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

interface TooltipWrapperProps {
  children: (props: any) => React.ReactNode;
  tipElement: React.ReactNode;
}

const TooltipWrapper = ({ children, tipElement }: TooltipWrapperProps) => {
  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      {tipElement}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 0, hide: 0 }}
      overlay={renderTooltip}
    >
      {(props: any) => children(props)}
    </OverlayTrigger>
  );
};

export default TooltipWrapper;
