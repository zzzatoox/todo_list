# Todo List

Это персональный проект "Список задач" (Todo List), разработанный командой студентов. Приложение позволяет управлять списком задач: создавать, редактировать, удалять и отмечать как выполненные.

## Команда разработчиков

- **Дмитрий Копцев** - [@DmitryyDDD](https://github.com/DmitryyDDD) - Верстка страниц (HTML, CSS, Bootstrap)
- **Никита Лазарев** - [@zzzatoox](https://github.com/zzzatoox) - Разработка бэкэнда, создание API, реализация запросов Axios
- **Дарья Соколова** - [@s0kolovadasha](https://github.com/s0kolovadasha) Верстка страниц (HTML, CSS, Bootstrap)
- **Роман Мосолов** - Написание руководства пользователя
- **Михаил Доломанов** - Проектирование и реализация базы данных
- **Никита Кочарян** - Тестирование API

## Стек технологий

- **Backend**: Node.js + Express
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **HTTP клиент**: Axios
- **База данных**: PostgreSQL
- **API документирование**: Swagger

## Функционал

- Авторизация и регистрация пользователей
- Создание новых задач
- Просмотр списка всех задач
- Детальный просмотр задачи
- Удаление задачи
- Редактирование задачи
- Отметка задачи как завершенной

## Установка

### Предварительные требования

Убедитесь, что у вас установлены следующие программы:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Инструкции по установке

1. **Клонирование репозитория**

   ```bash
   git clone https://github.com/zzzatoox/todo_list.git
   cd todo_list/backend
   ```

2. **Настройка переменных окружения**

   Создайте файл `.env` в папке `backend` и добавьте следующие переменные:

   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=[название_базы_данных_в_postgresql]
   DB_PASSWORD=[ваш_пароль_от_бд]
   DB_PORT=5432
   SECRET_KEY=[секретный_ключ_для_express_session] 
   FRONTEND=http://localhost:5500
   ```

   *Примечание*: Секретный ключ можно сгенерировать на сайте https://jwtsecret.com/generate

3. **Установка зависимостей**

   В терминале (в папке backend):

   ```bash
   npm install
   ```

4. **Создание базы данных**

   Создайте новую базу данных в PostgreSQL, например, `todo_list`, и выполните следующие SQL-скрипты:

   ```sql
   CREATE TABLE users (
       user_id SERIAL PRIMARY KEY,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(128) NOT NULL
   );
   
   CREATE TABLE task_statuses (
       status_id SMALLSERIAL PRIMARY KEY,
       name VARCHAR(20) NOT NULL UNIQUE
   );
   
   CREATE TABLE task_priorities (
       priority_id SMALLSERIAL PRIMARY KEY,
       name VARCHAR(20) NOT NULL UNIQUE
   );
   
   CREATE TABLE tasks (
       task_id SERIAL PRIMARY KEY,
       user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
       title VARCHAR(100) NOT NULL,
       description VARCHAR(255),
       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
       due_date TIMESTAMP,
       status_id SMALLINT NOT NULL REFERENCES task_statuses(status_id) DEFAULT 1,
       priority_id SMALLINT NOT NULL REFERENCES task_priorities(priority_id) DEFAULT 1
   );
   
   INSERT INTO task_statuses (name) VALUES 
   ('В процессе'),
   ('Завершена');
   
   INSERT INTO task_priorities (name) VALUES 
   ('Низкий'),
   ('Высокий');
   ```

5. **Запуск сервера**

   ```bash
   npm start
   ```

6. **Настройка Frontend**

   Убедитесь, что у вас установлен [VS Code](https://code.visualstudio.com/) с расширением [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

   В корне проекта должен быть файл `.vscode/settings.json` со следующим содержимым:

   ```json
   {
     "liveServer.settings.port": 5500,
     "liveServer.settings.host": "localhost",
     "liveServer.settings.proxy": {
       "/api": "http://localhost:3000"
     }
   }
   ```

7. **Запуск Frontend**

   Перейдите в папку `frontend/auth/login.html`, кликните правой кнопкой мыши и выберите "Open with Live Server". Приложение должно открыться по адресу `http://localhost:5500`.

## Использование

После запуска приложения вы можете:

- Зарегистрироваться или войти в систему
- Создавать новые задачи
- Просматривать список задач
- Редактировать или удалять задачи
- Отмечать задачи как завершенные

## API документация

Документация API доступна через Swagger. После запуска сервера откройте следующий URL в браузере:

```
http://localhost:3000/api-docs
```
