<div align="center">
  <img src="./public/256x256.png" align="center" width="200" />
</div>
<h3 align="center">Schedule</h3>
<div style="text-align:center">
  <span>中文</span> | <a href="./README.md">English</a>
</div>

计划工具，您可以使用cron字符串创建计划任务

> 首页

![index page](./docs/banner1.png)

> 创建 `schedule` 页面

![index page](./docs/banner2.png)

## Schedule 指令
您可以选择部分指令，进行组合和排序，以达到您想要的效果。例如，通过组合 `date-time`和 `notification` 两个指令，将其设置为每小时执行一次，那么您将得到一个每小时响一次的指令。
如果您是物联网(IOT)的爱好者，这个App拥有内置的MQTT消息传递服务，那么您只需要配置自己的MQTT服务，以便定期发送MQTT内容。

更多指令介绍查看[这里](./docs/directive.md)

## 使用
> 环境要求
* node >= 16.*
* typescript >= 5.1.3
* pnpm >= 8.6.0

```sh
# 安装依赖
pnpm i
# 运行
pnpm dev
# 构建
pnpm build
```
