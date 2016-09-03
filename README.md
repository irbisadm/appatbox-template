# AppAtBox project template v1.0.5
> Стартовый шаблон для быстрого начала работы над проектом

## Начало работы в новом проекте
```shell
git clone git@gitlab.com:irbisadm/appatbox-template.git
cd appatbox-template
git remote remove origin
```

## Установка
```shell
npm install -g grunt-cli
npm install
```
Для дальнейшей работы вам нужно собрать проект - смотите ниже Grunt цели

## Доступные Grunt цели

### Разовая генерация
```shell
grunt build
```
### Полная перегенерация
```shell
grunt build
```
### Watcher для активной работы
```shell
grunt
```
### Publish с минификацией html (для сборки статических сайтов)
```shell
grunt publish
```

## Changelog
### Что нового в версии 1.0.5
- Изменен шаблон на pug blocks
- css переименованы в pcss для настройки подсветки в IDE как SASS 
- обновлен normalize.css обновлен до  v4.2.0
- добавлены медиа на 544 и 1440

### Что нового в версии 1.0.4
 - Добавлено копирование svg файлов в watch
 - Добавлены meta для социального шаринга
 - Выделены константы с метатегами
 - По умолчанию, теперь проект закрыт для индексирования (переменная noindex выставленная в false откроет проект)
 - Обновлены версии npm модулей

### Что нового в версии 1.0.3
 - Добавлен postcss-nested
 - normalize.css отделен от bootstrap grid
 - normalize.css обновлен до  v4.0.0
 - Исправлены ошибки Grunt
   - цель watch выделена в default
   - разовая сборка переназвана build 
   - создана цель rebuild для пересборки проекта на чисто.

### Что нового в версии 1.0.2
 - Удалены генерируемые файлы
 - Генерируемые файлы добавлены в gitignore
 - Добавлена генерация html кода отдельных jade модулей для упрощения переноса на шаблоны бекенда
 - Для default цели Grunt убран watch
 - Добавлена цель Grunt watch
 - Добавлен модуль grunt-contrib-htmlmin
 - Добавлена цель Grunt publish
 - Скрипты из ga.jade и ym.jade перенесены в 20_ga.js и 30_ym.js соответственно
 - В css и js добавлены папки disabled - для сокрытия не импользуемых модулей 
   - Сокрыта css сетка bootstrap
   - Сокрыт модуль Google Analytics
 
### Что нового в версии 1.0.1
 - Добавлена сетка от bootstrap 3.5
 - Созданы css файлы для прозрачной mobile-first верстки
 - Добавлена сорторовка сборки css и js