CREATE TABLE nir.users (
	id serial PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	email TEXT NOT NULL,
	"password" TEXT NOT null,
	creation_time timestamptz NOT NULL DEFAULT now(),
	update_time timestamptz,
	delete_time timestamptz
);

CREATE TABLE nir.user_requests(
	user_id int4 PRIMARY KEY REFERENCES users(id),
	daily_remaining int4 NOT NULL,
	daily_limit int4 NOT NULL
);

CREATE TABLE nir.roles(
	id serial PRIMARY KEY,
	"name" TEXT,
	code TEXT NOT NULL
);
INSERT INTO roles VALUES (DEFAULT,'Kayıtlı Kullanıcı', 'REGISTERED_USER');
INSERT INTO roles VALUES (DEFAULT,'Tubitak Kullanıcı', 'TUBITAK_USER');

CREATE TABLE nir.permissions(
	id serial PRIMARY KEY,
	"name" TEXT,
	code TEXT NOT NULL
);
INSERT INTO permissions VALUES (DEFAULT,'Yüz Tespit algoritması çalıştırma', 'DETECTION_ALGORITHM_RUN');

CREATE TABLE nir.user_role(
	user_id int4,
	role_id int4,
	PRIMARY KEY (user_id, role_id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE nir.role_permission(
	role_id int4,
	permission_id int4,
	PRIMARY KEY (role_id, permission_id),
	FOREIGN KEY (role_id) REFERENCES roles(id),
	FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

SELECT   FROM permissions

