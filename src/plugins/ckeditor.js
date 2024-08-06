(function(global) {
    function initPlugin($, ClassicEditor) {
      if (typeof $ === 'undefined') {
        console.error('ModernDOM is not defined');
        return;
      }
  
      // Додаємо метод each, якщо він відсутній
      if (!$.prototype.each) {
        $.prototype.each = function(callback) {
          for (let i = 0; i < this.length; i++) {
            callback.call(this[i], i, this[i]);
          }
          return this;
        };
      }
  
      $.prototype.ckeditor = function(options) {
        return this.each(function() {
          ClassicEditor
            .create(this, options)
            .then(editor => {
              this._ckeditorInstance = editor;
            })
            .catch(error => {
              console.error('CKEditor initialization failed:', error);
            });
        });
      };
  
      $.prototype.getCKEditor = function() {
        return this[0] ? this[0]._ckeditorInstance : null;
      };
  
      $.prototype.ckeditorContent = function(content) {
        const editor = this.getCKEditor();
        if (editor) {
          if (content === undefined) {
            return editor.getData();
          } else {
            editor.setData(content);
            return this;
          }
        }
        return this;
      };
  
      $.prototype.ckeditorDestroy = function() {
        return this.each(function() {
          const editor = this._ckeditorInstance;
          if (editor) {
            editor.destroy()
              .then(() => {
                delete this._ckeditorInstance;
              })
              .catch(error => {
                console.error('CKEditor destruction failed:', error);
              });
          }
        });
      };
  
      console.log('CKEditor plugin loaded successfully');
    }
  
    function waitForDependencies() {
      return new Promise((resolve) => {
        function check() {
          if (typeof global.$ !== 'undefined' && typeof global.ClassicEditor !== 'undefined') {
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
          initPlugin(global.$, global.ClassicEditor);
        })
        .catch((error) => {
          console.error('Error initializing CKEditor plugin:', error);
        });
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
  })(typeof window !== 'undefined' ? window : this);
  
  
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
  
        return this.each(function() {
          const form = $(this);
          
          form.on('submit', function(e) {
            let isValid = true;
  
            for (let fieldName in settings.rules) {
              const field = form.find(`[name="${fieldName}"]`);
              const value = field.val();
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
            field.addClass(settings.errorClass);
            const errorElement = $(`<${settings.errorElement}>`).addClass(settings.errorClass).text(message);
            field.after(errorElement);
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
  
  
  
  