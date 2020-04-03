import React from 'react';

import css from './c.module.css';

export default function B() {
    return React.createElement('div', { className: css.test3, style: { width: 200, height: 200 } }, 'C');
}
