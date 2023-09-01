create table corporation_type
(
    id         bigint primary key generated always as identity,
    name       text not null,
    short_name text not null
);

create type donation_auth_status as enum ('not_authorized', 'authorized', 'in_progress', 'in_recovery');

create type cluni_status as enum ('no', 'active', 'inactive', 'in_progress');


create table incorporated_org_data
(
    id                   bigint primary key generated always as identity,
    legal_concept        text                 not null,
    incorporation_year   int                  not null,
    rfc                  varchar(13)          not null,
    donation_auth_status donation_auth_status not null,
    cluni_status         cluni_status         not null,
    corporation_type     bigint               not null references corporation_type (id)
);

create table unincorporated_org_category
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table unincorporated_org_data
(
    id                   bigint primary key generated always as identity,
    category             bigint  not null references unincorporated_org_category (id),
    wants_to_incorporate boolean not null
);

create table government_org_category
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table government_org
(
    id       bigint primary key generated always as identity,
    name     text   not null,
    category bigint not null references government_org_category (id)
);

create table income_category
(
    id    bigint primary key generated always as identity,
    label text not null,
    level int  not null
);

create table state
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table municipality
(
    id    bigint primary key generated always as identity,
    name  text   not null,
    state bigint not null references state (id)
);

create table sector
(
    id           bigint primary key generated always as identity,
    name         text    not null,
    municipality bigint  not null references municipality (id),
    limits       polygon not null
);

create table organization_office
(
    id              bigint primary key generated always as identity,
    municipality    bigint not null references municipality (id),
    neighborhood    text   not null,
    postal_code     int    not null,
    street_name     text   not null,
    ext_number      int    not null,
    int_number      int,
    between_streets text   not null,
    location        point  not null
);

create table employee_count_category
(
    id    bigint primary key generated always as identity,
    label text not null,
    level int  not null
);

create table volunteer_count_category
(
    id    bigint primary key generated always as identity,
    label text not null,
    level int  not null
);

create table activity
(
    id   bigint primary key generated always as identity,
    name text not null
);

create type gender as enum ('male', 'female', 'other');

create table age_group
(
    id          bigint primary key generated always as identity,
    lower_bound int    not null,
    upper_bound int    not null,
    gender      gender not null
);

create table beneficiary
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table workplace
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table service_category
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table service
(
    id       bigint primary key generated always as identity,
    name     text   not null,
    category bigint not null references service_category (id)
);

create table organization
(
    id                        bigint primary key generated always as identity,
    name                      text not null,
    ods                       int  not null check ( ods between 1 and 30 ),
    founding_year             int,
    has_investement_agreement boolean,
    phone                     varchar(16),
    email                     varchar(255),
    webpage                   text default '',
    facebook                  text default '',
    instagram                 text default '',
    twitter                   text default '',
    tiktok                    text default '',
    youtube                   text default '',
    linkedin                  text default '',
    employee_count_category   bigint references employee_count_category (id),
    volunteer_count_category  bigint references volunteer_count_category (id),
    workplace                 bigint references workplace (id),
    incorporated_org_data     bigint references incorporated_org_data (id),
    unincorporated_org_data   bigint references unincorporated_org_data (id),
    income_category           bigint references income_category (id),
    organization_office       bigint references organization_office (id)
);

create table organization_activity
(
    id           bigint primary key generated always as identity,
    organization bigint not null references organization (id),
    activity     bigint not null references activity (id)
);

create table organization_age_group
(
    id           bigint primary key generated always as identity,
    organization bigint not null references organization (id),
    demographic  bigint not null references age_group (id)
);

create table organization_beneficiary
(
    id           bigint primary key generated always as identity,
    organization bigint not null references organization (id),
    beneficiary  bigint not null references beneficiary (id)
);

create table organization_collab_agreement
(
    id            bigint primary key generated always as identity,
    organization  bigint not null references organization (id),
    governmentOrg bigint not null references government_org (id)
);

create table organization_sectors
(
    id           bigint primary key generated always as identity,
    organization bigint not null references organization (id),
    sector       bigint not null references sector (id)
);

create table organization_needed_service
(
    id           bigint primary key generated always as identity,
    organization bigint not null references organization (id),
    service      bigint not null references service (id),
    priority     bigint not null
);

create table person
(
    id           bigint primary key generated always as identity,
    auth_id      text not null,
    given_name   text not null,
    family_name  text not null,
    phone        varchar(16),
    email        varchar(255),
    org_position text,
    organization bigint references organization (id)
);

create unique index on person (auth_id);
