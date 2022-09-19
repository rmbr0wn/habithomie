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

CREATE TABLE times (
  time_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT,
  activity_id INT,
  time_value INT,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY(time_id),
  FOREIGN KEY(activity_id) REFERENCES activities(activity_id),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
);
