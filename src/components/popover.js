export class Popover {
  constructor(trigger) {
    this.trigger = trigger;
    this.title = trigger.getAttribute('data-title');
    this.content = trigger.getAttribute('data-content');
    this.popover = null;
    this.init();
  }

  init() {
    this.trigger.addEventListener('click', () => this.toggle());
  }

  createPopover() {
    const popover = document.createElement('div');
    popover.className = 'popover';

    const arrow = document.createElement('div');
    arrow.className = 'arrow';

    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = this.title;

    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = this.content;

    popover.append(arrow);
    popover.append(header);
    popover.append(body);

    document.body.appendChild(popover);
    return popover;
  }

  positionPopover() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverWidth = this.popover.offsetWidth;
    const popoverHeight = this.popover.offsetHeight;

    const left = triggerRect.left + (triggerRect.width / 2) - (popoverWidth / 2);
    const top = triggerRect.top - popoverHeight - 10 ;

    this.popover.style.left = `${left}px`;
    this.popover.style.top = `${top}px`;
  }

  show() {
  if (!this.popover) {
    this.popover = this.createPopover();
  }
  this.popover.style.display = 'block';
    this.positionPopover();
  ;
}


  hide() {
    if (this.popover) {
      this.popover.style.display = 'none';
    }
  }

  toggle() {
    if (this.popover && this.popover.style.display === 'block') {
      this.hide();
    } else {
      this.show();
    }
  }
}