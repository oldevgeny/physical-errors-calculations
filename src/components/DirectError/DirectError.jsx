import * as React from 'react';

import * as s from './DirectError.scss';

import {ListButtons} from '../ManageButtons';
import {Box, TextField} from "@mui/material";

const Page = (props) => (
    <div>
        <h2>{props.title}</h2>
        <div>{props?.description || ''}</div>
        {props.children}
    </div>
);

const table_settings = [
                    {'0': '','1': '', '2': '', '3': '', '4': ''},
                    {'0': '','1': '', '2': '', '3': '', '4': ''},
                    {'0': '','1': '', '2': '', '3': '', '4': ''},
                    {'0': '','1': '', '2': '', '3': '', '4': ''},
                    {'0': '','1': '', '2': '', '3': '', '4': ''},
                    {'0': '','1': '', '2': '', '3': '', '4': ''},
                    {'0': '','1': '', '2': '', '3': '', '4': ''},
                    {'0': '','1': '', '2': '', '3': '', '4': ''}
                ]

export class DirectError extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentPage: 0,
    //         maxPage: 1,
    //         measurementsNumber: '2',
    //         valuesNumber: '2',
    //         table_settings: table_settings
    //     };
    //
    //     this.handleChange = this.handleChange.bind(this);
    // }
    state = {
        currentPage: 0,
        maxPage: 1,
        measurementsNumber: '2',
        valuesNumber: '2',
        table_settings: table_settings
    };

    // settings = {
    //     fileOne: "",
    //     fileTwo: "",
    //     plan: 0,
    //     method: 0,
    //     table: tableDict,
    //     visualisation: visualisationDict
    // };

    handleChange(index, dataType, value) {
        const newState = this.state.table_settings.map((item, i) => {
            if (i == index) {
                return {...item, [dataType]: value};
            }
            return item;
        });

        this.state.table_settings = newState
    }

    handleChangeMeasurementsNumber(event,) {
        this.state.measurementsNumber = event.target.value
    }

    handleChangeValuesNumber(event,) {
        this.state.valuesNumber = event.target.value
    }

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

        console.log(this.state)
    };
    openCurrentPage = () => {
        const {currentPage} = this.state;
        switch (currentPage) {
            case 0:
                return (
                    <Page
                        title="Введите следующие параметры"
                    >
                        <Box
                            className={s.DirectError__BoxNumberFields}
                            component="form"
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {sm: '1fr 1fr'},
                                gap: 2,
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-number"
                                    label="Количество величин"
                                    type="number"
                                    defaultValue={this.state.measurementsNumber}
                                    helperText="Введите целое число от 1 до 20."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChangeMeasurementsNumber}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-number"
                                    label="Количество измерений"
                                    type="number"
                                    defaultValue={this.state.valuesNumber}
                                    helperText="Введите целое число от 1 до 20."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChangeValuesNumber}
                                />
                            </div>
                        </Box>
                    </Page>
                )
            case 1:

                // let table_settings = [
                //     {'0': '','1': '', '2': '', '3': '', '4': ''},
                //     {'0': '','1': '', '2': '', '3': '', '4': ''},
                //     {'0': '','1': '', '2': '', '3': '', '4': ''},
                //     {'0': '','1': '', '2': '', '3': '', '4': ''},
                //     {'0': '','1': '', '2': '', '3': '', '4': ''},
                //     {'0': '','1': '', '2': '', '3': '', '4': ''},
                //     {'0': '','1': '', '2': '', '3': '', '4': ''},
                //     {'0': '','1': '', '2': '', '3': '', '4': ''}
                // ]

                // this.state.table_settings = table_settings

                // console.clear();
                console.log(JSON.stringify(this.state.table_settings));
                let numbers = [];

                for (let i = 0; i <= parseInt(this.state.measurementsNumber); i++) {
                    numbers[i] = i + 1;
                }
                return (
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            {numbers.map((num) => (
                                <th key={num}>{num}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.table_settings.map((row, index) => {
                            return (
                                <tr>
                                    {numbers.map((num) => (
                                        <td>
                                            <input onChange={
                                                (e) => this.handleChange(
                                                    index, `${num}`, e.target.value
                                                )
                                            }
                                                   type='number'
                                                   className='form-control'
                                                   step='1' min="1"
                                                   value={this.state.table_settings[index][`${num}`]}/>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
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
