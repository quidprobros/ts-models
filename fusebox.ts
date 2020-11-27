import { fusebox } from 'fuse-box';



fusebox({
    target: 'browser',
    entry: 'src/index.ts',
    webIndex: {
        template: 'src/index.html',
    },
    devServer: {
        hmrServer: {
            enabled: true,
        },
    },
    "hmr": true
}).runDev();
