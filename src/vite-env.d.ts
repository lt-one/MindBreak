/// <reference types="vite/client" />

import * as React from 'react';
import { JSX as ReactJSX } from 'react/jsx-runtime';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
  }
}
