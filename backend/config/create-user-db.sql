/*DROP DATABASE IF EXISTS test_db;   
CREATE DATABASE IF NOT EXISTS test_db;   
USE test_db; 

DROP TABLE IF EXISTS user; 

CREATE TABLE IF NOT EXISTS User ( 
     id INT PRIMARY KEY auto_increment, 
     name VARCHAR(25) UNIQUE NOT NULL, 
     password CHAR(60) NOT NULL,  
     email VARCHAR(100) UNIQUE NOT NULL, 
     role ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 
  );
  */