import {Gender} from '@prisma/client';
import {List} from 'immutable';

const genders = List([
	{gender: Gender.other, label: 'Todos / otros'},
	{gender: Gender.male, label: 'Hombres'},
	{gender: Gender.female, label: 'Mujeres'},
]);

export default genders;
