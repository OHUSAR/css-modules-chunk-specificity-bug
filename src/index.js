import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import loadable from '@loadable/component';

const B = loadable(() => import('./b/b'));
const C = loadable(() => import('./c/c'));

function App() {
    const [bIsShown, setBIsShown] = useState(false);

    return React.createElement('div', { style: { padding: 30, background: 'red' } }, [
        React.createElement(C),
        bIsShown ? React.createElement(B) : null,
        React.createElement(
            'button',
            {
                onClick: function () {
                    setBIsShown(true);
                },
            },
            'Import chunk-1.css (Add component B)'
        ),
    ]);
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(React.createElement(App), document.getElementById('mount'));
});
