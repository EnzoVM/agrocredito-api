INSERT INTO campaign_type VALUES
(1, "ARROZ", 2),
(2, "FREJOL", 3),
(3, "MANGO", 4),
(4, "LIMON", 2),
(5, "SOYA", 3),
(6, "PAPAYA", 2),
(7, "PLATANO", 2),
(8, "MAIZ", 2);

INSERT INTO farmer_quality VALUES
(1, "Bueno"),
(2, "Regular"),
(3, "Malo"),
(4, "Pésimo"),
(5, "No registra");

INSERT INTO property_legal_condition VALUES
(1, "Adjudicado"),
(2, "Arrendatario"),
(3, "Conducc"),
(4, "Posesión"),
(5, "Titulado");

INSERT INTO sector VALUES
(4, "Margen izquierda"),
(3, "Tumbes"),
(2, "Margen derecha");

INSERT INTO project VALUES
(1, 1, "El Palmar", 2),
(2, 2, "Cooperativa 20 de Enero", 2),
(3, 3,"Romero", 2),
(4, 4,"La Tuna", 2),
(5, 5,"Puerto El Cura", 2),
(6, 6,"Las Brujas Alta", 2),
(7, 7,"Las Brujas Baja", 2),
(8, 8,"Becerra Belén", 2),
(9, 9,"Coop. Ntra. Sra. del Carmen", 2),
(10, 10,"Bebedero", 2),
(11, 11,"Huaquillas", 2),
(12, 12,"El Limon", 2),
(13, 13,"La Palma", 2),
(14, 14,"Papayal", 2),
(15, 15,"Pocitos", 2),
(16, 16,"Matapalo", 2),
(17, 1,"Tumbes", 3),
(18, 2,"Higuerón", 4),
(19, 3,"San Julián", 4),
(20, 4,"Casablanqueada", 4),
(21, 5,"Oidor", 4),
(22, 6,"Cristales", 4),
(23, 7,"La Noria", 4),
(24, 8,"Malvales", 4),
(25, 9,"Realengal", 4),
(26, 10,"La Cruz", 4),
(27, 11,"Coop 5 de Diciembre", 4),
(28, 15,"Rica Playa", 4),
(29, 16,"La Rosita", 4),
(30, 17,"Monteo", 4),
(31, 18,"La Paila", 4);

INSERT INTO assistance_type (assistance_type_id, assistance_type_description) VALUES 
(1, 'SERVIAGRO'),
(2, 'AGROINDUSTRIAS'),
(3, 'Tecnologóa Tumbesina'),
(4, 'P&G INGENIEROS'),
(5, 'INDEPENDIENTES');

INSERT INTO tecnique (tecnique_id, assistance_type_id, tecnique_name) VALUES
(1, 1, 'SILVA CRUZ TEODORO'),
(2, 1, 'ZAPATA CAMACHO PORFIRIO'),
(3, 3, 'JAVIER MIJAHUANCA'),
(4, 3, 'WILMER FERMANDEZ'),
(5, 3, 'ODAR LA ROSA'),
(6, 3, 'JOSE ALVINES YOVERA'),
(7, 4, 'ZAPATA CAMACHO PORFIRIO'),
(8, 5, 'Eras Luna Orlando'),
(9, 5, 'Valladares Lopez Edilbert'),
(10, 5, 'Olavarria Saavedra Ricard'),
(11, 5, 'Coveñas Palomino Segundo'),
(12, 5, 'Dios Espinoza Miguel'),
(13, 5, 'Aguirre Challe Dante'),
(14, 5, 'Medina Benites Jose'),
(15, 5, 'Emp. Agroindustrial Tumpis'),
(16, 5, 'Helguero Campaña Erwing'),
(17, 5, 'Castro Arrunategui Milagr'),
(18, 5, 'Paz Garcia Sandra'),
(19, 5, 'Guerra Garcia Carlos'),
(20, 5, 'Zapata Balladares Oswaldo'),
(21, 5, 'Carrasco Delgado Anibal'),
(22, 5, 'Dioses Espinoza Rey Willy'),
(23, 5, 'Cespedes Dioses Luis'),
(24, 5, 'Vinces Martinez Pedro'),
(25, 5, 'Alvines Sullon Jose Pascu'),
(26, 5, 'No requiere');