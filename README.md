<div align="center">
  <img src="./public/256x256.png" align="center" width="200" />
</div>
<h3 align="center">Schedule</h3>

<div style="text-align: center;width: 100%;">
  <a href="./README.zh-CN.md">中文</a> | <span>English</span>
</div>

A Schedule Tools, You can create a scheduled task by using the cron string
> home

![index page](./docs/public/images/banner1.png)

> create schedule

![index page](./docs/public/images/banner2.png)

## Schedule directive
You can select parts of the instructions, combine and sort, them to achieve the effect you want. For example, by the combination of `date-time` and `notification` two directives, are set to execute once an hour, then you get an instruction that will ring every hour.
If you are a fan of the Internet of Things (IoT) and have a built-in MQTT messaging service, you only need to configure your own MQTT service to send MQTT content regularly.
more directive see [ here ](./docs/index.md)

## Usage
> need
* node >= 16.*
* typescript >= 5.1.3
* pnpm >= 8.6.0

```sh
# install dependencies
pnpm i
# run
pnpm dev
# build
pnpm build
```
