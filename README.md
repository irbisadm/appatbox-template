# AppAtBox project template v1.0.3
> Стартовый шаблон для быстрого начала работы над проектом

## Что нового в версии 1.0.3
 - Добавлен postcss-nested
 - normalize.css отделен от bootstrap grid
 - normalize.css обновлен до  v4.0.0
 - Исправлены ошибки Grunt
   - цель watch выделена в default
   - разовая сборка переназвана build 
   - создана цель rebuild для пересборки проекта на чисто.

## Что нового в версии 1.0.2
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
 
## Что нового в версии 1.0.1
 - Добавлена сетка от bootstrap 3.5
 - Созданы css файлы для прозрачной mobile-first верстки
 - Добавлена сорторовка сборки css и js

## Начало работы в новом проекте
```shell
git clone git@gitlab.com:irbisadm/appatbox-template.git
cd appatbox-template
git remote remove origin
```

## Установка 
```shell
npm install --save-dev
```
Для дальнейшей работы вам нужно собрать проект - смотите ниже Grunt цели

## Доступные Grunt цели

### Разовая генерация 
```shell
grunt default
```
### Watcher для активной работы
```shell
grunt watch
```
### Publish с минификацией html (для сборки статических сайтов)
```shell
grunt publish
```
