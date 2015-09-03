import React from 'react'
import Root from './components/root'

try {
  React.render(
    <Root />,
    document.body
  );
} catch (e) {
  console.log(e.stack);
}
