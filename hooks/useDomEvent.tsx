import React, { useEffect } from 'react';

const useDomEvent = (domElement, eventType, handler, ifChanged = []) => {
	useEffect(() => {
		domElement.addEventListener(eventType, handler);

		return () => {
			domElement.removeEventListener(eventType, handler);
		};
	}, ifChanged.concat(domElement));
};

export default useDomEvent;
