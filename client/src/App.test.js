import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Check layout:', () => {
  let container = null;
  beforeEach(() => {
    ({ container } = render(<App />));
  });
  test('Renders footer', () => expect(container.querySelector('footer')).toBeInTheDocument());
  test('Renders main', () => expect(container.querySelector('main')).toBeInTheDocument());
  test('Renders navigation', () => expect(container.querySelector('nav')).toBeInTheDocument());

});
