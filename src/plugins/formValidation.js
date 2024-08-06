(function(global) {
  function initFormValidationPlugin($) {
    if (typeof $ === 'undefined') {
      console.error('ModernDOM is not defined');
      return;
    }

    $.prototype.validate = function(options) {
      const defaults = {
        errorClass: 'error',
        errorElement: 'span',
        rules: {},
        messages: {}
      };

      const settings = Object.assign({}, defaults, options);

      return this.each(function(form) {
        form.addEventListener('submit', function(e) {
          let isValid = true;

          for (let fieldName in settings.rules) {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;
            
            const value = field.value;
            const rules = settings.rules[fieldName];

            for (let rule in rules) {
              const ruleValue = rules[rule];
              let errorMessage = settings.messages[fieldName]?.[rule] || `Field is invalid`;

              switch(rule) {
                case 'required':
                  if (ruleValue && value.trim() === '') {
                    showError(field, errorMessage);
                    isValid = false;
                  }
                  break;
                case 'minlength':
                  if (value.length < ruleValue) {
                    showError(field, errorMessage);
                    isValid = false;
                  }
                  break;
                case 'maxlength':
                  if (value.length > ruleValue) {
                    showError(field, errorMessage);
                    isValid = false;
                  }
                  break;
                case 'email':
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (ruleValue && !emailRegex.test(value)) {
                    showError(field, errorMessage);
                    isValid = false;
                  }
                  break;
              }
            }
          }

          if (!isValid) {
            e.preventDefault();
          }
        });

        function showError(field, message) {
          field.classList.add(settings.errorClass);
          const errorElement = document.createElement(settings.errorElement);
          errorElement.classList.add(settings.errorClass);
          errorElement.textContent = message;
          field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
      });
    };

    console.log('Form validation plugin loaded successfully');
  }

  function waitForDependencies() {
    return new Promise((resolve) => {
      function check() {
        if (typeof global.$ !== 'undefined') {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      }
      check();
    });
  }

  function init() {
    waitForDependencies()
      .then(() => {
        initFormValidationPlugin(global.$);
      })
      .catch((error) => {
        console.error('Error initializing Form validation plugin:', error);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(typeof window !== 'undefined' ? window : this);