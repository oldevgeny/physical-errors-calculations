import * as React from 'react';

import * as s from './DirectError.scss';

import {ListButtons} from '../ManageButtons';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import S_i from '../../media/S_i.jpeg';
import x_mean from '../../media/x_mean.jpeg';
import E_i from '../../media/E_i.jpg';

const STUDENT_TABLE = {
    "2": 12.7062047364,
    "3": 4.30265272991,
    "4": 3.18244630528,
    "5": 2.7764451052,
    "6": 2.57058183661,
    "7": 2.44691184879,
    "8": 2.36462425101,
    "9": 2.30600413503,
    "10": 2.26215716274,
}

function createData(name, val) {
    return { name, val};
};

function getMeanX(xDict) {
    let sum = 0;
    for (let val of Object.values(xDict)) {
      sum += parseFloat(val);
    }
    let mean = sum / Object.keys(xDict).length

    return mean;
}

function getS(xDict) {
    let sum = 0;
    for (let val of Object.values(xDict)) {
      sum += Math.pow((parseFloat(val) - getMeanX(xDict)), 2);
    }
    console.log("sum = ", sum)
    let n = Object.keys(xDict).length
    console.log("n = ", n)
    let S = Math.sqrt(sum / (n * (n - 1)))
    console.log("(n * (n - 1)) = ", (n * (n - 1)))

    return S
}

function getStudentCoef(measurementsNumber) {
    return STUDENT_TABLE[measurementsNumber.toString()]
}

function getTotalError(xDict, measurementsNumber) {
    let TotalError = 0

    let S = getS(xDict)
    let StudentCoef = getStudentCoef(measurementsNumber)

    TotalError = StudentCoef * parseFloat(S)

    return TotalError
}

function getResult(xDict, measurementsNumber) {
    let meanX = getMeanX(xDict).toFixed(1)
    let totalError = getTotalError(xDict, measurementsNumber).toFixed(1)

    return meanX.toString() + "±" + totalError.toString()
}

const Page = (props) => (
    <div>
        <h2>{props.title}</h2>
        <div>{props?.description || ''}</div>
        {props.children}
    </div>
);

let table_settings = [
    {'0': '', '1': '', '2': ''},
    {'0': '', '1': '', '2': ''},
    {'0': '', '1': '', '2': ''}
]

export class DirectError extends React.Component {

