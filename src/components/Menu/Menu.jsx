import * as React from 'react';

import * as s from './Menu.scss';

export const MAIN_MENU = [
    {
        title: 'Прямая погрешность',
        description: 'Вычисление прямой погрешности исходя из введённых данных',
        id: 'DirectError',
    },
];

/**
 *
 * @param props: {{onClick: (id: {string}}) => void}
 * @returns {JSX.Element}
 * @constructor
 */
export const Menu = ({onClick}) => (
    <div className={s.menu}>
        <div className={s.menu__title}>
            <h3 className={s.menu__title}>Выберите, что вам нужно вычислить</h3>
        </div>
        <form className={s.menu__items} noValidate>
            {MAIN_MENU.map((item) => (
                <div key={item.id}>
                    <div className={s.menu__item}>
                        <button
                            className="menu__button button button_size-xx button_color_grey"
                            onClick={(e) => {
                                e.preventDefault();
                                onClick(item.id);
                            }}
                        >
                            {item.title}
                        </button>
                        <div className="menu__item-helper">{item.description}</div>
                    </div>
                </div>
            ))}
        </form>
    </div>
);