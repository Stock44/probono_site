do
$$
    declare
        category_id int;
    begin
        insert into "ServiceCategory" values (default, 'Administración') returning id into category_id;

        insert into "Service"
        values (default, 'Diseño de portal o intranet para gestión interna', category_id),
               (default, 'Diseño de metodologías de procesos creativos (design thinking)', category_id),
               (default, 'Fortalecimiento institucional', category_id),
               (default, 'Transformación digital', category_id),
               (default, 'Accesibilidad web (inclusión digital para personas con alguna discapacidad)', category_id),
               (default, 'Conocimiento de procedimientos y estandarización', category_id),
               (default, 'Conocimiento de procesos de documentación', category_id),
               (default, 'Administración de proyectos', category_id),
               (default, 'Conocimiento sobre marco lógico', category_id),
               (default, 'Conocimiento sobre teoría del cambio', category_id),
               (default, 'Creación de tu programa de voluntariado institucional para empresas', category_id),
               (default, 'Manejo de software Microsoft Office (Word, Excel, Excel, etc.)', category_id),
               (default, 'Herramientas de recolección de datos (minería de datos)', category_id),
               (default, 'Análisis de datos (ciencia de datos)', category_id),
               (default, 'Interpretación de datos', category_id),
               (default, 'Metodologías de investigación', category_id),
               (default, 'Generación/conocimiento de herramientas para la productividad', category_id),
               (default, 'Indicadores de productividad', category_id),
               (default, 'Estrategias para la escalabilidad de tus proyectos', category_id),
               (default, 'Estrategias para la replicabilidad de tus proyectos', category_id),
               (default, 'Conocimiento sobre buenas prácticas medioambientales', category_id),
               (default, 'Conocimiento sobre gestión de residuos', category_id),
               (default, 'Adaptación de tecnologías limpias', category_id),
               (default, 'Conocimiento de protocolos de seguridad', category_id),
               (default, 'Conocimiento de protocolos de protección civil', category_id),
               (default, 'Protocolos de difusión', category_id);
    end;
$$
