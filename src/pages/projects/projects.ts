import { getRepositoryDetails } from '../../utils';

export interface Project {
	name: string;
	demoLink: string;
	tags?: string[];
	description?: string;
	postLink?: string;
	demoLinkRel?: string;
	[key: string]: any;
}

export const projects: Project[] = [
	{
		...(await getRepositoryDetails('oadultradeepfield/psa-codesprint-2025')),
		name: 'PSA CodeSprint 2025',
		demoLink: 'https://oadultradeepfield.github.io/psa-codesprint-2025/'
	},
	{
		...(await getRepositoryDetails('git-mastery/exercises')),
		name: 'Git Mastery Exercises',
		description: 'My first open-source contribution!',
		demoLink: 'https://git-mastery.github.io/exercises/'
	},
	{
		...(await getRepositoryDetails('oadultradeepfield/planetary-image-stacker')),
		name: 'Planetary Image Stacker',
		postLink: '/planetary-image-stacker',
		demoLink: 'https://github.com/oadultradeepfield/planetary-image-stacker'
	},
	{
		name: 'Boonchubike CMS',
		description: 'Client management system for Boonchubike, a bicycle store in Thailand.',
		postLink: '/boonchubike-cms'
	},
	{
		...(await getRepositoryDetails('oadultradeepfield/otterbot')),
		name: 'OtterBot',
		postLink: '/otterbot',
		demoLink: 'https://phanuphats.com/otterbot'
	},
	{
		...(await getRepositoryDetails('oadultradeepfield/thai-address-api')),
		name: 'Thai Address API',
		demoLink: 'https://github.com/oadultradeepfield/thai-address-api'
	},
	{
		...(await getRepositoryDetails('oadultradeepfield/redactkit-on-device-model')),
		name: 'RedactKit On-Device Model',
		demoLink: 'https://devpost.com/software/redactkit'
	},
	{
		...(await getRepositoryDetails('oadultradeepfield/cs2103-pe-toolkit')),
		name: 'CS2103/T PE Toolkit',
		demoLink: 'https://pypi.org/project/pe-toolkit/'
	}
];
