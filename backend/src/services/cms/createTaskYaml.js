import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export function createTaskYaml(taskDir, exercise) {
  const taskYamlObject = {
    name: exercise.name, // T_EXERCISES.ID
    title: exercise.title, // T_EXERCISES.NAME
    time_limit: exercise.timeLimit, // T_PLUGGED_IN_EXERCISES.TIME_LIMIT
    memory_limit: 256,
    n_input: exercise.nInput, // T_PLUGGED_IN_EXERCISES.INPUTS
    token_mode: "disabled",
    score_mode: "max",
    infile: "",
    outfile: "",
  };

  const yamlContent = yaml.dump(taskYamlObject, {
    noRefs: true,
    quotingType: '"',
    forceQuotes: true,
    flowLevel: 1,
    lineWidth: -1
  });

  fs.writeFileSync(
    path.join(taskDir, 'task.yaml'),
    yamlContent
  );
}
