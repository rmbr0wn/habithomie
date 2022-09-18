CREATE DATABASE habithomie;

CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  PRIMARY KEY(user_id)
);

CREATE TABLE activities (
  activity_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT,
  activity_name VARCHAR(255),
  PRIMARY KEY(activity_id),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);
