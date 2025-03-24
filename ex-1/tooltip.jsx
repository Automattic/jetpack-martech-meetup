import React, { useState } from 'react';

// Tooltip Component - Has issues with styling inconsistency and positioning
const Tooltip = ({ text, position, children }) => {
	const [visible, setVisible] = useState(false);

	const showTooltip = () => setVisible(true);
	const hideTooltip = () => setVisible(false);

	return (
		<div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
			{children}
			{visible && <div className={`tooltip tooltip-${position || 'top'}`}>{text}</div>}
		</div>
	);
};

export default Tooltip;
