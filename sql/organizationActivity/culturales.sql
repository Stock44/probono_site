do
$$
    declare
        category_id int;
    begin
        insert into "ActivityCategory" values (default, 'Cultura') returning id into category_id;

        insert into "Activity"
        values (default, 'Protección, conservación, restauración y/o recuperación del patrimonio cultural de la nación',
                category_id),
               (default,
                'Protección, conservación, restauración y/o recuperación del arte de las comunidades indígenas',
                category_id),
               (default,
                'Promoción, fomento y difusión de actividades culturales, musicales y artísticas (clásicas, contemporaneas, mixtas, urbanas)',
                category_id),
               (default, 'Promoción, fomento y difusión de actividades deportivas', category_id);
    end;
$$
