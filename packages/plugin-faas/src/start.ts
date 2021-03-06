import { useKoaDevPack } from '@midwayjs/faas-dev-pack'
import { logGreen, getCwd, loadConfig, initialSSRDevProxy } from 'ssr-server-utils'
import * as Koa from 'koa'

const start = () => {
  const cwd = getCwd()
  const app = new Koa()
  const { serverPort, cloudIDE } = loadConfig()
  initialSSRDevProxy(app)
  // eslint-disable-next-line
  app.use(useKoaDevPack({
    functionDir: cwd
  }))

  app.listen(serverPort, () => {
    if (cloudIDE && process.env.HOSTNAME) {
      // cloud ide 在云端启动服务
      const hostName = process.env.HOSTNAME
      if (hostName) {
        logGreen(`Server is listening on http://${hostName.split('-').slice(0, -2).join('-')}-3000.xide.aliyun.com/`)
      }
    } else {
      logGreen('Server is listening on http://localhost:3000')
    }
  })
}

export {
  start
}
