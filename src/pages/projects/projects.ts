import { getUserRepos } from '../../utils';

export interface Project {
	name: string;
	description?: string;
	html_url: string;
	topics?: string[];
	stargazers_count?: number;
}

export const projects: Project[] = await getUserRepos('oadultradeepfield', 9);
