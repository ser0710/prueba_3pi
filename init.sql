CREATE TABLE products (
    id VARCHAR(40) PRIMARY KEY,
    descripti VARCHAR(30) NOT NULL,
    name_p VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL CHECK (price > 0)
);

CREATE TABLE roles (
    id VARCHAR(40) PRIMARY KEY,
    name_r VARCHAR(30) NOT NULL
);

CREATE TABLE users (
    document VARCHAR(20) NOT NULL,
    id VARCHAR(40) PRIMARY KEY,
    last_name VARCHAR(30) NOT NULL,
    name_u VARCHAR(30) NOT NULL,
    roles_id VARCHAR(40) REFERENCES roles(id)
);

CREATE TABLE sales (
    id VARCHAR(40) PRIMARY KEY,
    products_id VARCHAR(40) REFERENCES products(id),
    qty INTEGER,
    sales_at VARCHAR(30),
    users_id VARCHAR(40) REFERENCES users(id),
    total INTEGER
);


INSERT INTO products (id, name_p, descripti, price) VALUES ('479fba0a-baaf-4b46-95a2-83a663817646','Arroz','Libra',3000);

INSERT INTO products (id, name_p, descripti, price) VALUES ('efbff7f6-6374-4c2f-9c96-3611c65068ba','Papas','Libra',1000);

INSERT INTO products (id, name_p, descripti, price) VALUES ('f7c377cf-0f92-435a-b5e6-2c8cdd9d10c6','Agua sin gas','500 ml',2000);


INSERT INTO products (id, name_p, descripti, price) VALUES ('3bed5d90-64ed-4bc1-8a3a-a378737ed542','Agua con gas','500 ml',2500);

INSERT INTO products (id, name_p, descripti, price) VALUES ('c3f25f98-c5c3-4a00-b550-f716ae36b25f','Docena de huevos','ministro de haciendo aprueba',1800);

