(function(global) {
  function initPlugin($, ClassicEditor) {
    if (typeof $ === 'undefined') {
      console.error('ModernDOM is not defined');
      return;
    }

    $.fn.ckeditor = function(options) {
      return this.each(function() {
        ClassicEditor
          .create(this, options)
          .then(editor => {
            $(this).data('ckeditor', editor);
          })
          .catch(error => {
            console.error('CKEditor initialization failed:', error);
          });
      });
    };

   
  $.fn.getCKEditor = function() {
    return this.data('ckeditor');
  };

  $.fn.ckeditorContent = function(content) {
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

  $.fn.ckeditorDestroy = function() {
    const editor = this.getCKEditor();
    if (editor) {
      editor.destroy()
        .then(() => {
          this.removeData('ckeditor');
        })
        .catch(error => {
          console.error('CKEditor destruction failed:', error);
        });
    }
    return this;
  };

  // Додайте базові методи, якщо вони відсутні
  if (!$.fn.each) {
    $.fn.each = function(callback) {
      for (let i = 0; i < this.length; i++) {
        callback.call(this[i], i, this[i]);
      }
      return this;
    };
  }

  if (!$.fn.data) {
    $.fn.data = function(key, value) {
      if (value === undefined) {
        return this[0] ? this[0]._data && this[0]._data[key] : undefined;
      }
      return this.each(function() {
        if (!this._data) this._data = {};
        this._data[key] = value;
      });
    };
  }

  if (!$.fn.removeData) {
    $.fn.removeData = function(key) {
      return this.each(function() {
        if (this._data && this._data[key]) {
          delete this._data[key];
        }
      });
    };
  }

    console.log('CKEditor plugin loaded successfully');
  }

  // Чекаємо, поки ModernDOM та ClassicEditor стануть доступними
  function checkDependencies() {
    if (typeof global.$ !== 'undefined' && typeof global.ClassicEditor !== 'undefined') {
      initPlugin(global.$, global.ClassicEditor);
    } else {
      setTimeout(checkDependencies, 50);
    }
  }

  // Запускаємо перевірку залежностей після завантаження DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkDependencies);
  } else {
    checkDependencies();
  }
})(typeof window !== 'undefined' ? window : this);