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

export default class ConfidenceIndicator extends HTMLElement {
  level: string
  title: string
  shadow: DocumentFragment

  static get observedAttributes() {return ['title', 'level', 'color']; }

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const title = document.createElement('div') as HTMLElement;
    title.className = 'title';
    title.style.cssFloat = 'left';
    title.style.marginRight = '10px';
    shadow.appendChild(title);

    const levelContainer = document.createElement('div');
    levelContainer.className = 'level-container';
    levelContainer.style.cssFloat = 'right';
    levelContainer.style.width = '200px';
    levelContainer.style.height = '20px';
    levelContainer.style.border = '1px solid #ddd';

    const level = document.createElement('div');
    level.className = 'level';
    level.style.backgroundColor = 'green';
    level.style.width = '100%';
    level.style.height = '100%';
    level.style.transformOrigin = '0';

    levelContainer.appendChild(level);
    shadow.appendChild(levelContainer);

    const end = document.createElement('div');
    end.style.clear = 'both';
    shadow.appendChild(end);

    this.shadow = shadow;
  }

  // Set up initial state.
  connectedCallback() {
    if (!this.getAttribute('level')) {
      this.setAttribute('level', '0');
    }
    if (!this.getAttribute('title')) {
      this.setAttribute('title', 'ConfidenceIndicator');
    }
    if (!this.getAttribute('color')) {
      this.setAttribute('color', 'green');
    }
  }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    const levelEl = this.shadow.querySelector('.level') as HTMLElement;
    if (attr == 'title') {
      this.shadow.querySelector('.title').innerHTML = newValue;
    } else if (attr == 'level') {
      levelEl.style.transform = `scaleX(${newValue})`;
    } else if (attr == 'color') {
      levelEl.style.backgroundColor = newValue;
    }
  }
}

window.customElements.define('confidence-indicator', ConfidenceIndicator);
