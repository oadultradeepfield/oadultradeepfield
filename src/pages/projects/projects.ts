import { getRepositoryDetails } from '../../utils';

export interface Project {
	name: string;
	demoLink?: string;
	tags?: string[];
	description?: string;
	postLink?: string;
	demoLinkRel?: string;
	[key: string]: any;
}

export const projects: Project[] = [
	{
		...(await getRepositoryDetails('oadultradeepfield/planetary-image-stacker')),
		name: 'Planetary Image Stacker',
		postLink: '/planetary-image-stacker',
		demoLink: 'https://github.com/oadultradeepfield/planetary-image-stacker'
	},
	{
		...(await getRepositoryDetails('oadultradeepfield/thai-address-api')),
		name: 'Thai Address API',
		demoLink: 'https://github.com/oadultradeepfield/thai-address-api'
	},
	{
		...(await getRepositoryDetails('git-mastery/repo-smith')),
		name: 'Git-Mastery repo-smith',
		description: 'My first open-source contribution!',
		postLink: 'https://git-mastery.github.io/',
		demoLink: 'https://pypi.org/project/repo-smith/'
	},
	{
		...(await getRepositoryDetails('git-mastery/exercises')),
		name: 'Git-Mastery Exercises',
		description: 'A follow up on my first open-source contribution :)',
		postLink: 'https://git-mastery.github.io/',
		demoLink: 'https://git-mastery.github.io/exercises'
	},
	{
		...(await getRepositoryDetails('oadultradeepfield/otterbot')),
		name: 'OtterBot',
		postLink: '/otterbot',
		demoLink: 'https://phanuphats.com/otterbot'
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
	},
	{
		name: 'Boonchubike CMS',
		description: 'Client management system for Boonchubike, a bicycle store in Thailand.',
		postLink: '/boonchubike-cms'
	}
];
