type Engine = {
	sayHello: () => void,
};

export default Engine;

export const nullEngine: Engine = {
	sayHello: () => {},
};
