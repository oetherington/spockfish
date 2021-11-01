import React, { useEffect } from 'react';

const useDomEvent = (
	domElement: HTMLElement | Window,
	eventType: string,
	handler: (ev: any) => void,
	ifChanged: any[] = [],
) => {
	useEffect(() => {
		domElement.addEventListener(eventType, handler);

		return () => {
			domElement.removeEventListener(eventType, handler);
		};
	}, ifChanged.concat(domElement));
};

export default useDomEvent;
