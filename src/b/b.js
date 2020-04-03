import React from 'react';

import css from './b.module.css';

export default function B() {
    return React.createElement('div', { className: css.test2, style: { width: 200, height: 200 } }, 'B');
}
