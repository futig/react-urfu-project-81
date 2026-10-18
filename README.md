# Генератор форм на Typescript

[![hexlet-check](https://github.com/futig/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/futig/react-urfu-project-81/actions)
[![CI](https://github.com/futig/react-urfu-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/futig/react-urfu-project-81/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=futig_react-urfu-project-81&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=futig_react-urfu-project-81)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=futig_react-urfu-project-81&metric=coverage)](https://sonarcloud.io/summary/new_code?id=futig_react-urfu-project-81)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/


## Стек

- TypeScript
- Vitest
- Oxlint, Oxfmt

## Установка

<!-- Опишите установку: клонирование, зависимости, переменные окружения -->

```bash
git clone https://github.com/futig/react-urfu-project-81.git
cd react-urfu-project-81
make install
```

## Разработка

```bash
make lint            # линтер и форматирование
make typecheck       # проверка типов
make test            # тесты
make test-coverage   # тесты с покрытием
```

## Использование

```ts
import HexletCode from "@hexlet/code";

const template = { name: "rob", job: "hexlet", gender: "m" };

const form = HexletCode.formFor(template, { url: "/users" }, (f) => {
  f.input("name", { class: "user-input" });
  f.input("job", { as: "textarea", rows: 50 });
});

console.log(form);
// <form action="/users" method="post">
//   <input name="name" type="text" value="rob" class="user-input">
//   <textarea cols="20" rows="50" name="job">hexlet</textarea>
// </form>
```

- `formFor(template, options, callback)` — возвращает HTML формы строкой.
  `options.url` задаёт `action` (по умолчанию `#`), `options.method` — метод (по умолчанию `post`).
- `f.input(name, options)` — добавляет поле со значением из `template`.
  `as: "textarea"` создаёт `<textarea>` (по умолчанию `cols="20" rows="40"`).
  Остальные опции становятся атрибутами поля.
- Если поля нет в `template`, выбрасывается ошибка `Field '<name>' does not exist in the template.`

Переносы строк в выводе выше добавлены для читаемости: библиотека возвращает HTML одной строкой.

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
