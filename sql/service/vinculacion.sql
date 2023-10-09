do
$$
    declare
        category_id int;
    begin
        insert into "ServiceCategory" values (default, 'Vinculación') returning id into category_id;

        insert into "Service"
        values (default, 'Metodologías de diseño participativo', category_id),
               (default, 'Estrategias para el acercamiento con nuevas comunidades', category_id),
               (default, 'Fortalecimiento de redes de colaboración', category_id),
               (default, 'Alianzas para detonar difusión de tu causa social', category_id),
               (default, 'Servicio social con universidades', category_id),
               (default, 'Conexión con nuevos proveedores', category_id),
               (default, 'Activismo político', category_id),
               (default, 'Servicios de traducción a otro idioma', category_id),
               (default, 'Servicio de traducción a una lengua indígena', category_id),
               (default, 'Servicio de sistema y escritura Braille', category_id),
               (default, 'Servicio de intérprete de Lengua de Señas Mexicana', category_id);
    end ;
$$
