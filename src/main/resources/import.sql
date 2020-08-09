INSERT INTO task(id, name, due, done)
VALUES (nextval('hibernate_sequence'), 'Read the book', '01.01.2020', true);

INSERT INTO task(id, name, due, done)
VALUES (nextval('hibernate_sequence'), 'Make a dinner', '01.01.2020', false);
