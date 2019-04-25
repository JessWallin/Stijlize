import React from 'react';
import Routes from './routes';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const App = () => {
  return (
    <div className="container">
      <Routes />
    </div>
  );
};

export default App;
