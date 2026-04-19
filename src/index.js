import './style.css';
import {Popover} from './components/popover.js'

document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('[data-toggle="popover"]');
  triggers.forEach(trigger => new Popover(trigger));
});

document.addEventListener('click', (e) => {
  if (!e.target.matches('[data-toggle="popover"]')) {
    document.querySelectorAll('.popover').forEach(popover => {
      popover.style.display = 'none';
    });
  }
});
