var React = require('react');
var render = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Main = require('./Main'); // Our custom react component

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();








// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
    <Main />,
    document.getElementById('app')
    );
