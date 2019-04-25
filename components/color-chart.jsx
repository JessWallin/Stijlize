import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

// A chart instance;
// Data for the chart;
// Defined data fields.

class ColorChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
    // const data = getData();

    let chart = am4core.create('chartdiv', am4charts.TreeMap);

    chart.data = this.props.colors;

    chart.dataFields.value = 'percent';
    chart.dataFields.name = 'hue';
    chart.dataFields.color = 'color';

    // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.grid.template.location = 0;

    // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.tooltip.disabled = true;
    // valueAxis.renderer.minWidth = 35;

    // let series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.dateX = 'date';
    // series.dataFields.valueY = 'value';

    // series.tooltipText = '{valueY.value}';
    // chart.cursor = new am4charts.XYCursor();

    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    console.log('component connected');
    return <div id="chartdiv" style={{ width: '100%', height: '500px' }} />;
  }
}

export default ColorChart;
