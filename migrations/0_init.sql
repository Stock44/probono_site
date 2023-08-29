create table ContactData
(
    id    bigint primary key generated always as identity,
    phone varchar(16) not null,
    email varchar(255) not null
);

create table Person
(
    id          bigint primary key generated always as identity,
    authId      text   not null,
    orgPosition text   not null,
    contact     bigint not null references ContactData (id)
);

create unique index on Person (authId);

create table CorporationType
(
    id        bigint primary key generated always as identity,
    name      text not null,
    shortName text not null
);

create type DonationsAuthStatus as enum ('not_authorized', 'authorized', 'in_progress', 'in_recovery');

create type CLUNIStatus as enum ('no', 'active', 'inactive', 'in_progress');


create table OrgIncorporationData
(
    id                bigint primary key generated always as identity,
    legalConcept      text                not null,
    incorporationYear int                 not null,
    rfc               varchar(13)         not null,
    donationStatus    DonationsAuthStatus not null,
    cluniStatus       CLUNIStatus         not null,
    corporationType   bigint              not null references CorporationType (id)
);

create table NotIncOrgType
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table UnincorporatedOrgData
(
    id                 bigint primary key generated always as identity,
    orgType            bigint  not null references NotIncOrgType (id),
    wantsToIncorporate boolean not null
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
    label text not null,
    level int  not null
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
    id     bigint primary key generated always as identity,
    name   text    not null,
    limits polygon not null
);

create table OrganizationOffice
(
    id             bigint primary key generated always as identity,
    municipality   bigint not null references Municipality (id),
    neighborhood   text   not null,
    postalCode     int    not null,
    streetName     text   not null,
    extNumber      int    not null,
    intNumber      int,
    betweenStreets text   not null,
    location       point  not null
);

create table PaidEmployeeCountCategory
(
    id    bigint primary key generated always as identity,
    label text not null,
    level int  not null
);

create table VolunteerCountCategory
(
    id    bigint primary key generated always as identity,
    label text not null,
    level int  not null
);

create table Activity
(
    id   bigint primary key generated always as identity,
    name text not null
);

create type Gender as enum ('male', 'female', 'other');

create table AgeGroup
(
    id         bigint primary key generated always as identity,
    lowerBound int    not null,
    upperBound int    not null,
    gender     Gender not null
);

create table Beneficiary
(
    id   bigint primary key generated always as identity,
    name text not null
);

create table Workplace
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

create table SocialMedia
(
    id        bigint primary key generated always as identity,
    webpage   text default '',
    facebook  text default '',
    instagram text default '',
    twitter   text default '',
    tiktok    text default '',
    youtube   text default '',
    linkedin  text default ''
);


create table Organization
(
    id                        bigint primary key generated always as identity,
    name                      text    not null,
    ods                       int     not null check ( value between 1 and 30 ),
    foundingYear              int     not null,
    hasInvestmentAgreement    boolean not null,
    contact                   bigint  not null references ContactData (id),
    paidEmployeeCountCategory bigint  not null references PaidEmployeeCountCategory (id),
    volunteerCountCategory    bigint  not null references VolunteerCountCategory (id),
    workplace                 bigint  not null references Workplace (id),
    socialMedia               bigint  not null references SocialMedia (id),
    incorporationData         bigint references OrgIncorporationData (id),
    unincorporatedOrgData     bigint references UnincorporatedOrgData (id),
    incomeCategory            bigint references IncomeCategory (id),
    organizationOffice        bigint references OrganizationOffice (id)
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

create table OrganizationBeneficiaries
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
    priority     bigint not null
);

