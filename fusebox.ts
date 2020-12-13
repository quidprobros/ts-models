import { fusebox, sparky } from 'fuse-box';
import { tsc } from 'fuse-box/sparky/tsc'
import {pluginTypeChecker} from 'fuse-box-typechecker';
import { IPublicConfig } from 'fuse-box/config/IConfig';

const { spawn } = require('child_process')

import * as ts from "typescript";

const typeChecker = require('fuse-box-typechecker').TypeChecker({
    tsConfig: './tsconfig.json',
    basePath: './',
    name: 'checkerSync',
    print_summary: true,
});

class Context {
    public outputType!: string
    public config: IPublicConfig = {}

    constructor() {
        this.config = {
            logging: {
                level: 'verbose',
            },
            target: 'browser',
            webIndex: {
                template: 'src/index.html',
            },
            devServer: {
                hmrServer: {
                    enabled: true,
                },
                open: true
            },
            cache: false,
            hmr: true,
            plugins: [],


        }

    }

    public extendConfig(config: IPublicConfig) {
        this.config = {
            ...this.config,
            ...config,
        }
    }

    public getConfig() {
            this.config.plugins.push(pluginTypeChecker({
                name: 'Superman',
            }))
        return fusebox(this.config)
    }
}


const {
    rm,
    task,
} = sparky<Context>(Context)

task("default", async (ctx: Context) => {
    ctx.extendConfig({
        entry: 'src/test/test.ts'
    })
    const fuse = ctx.getConfig()
    await fuse.runDev({
        bundles: {
            distRoot: "./dist/cjs",
            app: 'index.js',
        },
    })
})

task("build", async (ctx: Context) => {
    rm("./dist")

    ctx.extendConfig({
        entry: 'src/index.ts',
        webIndex: false,
        devServer: false,
    })

    await ctx.getConfig().runProd({
        manifest: false,
        bundles: {
            distRoot: "./dist/esm",
            app: 'index.js',
        },
        buildTarget: "ES2015",

    })
        .then(function() {
            console.log("Done building ESM module")
        })

    ctx.extendConfig({
        compilerOptions: {
            tsConfig: "./tsconfig-cjs.json",
        }
    })

    await ctx.getConfig().runProd({
        manifest: false,
        bundles: {
            distRoot: "./dist/cjs",
            app: 'index.js',
        },
        buildTarget: "ES2015",
    })
        .then(function() {
            console.log("Done building commonjs module")
        })
})
