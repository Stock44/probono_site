do
$$
    declare
        category_id int;
    begin
        insert into "ServiceCategory" values (default, 'Comercio') returning id into category_id;

        insert into "Service"
        values (default, 'Conocimiento sobre comercio electrónico', category_id),
               (default, 'Generación de emprendimiento social', category_id),
               (default, 'Industrialización de productos de la organización', category_id),
               (default, 'Conocimiento de comercio internacional', category_id);
    end ;
$$
