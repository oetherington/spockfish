import React, { useEffect } from 'react';

const useKeyBind = (keyCode, callback) => {
	useEffect(() => {
		const handler = ev => {
			if (ev.code === keyCode)
				callback();
		}

		window.addEventListener('keydown', handler);

		return () => window.removeEventListener('keydown', handler);
	});
};

export default useKeyBind;
