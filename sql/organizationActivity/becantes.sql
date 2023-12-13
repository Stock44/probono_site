do
$$
    declare
        category_id int;
    begin
       insert into "ActivityCategory" values (default, 'Becantes') returning id into category_id;

       insert into "Activity" values
                                              (default, 'Apoyo estudios académicos (grado académico)', category_id),
                                              (default, 'Apoyo educación continua (cursos, bootcamps, certificaciones, diplomados, etc.)', category_id),
                                              (default, 'Apoyo material escolar', category_id),
                                              (default, 'Apoyo emprendedores', category_id),
                                              (default, 'Apoyo cultural', category_id),
                                              (default, 'Apoyo deportivo', category_id),
                                              (default, 'Apoyo investigación', category_id),
                                              (default, 'Apoyo alimentación', category_id),
                                              (default, 'Apoyo movilidad (internacionalización)', category_id),
                                              (default, 'Apoyo transporte', category_id),
                                              (default, 'Apoyo alojamiento', category_id),
                                              (default, 'Apoyo a fundaciones religiosas', category_id),
                                              (default, 'Apoyo prácticas profesionales', category_id);
    end;
$$
