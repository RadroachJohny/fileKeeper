import './styles.scss';

import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';

let salesArr = [];

if(localStorage.getItem('salesList')) {
    salesArr = JSON.parse(localStorage.getItem('salesList'));
}

const totalEarnings = salesArr.reduce((acc, elem) => {
    return acc + (elem.price *  elem.remains);
}, 10)

const totalSum = totalEarnings;

console.log(totalSum);


const testDateArr = salesArr.map(elem => {
    const sellDateMinutes = elem.id;
   return {...elem, totalSumSold: elem.price * elem.remains, minutesPassed: Math.floor((elem.id/(1000*60)))}
});

// export const data = [];

export const data = testDateArr.sort((a, b) => {
    return a.minutesPassed - b.minutesPassed;
})

console.log(data.length);


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}






// export const data = [
//     {hours: 5, totalEarned: 160},
//     {hours: 7, totalEarned: 247},
//     {hours: 12, totalEarned: 50},
//     {hours: 25, totalEarned: 180},
//     {hours: 32, totalEarned: 312},
// ]





// console.log(data);



// export const data = [
//     {
//         year: 1993, military: 32,
//     }, {
//         year: 1995, military: 33,
//     }, {
//         year: 1997, military: 30,
//     }, {
//         year: 1999, military: 34,
//     }, {
//         year: 2001, military: 33,
//     }, {
//         year: 2003, military: 30,
//     }, {
//         year: 2006, military: 32,
//     }, {
//         year: 2008, military: 30,
//     }, {
//         year: 2010, military: 32,
//     }, {
//         year: 2012, military: 33,
//     },
// ];

const format = () => tick => tick;
const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendLabelStyles = theme => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: 'nowrap',
    },
});
const legendItemStyles = () => ({
    item: {
        flexDirection: 'column',
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
    chart: {
        paddingRight: '62px',
        paddingLeft: '32px',
    },
    title: {
        whiteSpace: 'pre',
    },
});

const ValueLabel = (props) => {
    const { text } = props;
    return (
        <ValueAxis.Label
            {...props}
            text={`${text}`}
        />
    );
};

const titleStyles = {
    title: {
        whiteSpace: 'pre',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '18px',
        fontFamily: 'Inter'
    },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
    <Title.Text {...props} className={classes.title} />
));

class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;
        const { classes } = this.props;

        return (
            <Paper className='line-height100'>
                <Chart
                    className={`${'line-height100'} ${'paddingLR'}`}
                    data={chartData}
                    // className={classes.chart}
                >
                    {/*<ArgumentAxis tickFormat={format} />*/}

                    {/*<ValueAxis*/}
                    {/*    max={50}*/}
                    {/*    labelComponent={ValueLabel}*/}
                    {/*/>*/}

                    {data.length > 0 && <LineSeries
                        className='line-height100'
                        // name='$106.000'
                        // name='10000'
                        name={`$${numberWithCommas(totalSum)}`}
                        valueField="totalSumSold"
                        argumentField="minutesPassed"
                        // valueField="totalEarned"
                        // argumentField="hours"
                    />}
                    {data.length === 0 && <p className='noData'>No Data</p>}
                    <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                    <Title
                        text={`Total earned`}
                        textComponent={TitleText}
                    />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);