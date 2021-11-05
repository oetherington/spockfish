import React, { useEffect } from 'react';

const useDomEvent = (
	domElement: HTMLElement | Window | null,
	eventType: string,
	handler: (ev: any) => void,
	ifChanged: any[] = [],
) => {
	useEffect(() => {
		const addListener = (element: HTMLElement | Window) => {
			element.addEventListener(eventType, handler);

			return () => {
				element.removeEventListener(eventType, handler);
			};
		};

		if (domElement)
			return addListener(domElement);
		if (typeof window !== 'undefined')
			return addListener(window);
	}, ifChanged.concat(domElement));
};

export default useDomEvent;
