import * as React from 'react';

import * as s from './DirectError.scss';

import {ListButtons} from '../ManageButtons';
import {Checkbox, FormControlLabel, FormGroup} from '@material-ui/core';

const Page = (props) => (
    <div>
        <h2>{props.title}</h2>
        <div>{props?.description || ''}</div>
        {props.children}
    </div>
);

const GRAPH_TYPE = [
    'Матрица корреляций (в виде диаграммы рассеяния)',
    'Гистограмма / столбцовая диаграмма',
    'Матрица корреляций (в численном виде)',
    'Тепловая карта',
    'Точечная диаграмма ',
    'График линейной зависимости',
    'График ящик с усами (диаграмма размаха)',
    'Столбцовая диаграмма',
    'Круговая диаграмма',
    'График логарифмической зависимости',
    'Множественная гистограмма',
];

export class DirectError extends React.Component {

    state = {
        currentPage: 0,
        maxPage: 3,
        dataPrepOptionId: -1,
        file: null,
    };

    paginate = (goNext) => {
        const {currentPage, maxPage} = this.state;
        if (goNext) {
            if (currentPage < maxPage) {
                this.setState({currentPage: currentPage + 1});
            } else {
                this.setState({currentPage: 1});
                this.props.onExit();
            }
        } else {
            if (currentPage > 0) {
                this.setState({currentPage: currentPage - 1});
            } else {
                this.props.onExit();
            }
        }
    };

    selectDataPrepType = (id) => this.setState({dataPrepOptionId: id});

    openCurrentPage = () => {
        const {currentPage} = this.state;
        switch (currentPage) {
            case 0:
                return (
                    <Page
                        title="Выбор графиков для реализации"
                    >
                        <FormGroup className={s.DirectError__items}>
                            {GRAPH_TYPE.map((item, idx) => (
                                <FormControlLabel
                                    className={s.DirectError__item}
                                    key={`g-${item}`}
                                    control={<Checkbox onClick={() => {
                                        this.selectUnselect(idx, 'graphics');
                                    }}/>}
                                    label={item}
                                />
                            ))}
                        </FormGroup>
                    </Page>
                );
            default:
                console.error(`unknown page: ${currentPage}`);
        }
    };

    render() {
        return (
            <div className="ListButtons">
                {this.openCurrentPage()}
                <ListButtons onClick={this.paginate}/>
            </div>
        );
    }

}
