import {spawnSync} from 'node:child_process';
const build=spawnSync(process.execPath,['node_modules/vite/bin/vite.js','build','--base=/incident-atlas/','--outDir=dist-demo'],{env:{...process.env,VITE_STATIC_DEMO:'true'},stdio:'inherit'});
process.exitCode=build.status??1;
