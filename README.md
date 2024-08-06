# ModernDOM CKEditor 5 Plugin

Цей плагін інтегрує CKEditor 5 з бібліотекою ModernDOM.

## Встановлення

```bash
npm install moderndom @ckeditor/ckeditor5-build-classic moderndom-ckeditor-plugin
```

Використання

##

```html <textarea id="editor"></textarea>
<script src="path/to/moderndom.min.js"></script>
<script src="path/to/ckeditor5-build-classic.js"></script>
<script src="path/to/moderndom-ckeditor-plugin.js"></script>
<script>
  $(document).ready(function () {
    $("#editor").ckeditor({
      // Опції CKEditor
    });
  });
</script>
```

## API

ckeditor(options): Ініціалізує CKEditor на вибраному елементі
getCKEditor(): Повертає екземпляр CKEditor
ckeditorContent([content]): Отримує або встановлює вміст редактора
ckeditorDestroy(): Знищує екземпляр CKEditor

Приклади

```javascript
javascriptCopy; // Ініціалізація
$("#editor").ckeditor();

// Отримання вмісту
const content = $("#editor").ckeditorContent();

// Встановлення вмісту
$("#editor").ckeditorContent("<p>Новий вміст</p>");

// Знищення редактора
$("#editor").ckeditorDestroy();
```
