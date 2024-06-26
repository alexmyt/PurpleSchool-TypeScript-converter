# Итоговый проект курса TypeScript (PurpleSchool)

## Зависимости

- [ffmpeg](https://ffmpeg.org/) Утилита должна быть доступна без указания пути, или располагаться в корне проекта.

## Запуск

`npm install` - установка зависимостей

`npm run build` - сборка (транспиляция кода в JS в каталог `dist`)

`npm start` - сборка и запуск приложения

`node dist/app.js` - запуск собранного приложения

## О проекте

Приложение представляет собой итоговый проект курса [TypeScript с нуля](https://purpleschool.ru/course/typescript) от PurpleSchool. **Это не самостоятельная разработка**: приложение писалось параллельно с лектором. Оригинальный репозиторий учебного курса: https://github.com/AlariCode/5-typescript-demo-2. Вместе с тем в код внесены некоторые изменения.

Цель написания приложения: применить на практике полученные знания о TypeScript и шаблонах (паттернах) проектирования приложений.Сделать код приложения легко расширяемым и модифицируемым

Функция приложения: выполнить команду для запуска внешней утилиты, используя консоль для установки параметров запуска утилиты. В данной реализации используется утилита конвертации видеофайлов `ffmpeg`. Через консоль можно задать исходный файл для конвертации, имя итогового файла и параметры высоты и ширины итогового файла.

Использованы паттерны:

- **Builder (Строитель)** - _порождающий_ паттерн. Используется для настройки параметров вызова конкретной утилиты (в данном случае ffmpeg). Использован в классе [FfmpegBuilder](src\commands\ffmpeg\ffmpeg.builder.ts).

- **Singleton (Одиночка)** - _порождающий_ паттерн. Использован в классе [ConsoleLogger](src\out\console\logger.ts) для предотвращения создания нескольких экземпляров класса.

- **Template method (Шаблонный метод)** - _поведенческий_ паттерн. Используется для выполнения последовательности шагов для запуска конкретной утилиты (в данном случае ffmpeg). Абстрактный класс реализован в [CommandExecutor](src\core\executor\command.executor.ts), класс конкретной утилиты реализован в [FfmpegExecutor](src\commands\ffmpeg\ffmpeg.executor.ts).
