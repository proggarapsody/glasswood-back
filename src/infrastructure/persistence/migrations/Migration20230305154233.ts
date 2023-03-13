import { Migration } from '@mikro-orm/migrations';

export class Migration20230305154233 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "categories" ("id" serial primary key, "name" varchar(255) not null);');
    this.addSql('alter table "categories" add constraint "categories_name_unique" unique ("name");');

    this.addSql('create table "products" ("id" serial primary key, "name" varchar(255) not null, "price" int not null, "description" varchar(255) not null, "images" text[] null);');
    this.addSql('alter table "products" add constraint "products_name_unique" unique ("name");');

    this.addSql('create table "products_categories" ("product_entity_id" int not null, "category_entity_id" int not null, constraint "products_categories_pkey" primary key ("product_entity_id", "category_entity_id"));');

    this.addSql('create table "users" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "name" varchar(255) null, "role" varchar(255) not null, "status" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "carts" ("id" serial primary key, "created_at" timestamptz(0) not null, "user_id" int not null);');
    this.addSql('alter table "carts" add constraint "carts_user_id_unique" unique ("user_id");');

    this.addSql('create table "carts_products" ("cart_entity_id" int not null, "product_entity_id" int not null, constraint "carts_products_pkey" primary key ("cart_entity_id", "product_entity_id"));');

    this.addSql('alter table "products_categories" add constraint "products_categories_product_entity_id_foreign" foreign key ("product_entity_id") references "products" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "products_categories" add constraint "products_categories_category_entity_id_foreign" foreign key ("category_entity_id") references "categories" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "carts" add constraint "carts_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "carts_products" add constraint "carts_products_cart_entity_id_foreign" foreign key ("cart_entity_id") references "carts" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "carts_products" add constraint "carts_products_product_entity_id_foreign" foreign key ("product_entity_id") references "products" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products_categories" drop constraint "products_categories_category_entity_id_foreign";');

    this.addSql('alter table "products_categories" drop constraint "products_categories_product_entity_id_foreign";');

    this.addSql('alter table "carts_products" drop constraint "carts_products_product_entity_id_foreign";');

    this.addSql('alter table "carts" drop constraint "carts_user_id_foreign";');

    this.addSql('alter table "carts_products" drop constraint "carts_products_cart_entity_id_foreign";');

    this.addSql('drop table if exists "categories" cascade;');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop table if exists "products_categories" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "carts" cascade;');

    this.addSql('drop table if exists "carts_products" cascade;');
  }

}
