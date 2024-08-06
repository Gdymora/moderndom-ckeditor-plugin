import './plugins/ckeditor';
import './plugins/formValidation';
import './plugins/autocomplete';

// Якщо у вас є якась спільна логіка для всіх плагінів, ви можете додати її тут

console.log('All ModernDOM plugins loaded');

// Якщо вам потрібно експортувати щось спільне для всіх плагінів
export const VERSION = '1.0.0';

// Ви також можете експортувати функцію для ініціалізації всіх плагінів разом
export function initAllPlugins($) {
  if (typeof $ === 'undefined') {
    console.error('ModernDOM is not defined');
    return;
  }

  // Ініціалізація всіх плагінів
  if ($.prototype.ckeditor) $.prototype.ckeditor();
  if ($.prototype.validate) $.prototype.validate();
  if ($.prototype.autocomplete) $.prototype.autocomplete();

  console.log('All plugins initialized');
}