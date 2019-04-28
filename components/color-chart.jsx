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

  findEvent(ev) {
    let queryColor = ev.target.properties.fill.hex;
    queryColor = queryColor.slice(1);
    this.props.select(queryColor);
  }

  setChart() {
    let chart = am4core.create('chartdiv', am4charts.TreeMap);
    // const data = getData();

    chart.data = this.props.work.colors;

    chart.dataFields.value = 'percent';
    chart.dataFields.name = 'color';
    chart.dataFields.color = 'color';

    const colorNodes = chart.seriesTemplates.create('0');
    const colorNodesColumn = colorNodes.columns.template;
    colorNodesColumn.clickable = true;
    colorNodesColumn.stroke = am4core.color('#000');
    colorNodesColumn.strokeWidth = 5;

    colorNodesColumn.events.on('hit', this.findEvent, this);

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items = [
      {
        label: '...',
        menu: [{ type: 'png', label: 'PNG' }, { type: 'json', label: 'JSON' }],
      },
    ];

    chart.exporting.filePrefix = `${this.props.work.title}_${
      this.props.work.artist
    }`;

    this.chart = chart;
  }

  componentDidMount() {
    this.setChart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.work.id !== prevProps.work.id) {
      this.setChart();
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chartdiv" style={{ width: '100%', height: '500px' }} />;
  }
}

export default ColorChart;
