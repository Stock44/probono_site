do
$$
    declare
        category_id int;
    begin
        insert into "ServiceCategory" values (default, 'Legalidad') returning id into category_id;

        insert into "Service"
        values (default, 'Asesoría legal', category_id),
               (default, 'Ciberseguridad', category_id),
               (default, 'Servicios de notarias públicas', category_id),
               (default, 'Asesoría para conformación de donataria autorizada', category_id),
               (default, 'Temas de transparencia y anticorrupción', category_id),
               (default, 'Asesoría en el marco normativo de mi causa social', category_id),
               (default, 'Asesoría en temas de aseguradoras', category_id),
               (default, 'Asesoría para constitución legal', category_id);
    end;
$$
