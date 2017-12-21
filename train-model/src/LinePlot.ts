/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

interface Params {
  title: string
  axisTitles: string[]
}

export default class LinePlot {
  el: HTMLElement
  title: string
  axisTitles: string[]
  initDate: Date

  constructor(params: Params) {
    const {title, axisTitles} = params;
    this.title = title;
    this.axisTitles = axisTitles;

    this.el = this.createPlotElement();
    this.initDate = new Date();
  }

  add(t: number, data: number | number[]) {
    if (!data.length) {
      data = [data];
    }
    const indices = data.map((val, ind) => val ? ind : null)
      .filter(ind => ind != null);
    const x = indices.map(val => [t]);
    const y = indices.map(ind => [data[ind]]);
    const update = {x, y};
    Plotly.extendTraces(this.el, update, indices);
  }

  elapsed() {
    return (new Date() - this.initDate) / 1000;
  }

  getElement() {
    return this.el;
  }

  private createPlotElement() {
    // Render a new Plotly plot.
    const out = document.createElement('div');
    out.className = 'plot';
    const data = [
      {x: [], y: [], type: 'line'},
      {x: [], y: [], type: 'line', yaxis: 'y2'},
    ];
    const layout = {
      title: this.title,
      showlegend: false,
      yaxis: {
        title: this.axisTitles[0],
      },
      yaxis2: {
        title: this.axisTitles[1],
        overlaying: 'y',
        side: 'right',
      }
    }
    Plotly.newPlot(out, data, layout);
    return out;
  }
}