    state = {
        currentPage: 0,
        maxPage: 5,
        measurementsNumber: '3',
        valuesNumber: '3',
        systematicError: '0',
        table_settings: table_settings
    };

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
        if (this.state.measurementsNumber !== event.target.value)
        {
            if (parseFloat(event.target.value) < 2) {
                this.state.measurementsNumber = 2
            }
            else if (parseFloat(event.target.value) > 10) {
                this.state.measurementsNumber = 10
            }
            else {
                this.state.measurementsNumber = parseInt(event.target.value);
            }

            let dict = {};
            this.state.table_settings = [];
            for (let i = 0; i < this.state.measurementsNumber; i++) {
                dict[i.toString()] = "";
            }
            for (let i = 0; i < this.state.valuesNumber; i++) {
                this.state.table_settings.push(dict);
            }
        }
    }

    handleChangeValuesNumber(event,) {
        if (this.state.valuesNumber !== event.target.value)
        {
            if (parseFloat(event.target.value) < 1) {
                this.state.valuesNumber = 1
            }
            else if (parseFloat(event.target.value) > 8) {
                this.state.valuesNumber = 8
            }
            else {
                this.state.valuesNumber = parseInt(event.target.value)
            }

            let dict = {};
            this.state.table_settings = [];

            for (let i = 0; i < this.state.measurementsNumber; i++) {
                dict[i.toString()] = "";
            }
            for (let i = 0; i < this.state.valuesNumber; i++) {
                this.state.table_settings.push(dict)
            }
        }
    }

    handleChangeSystematicError(event,) {
        if (this.state.systematicError !== event.target.value)
        {
            if (parseFloat(event.target.value) < 0) {
                this.state.systematicError = 0
            }
            else {
                this.state.systematicError = parseFloat(event.target.value)
            }
        }
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
                                gridTemplateRows: 'repeat(3, 1fr)',
                                gridTemplateColumns: 'auto',
                                gridTemplateAreas: `". valuesNumber ."
                              ". measurementsNumber ."
                              ". systematicError ."`,
                                gap: 2,
                                width: '100%'
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ gridArea: 'valuesNumber' }}>
                                <TextField
                                    id="valuesNumber"
                                    label="Количество величин"
                                    type="number"
                                    defaultValue={this.state.valuesNumber}
                                    helperText="Введите целое число от 1 до 5."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        this.handleChangeValuesNumber(e)
                                    }}
                                    style = {{width: 250}}
                                />
                            </Box>
                            <Box sx={{ gridArea: 'measurementsNumber' }}>
                                <TextField
                                    id="measurementsNumber"
                                    label="Количество измерений"
                                    type="number"
                                    defaultValue={this.state.measurementsNumber}
                                    helperText="Введите целое число от 1 до 10."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        this.handleChangeMeasurementsNumber(e)
                                    }}
                                    style = {{width: 250}}
                                />
                            </Box>
                            {/*<Box sx={{ gridArea: 'systematicError' }}>*/}
                            {/*    <TextField*/}
                            {/*        label="Систематическая погрешность"*/}
                            {/*        type="number"*/}
                            {/*        inputProps={{ inputMode: 'numeric', step: '0.1' }}*/}
                            {/*        defaultValue={this.state.systematicError}*/}
                            {/*        helperText="Введите неотрицательное значение погрешности."*/}
                            {/*        InputLabelProps={{*/}
                            {/*            shrink: true,*/}
                            {/*        }}*/}
                            {/*        onChange={(e) => {*/}
                            {/*            this.handleChangeSystematicError(e)*/}
                            {/*        }}*/}
                            {/*        style = {{width: 250}}*/}
                            {/*    />*/}
                            {/*</Box>*/}
                        </Box>
                    </Page>
                )
            case 1:
                console.clear();
                console.log(this.state.table_settings);
                let numbers = [];

                for (let i = 0; i < parseInt(this.state.measurementsNumber); i++) {
                    numbers[i] = i + 1;
                }



                return (
                    <Page
                        title="Введите следующие параметры"
                        description="x_i — i-ая переменная.
                        n — Номер измерения."
                    >
                        <table
                            className={s.table}
                            className="table table-bordered"
                        >
                            <thead>
                            <tr>
                                x\n
                                {numbers.map((num) => (
                                    <th>{num}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.table_settings.map((row, index) => {
                                return (
                                    <tr>
                                        x_{index + 1}
                                        {numbers.map((num) => (
                                            <td>
                                                <input
                                                    onChange={
                                                        (e) => this.handleChange(
                                                            index, `${num - 1}`, e.target.value
                                                        )
                                                    }
                                                    type='number'
                                                    className={s.form_cotrol}
                                                    step='1' min="1"
                                                    defaultValue={this.state.table_settings[index][`${num - 1}`]}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </Page>
                );
            case 2:
                let rows = [];

                for (let i = 0; i < parseInt(this.state.valuesNumber); i++) {
                    rows.push(
                        createData(
                            'x_' + (i + 1).toString(),
                            getMeanX(this.state.table_settings[i]).toFixed(2)),
                        )
                }

                console.log(rows)

                return (
                    <Page title="Промежуточный результат">
                        <TableContainer component={Paper} class="table-container">
                          <Table sx={{ width: 500 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                  <TableCell align="left">
                                      <img src={x_mean} id="x_mean" />
                                  </TableCell>
                                  <TableCell align="right">x<sub>i</sub></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow
                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell size="small" component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell size="small" align="right">{row.val}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                            <div class="description">
                                x<sub>i</sub> — среднее значение измеряемой i-ой переменной
                            </div>
                            <div className="description">
                                n — количество измерений
                            </div>
                        </TableContainer>
                    </Page>
                );
            case 3:
                rows = [];

                for (let i = 0; i < parseInt(this.state.valuesNumber); i++) {
                    rows.push(
                        createData(
                            'S_' + (i + 1).toString(),
                            getS(this.state.table_settings[i]).toFixed(2)),
                        )
                }

                console.log(rows)
                return (
                     <Page title="Промежуточный результат">
                        <TableContainer component={Paper} class="table-container">
                          <Table sx={{ width: 500 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">
                                    <img src={"." + S_i} id="S_i" />
                                </TableCell>
                                <TableCell align="right">S<sub>i</sub></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow
                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell size="small" component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell size="small" align="right">{row.val}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                            <div class="description">
                                S<sub>i</sub> — абсолютная погрешность среднего значения i-й измеряемой переменной
                            </div>
                        </TableContainer>
                    </Page>
                );
            case 4:
                rows = [];

                for (let i = 0; i < parseInt(this.state.valuesNumber); i++) {
                    rows.push(
                        createData(
                            'ε(x_' + (i + 1).toString() + ')',
                            getTotalError(this.state.table_settings[i], this.state.measurementsNumber).toFixed(2)),
                        )
                }

                console.log(rows)
                return (
                     <Page title="Итоговый результат">
                        <TableContainer component={Paper} class="table-container">
                          <Table sx={{ width: 500 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">
                                    <img src={"." + E_i} id="E_i" />
                                </TableCell>
                                <TableCell align="right">&epsilon;<sub>i</sub></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow
                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell size="small" component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell size="small" align="right">{row.val}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                            <div class="description">
                                &epsilon;<sub>i</sub> — Суммарная погрешность i-ой переменной
                            </div>
                            <div className="description">
                                t<sub>n</sub> — Коэффициент Стьюдента при n измерениях и доверительной вероятность P=0,95
                            </div>
                        </TableContainer>
                    </Page>
                );
            case 5:
                rows = [];

                for (let i = 0; i < parseInt(this.state.valuesNumber); i++) {
                    rows.push(
                        createData(
                            'x_' + (i + 1).toString(),
                            getResult(this.state.table_settings[i], this.state.measurementsNumber)
                        ),
                    )
                }

                console.log(rows)
                return (
                     <Page title="Итоговый результат">
                        <TableContainer component={Paper} class="table-container">
                          <Table sx={{ width: 500 }} aria-label="simple table">
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow
                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell size="small" component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell size="small" align="right">{row.val}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
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
