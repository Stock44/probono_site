do
$$
    declare
        category_id int;
    begin
        insert into "ActivityCategory"
        values (default, 'Obras o servicios públicos')
        returning id into category_id;

        insert into "Activity"
        values (default, 'Desarrollo orientado a ciclistas y peatones', category_id),
               (default, 'Desarrollo rural', category_id),
               (default, 'Transporte público', category_id),
               (default, 'Planificación urbana', category_id),
               (default, 'Bibliotecas públicas', category_id),
               (default, 'Bibliotecas privadas de acceso público', category_id),
               (default, 'Museos privados de acceso público', category_id);
    end;
$$
