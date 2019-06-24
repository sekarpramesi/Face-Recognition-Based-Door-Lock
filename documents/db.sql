/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     6/16/2019 7:03:12 PM                         */
/*==============================================================*/


drop table if exists DOOR;

drop table if exists DOOR_USER;

drop table if exists EVENT_LOG;

drop table if exists USER;

/*==============================================================*/
/* Table: DOOR                                                  */
/*==============================================================*/
create table DOOR
(
   ID_DOOR              varchar(4) not null,
   STATUS_DOOR          int not null,
   CREATED_AT           timestamp,
   UPDATED_AT           timestamp,
   DELETED_AT           timestamp,
   primary key (ID_DOOR)
);

/*==============================================================*/
/* Table: DOOR_USER                                             */
/*==============================================================*/
create table DOOR_USER
(
   ID_DOOR              varchar(4) not null,
   ID_USER              varchar(4) not null,
   primary key (ID_DOOR, ID_USER)
);

/*==============================================================*/
/* Table: EVENT_LOG                                             */
/*==============================================================*/
create table EVENT_LOG
(
   ID_EVENT_LOG         varchar(4) not null,
   ID_DOOR              varchar(4),
   ID_USER              varchar(4),
   STATUS_EVENT_LOG     int not null,
   CREATED_AT           timestamp,
   primary key (ID_EVENT_LOG)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   ID_USER              varchar(4) not null,
   NAME_USER            varchar(50) not null,
   PASS_USER            varchar(50),
   URL_IMG              varchar(200) not null,
   ACCESS_TYPE          int not null,
   CREATED_AT           timestamp,
   UPDATED_AT           timestamp,
   DELETED_AT           timestamp,
   primary key (ID_USER)
);

alter table DOOR_USER add constraint FK_DOOR_USER foreign key (ID_DOOR)
      references DOOR (ID_DOOR) on delete restrict on update restrict;

alter table DOOR_USER add constraint FK_DOOR_USER2 foreign key (ID_USER)
      references USER (ID_USER) on delete restrict on update restrict;

alter table EVENT_LOG add constraint FK_DOOR_EVENT foreign key (ID_DOOR)
      references DOOR (ID_DOOR) on delete restrict on update restrict;

alter table EVENT_LOG add constraint FK_USER_EVENT foreign key (ID_USER)
      references USER (ID_USER) on delete restrict on update restrict;

