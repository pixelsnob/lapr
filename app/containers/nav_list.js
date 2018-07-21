
import template from 'lib/template';
import events from 'events/app';
import NavListItemContainer from 'containers/nav_list_item';

export default class {
  
  constructor(params, store) {
    this.store = store;
    this.collection = params.collection;
    this.$el = params.$el || document.createElement('template').content;
    this.params = params;

    this.selected_index = null;

    events.once('connected', this.connected.bind(this));
  }

  connected() {
    this.$el.addEventListener('click', this.onClick.bind(this));

    // Close dropdown and don't bother trying to duplicate history while
    // navigating through dropdown list
    window.addEventListener('popstate', (ev) => {
      this.close();
      this.collection.reset();
    });
  }

  render(populate = false) {
    const $ul = document.createElement('ul');
    this.$el.innerHTML = '';
    this.$el.appendChild($ul);
    if (populate) {
      this.populate();
    }
    return this.$el.nodeType == Node.DOCUMENT_FRAGMENT_NODE ? this.$el.cloneNode(true) : this.$el;
  }

  populate() {
    const $ul = this.$el.querySelector('ul');
    $ul.innerHTML = ''; 
    this.collection.models.forEach((item, i) => {
      const nav_list_item_container = new NavListItemContainer({
        ...this.params,
        item: item.toJSON(),
      }, this.store);
      $ul.appendChild(nav_list_item_container.render());
    });
  }

  onClick(ev) {
    if (ev.target.tagName == 'A') {
      // (Let this bubble up to click:navigate event -- don't stopPropagation())
      ev.preventDefault();
      this.clearSelected();
      const selected_index = this.getIndexOf(ev.target.parentNode);
      this.highlightAtIndex(selected_index);
      this.setSelectedIndex(selected_index);
      events.emit('nav-list:selected', ev.target.parentNode.dataset.pathname);
    }
  }

  onKeyup(ev) {
    if (ev.target.value != this.last_search_value) {
      this.populate();
    }
    const i = this.getSelectedIndex();
    if (i) {
      const $li = this.$el.querySelector(`li:nth-of-type(${i})`);
      if ($li && $li.dataset.pathname) {
        events.emit('app:navigate', $li.dataset.pathname);
      }
    }
  }

  // use history.back() and forward() to prevent browser throttling pushState calls
  onKeydown(ev) {
    ev.stopPropagation();
    this.clearSelected();

    if (ev.target.value != this.last_search_value) {
      this.setSelectedIndex(null);
    }
    this.last_search_value = ev.target.value;

    if (ev.keyCode == 38 || ev.keyCode == 40) {
      var operand;
      switch (ev.keyCode) {
        case 38:
          operand = -1;
          break;
        case 40:
          operand = 1;
          break;
      }
      const next_index = this.getNextIndex(operand, this.getSelectedIndex());
      this.setSelectedIndex(next_index);
      const $li = this.$el.querySelector(`li:nth-of-type(${next_index})`);
      if ($li && $li.dataset.pathname) {
        $li.className = 'selected';
        events.emit('app:navigate', $li.dataset.pathname);
      }
    }
  }
  
  getSelectedIndex() {
    return this.selected_index;
  }

  setSelectedIndex(i) {
    this.selected_index = i; 
  }

  getNextIndex(operand, i) {
    if (!i) {
      return 1;
    } else {
      const next = i + operand;
      if (next > 0 && next <= this.collection.models.length) {
        return next;
      }
    }
    return i;
  }

  getIndexOf($el) {
    const $items = this.$el.querySelectorAll('li');
    var i = 0;
    for (var $item of Array.from($items)) {
      i++;
      if ($item === $el) {
        return i;
      }
    }
  }

  highlightAtIndex(i) {
    if (!i) {
      return null;
    }
    const target = this.$el.querySelector(`li:nth-of-type(${i})`);
    if (target) {
      this.clearSelected();
      target.className = 'selected';
      const $target_a = target.querySelector('a');
      if ($target_a && location.pathname.indexOf($target_a.getAttribute('href')) == -1) {
        return $target_a.getAttribute('href');
      }
    }
    return null;
  }
  
  clearSelected() {
    const $current = this.$el.querySelector('li.selected');
    if ($current) {
      $current.className = '';
    }
  }

  close() {
    this.$el.querySelector('ul').innerHTML = '';
  }

  highlightFromPathname(path) {
    this.clearSelected();
    Array.from(this.$el.querySelectorAll('li')).forEach(($li, i) => {
      if ($li.dataset.pathname == path) {
        this.selected_index = i + 1; ///// !!!!!!!!!1
        $li.className = 'selected';
      }
    });
  }
}

