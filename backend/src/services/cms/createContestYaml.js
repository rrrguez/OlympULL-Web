import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export function createContestYaml(contestDir, cmsData) {
    const contestYamlObject = {
        name: cmsData.name, // T_OLYMPIADS.ID
        description: cmsData.description, // T_OLYMPIADS.NAME
        tasks: cmsData.exercises.map(e => e.name),
        users: cmsData.users.map(u => ({
            username: u.username,
            password: u.password
        })),
        token_mode: "disabled",
        start: cmsData.start,
        stop: cmsData.stop,
        timezone: cmsData.timezone,
        analysis_enabled: false,
        analysis_start: new Date(new Date(cmsData.stop).setDate(new Date(cmsData.stop).getDate() + 1)),
        analysis_stop: new Date(new Date(cmsData.stop).setDate(new Date(cmsData.stop).getDate() + 2)),
    };

    const yamlContent = yaml.dump(contestYamlObject, {
        noRefs: true,
        quotingType: '"',
        forceQuotes: true,
        lineWidth: -1
    });

    fs.writeFileSync(
        path.join(contestDir, 'contest.yaml'),
        yamlContent
    );
}
