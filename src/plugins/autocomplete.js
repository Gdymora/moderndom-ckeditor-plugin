(function(global) {
    function initAutocompletePlugin($) {
      if (typeof $ === 'undefined') {
        console.error('ModernDOM is not defined');
        return;
      }
  
      // Додаємо метод forEach, якщо він відсутній
      if (!$.prototype.each) {
        $.prototype.each = function(callback) {
          for (let i = 0; i < this.length; i++) {
            callback.call(this[i], this[i], i, this);
          }
          return this;
        };
      }
  
      $.prototype.autocomplete = function(options) {
        const defaults = {
          source: [],
          minLength: 2,
          maxItems: 5
        };
  
        const settings = Object.assign({}, defaults, options);
  
        this.each(function(input) {
          const autocompleteList = document.createElement('ul');
          autocompleteList.className = 'autocomplete-list';
          autocompleteList.style.display = 'none';
          
          // Вставляємо список після input
          if (input.nextSibling) {
            input.parentNode.insertBefore(autocompleteList, input.nextSibling);
          } else {
            input.parentNode.appendChild(autocompleteList);
          }
  
          input.addEventListener('input', function() {
            const value = input.value;
            autocompleteList.innerHTML = '';
  
            if (value.length < settings.minLength) {
              autocompleteList.style.display = 'none';
              return;
            }
  
            let matches = settings.source.filter(item => 
              item.toLowerCase().indexOf(value.toLowerCase()) > -1
            ).slice(0, settings.maxItems);
  
            if (matches.length > 0) {
              matches.forEach(match => {
                const li = document.createElement('li');
                li.textContent = match;
                li.addEventListener('click', function() {
                  input.value = match;
                  autocompleteList.style.display = 'none';
                });
                autocompleteList.appendChild(li);
              });
              autocompleteList.style.display = 'block';
            } else {
              autocompleteList.style.display = 'none';
            }
          });
  
          document.addEventListener('click', function(e) {
            if (e.target !== input && !autocompleteList.contains(e.target)) {
              autocompleteList.style.display = 'none';
            }
          });
        });
  
        return this;
      };
  
      console.log('Autocomplete plugin loaded successfully');
    }
  
    function init() {
      if (typeof global.$ !== 'undefined') {
        initAutocompletePlugin(global.$);
      } else {
        console.error('ModernDOM is not loaded');
      }
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
  })(typeof window !== 'undefined' ? window : this);