
import template from 'lib/template';
import events from 'events/app';
import NavListItemComponent from 'components/nav_list_item';

export default class {
  
  constructor(params, store) {
    this.store = store;
    this.collection = params.collection;
    this.$el = params.$el;

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

  render() {
    const $ul = document.createElement('ul');
    this.$el.innerHTML = '';
    this.$el.appendChild($ul);
    return this.$el;
  }

  populate() {
    const $ul = this.$el.querySelector('ul');
    $ul.innerHTML = ''; 
    this.collection.models.forEach((item, i) => {
      const nav_list_item_component = new NavListItemComponent({
        item: item.toJSON()
      });
      $ul.appendChild(nav_list_item_component.render());
    });
  }

  onClick(ev) {
    if (ev.target.tagName == 'A') {
      // (Let this bubble up to click:navigate event -- don't stopPropagation())
      ev.preventDefault();
      this.clearSelected();
      this.selected_index = this.getIndexOf(ev.target.parentNode);
      this.highlightAtIndex(this.selected_index);
      events.emit('nav-list:selected', ev.target.parentNode.dataset.pathname);
    }
  }

  onKeyup(ev) {
    if (ev.target.value != this.last_search_value) {
      this.populate();
    }
  }

  // use history.back() and forward() to prevent browser throttling pushState calls
  onKeydown(ev) {
    ev.stopPropagation();
    if (ev.target.value != this.last_search_value) {
      this.setSelectedIndex(null);
      this.clearSelected();
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
      this.setSelectedIndex(this.getNextIndex(operand, this.getSelectedIndex()));
      this.highlightAtIndex(this.getSelectedIndex());
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

  /*highlightFromPathname(path) {
    this.clearSelected();
    Array.from(this.$el.querySelectorAll('li')).forEach(($li, i) => {
      if ($li.dataset.pathname == path) {
        this.selected_index = i + 1; ///// !!!!!!!!!1
        $li.className = 'selected';
      }
    });
  }*/
}

