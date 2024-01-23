const react = jest.createMockFromModule('react');

react.cache = (func) => func;

module.exports = react;
