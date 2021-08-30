import { writeFileSync } from 'fs';
import { load } from 'js-yaml';
import fetch from 'node-fetch';
import { resolve } from 'path';

// @TODO Update this URL to use the `master` branch when this PR is merged
//    https://github.com/BZFlag-Dev/bzflag.org/pull/42
const BZDB_DOCS_URL =
  'https://raw.githubusercontent.com/BZFlag-Dev/bzflag.org/docs/bzdb/_data/bzdb_settings.yaml';

(async function () {
  const rawBody = await (await fetch(BZDB_DOCS_URL)).text();
  const json = load(rawBody);

  writeFileSync(
    resolve(__dirname, '..', 'data', 'bzdb-documention.json'),
    JSON.stringify(json),
  );
})();
