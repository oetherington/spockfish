import React, { useEffect } from 'react';

type KeyDownEvent = {
	code: string,
}

const useKeyBind = (keyCode: string, callback: () => void) => {
	useEffect(() => {
		const handler = (ev: KeyDownEvent) => {
			if (ev.code === keyCode)
				callback();
		}

		window.addEventListener('keydown', handler);

		return () => window.removeEventListener('keydown', handler);
	});
};

export default useKeyBind;
