import { fusebox, sparky } from 'fuse-box';

class Context {
    public getConfig(isProduction = false) {
        console.log(isProduction)
        return fusebox({
            logging: {
                level: 'verbose',
            },
            target: 'browser',
            entry: isProduction ? 'src/index.ts' : 'src/test.ts',
            webIndex: !isProduction && {
                template: 'src/index.html',
            },
            devServer: !isProduction && {
                hmrServer: {
                    enabled: true,
                },
            },
            cache: false,
            "hmr": !isProduction
        })
    }
}

const {
    rm,
    task,
    src,
} = sparky<Context>(Context)

task("default", async (ctx: Context) => {
    const fuse = ctx.getConfig(false)
    await fuse.runDev()
})

task("build", async (ctx: Context) => {
    const fuse = ctx.getConfig(true)
    await fuse.runProd()
})

