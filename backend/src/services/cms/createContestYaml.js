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
        timezone: cmsData.timezone
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
