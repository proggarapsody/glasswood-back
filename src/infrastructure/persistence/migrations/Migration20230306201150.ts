import { Migration } from '@mikro-orm/migrations';

export class Migration20230306201150 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "categories_products" ("category_entity_id" int not null, "product_entity_id" int not null, constraint "categories_products_pkey" primary key ("category_entity_id", "product_entity_id"));');

    this.addSql('create table "orders" ("id" serial primary key, "created_at" timestamptz(0) not null, "user_id_id" int not null, "status" varchar(255) not null);');

    this.addSql('create table "orders_products" ("order_entity_id" int not null, "product_entity_id" int not null, constraint "orders_products_pkey" primary key ("order_entity_id", "product_entity_id"));');

    this.addSql('alter table "categories_products" add constraint "categories_products_category_entity_id_foreign" foreign key ("category_entity_id") references "categories" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "categories_products" add constraint "categories_products_product_entity_id_foreign" foreign key ("product_entity_id") references "products" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "orders" add constraint "orders_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "orders_products" add constraint "orders_products_order_entity_id_foreign" foreign key ("order_entity_id") references "orders" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "orders_products" add constraint "orders_products_product_entity_id_foreign" foreign key ("product_entity_id") references "products" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "categories" add column "created_at" timestamptz(0) not null;');

    this.addSql('alter table "products" add column "created_at" timestamptz(0) not null;');

    this.addSql('alter table "users" add column "created_at" timestamptz(0) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "orders_products" drop constraint "orders_products_order_entity_id_foreign";');

    this.addSql('drop table if exists "categories_products" cascade;');

    this.addSql('drop table if exists "orders" cascade;');

    this.addSql('drop table if exists "orders_products" cascade;');

    this.addSql('alter table "categories" drop column "created_at";');

    this.addSql('alter table "products" drop column "created_at";');

    this.addSql('alter table "users" drop column "created_at";');
  }

}
