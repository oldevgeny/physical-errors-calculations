import * as React from 'react';

import * as s from './DirectError.scss';

import {ListButtons} from '../ManageButtons';
import {DataGrid} from '@mui/x-data-grid';
import {Box, TextField} from "@mui/material";

let columns = [];
let rows = [];

const Page = (props) => (
    <div>
        <h2>{props.title}</h2>
        <div>{props?.description || ''}</div>
        {props.children}
    </div>
);

export class DirectError extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            maxPage: 1,
            measurementsNumber: '2',
            valuesNumber: '2',
        };

        this.handleChangeMeasurementsNumber = this.handleChangeMeasurementsNumber.bind(this);
        this.handleChangeValuesNumber = this.handleChangeValuesNumber.bind(this);
    }

    handleChangeMeasurementsNumber(event,) {
        this.setState({measurementsNumber: event.target.value});
    }

    handleChangeValuesNumber(event,) {
        this.setState({valuesNumber: event.target.value});
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
                                    variant="standard"
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
                columns = []
                rows = []

                for (let i = 0; i < Number(this.state.measurementsNumber); i++) {
                    columns.push({field: 'measurements', headerName: i, type: 'number', width: 180, editable: true})
                    console.log(columns)
                }

                for (let i = 0; i < Number(this.state.valuesNumber); i++) {
                    // rows.push({ field: 'values', headerName: "x_" + String(i), type: 'number', editable: true })
                    rows.push({
                        id: i,
                        values: i + 10
                    })
                    console.log(rows)
                }
                return (
                    <Page
                        title="Введите следующие параметры"
                    >
                        <div style={{height: 300, width: '100%'}}>
                            <DataGrid editMode="row" rows={rows} columns={columns}/>
                        </div>
                    </Page>
                )
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
