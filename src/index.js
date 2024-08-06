(function(factory) {
    if (typeof define === 'function' && define.amd) {
      define(['moderndom', '@ckeditor/ckeditor5-build-classic'], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = function(root, moderndom) {
        if (typeof moderndom === 'undefined') {
          moderndom = require('moderndom');
        }
        const CKEditor = require('@ckeditor/ckeditor5-build-classic');
        return factory(moderndom, CKEditor);
      };
    } else {
      factory(ModernDOM, ClassicEditor);
    }
  }(function($, ClassicEditor) {
    $.fn.ckeditor = function(options) {
      return this.each(function() {
        const $this = $(this);
        ClassicEditor
          .create(this, options)
          .then(editor => {
            $this.data('ckeditor', editor);
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
  }));