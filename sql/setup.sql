DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TINYTEXT NOT NULL,
  author_name TINYTEXT NOT NULL,
  pages INT NOT NULL
);