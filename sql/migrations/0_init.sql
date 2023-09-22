create table CorporationType
(
    id        bigint primary key generated always as identity,
    name      text not null,
    shortName text not null
);

create type DonationAuthStatus as enum ('not_authorized', 'authorized', 'in_progress', 'in_recovery');

create type CLUNIStatus as enum ('no', 'active', 'inactive', 'in_progress');


create table OrganizationCategory
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table GovernmentOrgCategory
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table GovernmentOrg
(
    id       bigint primary key generated always as identity,
    name     text   not null,
    category bigint not null references GovernmentOrgCategory (id)
);

create table IncomeCategory
(
    id    bigint primary key generated always as identity,
    range int4range not null,
    exclude using gist (range with &&)
);

create table State
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table Municipality
(
    id    bigint primary key generated always as identity,
    name  text   not null,
    state bigint not null references State (id)
);

create table Sector
(
    id           bigint primary key generated always as identity,
    name         text    not null,
    municipality bigint  not null references Municipality (id),
    limits       polygon not null
);

create table Address
(
    id             bigint primary key generated always as identity,
    municipality   bigint references Municipality (id),
    neighborhood   text  not null,
    postalCode     int   not null,
    streetName     text  not null,
    extNumber      int   not null,
    intNumber      int,
    betweenStreets text,
    location       point not null
);

create table EmployeeCountCategory
(
    id    bigint primary key generated always as identity,
    range int4range not null,
    exclude using gist (range with &&)
);

create table VolunteerCountCategory
(
    id    bigint primary key generated always as identity,
    range int4range not null,
    exclude using gist (range with &&)
);

create table Activity
(
    id   bigint primary key generated always as identity,
    name text not null
);

create type Gender as enum ('male', 'female', 'other');

create table AgeGroup
(
    id     bigint primary key generated always as identity,
    gender Gender    not null,
    range  int4range not null,
    exclude using gist (range with &&)
);

create table Beneficiary
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table WorkplaceType
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table ServiceCategory
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table Service
(
    id       bigint primary key generated always as identity,
    name     text   not null,
    category bigint not null references ServiceCategory (id)
);

create table Organization
(
    id                     bigint primary key generated always as identity,
    name                   text not null,
    ods                    int check ( ods between 1 and 30 ),
    foundingYear           int,
    hasInvestmentAgreement boolean,
    phone                  varchar(16),
    email                  varchar(255),
    webpage                text default '',
    facebook               text default '',
    instagram              text default '',
    twitter                text default '',
    tiktok                 text default '',
    youtube                text default '',
    linkedin               text default '',
    employeeCountCategory  bigint references EmployeeCountCategory (id),
    volunteerCountCategory bigint references VolunteerCountCategory (id),
    workplaceType              bigint references WorkplaceType (id),
    incomeCategory         bigint references IncomeCategory (id),
    address                bigint references Address (id),
    legalConcept           text,
    incorporationYear      int,
    rfc                    varchar(13) unique,
    donationAuthStatus     DonationAuthStatus,
    cluniStatus            CLUNIStatus,
    corporationType        bigint references CorporationType (id),
    category               bigint references OrganizationCategory (id),
    wantsToIncorporate     boolean
);

create table OrganizationActivity
(
    id           bigint primary key generated always as identity,
    organization bigint not null references Organization (id),
    activity     bigint not null references Activity (id)
);

create table OrganizationAgeGroup
(
    id           bigint primary key generated always as identity,
    organization bigint not null references Organization (id),
    demographic  bigint not null references AgeGroup (id)
);

create table OrganizationBeneficiary
(
    id           bigint primary key generated always as identity,
    organization bigint not null references Organization (id),
    beneficiary  bigint not null references Beneficiary (id)
);

create table OrganizationCollabAgreement
(
    id            bigint primary key generated always as identity,
    organization  bigint not null references Organization (id),
    governmentOrg bigint not null references GovernmentOrg (id)
);

create table OrganizationSectors
(
    id           bigint primary key generated always as identity,
    organization bigint not null references Organization (id),
    sector       bigint not null references Sector (id)
);

create table OrganizationNeededService
(
    id           bigint primary key generated always as identity,
    organization bigint not null references Organization (id),
    service      bigint not null references Service (id),
    priority     bigint not null unique
);

create table Person
(
    id         bigint primary key generated always as identity,
    authId     text not null unique,
    givenName  text not null,
    familyName text not null,
    phone      varchar(16),
    email      varchar(255)
);

create unique index on Person (authId);

create table PersonOrganization
(
    id           bigint primary key generated always as identity,
    person       bigint not null references Person (id),
    organization bigint not null references Organization (id),
    position     text   not null
)
