insert into "Sector" (name, geom, "municipalityId")
select s.sector, s.geom, m.id
from "SectoresCorregidos26-10-2023" as s
join "Municipality" as m on m.name = s.municipio;
