SET TIME ZONE 'UTC';

-- ==========================================
-- ROLE
-- ==========================================

create table person_role (
	id text not null,
	description text not null,
	created_at timestamptz not null,
	updated_at timestamptz null,
	primary key (id)
);

-- ==========================================
-- PERSON
-- ==========================================
create table person (
	id text not null,
	name text not null,
	role_id text not null,
	created_at timestamptz not null,
	updated_at timestamptz null,
	primary key (id),
	constraint person__person_role_fk foreign key (role_id) references person_role (id)
);

-- ==========================================
-- DEPARTMENT
-- ==========================================
create table department (
	id text not null,
	description text not null,
	created_at timestamptz not null,
	updated_at timestamptz null,
	primary key (id)
);

create table department_person (
	department_id text not null,
	person_id text not null,
	primary key (department_id, person_id),
	constraint department_person__department_fk foreign key (department_id) references department (id),
	constraint department_person__person_fk foreign key (person_id) references person (id)
);

-- ==========================================
-- COST CENTER
-- ==========================================
create table cost_center (
	id text not null,
	description text not null,
	created_at timestamptz not null,
	updated_at timestamptz null,
	primary key (id)
);

create table cost_center_department (
	cost_center_id text not null,
	department_id text not null,
	primary key (cost_center_id, department_id),
	constraint cost_center_department__cost_center_fk foreign key (cost_center_id) references cost_center (id),
	constraint cost_center_department__department_fk foreign key (department_id) references department (id)
);
